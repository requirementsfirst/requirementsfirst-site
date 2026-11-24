"""Free Excel tracker: acceptance criteria per story plus a team Definition of Done checklist. Built by .github/workflows/build-templates.yml into public/."""
import pathlib
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.utils import get_column_letter

NS = 50    # story rows prepared
NA = 200   # acceptance criteria rows prepared
ND = 10    # Definition of Done items supported
F = "Arial"
hdr_font = Font(name=F, bold=True, color="FFFFFF")
hdr_fill = PatternFill("solid", fgColor="1F3A5F")
inp_fill = PatternFill("solid", fgColor="FFF8DC")
calc_fill = PatternFill("solid", fgColor="EEF2F7")
thin = Side(style="thin", color="D0D5DD")
border = Border(left=thin, right=thin, top=thin, bottom=thin)
base = Font(name=F, size=10)

wb = Workbook()
guide = wb.active; guide.title = "How to use"
st = wb.create_sheet("Stories")
ac = wb.create_sheet("Acceptance Criteria")
dod = wb.create_sheet("Definition of Done")
chk = wb.create_sheet("DoD Check")
lists = wb.create_sheet("Lists")


def header(ws, cols, widths, calc_cols, nrows):
    """calc_cols: set of 1-based column numbers that hold formulas."""
    for i, (c, w) in enumerate(zip(cols, widths), 1):
        cell = ws.cell(row=1, column=i, value=c)
        cell.font = hdr_font; cell.fill = hdr_fill; cell.border = border
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[1].height = 34
    ws.freeze_panes = "B2"
    for r in range(2, nrows + 2):
        for i in range(1, len(cols) + 1):
            cell = ws.cell(row=r, column=i)
            cell.font = base; cell.border = border
            cell.alignment = Alignment(wrap_text=True, vertical="top")
            cell.fill = calc_fill if i in calc_cols else inp_fill


# Lists
for i, (name, vals) in enumerate([("Result", ["Not tested", "Pass", "Fail"]), ("Check", ["Yes", "No", "N/A"])], 1):
    lists.cell(row=1, column=i, value=name).font = Font(name=F, bold=True)
    for j, v in enumerate(vals, 2):
        lists.cell(row=j, column=i, value=v).font = base
lists.sheet_state = "hidden"

# Stories: A ID, B Story, C Sprint | D AC written, E AC passed, F AC failing, G DoD met, H DoD open, I Status
header(st, ["Story ID", "User story", "Sprint", "Criteria written", "Criteria passed", "Criteria failing",
            "DoD items met", "DoD items open", "Status"], [10, 52, 9, 10, 10, 10, 10, 10, 18], {4, 5, 6, 7, 8, 9}, NS)
# Acceptance Criteria: A ID, B Story, C Criterion, D Result, E Notes
header(ac, ["AC ID", "Story ID", "Acceptance criterion (this story only)", "Result", "Notes"],
       [9, 10, 70, 12, 40], set(), NA)
# Definition of Done: A No, B Item, C Why it is there | D Stories still open on it
header(dod, ["No.", "Definition of Done item (applies to every story)", "Why it is on the list",
             "Stories still open on this item"], [6, 46, 52, 14], {1, 4}, ND)
# DoD Check: A Story ID, B Story (calc) | C..L checks
header(chk, ["Story ID", "User story"] + [f"DoD {k}" for k in range(1, ND + 1)],
       [10, 40] + [14] * ND, {1, 2}, NS)
chk.row_dimensions[1].height = 70
chk.freeze_panes = "C2"

ACr = "'Acceptance Criteria'"; DDr = "'Definition of Done'"; CKr = "'DoD Check'"
first_ck, last_ck = "C", get_column_letter(2 + ND)
for r in range(2, NS + 2):
    st[f"D{r}"] = f'=IF(A{r}="","",COUNTIF({ACr}!$B$2:$B${NA+1},A{r}))'
    st[f"E{r}"] = f'=IF(A{r}="","",COUNTIFS({ACr}!$B$2:$B${NA+1},A{r},{ACr}!$D$2:$D${NA+1},"Pass"))'
    st[f"F{r}"] = f'=IF(A{r}="","",COUNTIFS({ACr}!$B$2:$B${NA+1},A{r},{ACr}!$D$2:$D${NA+1},"Fail"))'
    st[f"G{r}"] = (f'=IF(A{r}="","",COUNTIF({CKr}!${first_ck}{r}:${last_ck}{r},"Yes")'
                   f'+COUNTIF({CKr}!${first_ck}{r}:${last_ck}{r},"N/A"))')
    st[f"H{r}"] = f'=IF(A{r}="","",COUNTA({DDr}!$B$2:$B${ND+1})-G{r})'
    st[f"I{r}"] = (f'=IF(A{r}="","",IF(D{r}=0,"No criteria",IF(F{r}>0,"Criteria failing",'
                   f'IF(E{r}<D{r},"In test",IF(H{r}>0,"Works, not done","Done")))))')
    # DoD Check mirrors the story list row for row
    chk[f"A{r}"] = f'=IF(Stories!A{r}="","",Stories!A{r})'
    chk[f"B{r}"] = f'=IF(Stories!A{r}="","",Stories!B{r})'
for k in range(1, ND + 1):
    col = get_column_letter(2 + k)
    h = chk.cell(row=1, column=2 + k, value=f'=IF({DDr}!B{k+1}="","(unused)",{DDr}!A{k+1}&". "&{DDr}!B{k+1})')
    dod[f"A{k+1}"] = k
    dod[f"D{k+1}"] = (f'=IF(B{k+1}="","",SUMPRODUCT(({CKr}!$A$2:$A${NS+1}<>"")*'
                      f'({CKr}!{col}$2:{col}${NS+1}<>"Yes")*({CKr}!{col}$2:{col}${NS+1}<>"N/A")))')

# Example: refund portal, sprint 7 review
stories = [
    ("ST-1", "As a customer, I want to start a refund from my order history, so that I do not have to contact support", 7),
    ("ST-2", "As a customer, I want the refund option hidden on orders I cannot refund, so that I am not misled", 7),
    ("ST-3", "As a finance approver, I want refunds under 50 dollars approved automatically, so that I only review the ones that matter", 7),
    ("ST-4", "As a finance approver, I want refunds of 50 dollars or more in my queue, so that large refunds get a human check", 7),
    ("ST-5", "As a customer, I want an email at each refund status change, so that I know where my money is", 7),
    ("ST-6", "As a finance approver, I want flagged accounts to show their refund history, so that I can spot abuse", 7),
    ("ST-7", "As a compliance manager, I want to export the refund log for a date range, so that I can answer audit questions", 8),
]
acs = [
    ("AC-1", "ST-1", "Given a delivered order under 30 days old, when the customer selects Refund, then a request is created and confirmed on screen", "Pass", ""),
    ("AC-2", "ST-1", "Given an order with two items, the customer can refund one item and keep the other", "Pass", ""),
    ("AC-3", "ST-1", "The refund cannot be submitted without a reason from the agreed list of seven", "Pass", ""),
    ("AC-4", "ST-2", "Given an order 31 days old, no Refund option is shown and the refund policy is linked instead", "Pass", ""),
    ("AC-5", "ST-2", "Given an order exactly 30 days old in the customer's timezone, the Refund option is shown", "Pass", "Failed first run, fixed in DEF-12, passed on retest"),
    ("AC-6", "ST-3", "A 49.99 dollar refund with no fraud flag is approved with no manual step", "Pass", ""),
    ("AC-7", "ST-3", "A 50.00 dollar refund is not auto-approved", "Pass", ""),
    ("AC-8", "ST-3", "A flagged account is never auto-approved, whatever the amount", "Pass", ""),
    ("AC-9", "ST-4", "Given a refund of 50 dollars or more, it appears in the finance queue within one minute", "Pass", ""),
    ("AC-10", "ST-4", "Two approvers cannot approve the same refund; the second sees who approved it", "Fail", "DEF-18: both approvals saved, payout sent twice in test"),
    ("AC-11", "ST-5", "An email is sent within five minutes of each status change", "Pass", ""),
    ("AC-12", "ST-5", "Customers who opted out of service emails get no refund emails", "Not tested", "Opt-out flag not in test data yet"),
    ("AC-13", "ST-6", "Given a flagged refund in the queue, the approver sees the last 12 months of refunds on that account", "Pass", ""),
    ("AC-14", "ST-6", "Refund history loads in under 3 seconds for an account with 200 refunds", "Pass", ""),
]
dod_items = [
    ("Code reviewed by a second developer", "Catches what the author cannot see in their own code"),
    ("Automated tests written and passing in the build", "So the next change does not quietly undo this one"),
    ("Deployed to the staging environment", "Works on a laptop is not works"),
    ("No open severity 1 or 2 defects on the story", "Known serious defects are not shipped by accident"),
    ("Every change to refund data writes an audit log entry", "Finance signed BR-3: every refund must be auditable"),
    ("Help text and support macros updated", "Support learns about the feature before customers do"),
    ("Product owner has seen it working on staging", "A demo, not a screenshot in a ticket"),
]
# DoD checks per story, in DoD item order (Yes / No / N/A / None for not checked)
checks = {
    "ST-1": ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],
    "ST-2": ["Yes", "Yes", "Yes", "Yes", "N/A", "Yes", "Yes"],
    "ST-3": ["Yes", "Yes", "Yes", "Yes", "No", "Yes", "Yes"],
    "ST-4": ["Yes", "Yes", "Yes", "No", "Yes", "No", "No"],
    "ST-5": ["Yes", "No", "Yes", "Yes", "N/A", "No", None],
    "ST-6": ["Yes", "Yes", "Yes", "Yes", "N/A", "No", "Yes"],
    "ST-7": [None] * 7,
}
for i, row in enumerate(stories, 2):
    for j, v in enumerate(row, 1):
        st.cell(row=i, column=j, value=v)
for i, row in enumerate(acs, 2):
    for j, v in enumerate(row, 1):
        ac.cell(row=i, column=j, value=v if v != "" else None)
for i, (item, why) in enumerate(dod_items, 2):
    dod[f"B{i}"] = item; dod[f"C{i}"] = why
for i, (sid, _, _) in enumerate(stories, 2):
    for k, v in enumerate(checks[sid]):
        if v:
            chk.cell(row=i, column=3 + k, value=v)

# Validation
def dv(ws, formula, rng):
    d = DataValidation(type="list", formula1=formula, allow_blank=True)
    ws.add_data_validation(d); d.add(rng)
dv(ac, "=Lists!$A$2:$A$4", f"D2:D{NA+1}")
dv(ac, f"=Stories!$A$2:$A${NS+1}", f"B2:B{NA+1}")
dv(chk, "=Lists!$B$2:$B$4", f"C2:{last_ck}{NS+1}")

# Colours
red = PatternFill("solid", fgColor="F8D7DA"); amber = PatternFill("solid", fgColor="FFF3CD")
green = PatternFill("solid", fgColor="D4EDDA"); grey = PatternFill("solid", fgColor="E2E3E5")
def cf(ws, rng, anchor, mapping):
    for text, fill in mapping:
        ws.conditional_formatting.add(rng, FormulaRule(formula=[f'{anchor}="{text}"'], fill=fill, font=Font(name=F, bold=True)))
cf(st, f"I2:I{NS+1}", "$I2", [("Criteria failing", red), ("Works, not done", amber), ("In test", amber), ("No criteria", grey), ("Done", green)])
cf(ac, f"D2:D{NA+1}", "$D2", [("Fail", red), ("Not tested", amber), ("Pass", green)])
cf(chk, f"C2:{last_ck}{NS+1}", "C2", [("No", red), ("Yes", green), ("N/A", grey)])

# Summary block on Stories, to the right
st["K1"] = "Sprint summary"; st["K1"].font = Font(name=F, size=12, bold=True, color="1F3A5F")
for k, h in enumerate(["Status", "Stories"], 11):
    c = st.cell(row=2, column=k, value=h); c.font = hdr_font; c.fill = hdr_fill; c.border = border
for n, v in enumerate(["Done", "Works, not done", "In test", "Criteria failing", "No criteria"]):
    r = 3 + n
    a = st.cell(row=r, column=11, value=v); a.font = base; a.border = border
    b = st.cell(row=r, column=12, value=f'=COUNTIF($I$2:$I${NS+1},K{r})'); b.font = base; b.border = border; b.fill = calc_fill
st.column_dimensions["J"].width = 3; st.column_dimensions["K"].width = 20; st.column_dimensions["L"].width = 9

# Guide
lines = [("Acceptance criteria and Definition of Done tracker", "title"),
("A free tracker from requirementsfirst.com. Acceptance criteria belong to one story. The Definition of Done belongs to the team and applies to every story. A story is Done only when both are met, and this file keeps them apart so you can see which one is holding a story back.", None),
("", None),
("The sheets", "h"),
("1. Stories: one row per story. Columns D to I are formulas: criteria written, passed and failing, DoD items met and open, and the status.", None),
("2. Acceptance Criteria: one row per criterion, linked to a story with the dropdown. Record Pass, Fail or Not tested.", None),
("3. Definition of Done: the team's list, up to 10 items. Write it once, change it at a retrospective, not mid-sprint. Column D shows which item is open on the most stories.", None),
("4. DoD Check: the story list repeats here automatically. Mark each item Yes, No or N/A. A blank counts as open.", None),
("", None),
("How the status works", "h"),
("No criteria: nobody has written acceptance criteria yet. Criteria failing: at least one criterion failed. In test: some criteria not yet tested.", None),
("Works, not done: every criterion passes but a Definition of Done item is open. This is the status teams argue about, and the reason the two lists are kept apart.", None),
("Done: every criterion passes and every Definition of Done item is Yes or N/A.", None),
("", None),
("The example", "h"),
("A refund portal at sprint 7 review. ST-1 and ST-2 are Done. ST-3 and ST-6 work but are not done: an audit log and help text are missing. ST-4 has a failing criterion. ST-5 is still in test. ST-7 has no criteria yet.", None),
("", None),
("Using it for your own team", "h"),
("Cream cells are inputs; blue-grey cells are formulas. Delete the example rows in the cream columns and replace the Definition of Done with your own. Works in Excel, Google Sheets and LibreOffice. No macros.", None),
("", None),
("Read the walkthrough", "h"),
("https://requirementsfirst.com/posts/acceptance-criteria-vs-definition-of-done/", None)]
guide.column_dimensions["A"].width = 120
for i, (t, k) in enumerate(lines, 1):
    c = guide.cell(row=i, column=1, value=t); c.alignment = Alignment(wrap_text=True, vertical="top")
    c.font = Font(name=F, size=16, bold=True) if k == "title" else Font(name=F, size=12, bold=True, color="1F3A5F") if k == "h" else Font(name=F, size=10)
guide[f"A{len(lines)}"].hyperlink = "https://requirementsfirst.com/posts/acceptance-criteria-vs-definition-of-done/"
guide.sheet_view.showGridLines = False

wb.calculation.fullCalcOnLoad = True
OUT = pathlib.Path(__file__).resolve().parents[2] / "public" / "acceptance-criteria-definition-of-done-checklist.xlsx"
wb.save(OUT)
print("wrote", OUT)
