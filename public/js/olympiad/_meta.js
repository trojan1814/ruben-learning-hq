/* ============================================================
   SCIENCE OLYMPIAD FOUNDATION (SOF) — Class 3
   Exam facts, syllabus and the run-up plan.

   Dates are SOF's published 1st Level schedule for 2026-27. SOF gives
   each school a CHOICE of dates per paper and the school picks one —
   the extra dates below are alternatives, not extra sittings. Until
   the school confirms, the plan aims at the EARLIEST date for each
   paper, which is the only safe assumption.

   Practice papers live in the sibling files (science.js, maths.js,
   english.js, computer.js, gk.js).

   PAPER SHAPE
   -----------
   OLYMPIAD_PAPERS.science = [{
     id: 'iso-1',
     title: 'ISO Mock Paper 1',
     questions: [ { sec:'core'|'lr'|'hots', t:'mcq', q, o:[], a:idx, why } ]
   }]
   35 questions per paper: 20 core + 10 logical reasoning + 5 HOTs,
   1 mark each — the real Class 1-4 pattern.
   ============================================================ */

const OLYMPIAD_PAPERS = {};

const OLYMPIAD = {
  org: 'Science Olympiad Foundation',
  orgShort: 'SOF',
  site: 'https://sofworld.org',
  grade: 'Class 3',

  /* SOF registers students through their school, not individually, and the
     school also chooses which of the published date slots to use. There is
     no public student-facing deadline to count down to. */
  viaSchool: true,
  registerUrl: 'https://sofworld.org/registration',

  pattern: {
    total: 35, core: 20, lr: 10, hots: 5,
    marksPerQ: 1, totalMarks: 35,
    minutesOnline: 45, minutesOffline: 65,
    negative: false,
  },

  sections: {
    core: { key: 'core', label: 'Subject', icon: '📘', blurb: '20 questions straight from the class syllabus.' },
    lr:   { key: 'lr',   label: 'Logical Reasoning', icon: '🧩', blurb: '10 questions on patterns, codes, series and figures.' },
    hots: { key: 'hots', label: 'HOTs', icon: '🧠', blurb: '5 tough ones — two steps of thinking, not one.' },
  },

  subjects: [
    {
      /* First paper of the season — and the one the GK question bank in
         books/General-Knowledge/ is aimed at. */
      id: 'gk', code: 'IGKO', short: 'GK', icon: '🌍', rarity: 'epic',
      name: 'SOF International General Knowledge Olympiad',
      date: '2026-09-22', slots: ['2026-10-06', '2026-11-03'],
      links: 'general-knowledge',

      /* IGKO does NOT use the core/lr/HOTs shape the other four papers use.
         Per SOF's published Class 1-4 marking scheme it is four sections,
         35 questions but 40 marks, because the Achiever's Section is worth
         2 marks a question. One hour, no negative marking. */
      pattern: {
        total: 35, ga: 20, ca: 5, ls: 5, ach: 5,
        marksPerQ: 1, totalMarks: 40,
        minutesOnline: 60, minutesOffline: 60,
        negative: false,
      },
      sections: {
        ga:  { key: 'ga',  label: 'General Awareness', icon: '🌍', marks: 1,
               blurb: '20 questions on India, the world, nature and everyday facts.' },
        ca:  { key: 'ca',  label: 'Current Affairs', icon: '📰', marks: 1,
               blurb: '5 questions on recent events, people and places.' },
        ls:  { key: 'ls',  label: 'Life Skills', icon: '🤝', marks: 1,
               blurb: '5 questions on safety, manners and sensible decisions.' },
        ach: { key: 'ach', label: 'Achiever\'s Section', icon: '🏅', marks: 2,
               blurb: '5 harder questions — and these are worth 2 marks each.' },
      },
      /* SOF's published IGKO Class 3 syllabus. The eight General Awareness
         topics come first, then the Life Skills and Current Affairs strands.
         The Achiever's Section has no topics of its own — it is harder
         questions drawn from everything above. */
      syllabus: [
        'Plants and Animals',
        'Me and My Surroundings',
        'India and the World',
        'Language and Literature',
        'Science and Technology',
        'Sports',
        'Earth and Its Environment',
        'Maths Fun',
        'Life Skills — Soft Skills',
        'Life Skills — Kindness',
        'Life Skills — Dos and Don\'ts',
        'Life Skills — Social Skills',
        'Current Affairs — Research and Development',
        'Current Affairs — News',
        'Current Affairs — Around the World',
      ],
    },
    {
      id: 'science', code: 'ISO', short: 'Science', icon: '🔬', rarity: 'uncommon',
      name: 'SOF International Science Olympiad',
      date: '2026-10-30', slots: ['2026-11-19', '2026-12-03'],
      links: 'science',
      syllabus: [
        'Living and Non-Living', 'Plants and Their Parts', 'Animals and Their Habitat',
        'The Human Body', 'Cleanliness, Health and Hygiene', 'Food and Its Components',
        'Housing and Clothing', 'Forms of Matter — Solids, Liquids, Gases',
        'Water as a Resource', 'Transport and Communication', 'Weather and Sky',
        'Light and Sound', 'Logical Reasoning',
      ],
    },
    {
      id: 'maths', code: 'IMO', short: 'Maths', icon: '🔢', rarity: 'legendary',
      name: 'SOF International Mathematics Olympiad',
      date: '2026-10-23', slots: ['2026-11-26', '2026-12-10'],
      links: 'math',
      syllabus: [
        'Number System', 'Addition and Subtraction', 'Multiplication and Division',
        'Fractions', 'Basic Geometric Shapes', 'Measurement — Length, Weight, Capacity',
        'Time and Calendar', 'Money', 'Data Handling', 'Logical Reasoning',
      ],
    },
    {
      id: 'english', code: 'IEO', short: 'English', icon: '📖', rarity: 'rare',
      name: 'SOF International English Olympiad',
      date: '2026-09-30', slots: ['2026-10-27', '2026-11-17'],
      links: 'english',
      syllabus: [
        'Word Power', 'Synonyms and Antonyms', 'Nouns and Pronouns', 'Verbs',
        'Adjectives and Adverbs', 'Prepositions and Conjunctions', 'Tenses',
        'Question Formation', 'Sentence Formation', 'Comprehension',
        'Punctuation and Contractions', 'Express Yourself', 'Logical Reasoning',
      ],
    },
    {
      id: 'computer', code: 'ICSO', short: 'Computer', icon: '💻', rarity: 'mythic',
      name: 'SOF International Computer Science Olympiad',
      date: '2026-09-24', slots: ['2026-12-17'],
      links: 'computer-science',
      syllabus: [
        'Fundamentals of Computer', 'Parts of a Computer', 'Input and Output Devices',
        'Storage Devices', 'Uses of Computers', 'Introduction to the Internet',
        'MS-Paint', 'Introduction to MS-Word', 'Latest Developments in IT',
        'Logical Reasoning',
      ],
    },
  ],

  /* ---------------------------------------------------------------
     THE RUN-UP PLAN
     Eight weeks from Mon 21 Sep 2026, aimed at the EARLIEST date SOF
     publishes for each paper — GK on 22 Sep through Science on 30 Oct.
     If the school picks a later slot for something, that paper simply
     gets more time; nothing here has to move.
     `do` items are the week's work; `test` is the checkpoint.
     --------------------------------------------------------------- */
  plan: [
    { w: 1, from: '2026-09-21', phase: 'exam-week', title: '🏁 GK and Computer — exam week',
      do: ['Tue 22 Sep — General Knowledge (IGKO)', 'Thu 24 Sep — Computer Science (ICSO)', 'One timed GK mock, then the error book only', 'Check the login, the device and the exam-day rules'],
      test: 'The real thing — IGKO and ICSO', why: 'These two are days away. Nothing new goes in now — this week is rehearsal and early nights.' },
    { w: 2, from: '2026-09-28', phase: 'exam-week', title: '🏁 English — exam week',
      do: ['Wed 30 Sep — English (IEO)', 'One timed English mock early in the week, error book after', 'Daily: 15 minutes reading aloud'],
      test: 'The real thing — IEO', why: 'One paper, one focus. Comprehension and grammar are the two halves that decide it.' },
    { w: 3, from: '2026-10-05', phase: 'base', title: 'Reset — Maths number system and operations',
      do: ['Math units 1-3 in Combat Zones', 'Daily: 10 minutes of times tables (2-10)', 'GK backup slot is Tue 6 Oct if the school moved it'],
      test: 'Maths mock, core section only', why: 'Three clear weeks before IMO. Half of every maths paper leans on fast, accurate arithmetic.' },
    { w: 4, from: '2026-10-12', phase: 'base', title: 'Maths — fractions, measurement, money and data',
      do: ['Math units 5-6 plus the three Mental Arithmetic units', 'Daily: one page of the Mental Arithmetic workbook'],
      test: 'Maths mock, full paper, untimed', why: 'After the four operations, these are the topics Class 3 papers lean on hardest.' },
    { w: 5, from: '2026-10-19', phase: 'exam-week', title: '🏁 Maths — exam week',
      do: ['Fri 23 Oct — Mathematics (IMO)', 'Two timed maths mocks early in the week', 'Error book only from Wednesday'],
      test: 'The real thing — IMO', why: 'The maths is already known by now. The clock is the opponent, so practise against it.' },
    { w: 6, from: '2026-10-26', phase: 'exam-week', title: '🏁 Science — exam week',
      do: ['Fri 30 Oct — Science (ISO)', 'Science units: plants, animals, human body, matter, weather', 'One timed science mock mid-week'],
      test: 'The real thing — ISO', why: 'Last of the earliest-date papers. After this the season is backup slots only.' },
    { w: 7, from: '2026-11-02', phase: 'mock', title: 'Backup slots and the error book',
      do: ['Work through the Error Book — every wrong answer, all five subjects', 'Re-sit any mock scoring under 80%', 'GK third slot is Tue 3 Nov if the school uses it'],
      test: 'Re-sit the weakest 2 papers', why: 'Any paper that was missed or moved lands on its later slot in November. Stay warm rather than starting again.' },
    { w: 8, from: '2026-11-09', phase: 'mock', title: 'Taper — hold the level',
      do: ['One timed mock a week, his choice', 'Logical reasoning: 10 questions a day across subjects', 'Early nights before any remaining slot'],
      test: 'One timed mock, his choice', why: 'The last backup slots run into December. Keep it ticking over instead of cramming all over again.' },
  ],

  phases: {
    base:        { label: 'Phase 1 · Learn the syllabus', color: 'var(--r-rare)' },
    exam:        { label: 'Phase 2 · Learn the exam',     color: 'var(--r-epic)' },
    mock:        { label: 'Phase 3 · Rehearse it',        color: 'var(--r-legendary)' },
    'exam-week': { label: 'Exam week',                    color: 'var(--r-mythic)' },
  },

  /* Exam-day habits worth more than another 50 questions. */
  tactics: [
    { icon: '⏱️', h: '77 seconds a question', p: 'Answer the easy ones first and come back. A hard question is worth exactly the same 1 mark as an easy one.' },
    { icon: '✅', h: 'Nothing is deducted for a wrong answer', p: 'There is no negative marking, so never leave a blank. Rule out what is clearly wrong, then pick.' },
    { icon: '👀', h: 'Read the whole question twice', p: 'Class 3 papers love the words NOT, EXCEPT and ALWAYS. Most lost marks are misread questions, not unknown facts.' },
    { icon: '🧩', h: 'Reasoning is free marks', p: 'Logical reasoning needs no syllabus knowledge — it is 10 of 35 marks that pure practice can win.' },
    { icon: '📕', h: 'Keep the Error Book', p: 'Every wrong answer goes in it. Re-doing wrong answers is the single highest-value revision there is.' },
  ],
};
