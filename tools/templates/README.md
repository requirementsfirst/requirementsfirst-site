# Downloadable templates

Each `*.py` file here builds one free download (Excel with openpyxl, Word with python-docx) and writes it into `public/`, so it is served at `https://requirementsfirst.com/<file name>`.

You never commit the `.xlsx` or `.docx` yourself. On every push to `main` that touches this folder, the **Build templates** workflow runs every script and commits the generated files to `public/`. Cloudflare Pages then deploys them.

Rules for a new template script:

- Write to `pathlib.Path(__file__).resolve().parents[2] / "public" / "<slug>.xlsx"` (or `.docx`).
- Arial font, a "How to use" sheet first, one example row of realistic values, formula columns visibly different from input columns.
- Excel formulas: only Excel 2007-era functions (COUNTIFS, SUMIFS, INDEX, MATCH, IFERROR). No XLOOKUP, FILTER, UNIQUE, SORT or SEQUENCE.
- Set `wb.calculation.fullCalcOnLoad = True` so Excel computes formulas on open.
- Test locally first: run the script, then recalculate in LibreOffice and check there are no formula errors.
