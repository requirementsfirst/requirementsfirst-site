"""Free Excel requirements traceability matrix, filled-in worked example. Built by .github/workflows/build-templates.yml into public/."""
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
sm = wb.create_sheet("Summary")
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

# Example: refund portal, filled in as it stands in week 2 of UAT
brs=[("BR-1","Customers can get a refund without contacting support","Cut refund-related support contacts from 41% to 15% of tickets","Must","Priya, Head of Customer Support"),
     ("BR-2","Refunds are paid out within one business day","Cut average refund time from 9 days to 1","Must","David, Finance Controller"),
     ("BR-3","Finance can audit every refund","Pass the year-end refund audit with no findings","Must","Rahul, Compliance Manager"),
     ("BR-4","Customers always know where their refund stands","Halve 'where is my refund' chasers","Should","Priya, Head of Customer Support"),
     ("BR-5","Refund abuse is caught before money leaves","Keep refund fraud under 0.5% of refund value","Should","David, Finance Controller"),
     ("BR-6","Store staff can refund in-store purchases through the same portal","One refund process across channels","Could","Meera, Retail Operations Lead")]
frs=[("FR-1","Customer can start a refund from their order history page","BR-1","BR-4","Given a delivered order under 30 days old, when the customer selects Refund, then a request is created and confirmed on screen","Built"),
     ("FR-2","Refund option is hidden on orders outside the refund window","BR-1","","Given an order older than 30 days, then no Refund option is shown and the refund policy is linked instead","Built"),
     ("FR-3","Customer picks a reason from a fixed list","BR-1","BR-5","Given the refund form, then the reason is mandatory and limited to the seven agreed reasons","Built"),
     ("FR-4","Refunds under 50 dollars are approved automatically","BR-2","","Given a request under 50 dollars and no fraud flag, when submitted, then it is approved with no manual step","Built"),
     ("FR-5","Refunds of 50 dollars or more go to the finance approval queue","BR-2","BR-5","Given a request of 50 dollars or more, then it appears in the queue within one minute","Built"),
     ("FR-6","Approved refunds are sent to the payment gateway within one hour","BR-2","","Given an approved refund, when one hour has passed, then the gateway has accepted the payout","Built"),
     ("FR-7","Failed payouts retry three times, then alert finance","BR-2","","Given a gateway rejection, then the payout retries at 15, 30 and 60 minutes and then raises an alert","In progress"),
     ("FR-8","Every refund decision is logged with who, when and why","BR-3","","Given any approval or rejection, then the log shows actor, timestamp and reason","Built"),
     ("FR-9","Finance can export the refund log for any date range","BR-3","","Given a date range, when finance exports, then a CSV with every logged field downloads","Not started"),
     ("FR-10","Customer sees a status timeline for each refund","BR-4","","Given a refund, then the order page shows Requested, Approved, Paid with dates","Built"),
     ("FR-11","Customer gets an email at each status change","BR-4","","Given a status change, then an email is sent within five minutes","Built"),
     ("FR-12","Accounts with 3 or more refunds in 30 days are flagged","BR-5","","Given a third refund request in 30 days, then the request is flagged and skips auto-approval","Built"),
     ("FR-13","Flagged refunds show the account's refund history to the approver","BR-5","","Given a flagged request in the queue, then the approver sees the last 12 months of refunds","In progress")]
tcs=[("TC-1","Start a refund on an eligible order","FR-1","Pass","2026-11-16",""),
     ("TC-2","Start a refund on an order with two items, refund one","FR-1","Pass","2026-11-16",""),
     ("TC-3","Refund option hidden on a 31-day-old order","FR-2","Pass","2026-11-16",""),
     ("TC-4","Refund option shown on a 30-day-old order (boundary)","FR-2","Pass","2026-11-17","Passed on retest after DEF-12 timezone fix"),
     ("TC-5","Submit without a reason is blocked","FR-3","Pass","2026-11-16",""),
     ("TC-6","Auto-approve a 42 dollar refund","FR-4","Pass","2026-11-17",""),
     ("TC-7","49.99 dollars auto-approves, 50.00 goes to queue (boundary)","FR-4","Pass","2026-11-17",""),
     ("TC-8","A 120 dollar refund appears in the finance queue","FR-5","Pass","2026-11-17",""),
     ("TC-9","Gateway accepts payout for an approved refund","FR-6","Pass","2026-11-18",""),
     ("TC-10","200 payouts in one hour all accepted","FR-6","Fail","2026-11-18","DEF-15: sandbox returns 429 above 150 per hour"),
     ("TC-11","Payout retries after a gateway rejection","FR-7","Not run","","Blocked until FR-7 is built"),
     ("TC-12","Approval is logged with actor and reason","FR-8","Pass","2026-11-18",""),
     ("TC-13","Rejection is logged with actor and reason","FR-8","Pass","2026-11-18",""),
     ("TC-14","Timeline shows Requested, Approved, Paid","FR-10","Pass","2026-11-19",""),
     ("TC-15","Email sent on approval","FR-11","Pass","2026-11-19",""),
     ("TC-16","Email sent on payout","FR-11","Not run","","Needs gateway sandbox fix first"),
     ("TC-17","Third refund in 30 days is flagged","FR-12","Pass","2026-11-19",""),
     ("TC-18","Flagged refund skips auto-approval even under 50 dollars","FR-12","Pass","2026-11-19","")]
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

# Summary sheet: the numbers a project manager asks for
BRr="'Business Reqs'"
sm["A1"]="Traceability summary"; sm["A1"].font=Font(name=F,size=16,bold=True)
sm["A2"]="Calculated from the three sheets. Nothing to type here."; sm["A2"].font=Font(name=F,size=10,italic=True)
blocks=[(4,"Business requirements by trace status",BRr,"I",["Fully tested","Gaps","Failing","Not traced"]),
        (11,"Functional requirements by coverage",FRr,"J",["Passing","Not run yet","Failing","No tests"]),
        (18,"Test cases by result",TCr,"D",["Pass","Fail","Not run"])]
for top,title,sheet,col,vals in blocks:
    sm.cell(row=top,column=1,value=title).font=Font(name=F,size=12,bold=True,color="1F3A5F")
    for k,(h) in enumerate(["Status","Count","Share"],1):
        c=sm.cell(row=top+1,column=k,value=h); c.font=hdr_font; c.fill=hdr_fill; c.border=border
    for n,v in enumerate(vals):
        r=top+2+n
        a=sm.cell(row=r,column=1,value=v); a.font=base; a.border=border
        b=sm.cell(row=r,column=2,value=f'=COUNTIF({sheet}!${col}$2:${col}${N+1},A{r})'); b.font=base; b.border=border; b.fill=calc_fill
        s=sm.cell(row=r,column=3,value=f'=IFERROR(B{r}/SUM($B${top+2}:$B${top+1+len(vals)}),0)'); s.font=base; s.border=border; s.fill=calc_fill; s.number_format="0%"
sm["E4"]="Read it like this"; sm["E4"].font=Font(name=F,size=12,bold=True,color="1F3A5F")
notes=["Failing rows are a conversation for engineering today.","Gaps and Not run yet rows are unfinished work, not defects.","Not traced means nobody has decided how to deliver that business requirement.","A business requirement is only done when its status is Fully tested."]
for k,t in enumerate(notes,5):
    c=sm.cell(row=k,column=5,value=t); c.font=base
for col,w in zip("ABCDE",[34,10,10,3,70]): sm.column_dimensions[col].width=w
sm.sheet_view.showGridLines=False

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
lines=[("Requirements Traceability Matrix: a filled-in example","title"),
("A free worked example from requirementsfirst.com. A refund portal project in week 2 of user acceptance testing, with every status you will meet on a real project.",None),
("",None),
("What to look at first","h"),
("1. Summary: the counts a project manager asks for, calculated from the three sheets.",None),
("2. Business Reqs, column I (Trace status): one requirement in each state. BR-1 is Fully tested, BR-2 is Failing, BR-3 has Gaps, BR-6 is Not traced.",None),
("3. Functional Reqs, columns C and D: FR-1, FR-3 and FR-5 each serve two business requirements. That is normal; a matrix that forbids it lies.",None),
("4. Test Cases, column F: failed tests carry a defect ID, and tests that cannot run say why.",None),
("",None),
("What this example teaches","h"),
("BR-6 has no functional requirements. It is a Could, and nobody has decided how store staff will refund. The matrix shows it instead of hiding it.",None),
("BR-3 has Gaps because FR-9 (export) is not built and has no tests. Unfinished is not the same as broken.",None),
("BR-2 is Failing because of one boundary test on payout volume. One red test is enough to stop a sign-off.",None),
("",None),
("Using it for your own project","h"),
("Cream columns are inputs; blue-grey columns are formulas. Delete the example rows (cream columns only) and type your own. Each sheet has 100 rows ready.",None),
("Want the blank version with three example rows? Requirements traceability matrix template: https://requirementsfirst.com/posts/requirements-traceability-matrix-template/",None),
("",None),
("Read the walkthrough","h"),
("https://requirementsfirst.com/posts/requirements-traceability-matrix-example/",None)]
guide.column_dimensions["A"].width=120
for i,(t,k) in enumerate(lines,1):
    c=guide.cell(row=i,column=1,value=t); c.alignment=Alignment(wrap_text=True,vertical="top")
    c.font=Font(name=F,size=16,bold=True) if k=="title" else Font(name=F,size=12,bold=True,color="1F3A5F") if k=="h" else Font(name=F,size=10)
guide["A20"].hyperlink="https://requirementsfirst.com/posts/requirements-traceability-matrix-example/"
guide.sheet_view.showGridLines=False
wb.calculation.fullCalcOnLoad = True
import pathlib
OUT = pathlib.Path(__file__).resolve().parents[2] / "public" / "requirements-traceability-matrix-example.xlsx"
wb.save(OUT)
print("wrote", OUT)
