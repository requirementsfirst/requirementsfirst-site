"""Free Excel requirements traceability matrix. Built by .github/workflows/build-templates.yml into public/."""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.utils import get_column_letter

N = 100  # rows prepared
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
br = wb.create_sheet("Business Reqs")
fr = wb.create_sheet("Functional Reqs")
tc = wb.create_sheet("Test Cases")
lists = wb.create_sheet("Lists")

def header(ws, cols, widths, calc_from):
    for i,(c,w) in enumerate(zip(cols,widths),1):
        cell = ws.cell(row=1,column=i,value=c)
        cell.font=hdr_font; cell.fill=hdr_fill; cell.alignment=Alignment(wrap_text=True,vertical="center"); cell.border=border
        ws.column_dimensions[get_column_letter(i)].width=w
    ws.row_dimensions[1].height=32
    ws.freeze_panes="B2"
    for r in range(2,N+2):
        for i in range(1,len(cols)+1):
            cell=ws.cell(row=r,column=i)
            cell.font=base; cell.border=border; cell.alignment=Alignment(wrap_text=True,vertical="top")
            cell.fill = calc_fill if i>=calc_from else inp_fill

# Lists
for i,(name,vals) in enumerate([("Priority",["Must","Should","Could","Won't"]),("Build status",["Not started","In progress","Built","Released"]),("Result",["Not run","Pass","Fail"])],1):
    lists.cell(row=1,column=i,value=name).font=Font(name=F,bold=True)
    for j,v in enumerate(vals,2): lists.cell(row=j,column=i,value=v).font=base
lists.sheet_state="hidden"

# Business Reqs: A ID, B Requirement, C Objective, D Priority, E Signs off, F FRs linked, G Failing FRs, H FRs with gaps, I Trace status
header(br,["BR ID","Business requirement","Objective it serves","Priority","Signs off","FRs linked","FRs failing","FRs with gaps","Trace status"],[9,46,34,11,22,10,10,11,15],6)
# Functional Reqs: A ID, B Requirement, C Serves BR, D Also serves BR, E Acceptance criteria, F Build status, G Tests, H Passed, I Failed, J Coverage
header(fr,["FR ID","Functional requirement","Serves BR","Also serves BR (optional)","Acceptance criteria","Build status","Tests linked","Tests passed","Tests failed","Coverage"],[9,44,11,13,44,13,9,9,9,14],7)
# Test Cases: A ID, B Test, C Proves FR, D Result, E Last run, F Notes
header(tc,["TC ID","Test case","Proves FR","Result","Last run","Notes"],[9,48,11,11,12,36],99)

FRr="'Functional Reqs'"; TCr="'Test Cases'"
for r in range(2,N+2):
    br[f"F{r}"]=f'=IF(A{r}="","",COUNTIF({FRr}!$C$2:$C${N+1},A{r})+COUNTIF({FRr}!$D$2:$D${N+1},A{r}))'
    br[f"G{r}"]=f'=IF(A{r}="","",COUNTIFS({FRr}!$C$2:$C${N+1},A{r},{FRr}!$J$2:$J${N+1},"Failing")+COUNTIFS({FRr}!$D$2:$D${N+1},A{r},{FRr}!$J$2:$J${N+1},"Failing"))'
    br[f"H{r}"]=(f'=IF(A{r}="","",COUNTIFS({FRr}!$C$2:$C${N+1},A{r},{FRr}!$J$2:$J${N+1},"No tests")+COUNTIFS({FRr}!$D$2:$D${N+1},A{r},{FRr}!$J$2:$J${N+1},"No tests")'
                 f'+COUNTIFS({FRr}!$C$2:$C${N+1},A{r},{FRr}!$J$2:$J${N+1},"Not run yet")+COUNTIFS({FRr}!$D$2:$D${N+1},A{r},{FRr}!$J$2:$J${N+1},"Not run yet"))')
    br[f"I{r}"]=f'=IF(A{r}="","",IF(F{r}=0,"Not traced",IF(G{r}>0,"Failing",IF(H{r}>0,"Gaps","Fully tested"))))'
    fr[f"G{r}"]=f'=IF(A{r}="","",COUNTIF({TCr}!$C$2:$C${N+1},A{r}))'
    fr[f"H{r}"]=f'=IF(A{r}="","",COUNTIFS({TCr}!$C$2:$C${N+1},A{r},{TCr}!$D$2:$D${N+1},"Pass"))'
    fr[f"I{r}"]=f'=IF(A{r}="","",COUNTIFS({TCr}!$C$2:$C${N+1},A{r},{TCr}!$D$2:$D${N+1},"Fail"))'
    fr[f"J{r}"]=f'=IF(A{r}="","",IF(G{r}=0,"No tests",IF(I{r}>0,"Failing",IF(H{r}<G{r},"Not run yet","Passing"))))'

# Example: refund portal
brs=[("BR-1","Customers can get a refund without contacting support","Cut refund-related support contacts","Must","Priya, Head of Customer Support"),
     ("BR-2","Refunds are paid out within one business day","Faster refunds, fewer chasers","Must","David, Finance Controller"),
     ("BR-3","Finance can audit every refund","Pass the year-end refund audit","Should","Rahul, Compliance Manager")]
frs=[("FR-1","Customer can start a refund from their order history page","BR-1","","Given a delivered order under 30 days old, when the customer selects Refund, then a refund request is created and confirmed on screen","Built"),
     ("FR-2","Refunds under 50 dollars are approved automatically","BR-2","","Given a request under 50 dollars, when it is submitted, then it is approved with no manual step","In progress"),
     ("FR-3","Approved refunds are sent to the payment gateway within one hour","BR-2","","Given an approved refund, when one hour has passed, then the gateway has accepted the payout","Built"),
     ("FR-4","Every refund decision is logged with who, when and why","BR-3","","Given any approval or rejection, then the log shows the actor, timestamp and reason","Not started")]
tcs=[("TC-1","Start a refund on an eligible order","FR-1","Pass","2026-10-20","",),
     ("TC-2","Refund option hidden on orders older than 30 days","FR-1","Pass","2026-10-20",""),
     ("TC-3","Auto-approve a 42 dollar refund","FR-2","Not run","","Waiting on finance threshold sign-off"),
     ("TC-4","Gateway accepts payout for an approved refund","FR-3","Fail","2026-10-22","Sandbox returns 429 under load")]
for i,row in enumerate(brs,2):
    for j,v in enumerate(row,1): br.cell(row=i,column=j,value=v)
for i,row in enumerate(frs,2):
    for j,v in enumerate(row,1): fr.cell(row=i,column=j,value=v if v!="" else None)
import datetime
for i,row in enumerate(tcs,2):
    for j,v in enumerate(row,1):
        if j==5 and v: v=datetime.date.fromisoformat(v)
        tc.cell(row=i,column=j,value=v if v!="" else None)
for r in range(2,N+2): tc[f"E{r}"].number_format="yyyy-mm-dd"

# Validation
def dv(ws, formula, rng):
    d=DataValidation(type="list",formula1=formula,allow_blank=True); ws.add_data_validation(d); d.add(rng)
dv(br,"=Lists!$A$2:$A$5",f"D2:D{N+1}")
dv(fr,"=Lists!$B$2:$B$5",f"F2:F{N+1}")
dv(tc,"=Lists!$C$2:$C$4",f"D2:D{N+1}")
dv(fr,f"='Business Reqs'!$A$2:$A${N+1}",f"C2:D{N+1}")
dv(tc,f"='Functional Reqs'!$A$2:$A${N+1}",f"C2:C{N+1}")

# Status colours
red=PatternFill("solid",fgColor="F8D7DA"); amber=PatternFill("solid",fgColor="FFF3CD"); green=PatternFill("solid",fgColor="D4EDDA"); grey=PatternFill("solid",fgColor="E2E3E5")
def cf(ws,col,mapping):
    rng=f"{col}2:{col}{N+1}"
    for text,fill in mapping:
        ws.conditional_formatting.add(rng,FormulaRule(formula=[f'${col}2="{text}"'],fill=fill,font=Font(name=F,bold=True)))
cf(br,"I",[("Failing",red),("Gaps",amber),("Not traced",grey),("Fully tested",green)])
cf(fr,"J",[("Failing",red),("Not run yet",amber),("No tests",grey),("Passing",green)])
cf(tc,"D",[("Fail",red),("Not run",amber),("Pass",green)])

# Guide
lines=[("Requirements Traceability Matrix","title"),
("A free template from requirementsfirst.com. Three linked tables, coverage calculated for you.",None),
("",None),
("How it works","h"),
("1. Business Reqs: one row per outcome the business wants. Fill in the cream columns.",None),
("2. Functional Reqs: one row per thing the system must do. Pick the BR it serves from the dropdown (and a second BR if it serves two).",None),
("3. Test Cases: one row per test. Pick the FR it proves and set the result to Not run, Pass or Fail.",None),
("Blue-grey columns are formulas. Do not type in them. Each sheet has 100 rows ready; copy the last row down for more.",None),
("",None),
("Coverage (Functional Reqs)","h"),
("No tests: nothing linked.   Failing: any linked test failed.   Not run yet: some tests not run.   Passing: every linked test passed.",None),
("",None),
("Trace status (Business Reqs)","h"),
("Not traced: no FRs linked.   Failing: any FR is failing.   Gaps: any FR has no tests or untested ones.   Fully tested: everything beneath it passes.",None),
("",None),
("The example","h"),
("The rows already filled in are a synthetic refund portal project: BR-1 is Fully tested, BR-2 is Failing, BR-3 has Gaps. Delete the example rows (cream columns only) when you start your own.",None),
("",None),
("Read the full guide","h"),
("https://requirementsfirst.com/posts/requirements-traceability-matrix-template/",None),
("Prefer Notion? The same template as three linked databases: https://requirementsfirst.gumroad.com/l/bkgdtg",None)]
guide.column_dimensions["A"].width=120
for i,(t,k) in enumerate(lines,1):
    c=guide.cell(row=i,column=1,value=t); c.alignment=Alignment(wrap_text=True,vertical="top")
    c.font=Font(name=F,size=16,bold=True) if k=="title" else Font(name=F,size=12,bold=True,color="1F3A5F") if k=="h" else Font(name=F,size=10)
guide["A20"].hyperlink="https://requirementsfirst.com/posts/requirements-traceability-matrix-template/"
guide.sheet_view.showGridLines=False
wb.calculation.fullCalcOnLoad = True
import pathlib
OUT = pathlib.Path(__file__).resolve().parents[2] / "public" / "requirements-traceability-matrix-template.xlsx"
wb.save(OUT)
print("wrote", OUT)
