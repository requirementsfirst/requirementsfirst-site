"""Free Word BRD and FRD template with a refund portal example. Built by .github/workflows/build-templates.yml into public/."""
import pathlib

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.text import WD_BREAK
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

F = "Arial"
NAVY = RGBColor(0x1F, 0x3A, 0x5F)
GREY = RGBColor(0x55, 0x5F, 0x6B)
OUT = pathlib.Path(__file__).resolve().parents[2] / "public" / "brd-frd-template.docx"

doc = Document()
sec = doc.sections[0]
sec.orientation = WD_ORIENT.LANDSCAPE
sec.page_width, sec.page_height = Cm(29.7), Cm(21.0)
for side in ("left_margin", "right_margin", "top_margin", "bottom_margin"):
    setattr(sec, side, Cm(2))
USABLE = 25.7


def set_font(style, size, bold=False, color=None):
    style.font.name = F
    style.font.size = Pt(size)
    style.font.bold = bold
    if color is not None:
        style.font.color.rgb = color
    rpr = style.element.get_or_add_rPr()
    fonts = rpr.find(qn("w:rFonts"))
    if fonts is None:
        fonts = OxmlElement("w:rFonts")
        rpr.append(fonts)
    for a in ("w:ascii", "w:hAnsi", "w:eastAsia", "w:cs"):
        fonts.set(qn(a), F)
    for a in ("w:asciiTheme", "w:hAnsiTheme", "w:eastAsiaTheme", "w:cstheme"):
        if fonts.get(qn(a)) is not None:
            del fonts.attrib[qn(a)]


set_font(doc.styles["Normal"], 10)
set_font(doc.styles["Title"], 24, True, NAVY)
set_font(doc.styles["Heading 1"], 16, True, NAVY)
set_font(doc.styles["Heading 2"], 12, True, NAVY)
set_font(doc.styles["List Bullet"], 10)


def shade(cell, hex_fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_fill)
    tc_pr.append(shd)


def para(text, italic=False, color=None):
    p = doc.add_paragraph()
    r = p.add_run(text)
    r.italic = italic
    if color is not None:
        r.font.color.rgb = color
    return p


def hint(text):
    return para(text, italic=True, color=GREY)


def bullets(items):
    for i in items:
        doc.add_paragraph(i, style="List Bullet")


def table(cols, widths, rows, blank_rows=3):
    """Header row navy, example rows cream, blank rows left white for the reader."""
    t = doc.add_table(rows=1, cols=len(cols))
    t.style = "Table Grid"
    t.autofit = False
    scale = USABLE / sum(widths)
    for i, c in enumerate(cols):
        cell = t.rows[0].cells[i]
        cell.text = ""
        run = cell.paragraphs[0].add_run(c)
        run.bold = True
        run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        shade(cell, "1F3A5F")
    tr_pr = t.rows[0]._tr.get_or_add_trPr()
    repeat = OxmlElement("w:tblHeader")
    repeat.set(qn("w:val"), "true")
    tr_pr.append(repeat)
    for row in rows:
        cells = t.add_row().cells
        for i, v in enumerate(row):
            cells[i].text = v
            shade(cells[i], "FFF8DC")
    for _ in range(blank_rows):
        t.add_row()
    for i, w in enumerate(widths):
        t.columns[i].width = Cm(w * scale)
    for row in t.rows:
        for i, w in enumerate(widths):
            row.cells[i].width = Cm(w * scale)
    doc.add_paragraph()
    return t


def page_break():
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)


# How to use
doc.add_paragraph("BRD and FRD Template", style="Title")
hint("From requirementsfirst.com. Free to use and adapt.")
doc.add_heading("How to use this template", 1)
para(
    "This is one document with two levels. Part 1 is the business requirements document (BRD): the outcomes the "
    "organisation wants and who signs them off. Part 2 is the functional requirements document (FRD): what the "
    "system must do to produce those outcomes. Keeping both in one file means every functional requirement can "
    "point at the business requirement it serves."
)
bullets(
    [
        "Cream rows are a worked example: a customer refund portal for an online retailer. Read them, then overwrite or delete them.",
        "White rows are blank and ready for your project. Add rows as needed.",
        "Fill Part 1 and get it signed off before writing Part 2. A functional requirement written before its business requirement is agreed is a guess.",
        "Test for a business requirement: could it be met with no software at all? If not, it belongs in Part 2.",
        "Test for a functional requirement: can a tester prove it passed? If not, rewrite it.",
        "Before you circulate, complete the trace check in section 2.5. Every FR needs a BR, and every BR needs an FR or a stated reason.",
        "If your organisation requires a formal SRS, add the interfaces and design constraints your standard asks for to Part 2.",
    ]
)
page_break()

# Part 1
doc.add_heading("Part 1: Business Requirements Document", 1)
doc.add_heading("1.1 Document control", 2)
table(
    ["Project", "Version", "Author", "Date", "Status"],
    [5, 2, 4, 3, 4],
    [["Customer refund portal", "0.3", "A. Business Analyst", "04-Nov-2026", "In review"]],
    blank_rows=1,
)
doc.add_heading("1.2 Problem and evidence", 2)
hint("State the problem in the business's words, with a number. No solutions in this section.")
table(
    ["Problem", "Evidence", "Cost of doing nothing"],
    [8, 9, 8],
    [
        [
            "Customers wait too long for refunds and contact support to chase them.",
            "Average refund takes 9 days. 41% of support tickets in Q3 were refund status queries.",
            "About 3 support agents' time each quarter, and repeat purchase drops for customers refunded late.",
        ]
    ],
    blank_rows=1,
)
doc.add_heading("1.3 Objectives", 2)
table(
    ["ID", "Objective", "Today", "Target", "Measured by", "Owner"],
    [2, 9, 3, 3, 5, 4],
    [
        ["OBJ-1", "Pay eligible refunds faster", "9 days average", "2 days average by 31-Mar-2027", "Finance refund report, monthly", "Head of Customer Care"],
        ["OBJ-2", "Reduce refund status contacts", "41% of tickets", "15% of tickets by 31-Mar-2027", "Helpdesk ticket tags, monthly", "Support Manager"],
    ],
)
doc.add_heading("1.4 Scope", 2)
table(
    ["In scope", "Out of scope"],
    [12, 12],
    [
        [
            "Refunds for orders placed on the website, to the original payment method.",
            "Marketplace seller refunds. Store purchases. Exchanges. Changes to the returns warehouse process.",
        ]
    ],
    blank_rows=2,
)
doc.add_heading("1.5 Stakeholders", 2)
table(
    ["Role", "Interest", "Decides or is consulted on"],
    [7, 11, 7],
    [
        ["Head of Customer Care", "Owns the refund experience and objectives", "Decides scope and priority"],
        ["Finance Controller", "Accountable for refund accuracy and audit trail", "Decides approval limits"],
        ["Support team lead", "Handles exceptions and customer contacts", "Consulted on exception handling"],
    ],
)
doc.add_heading("1.6 Business requirements", 2)
hint("Outcomes only. No screens, buttons or fields. Each should be satisfiable, in principle, without software.")
table(
    ["BR ID", "Business requirement", "Serves", "Priority", "Signs off"],
    [2, 13, 2.5, 2.5, 5],
    [
        ["BR-01", "Customers can find out where their refund stands without contacting support.", "OBJ-2", "Must", "Head of Customer Care"],
        ["BR-02", "Eligible refunds under the approval limit are paid without manual review.", "OBJ-1", "Must", "Finance Controller"],
        ["BR-03", "Every refund decision can be explained to an auditor after the fact.", "OBJ-1", "Must", "Finance Controller"],
    ],
)
doc.add_heading("1.7 Assumptions and constraints", 2)
table(
    ["ID", "Type", "Statement", "If wrong", "Owner to confirm"],
    [2, 3, 10, 7, 4],
    [
        ["A-1", "Assumption", "The payment gateway can issue refunds through its API for all card types.", "Some refunds stay manual and OBJ-1 may be missed.", "IT Lead"],
        ["C-1", "Constraint", "Refund records must be kept for 8 years.", "Compliance breach.", "Finance Controller"],
    ],
)
doc.add_heading("1.8 Sign-off", 2)
table(
    ["Name", "Role", "Decision", "Date"],
    [8, 8, 5, 4],
    [],
    blank_rows=3,
)
page_break()

# Part 2
doc.add_heading("Part 2: Functional Requirements Document", 1)
doc.add_heading("2.1 Actors", 2)
table(
    ["Actor", "What they do in this system"],
    [7, 18],
    [
        ["Customer", "Requests a refund and tracks its status"],
        ["Refund Approver", "Reviews refunds above the approval limit"],
    ],
)
doc.add_heading("2.2 Functional requirements", 2)
hint("Each row starts with a business requirement. If you cannot fill in Serves BR, stop and ask why this requirement exists.")
table(
    ["FR ID", "Serves BR", "The system must", "Acceptance criteria", "Priority"],
    [2, 2, 9, 10, 2],
    [
        [
            "FR-01",
            "BR-01",
            "Show the customer the current status of each refund on the order page.",
            "Given a refund exists, when the customer opens the order, then status shows one of Requested, Approved, Paid or Rejected, updated within 5 minutes of a change.",
            "Must",
        ],
        [
            "FR-02",
            "BR-01",
            "Email the customer each time a refund's status changes.",
            "Given a status change, then one email is sent within 10 minutes stating the new status and expected payment date.",
            "Should",
        ],
        [
            "FR-03",
            "BR-02",
            "Approve refunds automatically when the amount is at or below the approval limit and the order passes the eligibility rules.",
            "Given an eligible refund of Rs 4,999 and a limit of Rs 5,000, then status becomes Approved with no human action. At Rs 5,001 it goes to the Refund Approver queue.",
            "Must",
        ],
        [
            "FR-04",
            "BR-03",
            "Record who or what made each refund decision, when, and under which rule.",
            "Given any decision, then the audit log shows actor, timestamp, rule ID and amount, and cannot be edited by any role.",
            "Must",
        ],
    ],
)
doc.add_heading("2.3 Non-functional requirements", 2)
hint("How well the system must do it. Each one needs a number or it is a wish.")
table(
    ["NFR ID", "Constrains", "Requirement", "Measure"],
    [2, 3, 12, 8],
    [
        ["NFR-01", "FR-01", "The order page loads quickly on a mobile connection.", "95% of loads under 2 seconds on 4G"],
        ["NFR-02", "FR-04", "Audit records are retained.", "8 years, per constraint C-1"],
    ],
)
doc.add_heading("2.4 Business rules", 2)
table(
    ["Rule ID", "Rule", "Source", "Used by"],
    [2.5, 13, 5, 4.5],
    [
        ["RULE-1", "An order is eligible for refund within 30 days of delivery.", "Returns policy v4", "FR-03"],
        ["RULE-2", "The automatic approval limit is Rs 5,000. Finance can change it without a release.", "Finance Controller", "FR-03"],
    ],
)
doc.add_heading("2.5 Trace check", 2)
hint("Complete before circulating. For a larger project, move this to a traceability matrix.")
table(
    ["BR ID", "Functional requirements", "Gap?"],
    [3, 14, 8],
    [
        ["BR-01", "FR-01, FR-02", "None"],
        ["BR-02", "FR-03", "None"],
        ["BR-03", "FR-04", "None"],
    ],
)
doc.add_heading("2.6 Open questions", 2)
table(
    ["ID", "Question", "Owner", "Needed by", "Answer"],
    [2, 11, 4, 3, 5],
    [["Q-1", "Do partial refunds count towards the approval limit per item or per order?", "Finance Controller", "14-Nov-2026", ""]],
)

doc.core_properties.title = "BRD and FRD Template"
doc.core_properties.author = "RequirementsFirst"
doc.core_properties.comments = "Free template from requirementsfirst.com"
doc.save(OUT)
print(OUT)
