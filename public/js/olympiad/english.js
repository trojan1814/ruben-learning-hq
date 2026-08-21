/* English International Olympiad (EIO) — Class 3
   35 questions: 20 core · 10 logical reasoning · 5 HOTs
   Modelled on published Class 3 previous-year papers. */

OLYMPIAD_PAPERS.english = [{
  id: 'eio-1',
  title: 'EIO Mock Paper 1',
  questions: [

    /* ---------------- Section 1 — Core (20) ---------------- */
    { sec: 'core', t: 'mcq', q: 'Choose the correct article: He bought ___ camera yesterday.',
      o: ['an', 'a', 'the', 'no article'], a: 1,
      why: '"Camera" begins with a consonant sound, so it takes "a".' },

    { sec: 'core', t: 'mcq', q: 'Fill in the blank: There can be many surprises in ___ life.',
      o: ['no article needed', 'a', 'an', 'the'], a: 0,
      why: 'When "life" means life in general, it takes no article at all.' },

    { sec: 'core', t: 'mcq', q: 'Choose the correct preposition: She was satisfied ___ her results.',
      o: ['on', 'for', 'at', 'with'], a: 3,
      why: 'The fixed phrase is "satisfied with".' },

    { sec: 'core', t: 'mcq', q: 'Which word is a PROPER noun?',
      o: ['city', 'river', 'Mumbai', 'school'], a: 2,
      why: 'A proper noun names one particular person, place or thing and always starts with a capital letter.' },

    { sec: 'core', t: 'mcq', q: 'Replace the underlined words with a pronoun: <b>Ravi and Sam</b> are playing outside.',
      o: ['He', 'She', 'They', 'It'], a: 2,
      why: '"Ravi and Sam" are two people, so the pronoun is "They".' },

    { sec: 'core', t: 'mcq', q: 'Which word is the VERB in this sentence? The little boy quickly climbed the tall tree.',
      o: ['little', 'quickly', 'climbed', 'tall'], a: 2,
      why: 'The verb is the action word. "Climbed" is what the boy did.' },

    { sec: 'core', t: 'mcq', q: 'Which word is an ADVERB? She sang beautifully at the concert.',
      o: ['She', 'sang', 'beautifully', 'concert'], a: 2,
      why: 'An adverb tells you HOW something is done. "Beautifully" describes how she sang.' },

    { sec: 'core', t: 'mcq', q: 'Choose the correct plural: One mouse, two ___',
      o: ['mouses', 'mice', 'mices', 'mouse'], a: 1,
      why: '"Mouse" is irregular — its plural is "mice", not "mouses".' },

    { sec: 'core', t: 'mcq', q: 'Choose the SYNONYM of "brave".',
      o: ['afraid', 'courageous', 'weak', 'lazy'], a: 1,
      why: 'A synonym means the same thing. Brave and courageous both mean unafraid.' },

    { sec: 'core', t: 'mcq', q: 'Choose the ANTONYM of "ancient".',
      o: ['old', 'modern', 'huge', 'tired'], a: 1,
      why: 'An antonym is the opposite. Ancient means very old; modern means new.' },

    { sec: 'core', t: 'mcq', q: 'Which sentence is in the PAST tense?',
      o: ['I will go to the park.', 'I go to the park.', 'I went to the park.', 'I am going to the park.'], a: 2,
      why: '"Went" is the past form of "go" — it already happened.' },

    { sec: 'core', t: 'mcq', q: 'Choose the correctly punctuated sentence.',
      o: ['what a lovely day', 'What a lovely day!', 'what a lovely day?', 'What a lovely day'], a: 1,
      why: 'It needs a capital letter at the start and an exclamation mark, because it shows strong feeling.' },

    { sec: 'core', t: 'mcq', q: 'What is the contraction of "they are"?',
      o: ["they're", "their", "there", "theyre"], a: 0,
      why: 'The apostrophe replaces the missing "a": they are → they’re.' },

    { sec: 'core', t: 'mcq', q: 'Choose the correct conjunction: I wanted to play ___ it was raining.',
      o: ['and', 'but', 'or', 'so'], a: 1,
      why: '"But" joins two ideas that disagree with each other.' },

    { sec: 'core', t: 'mcq', q: 'Which is the correct question form? ___ is your birthday?',
      o: ['When', 'Which', 'Who', 'How much'], a: 0,
      why: '"When" asks about time, and a birthday is a date.' },

    { sec: 'core', t: 'mcq', q: 'Choose the correctly spelled word.',
      o: ['recieve', 'receive', 'receve', 'reciept'], a: 1,
      why: 'The rule is "i before e, except after c" — so it is r-e-c-e-i-v-e.' },

    { sec: 'core', t: 'mcq', q: 'Choose the polite way to ask for help.',
      o: ['Help me now.', 'Can you help me, please?', 'Give me help.', 'You must help.'], a: 1,
      why: 'A question with "please" is the polite form — the others are commands.' },

    { sec: 'core', t: 'mcq', q: 'A person who sells fruit and vegetables is called a:',
      o: ['baker', 'greengrocer', 'butcher', 'florist'], a: 1,
      why: 'A greengrocer sells fruit and vegetables. A florist sells flowers; a butcher sells meat.' },

    { sec: 'core', t: 'mcq', q: 'Read: "Mira put on her raincoat, picked up her umbrella and stepped outside." What was the weather like?',
      o: ['Sunny', 'Rainy', 'Snowy', 'Windy and dry'], a: 1,
      why: 'The raincoat and umbrella are the clues — you infer rain even though the passage never says it.' },

    { sec: 'core', t: 'mcq', q: 'Choose the correct homophone: I could not ___ the bell ring.',
      o: ['here', 'hear', 'hare', 'hair'], a: 1,
      why: '"Hear" is what you do with your ears. "Here" means this place.' },

    /* ---------------- Section 2 — Logical Reasoning (10) ---------------- */
    { sec: 'lr', t: 'mcq', q: 'Which word does NOT belong?',
      o: ['Apple', 'Banana', 'Carrot', 'Mango'], a: 2,
      why: 'Apple, banana and mango are fruits. A carrot is a vegetable.' },

    { sec: 'lr', t: 'mcq', q: 'Which word comes FIRST in the dictionary?',
      o: ['charm', 'change', 'chair', 'cheese'], a: 2,
      why: 'Compare letter by letter: chair, change, charm, cheese. "Chair" wins on the third letter.' },

    { sec: 'lr', t: 'mcq', q: 'If PEN is coded as QFO, what is the code for CAP?',
      o: ['DBQ', 'DAQ', 'BZO', 'DBP'], a: 0,
      why: 'Each letter moves one forward: C→D, A→B, P→Q.' },

    { sec: 'lr', t: 'mcq', q: 'Puppy is to Dog as Kitten is to ___',
      o: ['Milk', 'Cat', 'Cub', 'Paw'], a: 1,
      why: 'A puppy is a baby dog, and a kitten is a baby cat.' },

    { sec: 'lr', t: 'mcq', q: 'Complete the series: AZ, BY, CX, ___',
      o: ['DV', 'DW', 'EW', 'CW'], a: 1,
      why: 'The first letter goes forward (A, B, C, D) while the second goes backward (Z, Y, X, W).' },

    { sec: 'lr', t: 'mcq', q: 'How many letters are there between the letters D and J in the alphabet?',
      o: ['4', '5', '6', '7'], a: 1,
      why: 'Between D and J sit E, F, G, H and I — that is 5 letters.' },

    { sec: 'lr', t: 'mcq', q: 'Sam is taller than Ravi. Ravi is taller than Neha. Who is the shortest?',
      o: ['Sam', 'Ravi', 'Neha', 'Cannot say'], a: 2,
      why: 'The order from tallest is Sam, Ravi, Neha — so Neha is shortest.' },

    { sec: 'lr', t: 'mcq', q: 'Rearrange to make a proper sentence: (1) the (2) barked (3) loudly (4) dog',
      o: ['1-4-2-3', '4-1-2-3', '2-1-4-3', '1-2-4-3'], a: 0,
      why: '"The dog barked loudly" is 1-4-2-3.' },

    { sec: 'lr', t: 'mcq', q: 'Which word can be made from the letters of "LISTEN"?',
      o: ['SILENT', 'STOLEN', 'SLIDE', 'SPLINT'], a: 0,
      why: 'SILENT uses exactly the same six letters as LISTEN — that makes it an anagram.' },

    { sec: 'lr', t: 'mcq', q: 'Odd one out: Run, Jump, Happy, Swim',
      o: ['Run', 'Jump', 'Happy', 'Swim'], a: 2,
      why: 'Run, jump and swim are verbs (actions). "Happy" is an adjective.' },

    /* ---------------- Section 3 — HOTs (5) ---------------- */
    { sec: 'hots', t: 'mcq', q: 'Read: "Tom kept looking at the clock. He had packed his bag twice already and could not sit still." How does Tom most likely feel?',
      o: ['Bored', 'Excited and impatient', 'Sleepy', 'Angry'], a: 1,
      why: 'Checking the clock and re-packing are signs of eager waiting — the passage shows it rather than saying it.' },

    { sec: 'hots', t: 'mcq', q: 'Which sentence uses "light" in the SAME way as: "This bag is very light."?',
      o: ['Please switch on the light.', 'Her jacket is light, not heavy.', 'The light of the sun is warm.', 'He lit a light.'], a: 1,
      why: 'Here "light" means not heavy — a weight, not a lamp.' },

    { sec: 'hots', t: 'mcq', q: 'Which sentence is grammatically CORRECT?',
      o: ['She don’t like mangoes.', 'She doesn’t likes mangoes.', 'She doesn’t like mangoes.', 'She not like mangoes.'], a: 2,
      why: 'With he/she/it we use "doesn’t", and the verb after it stays in its plain form: "like".' },

    { sec: 'hots', t: 'mcq', q: 'What does the proverb "Look before you leap" mean?',
      o: ['Jump as high as you can', 'Think carefully before you act', 'Always look down', 'Never take a risk'], a: 1,
      why: 'It is advice about thinking through what might happen before doing something.' },

    { sec: 'hots', t: 'mcq', q: 'Read: "The library will stay closed on Monday for repairs. It will reopen on Wednesday." How many days is it shut?',
      o: ['1', '2', '3', '4'], a: 1,
      why: 'It is closed on Monday and Tuesday, and open again on Wednesday — so 2 days.' },
  ],
}];
