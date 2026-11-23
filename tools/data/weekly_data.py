"""Weekly numbers for the site, written to docs/search-data.md.

Run by .github/workflows/weekly-data.yml every Monday. Each source is optional:
if its secret is missing or the call fails, the file says so and the rest still runs.

Secrets (GitHub repo settings > Secrets and variables > Actions):
  GSC_SERVICE_ACCOUNT_JSON  Google service account key with access to the Search Console property
  BING_API_KEY              Bing Webmaster Tools API key
  GUMROAD_TOKEN             Gumroad access token
  CF_API_TOKEN              Cloudflare API token with Account Analytics: Read
"""
import datetime as dt
import json
import os
import pathlib

import requests

SITE = "https://requirementsfirst.com/"
HOST = "requirementsfirst.com"
CF_ACCOUNT = "5ff05ec8298729dc194f2a65d78f541a"
OUT = pathlib.Path(__file__).resolve().parents[2] / "docs" / "search-data.md"
TODAY = dt.date.today()
# Search Console data lags about 2 days; end windows 3 days back so they are complete.
END = TODAY - dt.timedelta(days=3)

out = [f"# Weekly search data\n\nGenerated {TODAY.isoformat()} by the Weekly data workflow. Windows end {END.isoformat()}.\n"]


def table(headers, rows):
    lines = ["| " + " | ".join(headers) + " |", "| " + " | ".join("---" for _ in headers) + " |"]
    lines += ["| " + " | ".join(str(c) for c in r) + " |" for r in rows]
    return "\n".join(lines) + "\n"


def section(title, fn):
    out.append(f"\n## {title}\n")
    try:
        out.append(fn())
    except Exception as e:  # keep going: one broken source must not hide the others
        out.append(f"Not available: {type(e).__name__}: {str(e)[:300]}\n")


def gsc():
    key = os.environ.get("GSC_SERVICE_ACCOUNT_JSON")
    if not key:
        return "Not configured (GSC_SERVICE_ACCOUNT_JSON secret missing).\n"
    from google.oauth2 import service_account
    from google.auth.transport.requests import AuthorizedSession

    creds = service_account.Credentials.from_service_account_info(
        json.loads(key), scopes=["https://www.googleapis.com/auth/webmasters.readonly"]
    )
    s = AuthorizedSession(creds)
    url = f"https://searchconsole.googleapis.com/webmasters/v3/sites/{requests.utils.quote(SITE, safe='')}/searchAnalytics/query"

    def q(days, dims=None, limit=25):
        body = {"startDate": (END - dt.timedelta(days=days - 1)).isoformat(), "endDate": END.isoformat(), "rowLimit": limit}
        if dims:
            body["dimensions"] = dims
        r = s.post(url, json=body, timeout=60)
        r.raise_for_status()
        return r.json().get("rows", [])

    def fmt(r):
        return r["clicks"], r["impressions"], f'{r["ctr"] * 100:.1f}%', f'{r["position"]:.1f}'

    md = ""
    tot = []
    for days in (7, 28):
        rows = q(days)
        tot.append([f"Last {days} days", *(fmt(rows[0]) if rows else (0, 0, "0%", "-"))])
    md += table(["Window", "Clicks", "Impressions", "CTR", "Position"], tot)
    md += "\n### Top pages, 28 days\n\n" + table(
        ["Page", "Clicks", "Impressions", "CTR", "Position"],
        [[r["keys"][0].replace(SITE, "/"), *fmt(r)] for r in q(28, ["page"])],
    )
    md += "\n### Top queries, 28 days\n\n" + table(
        ["Query", "Clicks", "Impressions", "CTR", "Position"],
        [[r["keys"][0], *fmt(r)] for r in q(28, ["query"], 50)],
    )
    top20 = [r for r in q(28, ["query"], 250) if r["position"] <= 20]
    md += "\n### Queries ranking in the top 20, 28 days\n\n" + table(
        ["Query", "Clicks", "Impressions", "CTR", "Position"], [[r["keys"][0], *fmt(r)] for r in top20[:40]]
    )
    return md


def bing():
    key = os.environ.get("BING_API_KEY")
    if not key:
        return "Not configured (BING_API_KEY secret missing).\n"
    r = requests.get(
        "https://ssl.bing.com/webmaster/api.svc/json/GetQueryStats",
        params={"siteUrl": SITE, "apikey": key},
        timeout=60,
    )
    r.raise_for_status()
    rows = r.json().get("d", [])
    agg = {}
    for x in rows:
        a = agg.setdefault(x["Query"], [0, 0])
        a[0] += x.get("Clicks", 0)
        a[1] += x.get("Impressions", 0)
    top = sorted(agg.items(), key=lambda kv: -kv[1][1])[:25]
    return table(["Query", "Clicks", "Impressions"], [[k, v[0], v[1]] for k, v in top]) if top else "No Bing query data yet.\n"


def gumroad():
    tok = os.environ.get("GUMROAD_TOKEN")
    if not tok:
        return "Not configured (GUMROAD_TOKEN secret missing).\n"
    r = requests.get("https://api.gumroad.com/v2/products", params={"access_token": tok}, timeout=60)
    r.raise_for_status()
    prods = r.json().get("products", [])
    rows = [
        [p.get("name"), p.get("formatted_price"), p.get("sales_count", 0), f'${(p.get("sales_usd_cents") or 0) / 100:.2f}', p.get("short_url")]
        for p in prods
    ]
    return table(["Product", "Price", "Sales (incl. $0)", "Revenue", "Link"], rows)


def cloudflare():
    tok = os.environ.get("CF_API_TOKEN")
    if not tok:
        return "Not configured (CF_API_TOKEN secret missing).\n"
    start = (TODAY - dt.timedelta(days=7)).isoformat()
    query = """
    query($acct: String!, $start: Date!, $end: Date!, $host: String!) {
      viewer { accounts(filter: {accountTag: $acct}) {
        paths: rumPageloadEventsAdaptiveGroups(limit: 40, orderBy: [count_DESC],
          filter: {date_geq: $start, date_leq: $end, requestHost: $host}) {
          count sum { visits } dimensions { requestPath } }
        refs: rumPageloadEventsAdaptiveGroups(limit: 15, orderBy: [count_DESC],
          filter: {date_geq: $start, date_leq: $end, requestHost: $host}) {
          count dimensions { refererHost } }
      } }
    }"""
    r = requests.post(
        "https://api.cloudflare.com/client/v4/graphql",
        headers={"Authorization": f"Bearer {tok}"},
        json={"query": query, "variables": {"acct": CF_ACCOUNT, "start": start, "end": TODAY.isoformat(), "host": HOST}},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()
    if data.get("errors"):
        raise RuntimeError(json.dumps(data["errors"])[:300])
    acct = data["data"]["viewer"]["accounts"][0]
    paths = acct["paths"]
    downloads = [p for p in paths if p["dimensions"]["requestPath"].startswith("/download/")]
    md = "Sampled counts, last 7 days. Downloads are page views of /download/<file>/.\n\n"
    md += "### Downloads\n\n" + (
        table(["File", "Downloads"], [[p["dimensions"]["requestPath"], p["count"]] for p in downloads]) if downloads else "None.\n"
    )
    md += "\n### Top paths\n\n" + table(["Path", "Page views", "Visits"], [[p["dimensions"]["requestPath"], p["count"], p["sum"]["visits"]] for p in paths[:25]])
    md += "\n### Referrers\n\n" + table(["Referrer", "Page views"], [[p["dimensions"]["refererHost"] or "(direct)", p["count"]] for p in acct["refs"]])
    return md


section("Google Search Console", gsc)
section("Bing Webmaster Tools", bing)
section("Gumroad", gumroad)
section("Cloudflare Web Analytics", cloudflare)

OUT.parent.mkdir(exist_ok=True)
OUT.write_text("".join(out))
print(OUT.read_text())
