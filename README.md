# 🎮 Ruben's Learning HQ

A local, gaming-themed learning dashboard for Ruben Sandhu (age 9).

## Running it

Double-click **`start.bat`** — it launches the server and opens the dashboard.

Or from a terminal in this folder:

```bash
node local-server.js
```

Then open **http://localhost:4173**. Stop the server with `Ctrl + C`.

No installs, no `npm install` — it runs on Node's built-in modules only.

To put it on the internet instead, see **[Putting it online](#-putting-it-online-vercel)** below.

## Three themes

There is a **theme switcher at the top of the sidebar** — one click swaps the
entire app between three complete skins:

| | 🎮 **Battle HQ** | 🍄 **Super Mario** | 🚨 **Red Alert** |
|---|---|---|---|
| Look | Dark neon HUD, angular panels | Blue sky, cream blocks, thick brown outlines | Crimson propaganda poster, solid plates, no blur |
| Fonts | Russo One / Rajdhani | Luckiest Guy / Fredoka | Chakra Petch / Barlow Condensed |
| Home | Home Base | Peach's Castle | Command Center |
| Subjects | Mission Zones | Worlds | Combat Zones |
| Rewards | Battle Pass · Tiers · Star Coins | Star Road · Stars · Gold Coins | Medal Board · Medals · War Funds |
| Rarity | Common → Mythic | Mushroom → Rainbow Star | Standard → Supreme |
| Chess squad | Recruit, Beast Scout, Tech Oracle, Fortress, Storm Queen, Supreme King | Goomba, Yoshi, Toad, Thwomp, Princess Peach, Mario | Peacekeeper, Attack Dog, Cryocopter, Guardian Tank, Tanya, President Ackerman |
| Chess levels | Recruit / Soldier / Elite / Legend | Goomba / Koopa / Hammer Bro / Bowser | Cadet / Conscript / Shock Trooper / Cherdenko |
| Ludo squads | Green / Gold / Blue / Red | Luigi / Wario / Toad / Mario | Yuriko / Yoshiro / Tanya / Natasha |
| Knockouts | `K.O.` `SMASHED!` `ELIMINATED!` | `STOMP!` `SMASH!` `WAHOO!` `MAMMA MIA!` | `DOWN!` `SHOT DOWN!` `DESTROYED!` `REGIME DOWN!` |

It is the whole app, not a colour swap: wording, icons, chess sprites, the ludo
cast, the board colours, the win and lose screens and the quiz results all
change. Chess in the Mario theme is Team Mario against Bowser's crew — the same
characters cast in shadow. **Red Alert goes further: the Allies and the Soviets are
two separately drawn armies**, so white is a blue USA task force and black is a red
Soviet one, right down to different names and different bios for the same square.

The choice is saved per browser and in `data/state.json`, so it survives a restart.

### Editing or adding a theme

Everything a theme owns lives in two places:

- `public/js/theme.js` — every word, icon, character name and result screen.
- `public/css/mario.css` and `public/css/redalert.css` — that skin's colour tokens
  and component overrides (the default skin's tokens are at the top of
  `public/css/theme.css`).

Chess character art is in `public/js/sprites.js`, one cast per theme. To add a
fourth skin, add an entry to `THEMES` and to `THEME_ORDER`, a matching
`SPRITE_SETS` cast, a `[data-theme="..."]` block of CSS, and a button to the
switcher in `index.html` (and in `sprites.html`).

A cast may optionally carry a `sides` map — that is how Red Alert gives the two
armies different names, accent colours and bios for the same piece, and why
`pieceStyle()` and `pieceLore()` take an optional side argument.

## 🚀 Putting it online (Vercel)

The app runs two ways from one codebase: `local-server.js` on this PC, and Vercel
serverless functions when deployed. Both call the **same handler files** in
`api/`, so local and live can never drift apart.

### It is already live

| | |
|---|---|
| **Live site** | https://ruben-learning-hq.vercel.app |
| **Source** | https://github.com/trojan1814/ruben-learning-hq |
| **Vercel scope** | `tricity-smiles`, alongside `family-ledger` and `tricity-smiles-pms` |
| **Progress** | Upstash Redis (`upstash-kv-bisque-plank`) — follows him to any device |

GitHub is connected, so **pushing deploys**:

```bash
git add -A && git commit -m "what changed" && git push
```

Vercel builds every push to `main` and puts it live. To deploy without a commit,
`npx vercel --prod` still works.

> The repo is **public** for now. It contains Ruben's name in the code defaults
> and the Cambridge textbook PDF, so switch it to private when beta testing ends:
> `gh repo edit trojan1814/ruben-learning-hq --visibility private`

Two things had to be true for this to work on Vercel, and both are easy to
break by accident:

- The local server is called **`local-server.js`, not `server.js`**. Vercel
  auto-detects a root `server.js` and runs it as a serverless function — which
  a long-lived listener cannot be. Renaming it back breaks the deployment.
- `vercel.json` sets **`"framework": null`**. Without it Vercel applies its
  Node.js preset and demands a server entrypoint instead of serving `public/`
  as static files with `api/` as functions.

### Still to do: connect the database

Right now the live site saves progress **in the browser only** — the Parent Zone
says so with an amber warning. Connecting Upstash Redis makes progress follow him
to any device. It needs one step in a browser, because Upstash requires you to
accept their EULA yourself:

1. Open <https://vercel.com/tricity-smiles/~/integrations/accept-terms/upstash?source=cli>
   and accept the terms
2. Then run:

```bash
npx vercel integration add upstash/upstash-kv
```

```bash
npx vercel --prod
```

Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` to the environment on its
own, and `api/state.js` picks them up with no further configuration. The Parent
Zone badge flips to ☁️ *Saved to the cloud* once it is working.

`api/state.js` picks those up on its own. Nothing else to configure.

**Parent Zone → Save & Backup** tells you which of the three is actually in use:

| Badge | What it means |
|---|---|
| 💾 Saved on this PC | Writing to `data/state.json` — this is the local copy |
| ☁️ Saved to the cloud | Upstash Redis is connected — progress follows him anywhere |
| ⚠️ This browser only | Deployed with no database yet — export backups regularly |

### Moving his current progress up

His `data/state.json` does not travel with the deploy. To carry his XP over:

1. On the local copy: **Parent Zone → ⬇️ Export progress** (downloads a dated JSON)
2. Open the live site: **Parent Zone → ⬆️ Import a backup** → pick that file

Import checks the file is a real Learning HQ backup and shows you the name, XP
and coins before it overwrites anything. Export is worth doing occasionally
regardless — it is the only true backup.

### Two things to know about the live copy

- **The URL is public.** Anyone with the link sees his name, XP and weekly
  schedule, including school and activity times. Vercel's password protection is
  a paid feature; on the free plan, treat the URL as the only thing keeping it
  private and do not post it anywhere.
- **The textbook PDF ships with it.** `books/English/` contains a Cambridge
  University Press sample, so deploying republishes it on a public URL. Delete
  the file (or add `books/` to `.vercelignore`) if you would rather it stayed
  local — the Book Vault handles an empty folder fine.

### What is deployed vs what stays home

| Stays on this PC | Goes live |
|---|---|
| `data/state.json` (his progress) | Everything in `public/` |
| `data/news-cache.json` | `api/` handlers, `news.js`, `build.js` |
| `Inspo/`, `lesson-plans/` | `books/` (copied in by the build) |

## Adding his books

Paste the PDFs of his actual textbooks into the matching folder:

```
books/English/
books/Geography/
books/Hindi/
books/Math/
books/Science/
books/Computer-Science/
books/General-Knowledge/
```

Then open **Book Vault → Rescan Vault** in the dashboard. Anything you drop in
shows up there, and I read those files from disk when generating his real lesson plans.

## How the rewards work

| Thing | Earns |
|---|---|
| Reading a lesson | +15 XP (once per unit) |
| Each correct answer | +8 XP |
| Finishing a unit | +15 to +50 XP and coins, by score |
| Completing a daily quest | Star Coins |
| Each Olympiad mock answer | +8 XP, plus up to +80 for a strong paper |
| Ticking off a whole scheduled day | +40 XP |
| A minute of piano or golf practice | +1 XP |
| Finishing a hobby lesson | +20 XP |
| Ticking off an Olympiad plan week | +30 XP |
| Reading a news story | +5 XP (max 5 a day) |
| Clearing all 4 daily quests | +100 bonus XP |
| Every 500 XP | +1 Player Level |
| Hitting a Battle Pass XP threshold | Unlocks a real-world reward you approve |

**Battle Pass rewards are yours to set.** Edit the `BATTLE_PASS` array in
`public/js/data.js` — screen time, ice cream, movie night, whatever motivates him.

## Parent Zone

The 🛡️ **Parent Zone** page lets you award bonus XP for effort, add or spend Star
Coins, rename the player, review recent activity, and reset the season.

## Game Arena

Both games are fully playable and pay XP + Star Coins straight into the Battle Pass.

### ♟️ Chess

Complete rules — castling, en passant, promotion, check, checkmate, stalemate, the
50-move rule and insufficient-material draws. Verified against the standard perft
test suite (Kiwipete and friends) to depth 4.

Four difficulty levels, so it grows with him:

| Level | Looks ahead | Feel |
|---|---|---|
| Recruit | 1 move | Makes mistakes on purpose — start here |
| Soldier | 2 moves | Spots simple traps |
| Elite | 3 moves | Plays to win |
| Legend | 4 moves | Genuinely hard |

**The squad.** Each piece is a character, and the rarity climbs with the piece — exactly
the ladder Ruben asked for. In the **Battle HQ** theme they are original battle-royale
troopers; in **Super Mario** the same ladder is the Mushroom Kingdom crew; in
**Red Alert** it is the Allies against the Soviets:

| Piece | 🎮 Battle HQ | 🍄 Mario | 🚨 Allied (white) | 🚨 Soviet (black) | Rarity |
|---|---|---|---|---|---|
| King | Supreme King | Mario | President Ackerman | Premier Cherdenko | 🔶 Mythic |
| Queen | Storm Queen | Princess Peach | Tanya | Natasha | 🟡 Legendary |
| Rook | Fortress | Thwomp | Guardian Tank | Hammer Tank | 🟣 Epic |
| Bishop | Tech Oracle | Toad | Cryocopter | Twinblade | 🔵 Rare |
| Knight | Beast Scout | Yoshi | Attack Dog | War Bear | 🟢 Uncommon |
| Pawn | Recruit | Goomba | Peacekeeper | Conscript | ⚪ Common |

In Battle HQ your squad wears light armour and the enemy wears dark; in Mario your crew is
in true colour and Bowser’s crew is the same character cast in shadow. Red Alert is the odd
one out — both armies are drawn from scratch, so you are commanding a blue USA task force
across an olive-drab map against a red Soviet one. Promote a Pawn and you pick which skin
it respawns as. See all three casts side by side at
**http://localhost:4173/sprites.html** — that page has its own theme switcher.

**Combat animations.** Ordinary moves glide across the board (Knights physically leap).
Captures play a fight: the attacker charges in, the board shakes on impact, and the
defender flashes white, spins out and vanishes in a burst of sparks with a callout —
`K.O.` for a Pawn, `SMASHED!` for a Rook, `ELIMINATED!` for a Queen. Castling animates
the King and Rook together; en passant knocks out the pawn on the square it actually
stands on, not the destination.

The AI also holds a visible "thinking" beat of about 1–1.7 seconds before moving. The
search itself takes under 100 ms — the pause is deliberate, so a move reads as a
decision rather than a twitch.

**Animation Speed** (side panel): Chill / Normal / Quick. To retune the defaults, edit
`TIMING` and `SPEEDS` at the top of `ChessGame` in `public/js/chess.js`.

**Board size.** Both boards scale with the window — they grow to fill the space and stay
perfectly square, capped at 940px. Maximise the window or go full screen and the board
grows with it. The cap lives in `--board` on `.board-col` in `public/css/games.css`.

Rewards: win 200 XP + 50 coins · draw 70 XP + 15 coins · loss 30 XP.

### 🎲 Ludo

Standard 15×15 board, you (Red) against three computer squads. Roll a 6 to leave base,
6s grant an extra turn, three 6s forfeits it. Land on an enemy to knock it home and take
another turn. ★ and ✦ squares are safe. Exact roll needed to reach the trophy.

Rewards: 1st 180 XP + 45 coins · 2nd 110 XP · 3rd 80 XP · 4th 40 XP.

## 📰 News Desk — daily world news, filtered for a 9-year-old

A fresh headline feed every day, from sources that are written for children in the
first place rather than adult news that has been trimmed.

| Source | What it brings |
|---|---|
| **BBC Newsround** | The BBC's own news service for 6–12 year olds — the backbone of the feed |
| **Science News Explores** | Science journalism written for young readers |
| **NASA Image of the Day** | Space photo of the day with a short caption |

### How the filtering works

Two layers, both on the server before anything reaches the browser:

1. **Kid-first sources.** Newsround is already edited for this age group.
2. **A keyword blocklist.** Every headline *and* summary is checked against a list
   covering violence, death, crime, courts, war, drugs, adult themes and distressing
   events. Anything that trips it is **dropped, not shown**. Stories about space,
   animals, inventions, records, sport and science get boosted up the list instead.

The filter is deliberately blunt — a good story wrongly dropped costs nothing, the
reverse costs a lot. To tune it, edit `BLOCK` and `BOOST` at the top of `news.js`.

### How it stays daily

The server fetches at most once every 3 hours and caches to `data/news-cache.json`,
so opening the app is instant and it still works with the internet unplugged (it
serves the last good copy and says so). **🔄 Refresh** forces a fetch.

The sidebar shows an unread count. Tapping a story opens the original site in a new
tab and pays **+5 XP**, capped at 5 stories a day so it stays a nudge rather than a
grind. Each page ends with five **"Talk about it"** questions — retell it, who does it
affect, how do they know, what would you do, what else do you want to know.

## 🇮🇳 Olympiad Ops — SOF prep

Five Class 3 exams, prepped properly, against the published
[SOF](https://sofworld.org) 1st Level schedule for 2026-27.

| Exam | Subject | Earliest date | Other slots |
|---|---|---|---|
| **IGKO** International General Knowledge Olympiad | GK | Tue 22 Sep 2026 | 6 Oct · 3 Nov |
| **ICSO** International Computer Science Olympiad | Computer | Thu 24 Sep 2026 | 17 Dec |
| **IEO** International English Olympiad | English | Wed 30 Sep 2026 | 27 Oct · 17 Nov |
| **IMO** International Mathematics Olympiad | Maths | Fri 23 Oct 2026 | 26 Nov · 10 Dec |
| **ISO** International Science Olympiad | Science | Fri 30 Oct 2026 | 19 Nov · 3 Dec |

**SOF does not take individual entries** — the school registers students and also
picks *which* of those slots to use. Every date the app shows is the earliest one
SOF publishes for that paper, which is the only safe assumption until the school
confirms. Check the chosen dates with them.

### The paper

Four of the five use the same shape: **35 questions, 1 mark each, no negative
marking**, 45 minutes online (65 offline).

| Section | Questions | What it tests |
|---|---|---|
| Subject | 20 | Straight from the class syllabus |
| Logical Reasoning | 10 | Patterns, codes, series, mirrors, figures |
| HOTs | 5 | Two steps of thinking, not one |

**IGKO and ICSO are the exceptions.** Both are still 35 questions but **40 marks**,
because the Achiever's Section is worth 2 marks each, and both run for an hour.

**IGKO**

| Section | Questions | Marks each | Total |
|---|---|---|---|
| General Awareness | 20 | 1 | 20 |
| Current Affairs | 5 | 1 | 5 |
| Life Skills | 5 | 1 | 5 |
| Achiever's Section | 5 | **2** | 10 |

**ICSO**

| Section | Questions | Marks each | Total |
|---|---|---|---|
| Logical Reasoning | 5 | 1 | 5 |
| Computer Science | 20 | 1 | 20 |
| Information Technology | 5 | 1 | 5 |
| Achiever's Section | 5 | **2** | 10 |

Note how different ICSO is from the shared shape: reasoning drops from 10 questions
to 5, and a whole Information Technology section appears — AI, robotics, gadgets,
apps and computerisation. SOF sets its ICSO questions on **Windows 11 and
MS-Office 2016**, so the menus and shortcuts in the mocks follow those versions.

A subject can carry its own `pattern` and `sections` in `_meta.js`; anything that
draws a pattern, a timer or a score asks for the subject's version rather than the
default. Scores are weighted by **marks**, so 30 of 35 questions right on an IGKO
paper is 75%, not 86%.

### Mock papers

**One full mock each for Science, Maths and English, ten for GK and fifteen for
Computer Science — 980 questions in all**, written to the exact section split for
that exam and modelled on published previous-year Class 3 papers. Every question has
a worked explanation.

| Paper | Mocks | Questions |
|---|---|---|
| ICSO Computer Science | 15 | 525 |
| IGKO General Knowledge | 10 | 350 |
| IEO English | 1 | 35 |
| IMO Maths | 1 | 35 |
| ISO Science | 1 | 35 |

The fifteen ICSO papers are written against SOF's published Class 3 syllabus section
by section. One honest limitation: the reasoning syllabus includes figure matrices,
embedded figures and mirror images of shapes, which need a picture to be asked
properly. Until the quiz runner can show an image per question, that section leans on
the topics that work in text — patterns, coding-decoding, ranking, analogy,
classification, geometry by description, and clock and calendar.

The ten IGKO papers are built from the 250+ question bank in
`books/General-Knowledge/`, topped up with fresh Class 3 questions to fill the
syllabus evenly. **The bank was not copied as-is** — it contains real errors (it
credits *Jyotipunj* to Mahatma Gandhi rather than Narendra Modi, *My Truth* to
Amrita Pritam rather than Indira Gandhi, gives 101 as the road-accident number when
101 is the fire brigade, and claims five Hockey World Cup wins instead of one), so
every fact was re-checked and the shakier claims were dropped.

> ⚠️ **Current Affairs goes stale.** That section is the one part of the GK papers
> with a shelf life. Re-check those five questions per paper against the news before
> he sits the real thing.

Options are shuffled on every attempt. Without that the answer keys are badly
lopsided — the Science paper is 60% "b" and never once "d" — and spotting that
pattern is worth more marks than the actual knowledge.

Two ways to sit one:

- **⏱️ Timed** — a 45-minute countdown in the header that turns red under 5 minutes
  and submits automatically when it hits zero. This is the one that matters.
- **📖 Untimed** — same paper, no clock, for going through it together.

Results break the score down **by section**, name his weakest one and say what to do
about it. Best score per paper is kept, and every wrong answer is filed in the Error Book.

### The testing plan

Fourteen weeks from **Mon 24 Aug** to the first exam on **1 Dec**, in three phases:

| Weeks | Phase | What happens |
|---|---|---|
| 1–5 | Learn the syllabus | Baseline mocks in week 1, then one subject a week |
| 6–10 | Learn the exam | Logical reasoning drills, full untimed papers, **register in week 10** |
| 11–14 | Rehearse it | Timed mocks, Error Book only, then taper |

Each week states what to do, the checkpoint test, and *why* that week exists. Tick a
week off for +30 XP. The current week is highlighted automatically by today's date.

### Error Book

Every question he gets wrong in a mock is logged automatically with what he chose, the
right answer and the explanation. Re-doing wrong answers is the highest-value revision
there is, which is why week 13 is nothing else.

To change the plan or the exam dates, edit `public/js/olympiad/_meta.js`.
To add a second mock paper, add another object to the array in that subject's file.

## 📅 Mission Board — the editable schedule

His real week: school, classes, sports, music lessons, study slots and one-off events.

- **Add / edit / delete anything** — tap a card to edit it, or the ＋ on a day column.
- **Weekly repeats** (every Tuesday) or **one-off events** (a specific date), which get
  their own "Coming up" list.
- **Six types** with their own colour and icon: School, Class, Sport, Music, Study, Event.
- **Tick things off** as they happen. Clearing a whole day is +40 XP.
- Today's row also drives the **side rail**, and can be ticked from there too.

It ships with a starter timetable so the page is never empty — school 8am weekdays,
study slots, football, swimming, piano and a Saturday golf lesson. Replace it with his
real week, or hit **↺ Starter timetable** to put it back.

Everything saves to `data/state.json`.

## 🎹 Side Quests — piano, golf, AI and 3D printing

Real coaching content for all four, plus practice tracking. **Every minute logged is 1 XP**,
so time at the piano or on the range moves the Battle Pass exactly like schoolwork does.

**🎹 Piano** — 6 lessons: sitting and hand shape · reading the keyboard · finger numbers and
C position · counting rhythm · reading the treble staff · how to practise so it sticks.
Plus a 20-minute practice routine and 8 tips.

**⛳ Golf** — 6 lessons: the grip · stance, posture and aim · the swing · putting · chipping ·
rules and etiquette. Plus a 30-minute range routine and 8 tips.

**🤖 AI** — 8 lessons: what AI actually is (a pattern machine, not a brain) · how it learned ·
the four-part prompt · getting a better answer · when AI gets it wrong · safe and fair rules ·
**building your own game with AI** · other cool things to try.

It includes a **Prompt Lab**: type a prompt, hit score, and it checks it against the four
parts taught in lesson 3 — **Role · Task · Details · Format** — and tells you which one is
missing. Nothing is sent anywhere; the scoring is local pattern-matching, so it works offline
and costs nothing. There is a weak→strong example pair you can cycle through underneath.

**🖨️ 3D Printing** — 9 lessons built around the actual kit: the **Phrozen Sonic Mini 8K S**,
the Phrozen Wash & Cure and Phrozen resin. How resin printing works · the machine's real
numbers · finding models · slicing (orientation, supports, hollowing, drain holes) · the
wash/cure workflow · diagnosing failures · painting figurines · designing his own toy.

> ⚠️ **On safety.** Uncured resin is a skin sensitiser and IPA is flammable, so the content is
> built around a hard split that is stated in lesson 1 and repeated on the page as a red banner:
> **adult jobs** are pouring resin, the vat, any unwashed print, IPA and all disposal —
> **Ruben's jobs** are designing, slicing, starting the print, and handling it gloved once it is
> washed and dry, plus clipping, sanding and painting. Nitrile gloves (never latex), safety
> glasses, ventilation, and waste cured solid under UV before it goes in the bin.

Every lesson in all four has teaching cards and **one specific drill** with numbered steps —
the drill is the part that actually changes anything. Mark a lesson done for +20 XP.

The page tracks a daily minutes goal, a practice streak and a 7-day bar chart per hobby.
One file per hobby in `public/js/hobbies/` — edit the lessons, tips and routines there.

## The curriculum

**51 units, 416 questions**, written at **Class 3** level.

| Subject | Units | Questions | Based on |
|---|---|---|---|
| English | 10 | 80 | **Cambridge Primary English 3 — his actual school book** |
| Hindi | 6 | 48 | NCERT रिमझिम 3 + व्याकरण |
| Math | 10 | 88 | NCERT Math-Magic 3 + **his Mental Arithmetic workbooks** |
| Science (EVS) | 6 | 48 | NCERT Looking Around 3 |
| Geography | 7 | 56 | Standard Class 3 syllabus — *not yet book-matched* |
| Computer Science | 6 | 48 | Standard CBSE Class 3 computer syllabus |
| General Knowledge | 6 | 48 | India + world GK |

### Math includes his mental arithmetic workbooks

The last three Math units — ⚡ Speed Facts, 🔟 Tens & Sets and 🪙 Money & Measures — are
built from the two workbooks in `books/Math/` (exercises 44–97), and they deliberately
keep the book's idiom: one blank box per question, ₹ and paise, km/m and kg/g, "5 sets
of 20", "how many 12s are there in 144?", "put < or >". The teaching cards cover the
mental *strategy* — undo a multiplication to find a missing factor, let zeros travel from
a small fact to a big one, chop the ones off to read the tens — so the app teaches the
trick and the physical book is where he drills it.

### English follows his school book

The units mirror the session order of Cambridge Primary English Learner's Book 3
(9781108819541), which is in `books/English/`: settings → characters → verbs → speech →
planning and writing a story → lists and instructions → invitations → figurative language,
with a grammar consolidation unit at the end. Each unit records the matching book sessions
in its `book` field.

Note the PDF in that folder is a **50-page pre-publication sample**, not the full book. It
covers Unit 1 completely, Unit 2 partly, and the start of Unit 3. Units 1–8 here are aligned
to what the sample shows; the later ones follow the same course's usual progression. Add the
complete book and they can be tightened further.

### Geography is not book-matched yet

Geography follows the standard Class 3 syllabus (Earth, globes and maps, directions,
landforms, water bodies, weather, India) rather than any particular workbook. Drop his
Geography book into `books/Geography/` to have it realigned chapter by chapter.

Every unit has a **teaching section first** (explanations, worked examples, tables, a tip),
then an **auto-graded quiz**. Wrong answers show the correct answer plus a short "why".

Four question types: multiple choice, true/false, type-the-answer, and match-the-pairs.
Questions and MCQ options are shuffled on every attempt, so repeating a unit is real practice
rather than memorising positions. Hindi units deliberately use no typed answers — a Hindi
keyboard is a barrier at this age.

### Rewards per unit

| Action | Reward |
|---|---|
| Reading the lesson (first time) | +15 XP |
| Each correct answer | +8 XP |
| Score 60–79% | +15 XP, +5 coins, unit cleared |
| Score 80–99% | +30 XP, +10 coins |
| Score 100% | +50 XP, +20 coins, 3 stars |

A unit counts as cleared at 60%. Best score is kept, so retrying can only help.

### Editing the content

One file per subject in `public/js/curriculum/`. The shape is documented at the top of
`_schema.js`. Adding a question is just another object in the `questions` array — no other
file needs touching.

## What's still a placeholder

- **Book matching** — only English follows an actual school book so far, and only from a
  50-page sample. Hindi, Math, Science, Geography, CS and GK all follow the standard Class 3
  syllabus. Drop each real book into its `books/` folder to have that subject retuned.

## Files

```
local-server.js        zero-dependency local server (delegates to api/)
api/state.js           progress: Upstash Redis, local file, or browser-only
api/books.js           the vault listing
api/news.js            the news endpoint
news.js                RSS fetch, kid-safe filter and 3-hour cache
build.js               deploy build step: stages books/ + writes the manifest
vercel.json            Vercel config
package.json           scripts + Node version
start.bat              double-click launcher
public/index.html      app shell
public/sprites.html    sprite-sheet preview of the chess squad
public/css/theme.css   default (Battle HQ) tokens, fonts, buttons, XP bars
public/css/mario.css   the Super Mario skin — tokens + component overrides
public/css/redalert.css  the Red Alert 3 skin — tokens + component overrides
public/css/dashboard.css  layout and page components
public/css/games.css   chess + ludo boards
public/css/pages.css   olympiad, schedule and hobbies components
public/js/theme.js     >> ALL THREE THEMES <<  every label, icon, name and result screen
public/js/data.js      subject metadata, games, quests, battle pass
public/js/curriculum/  >> ALL LESSONS & QUESTIONS <<  one file per subject
public/js/olympiad/    SOF Olympiad: exam facts, run-up plan, 28 mock papers
public/js/schedule.js  the editable weekly timetable
public/js/news.js      the News Desk page
public/js/hobbies/     piano, golf, AI and 3D printing — one file each
public/js/lesson.js    lesson view + quiz runner + grading
public/js/sprites.js   chess character art (SVG), one cast per theme
public/js/chess.js     chess rules engine + AI + board UI
public/js/ludo.js      ludo rules engine + AI + board UI
public/js/app.js       state, routing, rendering
books/                 drop his textbook PDFs here
lesson-plans/          generated lesson plans land here
data/state.json        his saved progress
```

Progress saves to `data/state.json` on the disk, so it survives clearing the browser.
Back up that one file and nothing is ever lost.
