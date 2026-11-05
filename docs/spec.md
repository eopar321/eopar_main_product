# EOPAR — Website Product & Technical Specification v1.1 (text extract)

> Auto-extracted from `docs/spec-source.pdf` (51 pages). Tables lose their layout in extraction; when in doubt, read the PDF.
> The build brief overrides this spec on stack (Payload/Node instead of Django) and on scope/phase order.

```text
EOPAR — Website Product & Technical
Specification v1.1 (Final)
Sep 28, 2026 · ​@Pareek Sahab
1. Brand core and source-of-truth decisions
EOPAR launches as an anonymous, research-led predictive arts brand with four verticals
— Consult, Learning, Research, Publications — built on Next.js, Django and PostgreSQL.
Where the three planning notes disagree, Master Blueprint v1 wins; the table below
records every resolved conflict so design and engineering build one thing.
Brand core
Name: EOPAR
Expansion: Essence of Predictive Arts & Research
Official tagline: Patterns. Possibilities. Direction.
Guiding thought (internal, not a tagline): Explore patterns. Understand possibilities.
Find direction.
Core message: Different predictive systems observe different patterns. EOPAR brings
them together to study possibilities and provide clearer direction.
Positioning: premium, editorial, restrained. Not a catalogue of services, not a "Buy
Now" astrology shop.
Verticals: EOPAR Consult · EOPAR Learning · EOPAR Research · EOPAR Publications
(verticals of one brand, not sub-brands).
Conflict resolution
Topic
Earlier notes said
Final decision
Build implication
Founder identity
About page with
founder portrait and
bio
Anonymous. "Not a
person. A pursuit."
Build a Founder
block anyway, off by
default behind a
CMS flag
EOPAR — Website Product & Technical Specification
Page 1 of 51

Locked brand decisions (v1.1)
Expansion wording: "Essence of Predictive Arts & Research" everywhere — logo
lockup, website, visiting card, invoices, social media. The logo lockup is updated to "&"
during vector reconstruction.
Topic
Earlier notes said
Final decision
Build implication
Main nav
Home, Predictive
Arts, Consultations,
Research, Learning,
About, Insights,
Contact
Predictive Arts ·
Consultations ·
Learning · Research ·
Publications · About
+ gold-outline CTA
Logo links home;
Insights sits under
Publications;
Contact in footer
Blog
"EOPAR Insights" as a
main section
Kept as EOPAR
Insights, grouped
under Publications
Route /insights
stays top-level for
SEO
Arts list
Six pages incl. Lal
Kitab and KP as
siblings
Five arts; KP, Vedic,
Lal Kitab, Prashna are
Astrology sub-
systems
Two-level taxonomy:
Art → System
Cartomancy
Absent in early notes
Included as fifth art
Seeded in CMS, can
be unpublished
CTA label
"Book a Consultation"
"Request a
Consultation"
One label site-wide
Pricing
"Buy Now ₹999"
cards rejected
Fees not public at
launch
Price fields exist in
DB, hidden by flag
Testimonials
Mentioned on
homepage
Only genuine,
permission-based
Section auto-hides
below 3 approved
entries
Homepage "One
Question,
Different Lenses"
Separate section
Merged into
Philosophy section
One section, not
two
Course CTA
View Curriculum /
Join Waitlist
Request Enrollment
when open, Join
Waitlist when not
CTA driven by
course status
EOPAR — Website Product & Technical Specification
Page 2 of 51

Logo: the design is final; no redesign. A professional vector (SVG) reconstruction is
required before any website coding, because the Celestial O drives the site's motion
language.
Legal details: legal entity name, registered address and GSTIN do not block design or
build. They live in the configurable core_sitesettings record as placeholders and
must be filled before invoicing or launch.
Logo master asset pack (Stage 1 deliverable)
Launch scope (MVP) vs Later
The full specification stays the master blueprint; the build happens in controlled phases.
The architecture is unchanged; only the features switched on at launch are reduced.
Asset
Formats
Used for
Full EOPAR wordmark with
expansion and tagline
SVG, PDF, PNG
@1x/2x/4x
Hero, print, documents
Celestial Arc O (separate, arcs
as individual paths)
SVG
Loading, hero animation,
transitions, step indicators
Black version
SVG, PNG
Light backgrounds, print
White / ivory version
SVG, PNG
Dark backgrounds
Champagne-gold version
SVG, PNG
Premium placements
Horizontal lockup
SVG, PNG
Website header, email signature
Icon-only O
SVG, PNG, ICO,
512px app icon
Favicon, social avatars, PWA icon
Area
Launch (MVP)
Later
Home
All sections; Insights and Trust
blocks hidden until they have
content
—
Predictive Arts
Five art pages + Astrology
system pages
More arts via CMS
EOPAR — Website Product & Technical Specification
Page 3 of 51

2. Visual system, typography, imagery and motion
The rule is 70% restraint, 20% typography, 10% celestial detail; gold is rare so it reads as
expensive. The logo supplies the DNA: a black field, a thin champagne-gold circle, a
vertical axis line and the open Celestial Arc O.
Colour tokens
Hex values are starting points sampled from the logo mood; finalise against the vector
master.
Area
Launch (MVP)
Later
Consultations
Full 9-step guided flow, review →
quote, status link, email
notifications
Visible fees, online payment,
booking automation, WhatsApp
Learning
Course pages, enrollment
requests, waitlist
Student accounts, materials,
course payments
Research
Philosophy page + "Research
Library — In Development"
Published entries
Publications
Hub + book pages (forthcoming
allowed)
Research publications
About + Trust/Legal
All pages
Founder block (flag)
Insights (blog)
Model ready, not public
Public journal, RSS
Site search
—
/search
Hindi version
Schema i18n-ready
/hi/ locale
Security & data
protection
Everything in section 11
—
Token
Role
Starting
value
Usage
--eo-navy
Primary
#0B1426
Hero, section backgrounds
--eo-black
Secondary
#07080B
Footer, deep sections, logo field
EOPAR — Website Product & Technical Specification
Page 4 of 51

All text pairs must pass WCAG 2.2 AA contrast (4.5:1 body, 3:1 large text). Gold text on
navy is allowed only at 18px+.
Typography
Display serif: high-contrast editorial serif matching the logo's wordmark (candidates:
Cormorant Garamond, Playfair Display, or licensed Canela). Used for headings and pull
quotes.
Text sans: clean modern sans (candidates: Inter, Manrope, or licensed Söhne). Used for
body, UI, forms.
Small caps / tracked uppercase for eyebrows and labels, echoing "PATTERNS
POSSIBILITIES DIRECTION".
Self-host fonts via next/font ; no layout shift; font-display: swap .
Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 / 88 px, fluid with clamp() .
Imagery
Allowed: celestial geometry, classical manuscripts, architectural details, hands (where
relevant), numbers and patterns, spatial geometry, abstract symbolic imagery.
Not allowed: generic zodiac stock, glowing crystal balls, astrologer poses, glitter.
Large negative space. Images stored in object storage, served through next/image
with AVIF/WebP.
Token
Role
Starting
value
Usage
--eo-gold
Accent
#C9A96E
CTAs, arcs, key rules — under 5%
of any screen
--eo-gold-
soft
Accent glow
#E6CFA0
Hover states, arc highlights
--eo-ivory
Text on dark / reading
background
#F4EDE1
Body text on navy; long-form
reading pages
--eo-stone
Occasional
#E9E2D5 (owner decision 2026-11-05, DECISIONS D-014; was #D9D1C3)
Dividers, captions, cards on ivory
EOPAR — Website Product & Technical Specification
Page 5 of 51

Celestial Arc language
The incomplete arcs of the O become the signature graphic: section transitions, the
loading state, hover underlines, image masks and step indicators in the consultation flow.
Never on every element.
Motion rules
Banned: spinning zodiac wheels, shooting stars, glitter, aggressive parallax. All motion is
disabled under prefers-reduced-motion . Motion should be felt more than noticed.
Component library
Build a small design system in the Next.js app: Button (gold-outline, ghost, text-link with
→), Card (art, course, publication, insight), Eyebrow label, Section shell, Arc divider,
Stepper, Form fields, Label chips for research status, Modal, Toast. Document in
Storybook.
3. Information architecture, navigation and URLs
Launch ships about 25 templates, not hundreds of pages; every section is CMS-driven so
new arts, courses and books need content, not code.
Navigation
Desktop header: Logo (links home) · Predictive Arts · Consultations · Learning ·
Research · Publications · About · REQUEST A CONSULTATION (gold outline, right).
Moment
Behaviour
Duration
Page load (hero)
Celestial O arcs draw in via SVG stroke-
dashoffset
1.6–2.4 s, once per
session
Scroll
Thin celestial lines travel subtly along
section edges
Tied to scroll, low
amplitude
Art cards
Slight depth on hover (translateY −4px, soft
gold border)
200–300 ms
Consultation
steps
Arc segment completes per step
400 ms
EOPAR — Website Product & Technical Specification
Page 6 of 51

Predictive Arts and Publications open a restrained mega-menu (art list with one-line
descriptors; Books / Insights).
Mobile: logo + hamburger; full-screen navy overlay; CTA pinned at the bottom of the
overlay.
Sticky header shrinks after 80px of scroll; transparent over hero, navy after.
Footer: Essence of Predictive Arts & Research · Astrology · Numerology · Palmistry ·
Vastu · Cartomancy · Research · Learning · policy links · Contact · social links ·
newsletter signup.
Route map
Rendering: SSG = static at build, ISR = static with on-demand revalidation from Django
webhooks, SSR = per request, CSR = client-only.
Route
Page
Rendering
Data source
/
Home
ISR
CMS homepage
singleton
/predictive-arts
Arts overview
ISR
Arts list
/predictive-arts/[art]
Art page (e.g.
astrology)
ISR
Art + systems
/predictive-arts/[art]/[system]
System page
(e.g. kp-
astrology)
ISR
System
/consultations
How
consultation
works
ISR
CMS page +
categories
/consultations/request
Guided
request flow
CSR inside
SSR shell
Categories,
questions, tiers,
method rules
/consultations/request/received
Confirmation
SSR (reads
reference)
Request status
/consultations/status/[token]
Client request
status
SSR, no-
index
Request by signed
token
EOPAR — Website Product & Technical Specification
Page 7 of 51

Route
Page
Rendering
Data source
/learning
Learning
overview
ISR
Courses
/learning/[course]
Course page
ISR
Course +
curriculum + FAQ
/learning/[course]/enroll
Enrollment
request /
waitlist
CSR
Course status
/research
Research
philosophy +
library
ISR
Research entries
/research/[slug]
Research
entry
ISR
Research entry
/publications
Publications
hub
ISR
Books + latest
insights
/publications/[book]
Book page
ISR
Book
/insights
EOPAR
Insights index
ISR
Articles, paginated
/insights/category/[cat]
Category
archive
ISR
Articles by
category
/insights/[slug]
Article
ISR
Article
/about
About EOPAR
ISR
CMS page
/about/methodology
Methodology
ISR
CMS page
/about/ethics
Ethical
approach
ISR
CMS page
/about/what-prediction-can-and-
cannot-do
Limits of
predictive
analysis
ISR
CMS page
/contact
Contact form
SSG + CSR
form
Contact API
EOPAR — Website Product & Technical Specification
Page 8 of 51

Launch scope: every route above ships at launch except /insights ,
/insights/category/[cat] , /insights/[slug] , /rss.xml and /search , which are
built in a later phase (see Launch scope in section 1). Until then these URLs return 404
and are excluded from the sitemap.
URL rules
Lowercase, hyphenated, no trailing slash, no IDs in public URLs.
Slug changes create a 301 redirect automatically (Redirect table in Django).
Hindi versions, when added, live under /hi/... with hreflang pairs; the schema is
i18n-ready from day one.
4. Homepage specification
The homepage answers four questions in order — what EOPAR is, what it does, what it
means for me, where I go next — across 11 sections. Every section is a CMS block, so order
and copy can change without a deploy.
Route
Page
Rendering
Data source
/legal/privacy , /legal/terms ,
/legal/disclaimer ,
/legal/refunds , /legal/cookies
Policies
ISR
CMS pages
/search
Site search
SSR
Postgres full-text
/sitemap.xml , /robots.txt ,
/rss.xml
Machine files
Generated
All published
content
/admin
Django admin
/ CMS
Django
Separate
subdomain
admin.eopar.com
EOPAR — Website Product & Technical Specification
Page 9 of 51

#
Section
Headline and copy
CTA
Notes
1
Hero
EOPAR / ESSENCE
OF PREDICTIVE
ARTS & RESEARCH /
Patterns.
Possibilities.
Direction.
Supporting line:
"Exploring patterns
across time,
numbers, space,
symbols and human
form—to understand
possibilities with
greater clarity."
EXPLORE EOPAR ·
REQUEST A
CONSULTATION
Dark navy,
Celestial O arcs
draw in slowly;
min-height 100svh
2
Philosophy
"Different systems
observe different
patterns." Then one
line per art (time and
celestial
relationships;
numbers; the hand;
people and space;
symbolic patterns).
Close: "Different
lenses. One pursuit:
deeper
understanding."
—
Large editorial
serif; lines reveal
on scroll
EOPAR — Website Product & Technical Specification
Page 10 of 51

#
Section
Headline and copy
CTA
Notes
3
The Predictive
Arts
Five cards: Astrology
— Patterns across
time (Vedic, KP, Lal
Kitab, Prashna later) ·
Numerology —
Patterns within
numbers · Palmistry
— Patterns carried
by the hand · Vastu
— Patterns within
space · Cartomancy
— Patterns
expressed through
symbols
EXPLORE THE
PREDICTIVE ARTS →
Card grid adapts
to any count (5, 6,
7)
4
Begin with
your question
"Begin with your
question." Sub: "You
don't need to know
which predictive
system to choose.
Begin with what you
want to understand."
START A
CONSULTATION
Shows 4–6 clarity
categories as
entry chips that
deep-link into
step 2 of the flow
5
How a
consultation
works
Four steps: Your
question → Method
→ Information →
Request received.
Line: "Fees and
details are shared
once your request is
reviewed."
REQUEST A
CONSULTATION
No prices, no "Buy
Now"
6
Learning
"Learn beyond
prediction."
"Understanding a
system is different
from merely
receiving an answer."
EXPLORE LEARNING
Up to 3 course
cards with status
badge (Open /
Waitlist / Coming
soon)
EOPAR — Website Product & Technical Specification
Page 11 of 51

Homepage performance budget
LCP under 2.0 s on 4G mid-range Android; hero text is the LCP element, not an image.
Hero SVG animation under 15 KB; no video.
Total JS on first load under 120 KB gzipped.
#
Section
Headline and copy
CTA
Notes
7
Research
"Research at EOPAR
— Observation
before conclusion."
Short philosophy. If
no entries:
"Research Library —
In Development."
VISIT RESEARCH
Never shows
placeholder
articles
8
Publications &
Insights
"Ideas deserve a
longer life." Featured
book(s) + 3 latest
Insights
EXPLORE
PUBLICATIONS ·
READ INSIGHTS
Book block hides
when no books
are published; the
Insights strip
stays hidden until
Insights launches
9
About EOPAR
"Not a person. A
pursuit." + two lines
on why EOPAR exists
ABOUT EOPAR →
Founder block
available behind
flag
10
Trust
(conditional)
Genuine testimonials
+ links to
Methodology, Ethics,
Privacy
—
Auto-hidden
below 3 approved
testimonials
11
Final CTA
"Patterns are
everywhere.
Understanding them
changes what you
see."
EXPLORE EOPAR → ·
REQUEST A
CONSULTATION →
Arc animation
closes the O
—
Footer
See section 3
Newsletter
—
EOPAR — Website Product & Technical Specification
Page 12 of 51

5. Predictive Arts pages
Five arts at launch, each with optional sub-systems; adding Face Reading, Samudrik
Shastra or Prashna later is a CMS entry, not a redesign. Copy is editorial description, never
sales copy.
Taxonomy at launch
Art
Descriptor
Systems (sub-pages)
Launch description
Astrology
Patterns across
time
Vedic Astrology · KP
Astrology · Lal Kitab ·
Prashna (later)
Vedic: a classical
framework for
understanding planetary
patterns, life cycles and
timing. KP: a precision-
oriented system focused
on event-specific analysis
and timing. Lal Kitab: a
distinctive tradition
combining planetary
interpretation with its own
diagnostic framework.
Numerology
Patterns within
numbers
—
The study of numerical
patterns associated with
identity, cycles and
decisions.
Palmistry
Patterns carried by
the hand
—
An interpretive study of
the structure, markings
and patterns of the hand.
Vastu
Patterns within
space
—
The study of spatial
orientation, structure and
environmental
relationships.
Cartomancy
Patterns expressed
through symbols
—
Interpretation of symbolic
patterns through cards.
EOPAR — Website Product & Technical Specification
Page 13 of 51

Art page template
1. Hero: art name, descriptor, one-paragraph editorial intro, relevant abstract image.
2. What this system observes.
3. Principles and classical roots (with sources where cited).
4. Systems within this art (cards → system pages), if any.
5. Questions this art is often used for (links into the consultation flow with the art pre-
selected as a preference).
6. What this art can and cannot establish (short, honest limits box).
7. Information typically required (auto-pulled from the same rules the consultation flow
uses).
8. Related Insights and Research entries (by tag).
9. CTA: REQUEST A CONSULTATION · explore related course (if exists).
System page template
Same skeleton, narrower: origins, method in brief, how it differs from sibling systems,
typical use cases, related course and insights.
Rules
An art or system can be Draft, Published or Hidden-from-nav (reachable by URL, e.g.
for soft launch).
Sort order is manual in CMS.
Each art owns its information-required rules; the art page and the consultation flow
read the same record so they never disagree.
6. Consultation journey
The consultation flow is the most important functional feature: a nine-step guided
request that lets a visitor start from a life question, never from a system name, and ends in
a reviewed request — not an instant purchase. Fees are quoted after review at launch;
online payment plugs in at the "Fee quoted" state in phase 2.
EOPAR — Website Product & Technical Specification
Page 14 of 51

Steps
Step
Screen title
What the user does
Key rules
0
Entry
Arrives from any CTA, a
homepage category chip,
or an art page
Query params pre-fill: ?
category=marriage , ?
method=palmistry
1
What would you like
clarity about?
Picks one category card
Categories from CMS: Marriage
& Relationships · Career &
Profession · Business & Finance ·
Education · Property & Home ·
Family & Children · Timing &
Important Decisions · Personal
Direction · Birth Time
Rectification · Other / Specific
Question
2
What would you like
to understand?
Picks one or more
predefined questions, or
writes their own
Questions belong to a category;
"I have my own question" opens
a textarea (20–1,500 chars);
some questions flag
requires_second_person (e.g.
compatibility)
3
How broad is your
question?
Chooses Focused
Question · Related
Questions ·
Comprehensive Analysis
Auto-suggested from how many
questions were picked (1 →
Focused, 2–4 → Related, 5+ or
multiple categories →
Comprehensive); user can
override; no price shown
4
How should your
question be
analysed?
Keeps EOPAR
Recommended (default,
highlighted) or picks a
preferred art/system
Preferred list shows only arts
marked consultable ; picking
Astrology may show an optional
system choice (Vedic / KP / Lal
Kitab) with "No preference"
default
5
Information
required
Fills the fields the chosen
method needs
Fields generated from method
rules (table below); EOPAR
Recommended asks for the
category's suggested set
EOPAR — Website Product & Technical Specification
Page 15 of 51

Information required by method
Step
Screen title
What the user does
Key rules
6
How would you
prefer your
consultation?
Online or In person
In-person address revealed only
after confirmation; online
medium configured later (Zoom
/ Meet / WhatsApp call)
7
Your details
Name, email,
phone/WhatsApp,
country, preferred
language, 1–3 preferred
date/time windows,
consent
Times captured in the user's
timezone, stored in UTC
8
Review your
request
Sees a summary, edits
any step inline
Nothing is saved as a request
until Submit
9
Your request has
been received.
Gets reference EOP-
2026-000123 , next-step
text, status link
Confirmation email + admin
alert (WhatsApp added in Phase
2)
Method
Required
Optional / conditional
Astrology (any
system)
Date of birth, time of birth,
place of birth (autocomplete →
lat, long, IANA timezone)
"I don't know my exact birth
time" → approximate window +
3–5 dated life events (feeds
Birth Time Rectification)
Numerology
Date of birth, full name as used
Name at birth if different,
business/brand name
Palmistry
Left palm image, right palm
image
Close-ups of specific
lines/mounts, side view of hand;
dominant hand
Vastu
Property type, facing direction,
city
Floor plan (image/PDF),
photographs, construction
status
Cartomancy
Question + relevant context
—
EOPAR — Website Product & Technical Specification
Page 16 of 51

Validation and edge cases
Dates: DOB cannot be in the future or before 1900; time of birth optional only when
"unknown" is ticked.
Place & timezone: resolve historical offsets with the IANA tz database (e.g. pre-1955
Indian local times); store raw input + resolved coordinates + offset.
Minors: if the subject is under 18, require a guardian name and guardian consent
checkbox.
Uploads: JPG, PNG, HEIC, WEBP, PDF; images up to 10 MB each, plans up to 20 MB; min
1,000 px on the short side for palms; EXIF/GPS stripped; virus-scanned; stored
privately with signed URLs.
Phone: validated to E.164 with libphonenumber; country pre-filled from IP but editable.
Drafts: progress autosaves every step (browser storage + server draft token) so
refresh, back button or a dropped connection loses nothing; drafts expire after 30
days.
Duplicates: same email + same questions within 24 h prompts "You already have a
request in review" with the status link.
Abuse: Cloudflare Turnstile on submit, 5 submits per IP per hour, honeypot field,
server-side validation mirrors client validation exactly.
Accessibility: every step keyboard-operable, errors announced via aria-live , focus
moves to the step heading on change.
Deep links: invalid category or method params are ignored silently, never a 500.
Config changes mid-flow: if a category or question is unpublished while a draft is
open, the draft keeps its snapshot and the admin sees the original wording.
Question bank (Stage 3 content, v1)
This is the launch seed for consult_category and consult_question : 10 categories and
38 predefined questions, each ending with "I have my own question." EOPAR reviews and
edits the wording in the CMS before launch; nothing here is hard-coded.
Method
Required
Optional / conditional
Second person
(when flagged)
Name, DOB, time, place of the
second person
Relationship to requester
EOPAR — Website Product & Technical Specification
Page 17 of 51

Category
Predefined questions
Suggested methods (used by
EOPAR Recommended)
Marriage &
Relationships
When are the stronger periods
for marriage? · What factors
may be contributing to delay in
marriage? · What patterns are
indicated regarding married
life? · What does the analysis
indicate regarding
compatibility? (second person) ·
Is the present period
supportive for an important
relationship decision?
Astrology (Vedic, KP),
Numerology
Career & Profession
Which fields or roles align with
my indicated strengths? · When
are the stronger periods for a
job change or promotion? · Is
the present period supportive
for changing careers? · What
may be contributing to
obstacles or stagnation in my
career? · Is work abroad
indicated, and in which periods?
Astrology, Numerology,
Palmistry
Business & Finance
Is the present period
supportive for starting a
business? · Which business
areas align with my indicated
patterns? · What does the
analysis indicate about a
business partnership? (second
person) · When are the stronger
periods for financial growth? · Is
my business or brand name
numerically aligned?
Astrology, Numerology, Vastu
(for premises)
EOPAR — Website Product & Technical Specification
Page 18 of 51

Category
Predefined questions
Suggested methods (used by
EOPAR Recommended)
Education
Which stream or field of study
aligns with the indicated
aptitudes? · What does the
analysis indicate about
competitive examinations? · Is
higher education or study
abroad indicated, and when? ·
What may be affecting
concentration or continuity in
studies?
Astrology, Numerology
Property & Home
When is a supportive period to
buy or sell property? · Is the
present period supportive for
construction or renovation? ·
What does a Vastu analysis
indicate for my home? · What
does a Vastu analysis indicate
for my office or shop? · What
patterns are indicated
regarding property disputes?
Vastu, Astrology
Family & Children
What patterns are indicated
regarding children? · What does
the analysis indicate about my
child's aptitudes? (second
person) · What patterns are
indicated regarding family
harmony? · What does the
analysis indicate about relations
with a specific family member?
(second person)
Astrology, Numerology
EOPAR — Website Product & Technical Specification
Page 19 of 51

Guardrails for questions: no predefined question offers medical diagnosis, lifespan or
death timing, legal case outcomes, or specific investment or stock tips. An own-question
that touches these is accepted but flagged for manual review, and the reply explains what
predictive analysis can and cannot address.
Tier auto-suggestion: 1 question → Focused; 2–4 questions in one category → Related; 5+
questions, several categories, or Birth Time Rectification combined with another question
→ Comprehensive.
Category
Predefined questions
Suggested methods (used by
EOPAR Recommended)
Timing & Important
Decisions
Is the present period
supportive for a specific
decision? · What are the
stronger periods in the coming
12 months? · When is a
supportive time to begin a
venture, move or travel? ·
Between two options, which
appears more supported?
Astrology (KP, Prashna later),
Cartomancy
Personal Direction
What broad patterns are
indicated in my life at present? ·
What strengths and challenges
does the analysis indicate? ·
What does the current period
indicate for personal growth? ·
What patterns may be involved
when I feel stuck?
Astrology, Numerology,
Palmistry
Birth Time
Rectification
I don't know my exact birth time
— can it be estimated? · My
recorded birth time may be
inaccurate — can it be verified?
Astrology (always); requires an
approximate time window + 5–10
dated life events
Other / Specific
Question
Own question only
EOPAR decides after review
EOPAR — Website Product & Technical Specification
Page 20 of 51

Request lifecycle
Clients can check status any time through a signed, expiring link
( /consultations/status/[token] ), without creating an account.
7. Learning, Research, Publications, Insights, About and Trust
These four content verticals plus the trust layer are what make EOPAR more than a
consultation shop; each is a CMS-driven model with honest empty states, so nothing fake
ever ships.
EOPAR Learning
Overview page: "Learn beyond prediction." / "Learn the Art. Understand the Method."
Course grid filtered by art and level.
Planned catalogue: Vedic Astrology Level I Foundations, Level II Interpretation, Level III
Advanced Prediction; later KP Astrology, Numerology, Palmistry, Vastu, specialised
workshops.
Course page fields: name, who it is for, what you will learn, curriculum (modules →
lessons), level, format (live online), duration, prerequisites, language, schedule / next
batch, certification (only if applicable), FAQ, related insights.
Course status drives the CTA: Coming soon → JOIN WAITLIST · Open → REQUEST
ENROLLMENT · Full → JOIN WAITLIST for next batch · Archived → hidden from lists.
consultation request lifecycle · 6 main states, 4 side states
EOPAR — Website Product & Technical Specification
Page 21 of 51

Enrollment request: name, email, phone, country, batch, background in the subject,
consent. Classes are hosted externally (Zoom/Meet); the site does not host video at
launch.
Future: a student area with login, batch materials and payments is phase 3; the data
model reserves Student , Batch , Enrollment .
EOPAR Research
Page opening: "Research at EOPAR — Observation before conclusion." Short
philosophy, then the principle Observation ≠ evidence ≠ conclusion.
Empty state at launch: "Research Library — In Development." No fake articles.
Categories: Classical Studies · Comparative Predictive Systems · Case Studies · Pattern
Research · Methodological Studies · Research Notes · Prediction & Timing Methods ·
Astrology & Market Cycles · Traditional Knowledge Verification.
Mandatory status label on every entry (enforced in the model, cannot publish without
one): Research Note · Case Study · Classical Source Analysis · Working Hypothesis ·
Observed Pattern · Published Study (only for peer-reviewed or formally published
work).
Entry fields: title, status label, abstract, body, method, sources/citations (structured),
limitations (required), date, version history, related arts.
Language standard: stricter than the rest of the site; the editor shows a checklist (no
"proves", no accuracy percentages, sample size stated, case consent recorded).
EOPAR Publications
Hub: "Ideas deserve a longer life." Groups: Predictive Arts books · Indian Knowledge &
Philosophy (e.g. The Eternal Gita, The Living Vedas) · Research Publications (later).
Book page: cover, synopsis, why this book exists, contents / sample chapter (PDF
preview), formats (print, ebook), ISBN and publication info, where to obtain (external
retailer links), status (Forthcoming / Available).
Forthcoming books can collect "Notify me" emails.
EOPAR Insights (editorial journal) — later phase
Categories: Research · Astrology · Numerology · Palmistry · Vastu · Classical Texts · Fact
Check · Case Notes.
Series support: e.g. a fact-check series such as "Is the Lakshman Rekha in the Valmiki
Ramayana?" grouped with a series index and next/previous links.
EOPAR — Website Product & Technical Specification
Page 22 of 51

Article fields: title, dek, author label ("EOPAR Editorial"), category, tags, series, hero
image, body (rich blocks: text, pull quote, citation, verse with transliteration, image,
table), sources, reading time (auto), published and updated dates, SEO fields.
Features: category archives, tag pages, RSS, related articles, share links, newsletter
capture at the end of each article.
About EOPAR
Opening: "Not a person. A pursuit." Then: "EOPAR was created as a space for the study,
practice and exploration of predictive arts and related knowledge traditions."
Sections: Why EOPAR Exists · What We Explore · How We Approach Knowledge (study
the system → understand its principles → observe patterns → compare where
appropriate → apply responsibly) · Why Research Matters · Our Principles · Where
EOPAR Is Going.
Founder block (disabled by default): editorial portrait, qualifications, systems studied,
teaching and research interests — factual only.
Trust layer
Pages: Methodology · Ethical Approach · Privacy Policy · Consultation Process · What
Predictive Analysis Can and Cannot Establish · Terms · Disclaimer · Refund &
Cancellation · Cookie Policy.
Testimonials: stored with written permission record, display name choice (full / initials
/ anonymous), date, service type; admin approval required; never edited beyond typo
fixes.
Banned claims (enforced by an editor lint list in the CMS): "99% accurate", "India's #1",
"25,000 lives changed", "guaranteed", any unsubstantiated counters.
Technical trust: HTTPS everywhere, visible privacy notice at every form, clear data-
deletion request route, professional domain email.
8. Tech stack and system architecture
Next.js renders every page; Django is the single owner of data, business rules and the
admin CMS; PostgreSQL is the only system of record. Anything slow (email, WhatsApp,
file scanning, image processing) runs in Celery so no user ever waits on it.
EOPAR — Website Product & Technical Specification
Page 23 of 51

The browser talks to Next.js for pages and to the Django API (via api.eopar.com ) for
form submissions; Django pings Next.js to revalidate cached pages the moment an editor
publishes.
Stack
system architecture · frontend, API, data, workers, integrations
Layer
Choice
Why
Frontend
framework
Next.js (App Router), React,
TypeScript strict
SSR/ISR for SEO, server
components cut JS
EOPAR — Website Product & Technical Specification
Page 24 of 51

Layer
Choice
Why
Styling
Tailwind CSS with EOPAR design
tokens, CSS variables
Fast, consistent, themeable
Motion
Framer Motion (UI) + hand-written
SVG stroke animation (Celestial O)
Small, respects reduced
motion
Forms
React Hook Form + Zod (schemas
generated from the API's OpenAPI
spec)
Client and server validation
match
Data fetching
Server-side fetch with tags for ISR;
TanStack Query on client steps
Cache control per page
Backend
Python, Django, Django REST
Framework, drf-spectacular
(OpenAPI)
Mature admin, ORM, security
defaults
CMS
Django admin + Wagtail-style rich
blocks (Wagtail 6 recommended for
editorial pages) or django-unfold for a
premium admin UI
Editors publish without
developers
Database
PostgreSQL (+ pg_trgm , full-text
search, JSONB)
One store for content,
requests, search
Cache / queue
Redis; Celery workers + Celery Beat
for schedules
Async jobs, reminders, expiry
File storage
Cloudflare R2 or AWS S3 via django-
storages; private bucket for client
uploads
Signed URLs, cheap egress
Auth
Django sessions + 2FA (django-otp)
for staff; no public accounts at launch;
signed tokens for client status links
Minimal attack surface
Email
Postmark or Amazon SES, templated
(MJML)
Deliverability
WhatsApp
Meta WhatsApp Business Cloud API
(or BSP like Interakt/Gupshup) —
Phase 2
Opt-in notifications in India
EOPAR — Website Product & Technical Specification
Page 25 of 51

Version policy: the architecture is locked, not version numbers. At build time every
component uses its current stable release (LTS where one exists), pinned in lockfiles and
upgraded on a quarterly schedule.
Layer
Choice
Why
Payments
(phase 2)
Razorpay (INR, UPI, cards,
international) with webhooks
Standard for Indian businesses
Places /
timezone
GeoNames or Google Places
autocomplete + IANA tz database
( zoneinfo )
Accurate birth-place data
Anti-spam
Cloudflare Turnstile + DRF throttling
No annoying CAPTCHAs
Monitoring
Sentry (both apps), uptime monitor,
structured JSON logs
Fast incident detection
Analytics
Plausible or GA4 with consent mode
Privacy-first metrics
Hosting
Next.js on Vercel (or Node container);
Django + Celery on a container host
(AWS ECS/Lightsail, Render, or
DigitalOcean App Platform); managed
Postgres with daily backups + PITR
Managed, scalable, simple
Infra as code
Docker, docker-compose for local;
Terraform for cloud
Reproducible environments
CI/CD
GitHub Actions
Tests + deploy on merge
EOPAR — Website Product & Technical Specification
Page 26 of 51

Repository layout (monorepo)
eopar/
  apps/web/           # Next.js
    app/(marketing)/  # public pages
    app/consultations/request/  # guided flow
    components/  lib/api/  styles/tokens.css
  apps/api/           # Django project
    eopar/settings/{base,dev,staging,prod}.py
    core/        # shared models: SEO, media, redirects, audit
    arts/        # arts, systems, method rules
    consult/     # categories, questions, tiers, requests, state machine
    learning/    # courses, batches, enrollments, waitlist
    research/    # research entries, citations
    publications/ # books, insights, series, categories
    pages/       # about, trust, legal pages, homepage blocks
    notify/      # email, WhatsApp, templates
    payments/    # phase 2
  packages/api-types/ # generated TS types from OpenAPI
  infra/  .github/workflows/
Architectural principles
One source of truth: method rules, categories and questions live in Django; the Next.js
flow renders whatever the API returns.
API contract first: OpenAPI schema is versioned ( /api/v1/ ); TS types are generated,
never hand-written.
Idempotent writes: every submit carries an Idempotency-Key ; double-clicks and
retries never create duplicates.
Snapshots: a submitted request stores the exact question wording, method rules and
fields it was submitted with.
Graceful degradation: if the API is down, content pages still serve from ISR cache; the
flow shows a retry state and keeps the draft.
Feature flags: founder block, testimonials, pricing display, payments, Hindi locale —
toggled in admin, no redeploy.
EOPAR — Website Product & Technical Specification
Page 27 of 51

9. Data model (PostgreSQL)
About 35 tables across 8 Django apps; every table has id (UUID v7), created_at ,
updated_at , and content tables add status , published_at , slug , sort_order and
SEO fields through a shared abstract model. Personal data is isolated in the consult and
learning apps so it can be encrypted, retained and deleted on its own schedule.
Shared (core)
Predictive arts
Table
Key fields
Constraints / notes
core_seo (abstract
mixin)
meta_title (≤60),
meta_description (≤160),
og_image, canonical_url,
noindex
Inherited by every public
model
core_media
file, alt_text (required),
caption, credit, width, height,
focal_point
Alt text required before
publish
core_redirect
old_path (unique), new_path,
status_code (301/302), hits
Auto-created on slug change
core_featureflag
key (unique), enabled,
description
founder_block, testimonials,
show_fees, payments,
locale_hi
core_auditlog
actor (FK user, nullable),
action, object_type, object_id,
diff (JSONB), ip, at
Append-only, never updated
core_sitesettings
(singleton)
contact email, phone, address,
social links, footer text
One row enforced
Table
Key fields
Constraints / notes
arts_art
name, slug (unique), descriptor,
intro, body (blocks), limits_text,
consultable (bool), show_in_nav
5 seeded rows
EOPAR — Website Product & Technical Specification
Page 28 of 51

Consultations
Table
Key fields
Constraints / notes
arts_system
art (FK), name, slug, descriptor,
body, consultable
Unique (art, slug)
arts_fieldrule
art (FK), system (FK nullable),
field_key, label, field_type,
required, help_text, validation
(JSONB), order
Drives step 5 dynamically;
field_type ∈ date, time, place,
text, textarea, image, file, select,
boolean
Table
Key fields
Constraints / notes
consult_category
name, slug, icon, description,
suggested_arts (M2M art), order,
active
10 seeded
consult_question
category (FK), text,
requires_second_person,
suggested_arts (M2M), order,
active
Editable; old wording
preserved via request
snapshot
consult_tier
key
(focused/related/comprehensive),
name, summary, description,
fee_inr, fee_usd, duration_minutes,
show_fee
Fees hidden unless
flag + show_fee
EOPAR — Website Product & Technical Specification
Page 29 of 51

Table
Key fields
Constraints / notes
consult_request
reference (unique, EOP-YYYY-
NNNNNN ), status, category (FK), tier
(FK), method_mode
(recommended/preferred),
preferred_art (FK null),
preferred_system (FK null),
consultation_mode
(online/in_person),
preferred_language,
own_question, snapshot (JSONB),
source (utm JSONB),
idempotency_key (unique),
assigned_to (FK user), quoted_fee,
currency, submitted_at
Status transitions
only through the
service layer; partial
index on open
statuses
consult_request_question
request (FK), question (FK null),
text_snapshot
Many per request
consult_client
name, email (citext), phone_e164,
whatsapp_opt_in, country (ISO-2),
timezone, marketing_opt_in
Encrypted at rest for
phone; one client
many requests
consult_subject
request (FK), role
(primary/second), name, dob,
birth_time (null),
birth_time_unknown,
birth_time_window, place_label,
lat, lng, tz_name,
utc_offset_minutes, is_minor,
guardian_name, guardian_consent
Check: birth_time or
birth_time_unknown
consult_lifeevent
subject (FK), date, description
For birth time
rectification
consult_fieldvalue
request (FK), field_key, value
(JSONB)
Stores dynamic step-
5 answers
consult_upload
request (FK), field_key, file
(private), mime, size, sha256,
scan_status
(pending/clean/infected), width,
height
Infected files
quarantined, never
served
EOPAR — Website Product & Technical Specification
Page 30 of 51

Learning
Table
Key fields
Constraints / notes
consult_slot
request (FK), start_utc, end_utc,
client_tz
1–3 preferred
windows
consult_appointment
request (1:1), start_utc, end_utc,
mode, meeting_link / venue,
reminder_sent_at
Created on
Scheduled
consult_statusevent
request (FK), from_status,
to_status, actor, reason, at
Full timeline
consult_note
request (FK), author, body, internal
(bool)
Internal notes never
exposed via API
consult_consent
request (FK), terms_version,
privacy_version, ip, user_agent, at
Proof of consent
consult_draft
token (unique), data (JSONB),
expires_at
Server autosave;
purged after 30 days
Table
Key fields
Constraints /
notes
learning_course
art (FK), title, slug, level
(I/II/III/workshop), audience,
outcomes, prerequisites, format,
duration_text, language,
certification_text, status
(coming_soon/open/full/archived)
CTA derived
from status
learning_module /
learning_lesson
course (FK) / module (FK), title,
summary, order
Curriculum tree
learning_batch
course (FK), start_date,
schedule_text, seats, seats_taken,
enrollment_closes_at
seats_taken ≤
seats (check)
learning_enrollmentrequest
course, batch (null), name, email,
phone, country, background, status
(new/contacted/confirmed/declined)
Unique (email,
batch)
EOPAR — Website Product & Technical Specification
Page 31 of 51

Research, publications, insights, pages
Table
Key fields
Constraints /
notes
learning_waitlist
course, email, name, notified_at
Unique (course,
email)
common_faq
owner (generic FK), question, answer,
order
Used by
courses,
consultations,
books
Table
Key fields
Constraints / notes
research_entry
title, slug, label (enum, required),
category (FK), abstract, body,
method, limitations (required),
version, arts (M2M)
Cannot publish
without label +
limitations
research_citation
owner (generic FK), source_type
(classical/book/article/web), title,
author, edition, verse_ref, url,
accessed_on
Shared by research
and insights
pub_book
title, slug, subtitle, group, cover,
synopsis, why_text, contents,
sample_pdf, formats (JSONB),
isbn, publisher, pub_date, status
(forthcoming/available), buy_links
(JSONB)
—
pub_book_notify
book (FK), email
Unique (book,
email)
insight_category /
insight_tag /
insight_series
name, slug, description
8 categories
seeded
EOPAR — Website Product & Technical Specification
Page 32 of 51

Staff and roles
Table
Key fields
Constraints / notes
insight_article
title, slug, dek, category (FK), tags
(M2M), series (FK null),
series_order, hero (FK media),
body (blocks), reading_minutes,
author_label, search_vector
(tsvector, GIN index)
Trigram index on
title
pages_page
key (about, methodology, ethics,
privacy, terms, disclaimer, refunds,
cookies, limits), title, body, version
Legal pages keep
versions
pages_homeblock
block_type, content (JSONB),
order, enabled
Homepage built
from blocks
pages_testimonial
quote, display_name, name_mode,
service_type, permission_file,
permission_date, approved,
approved_by
Shown only when
approved
marketing_subscriber
email (unique), source,
confirmed_at (double opt-in),
unsubscribed_at
—
contact_message
name, email, subject, body, status
Rate-limited
Role
Can
Super admin
Everything, flags, users, settings
Consultation manager
View/edit requests, change status, quote fees, see
uploads
Editor
Create/publish arts, insights, research, books,
pages
Contributor
Draft content, cannot publish
Viewer
Read-only dashboards, no personal data
EOPAR — Website Product & Technical Specification
Page 33 of 51

Permissions use Django groups with object-level checks; personal-data fields are masked
for roles that do not need them.
Retention
Completed requests: personal data kept 3 years (configurable), then anonymised by a
Celery Beat job; uploads deleted after 1 year unless the client asks to keep them.
Drafts: 30 days. Audit log: 5 years. Declined/expired requests: 1 year.
10. API design (Django REST Framework)
A versioned REST API at https://api.eopar.com/api/v1/ serves public content read-
only and accepts a small set of throttled, idempotent writes; the admin never goes
through the public API. Schema is published as OpenAPI 3.1 at /api/v1/schema/ .
Public read endpoints (cacheable, Cache-Control: s-maxage=300, stale-
while-revalidate )
Method
Path
Returns
GET
/home/
Ordered enabled homepage
blocks
GET
/arts/ · /arts/{slug}/ ·
/arts/{art}/systems/{slug}/
Arts, art detail, system detail
GET
/consult/config/
Categories, questions, tiers (fees
only if flag), consultable
arts/systems — one payload for
the whole flow
GET
/consult/field-rules/?
mode=recommended&category=marriage or ?
art=astrology&system=kp
Field definitions for step 5
GET
/courses/ · /courses/{slug}/
Courses with status, curriculum,
batches, FAQ
GET
/research/ · /research/{slug}/
Entries with label, citations
GET
/books/ · /books/{slug}/
Books
EOPAR — Website Product & Technical Specification
Page 34 of 51

Write endpoints (throttled, Turnstile-verified, Idempotency-Key header required)
Method
Path
Returns
GET
/insights/?
category=&tag=&series=&page= ·
/insights/{slug}/
Paginated articles (cursor
pagination, 12 per page)
GET
/pages/{key}/
About, trust, legal pages
GET
/search/?q=
Mixed results from articles,
research, arts, courses (Postgres
FTS + trigram)
GET
/places/?q=
Proxied place autocomplete with
lat/lng/timezone (keeps provider
key server-side)
Method
Path
Body
Success
Errors
POST
/consult/drafts/
partial flow
state
201 {token}
400, 429
PATCH
/consult/drafts/{token}/
partial flow
state
200
404 expired,
400
POST
/consult/uploads/presign/
field_key,
mime, size,
draft token
200 presigned
PUT URL (5
min)
400 type/size,
429
POST
/consult/uploads/{id}/complete/
sha256
202 scan
queued
400 mismatch
POST
/consult/requests/
full request
201
{reference,
status_url}
400 field
errors, 409
duplicate, 422
upload not
clean, 429
GET
/consult/status/{signed_token}/
—
200 status +
timeline (no
internal notes)
403
bad/expired
token
POST
/consult/status/{signed_token}/reply/
message,
files
201 (moves
Needs info →
Under review)
409 wrong
state
EOPAR — Website Product & Technical Specification
Page 35 of 51

Conventions
Errors: RFC 9457 problem+json: {type, title, status, detail, errors: {field:
[codes]}} ; field error codes are stable strings the frontend maps to copy.
Throttles: anon 60 req/min reads; 5 request-submits/hour/IP; 20 draft saves/min/token;
10 uploads/draft.
CORS: only eopar.com and preview domains; credentials off for public API.
Idempotency: key stored 24 h with the response; same key + same body returns the
stored response, same key + different body returns 422.
Revalidation: on publish/unpublish Django calls Next.js POST /api/revalidate with a
shared secret and cache tags ( art:astrology , insight:list ).
Versioning: breaking changes go to /api/v2/ ; v1 supported 6 months after v2.
11. Admin, notifications, security, privacy, SEO, performance,
accessibility
The admin is where EOPAR is actually run day to day, so it gets the same care as the public
site; security and privacy follow India's DPDP Act 2023 and GDPR-style practice because
international clients are expected.
Method
Path
Body
Success
Errors
POST
/courses/{slug}/enroll/
contact +
batch
201
400, 409
already
enrolled, 410
closed
POST
/courses/{slug}/waitlist/
email
201 / 200
already on list
400
POST
/books/{slug}/notify/
email
201 / 200
400
POST
/newsletter/
email
202 (double
opt-in mail)
400
POST
/contact/
name,
email,
subject,
body
201
400, 429
POST
/webhooks/razorpay/ (phase 2)
signed
payload
200
400 bad
signature
EOPAR — Website Product & Technical Specification
Page 36 of 51

Admin / CMS features
Consultation inbox: list with filters (status, category, tier, method, assigned to, date),
SLA badge (hours since submit), search by reference/email/phone, bulk assign, CSV
export (role-restricted).
Request detail: timeline of status events, client + subject data, dynamic answers,
uploads viewer (signed URLs, watermark "EOPAR internal"), internal notes, status
actions with required reason, quote fee, send templated email/WhatsApp, schedule
appointment.
Content: arts, systems, field rules (with live preview of step 5), categories, questions,
tiers, courses, batches, research, books, insights, pages, homepage blocks — each with
Draft / Preview / Publish / Schedule publish and version history.
Preview: Next.js draft mode via signed preview URL so editors see unpublished pages
in the real design.
Dashboard: new requests this week, open by status, median time to first response,
enrollments, waitlist sizes, newsletter growth.
Settings: feature flags, site settings, email/WhatsApp templates, redirects.
Notifications
Trigger
Client
Team
Request submitted
Email: received + reference + status link
(WhatsApp from Phase 2)
Email alert
Needs info
Email with what is missing + reply link
—
Fee quoted
Email with fee, what is included, payment
instructions (phase 2: pay link)
—
Scheduled
Email + calendar invite (.ics) with time in
client's timezone
Calendar
invite
Reminder
24 h and 1 h before (Celery Beat)
1 h before
Completed
Thank-you + optional feedback / testimonial
permission request
—
Expired / Declined /
Cancelled
Polite notice
Log only
EOPAR — Website Product & Technical Specification
Page 37 of 51

All sends are async with 5 retries (exponential backoff); failures surface in admin.
Templates are bilingual-ready.
Security
HTTPS only, HSTS preload, TLS 1.2+; strict CSP, X-Frame-Options: DENY , Referrer-
Policy: strict-origin-when-cross-origin .
Django defaults: CSRF, parameterised ORM queries, password hashing (Argon2),
SECURE_* settings on.
Admin on separate subdomain, behind Cloudflare Access or IP allow-list, mandatory
2FA, session timeout 30 min idle, login throttling (django-axes).
Uploads: presigned direct-to-bucket, MIME sniffed server-side, ClamAV scan in
Celery, EXIF stripped, private bucket, signed URLs expire in 10 min.
Secrets in the host's secret manager; never in repo; rotated yearly.
Dependency scanning (Dependabot, pip-audit, npm audit) and weekly OWASP ZAP
baseline scan on staging.
Field-level encryption for phone numbers and birth details (django-cryptography /
pgcrypto).
Daily encrypted Postgres backups, 30-day retention, point-in-time recovery; restore
drill quarterly.
Privacy and compliance
Consent checkbox (unticked by default) linking current privacy and terms versions;
consent record stored.
Separate opt-ins for WhatsApp and marketing email.
Data subject requests: access, correction, deletion via a form; admin tool anonymises
within 30 days.
Cookie banner only if non-essential cookies are used; analytics in consent mode.
Disclaimer on every consultation page: predictive analysis is interpretive guidance, not
medical, legal or financial advice.
Trigger
Client
Team
Enrollment / waitlist /
notify-me
Confirmation; waitlist email when course
opens
Daily digest
EOPAR — Website Product & Technical Specification
Page 38 of 51

SEO
Server-rendered HTML for all public pages; unique title/description per page; canonical
URLs.
Structured data: Organization, WebSite + SearchAction, Article (insights), Course,
Book, FAQPage, BreadcrumbList.
Auto sitemap.xml (split by type), robots.txt , RSS for Insights; 301s for changed
slugs; 404 page with search.
Open Graph images generated per page with next/og in the EOPAR style.
Status pages, drafts and previews are noindex .
Performance targets
Accessibility
WCAG 2.2 AA; semantic HTML; skip link; visible gold focus ring; all images with
meaningful alt; forms with labels, descriptions and error summaries.
Keyboard and screen-reader tested (NVDA, VoiceOver); motion off under reduced-
motion; text resizes to 200% without loss.
12. Test strategy and test case catalogue
No merge to main without green unit, integration and end-to-end suites; backend
coverage target 90% on consult and 80% overall, and the consultation flow has an end-
to-end test for every branch. The 99 cases below are the full acceptance set; 98 gate the
Metric
Target (p75, mobile)
Largest Contentful Paint
< 2.0 s
Interaction to Next Paint
< 200 ms
Cumulative Layout Shift
< 0.05
API p95 read latency (cached)
< 150 ms
API p95 submit latency
< 800 ms
Lighthouse (Performance, SEO, Accessibility, Best
Practices)
≥ 95 each
EOPAR — Website Product & Technical Specification
Page 39 of 51

launch, and CNT-08 (Insights publishing and RSS) runs when Insights ships.
Test layers
A. Navigation and content
Layer
Tool
Scope
Runs
Backend unit
pytest, pytest-django,
factory_boy, freezegun
Models, validators, state
machine, services
Every push
API
integration
pytest + DRF APIClient,
schemathesis (fuzz from
OpenAPI)
Every endpoint, auth,
throttles, errors
Every push
Frontend unit
Vitest + React Testing
Library
Components, form
schemas, step logic
Every push
Contract
Generated TS types +
schemathesis
Frontend/backend
agreement
Every push
End-to-end
Playwright (Chromium,
WebKit, Firefox; iPhone and
Pixel viewports)
Full journeys against
staging-like stack
Every PR
Visual
regression
Playwright screenshots /
Chromatic on Storybook
Design tokens, key pages
Every PR
Accessibility
axe-core in Playwright,
manual screen-reader pass
All templates
Every PR +
pre-release
Performance
Lighthouse CI, k6 load tests
Budgets, API under load
Nightly
Security
OWASP ZAP baseline, pip-
audit, npm audit, Bandit
Common vulnerabilities
Weekly +
pre-release
ID
Scenario
Expected
NAV-
01
Click logo from any page
Goes to /
NAV-
02
Mobile width 360px, open
hamburger
Full-screen menu, focus trapped, Esc
closes, CTA visible
EOPAR — Website Product & Technical Specification
Page 40 of 51

ID
Scenario
Expected
NAV-
03
Header CTA on every page
Opens /consultations/request step 1
NAV-
04
Unknown URL
Branded 404 with search and links, status
404
NAV-
05
Old slug after rename
301 to new slug
CNT-
01
Art set to Draft
Absent from lists, nav, sitemap; URL
returns 404
CNT-
02
Art set Hidden-from-nav
Not in nav, reachable by URL, in sitemap
CNT-
03
Add a sixth art in admin
Appears in grid, nav, flow preference list
after revalidate, no code change
CNT-
04
Research library with zero entries
Shows "Research Library — In
Development", no placeholder cards
CNT-
05
Try to publish research entry without
label or limitations
Blocked with field errors
CNT-
06
Fewer than 3 approved testimonials
Trust section hidden on homepage
CNT-
07
Editor types "99% accurate" in any
content
CMS lint warning, publish requires
override by super admin
CNT-
08
Publish an insight
Page live within 60 s via revalidation;
appears in RSS and sitemap
CNT-
09
Scheduled publish at a future time
Goes live at that minute (Celery Beat), not
before
CNT-
10
Founder flag off / on
Founder block hidden / shown on About
without redeploy
CNT-11
Course status Coming soon / Open /
Full
CTA reads Join Waitlist / Request
Enrollment / Join Waitlist for next batch
CNT-
12
Book with no sample PDF
Sample section hidden, no broken link
EOPAR — Website Product & Technical Specification
Page 41 of 51

B. Consultation flow — happy paths
ID
Scenario
Expected
CON-
01
Marriage → one predefined question →
Focused → Recommended → birth
details → Online → contact → submit
201, reference shown, email sent,
status Submitted, admin alert
CON-
02
Career → 3 questions
Tier auto-suggests Related; user can
change to Focused or Comprehensive
CON-
03
Two categories' worth of questions or
5+
Comprehensive suggested
CON-
04
Preferred system Palmistry
Step 5 shows left/right palm uploads
only, no birth time
CON-
05
Preferred Vastu
Property type, direction, city required;
floor plan optional
CON-
06
Preferred Astrology → KP
Birth details required; system saved as
KP
CON-
07
Compatibility question (requires
second person)
Second-person birth fields appear and
are required
CON-
08
"I have my own question" only
Textarea required, 20–1,500 chars; no
predefined questions needed
CON-
09
Deep link ?category=marriage from
homepage chip
Flow opens at step 2 with Marriage
selected
CON-
10
In-person mode
Address not shown on confirmation;
shown only after Scheduled
CON-11
Review step, edit step 3
Returns to step 3 with state kept, then
back to review
CON-
12
Status link after submit
Shows Submitted and timeline, no
internal notes
EOPAR — Website Product & Technical Specification
Page 42 of 51

C. Consultation flow — validation and edge cases
ID
Scenario
Expected
VAL-
01
DOB in the future
Field error "Date of birth cannot be in the
future" (client and server)
VAL-
02
DOB before 1900
Field error
VAL-
03
Birth time empty, "unknown" not
ticked
Field error
VAL-
04
"I don't know my exact birth time"
ticked
Time optional; approximate window + life
events offered
VAL-
05
Birth place free text not chosen from
autocomplete
Error: choose a place from the list
VAL-
06
Birth in India, 1945
Stored offset from historical tz data, not
today's IST rule blindly
VAL-
07
Birth at a DST transition (e.g. New
York 2:30 am on spring-forward day)
Ambiguous/nonexistent time flagged for
the client to confirm
VAL-
08
Subject aged 16
Guardian name + consent required
VAL-
09
Invalid email / disposable domain
Field error / accepted with admin flag
VAL-
10
Phone "98290"
E.164 validation error
VAL-11
Phone with +1 while country India
Accepted; country kept as chosen
VAL-
12
Consent unticked
Submit disabled; server rejects if forced
VAL-
13
Palm image 15 MB
Rejected with size message before
upload
VAL-
14
Palm image 600 px short side
Rejected with resolution message
VAL-
15
.exe renamed to .jpg
Server MIME sniff rejects
EOPAR — Website Product & Technical Specification
Page 43 of 51

D. Resilience and abuse
ID
Scenario
Expected
VAL-
16
File flagged by virus scan
Quarantined; submit returns 422 asking
to re-upload
VAL-
17
HEIC from iPhone
Accepted, converted to JPEG for viewing
VAL-
18
Unicode names (Devanagari, accents)
Stored and displayed correctly
VAL-
19
XSS payload in own-question text
Stored as text, escaped on every render
(site, admin, email)
VAL-
20
SQL injection strings in any field
No effect; stored as literal text
VAL-
21
Preferred slot in the past
Field error
VAL-
22
Preferred slots across client in Dubai
Shown to admin in IST and client time;
stored UTC
VAL-
23
Invalid ?category=xyz deep link
Ignored, flow starts at step 1, no error
ID
Scenario
Expected
RES-
01
Refresh browser on step 6
All previous answers restored
RES-
02
Close tab, return next day on same
device
Draft restored with "Continue where you
left off"
RES-
03
Draft older than 30 days
Starts fresh, old draft purged
RES-
04
Double-click Submit
Exactly one request created
(idempotency)
RES-
05
Network drop during submit, retry
Same reference returned, no duplicate
EOPAR — Website Product & Technical Specification
Page 44 of 51

E. Request lifecycle and admin
ID
Scenario
Expected
RES-
06
API down during flow
Retry state shown, draft kept locally,
content pages still load from cache
RES-
07
Question unpublished while user is
mid-flow
Submission still accepted; snapshot keeps
original wording
RES-
08
Same email + same questions within
24 h
409 with link to existing request status
RES-
09
6th submit from one IP in an hour
429 with friendly message
RES-
10
Turnstile token missing/invalid
400, no request created
RES-11
Honeypot field filled
Silently accepted in UI, discarded server-
side
RES-
12
Upload to presigned URL after it
expired
Upload fails; UI re-requests URL
transparently
RES-
13
Email provider outage
Job retries 5 times, admin sees failed-
send flag, request still saved
ID
Scenario
Expected
LIF-01
Admin moves Submitted → Under
review
Status event logged with actor; no client
email (optional template)
LIF-02
Under review → Needs info with
message
Client email with reply link
LIF-03
Client replies via status link
Status returns to Under review; files
attached
LIF-04
Client reply when request is
Completed
409, reply rejected
LIF-05
Attempt Submitted → Completed
directly
Blocked by state machine
EOPAR — Website Product & Technical Specification
Page 45 of 51

F. Learning, publications, forms
ID
Scenario
Expected
LIF-06
Fee quoted, no payment for 7 days
Celery Beat moves to Expired, client
notified
LIF-07
Scheduled appointment
.ics sent; reminders at 24 h and 1 h
LIF-08
Cancel after Fee paid
Moves to Cancelled; refund task created
per policy
LIF-09
Status link tampered
403
LIF-10
Status link older than 180 days
403 with option to request a new link by
email
ADM-
01
Editor role opens a request
Forbidden; personal data never shown
ADM-
02
Viewer role dashboard
Aggregates only, no names or phones
ADM-
03
Staff login without 2FA
Forced to enrol before access
ADM-
04
5 failed admin logins
Account locked 15 min, alert sent
ADM-
05
CSV export by Consultation
manager
Allowed, logged in audit log
ADM-
06
Data deletion request executed
Personal fields anonymised, uploads
deleted, reference kept for accounting
ID
Scenario
Expected
LRN-01
Enroll when batch has seats
201, seats_taken increments in a
transaction
LRN-
02
Two users take the last seat
simultaneously
One succeeds, other gets 410 with
waitlist offer (row lock)
LRN-
03
Enroll twice with same email for same
batch
409
EOPAR — Website Product & Technical Specification
Page 46 of 51

G. Cross-cutting quality
ID
Scenario
Expected
LRN-
04
Join waitlist twice
200, no duplicate row
LRN-
05
Course switches Coming soon → Open
Waitlist emailed once
PUB-01
Notify-me on forthcoming book, then
book becomes Available
One email per subscriber
FRM-
01
Newsletter signup
Double opt-in email; not subscribed
until confirmed
FRM-
02
Contact form spam burst
Throttled at 429
ID
Scenario
Expected
QLT-
01
axe-core on every template
Zero serious or critical violations
QLT-
02
Complete consultation flow keyboard-
only
Possible end to end, focus visible,
errors announced
QLT-
03
prefers-reduced-motion
No arc drawing, no scroll-linked motion
QLT-
04
Lighthouse CI on home, art, article, flow
All scores ≥ 95; LCP < 2.0 s
QLT-
05
k6: 200 concurrent users browsing + 20
submits/min for 10 min
p95 read < 300 ms, zero 5xx
QLT-
06
Safari iOS 16+, Chrome Android, desktop
Chrome/Firefox/Edge/Safari
Layout and flow work identically
QLT-
07
Structured data on course and book
pages (articles once Insights ships)
Passes Google Rich Results test
QLT-
08
Every page has title, description,
canonical, OG image
Automated crawl check passes
EOPAR — Website Product & Technical Specification
Page 47 of 51

13. Deployment, CI/CD, monitoring and roadmap
Three environments, one-click deploys from GitHub, and a phased roadmap where Phase
1 ships the full brand site plus the consultation request flow without online payment.
Environments
CI/CD pipeline (GitHub Actions)
1. Lint + type-check (ruff, mypy, ESLint, tsc).
2. Backend tests (pytest) against a Postgres service container; coverage gate.
3. Frontend unit tests (Vitest); OpenAPI → TS type generation; fail if types drift.
4. Build Docker images; run Playwright E2E + axe against the composed stack.
5. Lighthouse CI budgets.
6. Merge to main → deploy to staging automatically; run smoke tests.
7. Tagged release → deploy to production (Django migrations run as a pre-deploy job;
zero-downtime rolling restart); post-deploy smoke tests; automatic rollback on failure.
ID
Scenario
Expected
QLT-
09
Security headers
securityheaders.com grade A
QLT-
10
Backup restore drill on staging
Restores to within 5 min of target
point
Environment
Frontend
Backend
Database
Purpose
Local
next dev
docker-compose: Django,
Celery, Redis, Postgres,
MinIO, Mailpit
Local Postgres
with seed data
Development
Preview
Vercel preview per
PR
Shared staging API
Staging DB
Review of
each PR
Staging
staging.eopar.com
api.staging.eopar.com
Anonymised
copy of prod
QA, E2E, load
tests
Production
eopar.com
api.eopar.com ,
admin.eopar.com
Managed
Postgres, PITR
Live
EOPAR — Website Product & Technical Specification
Page 48 of 51

Monitoring and operations
Sentry for errors and performance traces on both apps; alerts to email/Slack.
Uptime checks every minute on home, flow, API health ( /api/v1/health/ checks DB,
Redis, storage).
Celery queue depth and failed-task alerts; daily report of failed notifications.
Structured logs with request IDs passed from Next.js to Django; PII scrubbed from logs.
Runbooks: API down, email provider down, bad deploy rollback, data restore, security
incident.
Roadmap
Launch checklist (Gate 2)
EOPAR roadmap · 5 phases, 4 gates
All 98 launch acceptance test cases pass on staging
Legal pages (privacy, terms, disclaimer, refunds) reviewed by a lawyer
Logo master asset pack delivered (section 1) with "&" wording; final colour/type tokens
locked
All five art pages, About and trust pages written and approved
Consultation categories, questions and field rules reviewed by EOPAR
Email templates proof-read; sending domain has SPF, DKIM, DMARC
Backups verified with a restore drill
Admin users created with 2FA; roles assigned
EOPAR — Website Product & Technical Specification
Page 49 of 51

Execution order (10 stages)
Planning is closed; the work now runs one stage at a time. EOPAR's role is decisions and
approvals; the build partner handles architecture, copy, UX, design, code and testing
guidance.
Analytics and Search Console connected; sitemap submitted
Lighthouse ≥ 95 and axe clean on all templates
Legal entity name, registered address and GSTIN filled in site settings
Question bank (section 6) reviewed and approved by EOPAR
Stage
Deliverable
Done when
1 · Brand assets
Logo master asset pack (7 variants,
SVG)
Files approved
2 · Content
Homepage Copy v1, word for word
Copy approved
3 · Consultation
content
Question bank + field rules finalised
EOPAR sign-off on every
question
4 · Wireframes
Desktop + mobile: homepage and
consultation flow
Layout approved
5 · Visual UI
Navy/ivory/gold + Celestial Arc
system in Figma
Design approved (Gate 1)
6 · Development
Backend models and API, then Next.js
pages, then the flow, CMS and forms
Feature-complete on
staging
7 · Content
population
Five arts, Learning, About, Research
placeholder, Publications
All MVP pages filled
8 · Privacy, security,
testing
Section 11 controls, 98 launch test
cases
Launch checklist
complete (Gate 2)
9 · Domain, hosting,
email
eopar.com , production hosting,
professional email with
SPF/DKIM/DMARC
Production smoke tests
pass
10 · Launch
Go live, sitemap submitted, monitoring
on
Site live
EOPAR — Website Product & Technical Specification
Page 50 of 51

Immediate next task: Stage 1 (logo vectors) in parallel with Stage 2 (Homepage Copy v1).
No coding before both are approved.
EOPAR — Website Product & Technical Specification
Page 51 of 51

```
