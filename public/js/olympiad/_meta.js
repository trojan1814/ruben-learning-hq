/* ============================================================
   INDIAN TALENT OLYMPIAD — Class 3
   Exam facts, syllabus and the 14-week testing plan.

   Everything here was taken from indiantalent.org (Aug 2026):
     · exam pattern   /olympiad-exam-pattern
     · schedule       /olympiad-exam-schedule
     · syllabus       /international-<subject>-olympiad/class-3
   Practice papers modelled on published previous-year papers live in
   the sibling files (science.js, maths.js, english.js, computer.js).

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
  org: 'Indian Talent Olympiad',
  site: 'https://www.indiantalent.org',
  grade: 'Class 3',

  /* Round 1, 2026-27. Tentative per ITO — they confirm ~20 days before. */
  registerBy: '2026-10-30',
  registerUrl: 'https://www.indiantalent.org/olympiad-exam-registration-student',

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
      id: 'science', code: 'ISO', short: 'Science', icon: '🔬', rarity: 'uncommon',
      name: 'International Science Olympiad',
      date: '2026-12-04', slot2: '2027-01-08',
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
      name: 'International Maths Olympiad',
      date: '2026-12-05', slot2: '2027-01-09',
      links: 'math',
      syllabus: [
        'Number System', 'Addition and Subtraction', 'Multiplication and Division',
        'Fractions', 'Basic Geometric Shapes', 'Measurement — Length, Weight, Capacity',
        'Time and Calendar', 'Money', 'Data Handling', 'Logical Reasoning',
      ],
    },
    {
      id: 'english', code: 'EIO', short: 'English', icon: '📖', rarity: 'rare',
      name: 'English International Olympiad',
      date: '2026-12-03', slot2: '2027-01-07',
      links: 'english',
      syllabus: [
        'Word Power', 'Synonyms and Antonyms', 'Nouns and Pronouns', 'Verbs',
        'Adjectives and Adverbs', 'Prepositions and Conjunctions', 'Tenses',
        'Question Formation', 'Sentence Formation', 'Comprehension',
        'Punctuation and Contractions', 'Express Yourself', 'Logical Reasoning',
      ],
    },
    {
      id: 'computer', code: 'ICO', short: 'Computer', icon: '💻', rarity: 'mythic',
      name: 'International Computer Olympiad',
      date: '2026-12-01', slot2: '2027-01-04',
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
     THE TESTING PLAN
     14 prep weeks from Mon 24 Aug 2026 to the first exam on 1 Dec.
     Three phases: learn the syllabus, learn the exam, rehearse it.
     `do` items are the week's work; `test` is the checkpoint.
     --------------------------------------------------------------- */
  plan: [
    { w: 1, from: '2026-08-24', phase: 'base', title: 'Where does he actually stand?',
      do: ['Sit one full mock in each subject — untimed, no help', 'Log every wrong answer in the Error Book below'],
      test: 'Baseline: all 4 mock papers', why: 'You cannot plan around a score you do not have. This week is measurement, not study.' },
    { w: 2, from: '2026-08-31', phase: 'base', title: 'Maths — number system + operations',
      do: ['Math units 1-3 in Mission Zones', 'Daily: 10 minutes of times tables (2-10)'],
      test: 'Maths mock, core section only', why: 'Half of every IMO paper leans on fast, accurate arithmetic.' },
    { w: 3, from: '2026-09-07', phase: 'base', title: 'Science — living world',
      do: ['Science units on plants, animals, human body', 'Name 5 living and 5 non-living things around the house each day'],
      test: 'Science mock, core section only', why: 'ISO Class 3 is heaviest on plants, animals and the body.' },
    { w: 4, from: '2026-09-14', phase: 'base', title: 'English — grammar spine',
      do: ['English units on nouns, pronouns, verbs, adjectives', 'Read aloud 10 minutes a day'],
      test: 'English mock, core section only', why: 'EIO tests grammar labels directly — he has to name the part of speech, not just use it.' },
    { w: 5, from: '2026-09-21', phase: 'base', title: 'Computer — the machine itself',
      do: ['CS units on parts of a computer and input/output', 'Point at and name every part of the real computer'],
      test: 'Computer mock, core section only', why: 'ICO Class 3 is mostly recall. Naming things out loud beats re-reading.' },
    { w: 6, from: '2026-09-28', phase: 'exam', title: 'Logical reasoning — patterns and series',
      do: ['LR section of any two mocks', 'Odd-one-out and next-in-series puzzles, 10 a day'],
      test: 'LR sections, Science + Maths', why: 'Logical reasoning is 10 of 35 marks in EVERY subject. It is the cheapest place to gain.' },
    { w: 7, from: '2026-10-05', phase: 'exam', title: 'Logical reasoning — codes, mirrors, figures',
      do: ['LR section of the other two mocks', 'Mirror-image and figure-matrix practice'],
      test: 'LR sections, English + Computer', why: 'Same 10 marks, different question types. Cover both halves.' },
    { w: 8, from: '2026-10-12', phase: 'exam', title: 'Maths — fractions, measurement, money',
      do: ['Math units on fractions and measurement', 'Word problems: 5 a day, written out'],
      test: 'Maths mock, full paper, untimed', why: 'These three topics carry most of the multi-step questions.' },
    { w: 9, from: '2026-10-19', phase: 'exam', title: 'Science — matter, water, weather, light and sound',
      do: ['Science units on matter, water and weather', 'One kitchen experiment: solid/liquid/gas'],
      test: 'Science mock, full paper, untimed', why: 'The physical-science half of ISO is where Class 3 students usually leak marks.' },
    { w: 10, from: '2026-10-26', phase: 'exam', title: 'Register + English comprehension',
      do: ['⚠️ REGISTER by 30 Oct — individual registration closes', 'Comprehension passages: 1 a day, timed 5 minutes'],
      test: 'English mock, full paper, untimed', why: 'Registration deadline is hard. Comprehension is the slowest section — practise it against a clock.' },
    { w: 11, from: '2026-11-02', phase: 'mock', title: 'First timed rehearsal',
      do: ['Sit Computer + Science mocks with the 45-minute timer on', 'Review every wrong answer the same day'],
      test: 'Timed: Computer, Science', why: '45 minutes for 35 questions is 77 seconds each. He has to feel that pace.' },
    { w: 12, from: '2026-11-09', phase: 'mock', title: 'Second timed rehearsal',
      do: ['Sit Maths + English mocks with the timer on', 'Re-do only the questions he got wrong in week 11'],
      test: 'Timed: Maths, English', why: 'Re-doing wrong answers is worth more than fresh questions at this stage.' },
    { w: 13, from: '2026-11-16', phase: 'mock', title: 'Error book only',
      do: ['Work through the Error Book — every wrong answer, all subjects', 'Re-sit any mock scoring under 80%'],
      test: 'Re-sit the weakest 2 papers', why: 'By now the gaps are known. Fix those, not the things he can already do.' },
    { w: 14, from: '2026-11-23', phase: 'mock', title: 'Taper and rehearse the room',
      do: ['One timed mock only, mid-week', 'Check the login, the device and the exam-day rules', 'Early nights'],
      test: 'One timed mock, his choice', why: 'Cramming in the last week costs more than it earns. Rehearse the setup instead.' },
    { w: 15, from: '2026-11-30', phase: 'exam-week', title: '🏁 EXAM WEEK',
      do: ['Tue 1 Dec — Computer (ICO)', 'Thu 3 Dec — English (EIO)', 'Fri 4 Dec — Science (ISO)', 'Sat 5 Dec — Maths (IMO)'],
      test: 'The real thing', why: 'Slot 2 in January is the backup if a date is missed.' },
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
