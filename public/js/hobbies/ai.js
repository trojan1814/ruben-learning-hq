/* AI — how it actually works, how to prompt it well, and how to build
   things with it. Written for a 9-year-old, honest about the limits. */

HOBBIES.ai = {
  id: 'ai', name: 'AI', icon: '🤖', rarity: 'mythic',
  tagline: 'Learn to drive it, not just ride in it.',
  blurb: 'What AI really is, how to write prompts that work, how to build your own game with it — and how to spot when it is wrong.',
  goal: 15,
  routineTitle: '🧪 The prompt workout',
  routine: [
    { m: 3, h: 'Ask something you already know', p: 'Ask about a topic he knows well — Pokémon, football, his own school. When the AI slips up he will SEE it, and that lesson sticks harder than any warning.' },
    { m: 5, h: 'Write one four-part prompt', p: 'Role, Task, Details, Format. Write it out properly before pressing enter. Compare the answer to a lazy one-line version of the same question.' },
    { m: 5, h: 'Push back twice', p: 'Never accept the first answer. "Make it shorter." "Explain it like I am 9." "Give me three more ideas." The second and third replies are where the good stuff is.' },
    { m: 2, h: 'Fact-check one claim', p: 'Pick one thing the AI stated and check it somewhere else. Every single session.' },
  ],

  lessons: [
    { id: 'a1', title: 'What AI actually is', icon: '🧠', level: 'How it works',
      cards: [
        { h: 'It is a pattern machine, not a brain',
          p: 'AI is a computer program that has read an enormous amount of text and learned which words tend to follow which other words. When you ask it something, it is working out — one word at a time — what a good answer probably looks like. It is very, very good at that, and it is not doing anything else.' },
        { h: 'It is not alive and it does not know you',
          p: 'It has no feelings, no memories of yesterday unless you gave them to it, and no opinions of its own. When it says "I think", that is a style of writing it learned from people, not a thought.' },
        { h: 'Guessing the next word gets you surprisingly far',
          p: 'Say "the cat sat on the ___" and your own brain fills in "mat" instantly. AI does that, but with millions of patterns at once, which is how it can write a poem, explain fractions or spot a bug in code.',
          eg: ['You type: "Write a story about a dragon who is scared of fire"', 'It predicts a likely next word… then the next… then the next', 'A whole story appears, one guess at a time'] },
        { tip: 'Good test for any AI claim: could it have learned this from patterns in text? If yes, believe it cautiously. If it claims to KNOW something private about the world right now, be very suspicious.' },
      ],
      drill: { h: 'Be the AI', steps: ['A grown-up says the first four words of a sentence', 'Ruben says the single most likely next word — no thinking about meaning, just what usually comes next', 'Keep going for ten words and read the sentence back', 'That is exactly the trick the machine is doing'] } },

    { id: 'a2', title: 'How it learned everything', icon: '📚', level: 'How it works',
      cards: [
        { h: 'Training is the reading phase',
          p: 'Before anyone could chat with it, the AI was shown a gigantic pile of text — books, websites, articles — and made to guess hidden words over and over, billions of times. Each wrong guess nudged its settings a tiny bit. That process is called training.' },
        { h: 'It has a cut-off date',
          p: 'The reading stopped at some point. Anything that happened after that, it simply does not know — unless it can search the internet for you. This is why it can be confidently wrong about recent news.' },
        { h: 'Tokens: it does not see letters like you do',
          p: 'The AI chops text into chunks called tokens — roughly word-pieces. That is why it sometimes miscounts the letters in a word or struggles to spell things backwards. It never saw the letters, only the chunks.' },
        { tip: 'Ask any chatbot to count the letter "r" in "strawberry". Watching it fumble a question a 6-year-old can do is the fastest way to understand what it really is.' },
      ],
      drill: { h: 'Find the cut-off', steps: ['Ask the AI: "What is today\'s date?"', 'Ask: "What is the newest thing you know about?"', 'Ask about something that happened last week', 'Write down which answers were right and which were guesses'] } },

    { id: 'a3', title: 'The four-part prompt', icon: '✍️', level: 'Prompting',
      cards: [
        { h: 'Bad prompts get bad answers',
          p: '"Tell me about space" gets a boring, general answer, because you asked a boring, general question. The single biggest skill in using AI is saying exactly what you want.' },
        { h: 'Role · Task · Details · Format',
          p: 'Four things. Say WHO it should be, WHAT to do, the DETAILS that matter, and HOW the answer should look. Nearly every great prompt has all four.' },
        { table: { head: ['Part', 'Ask yourself', 'Example'], rows: [
          ['Role', 'Who should it pretend to be?', '"You are a science teacher for 9-year-olds"'],
          ['Task', 'What exactly should it do?', '"Explain why the sky is blue"'],
          ['Details', 'What must it know?', '"I already know light is made of colours"'],
          ['Format', 'What should it look like?', '"In 5 short bullet points, no big words"'],
        ] } },
        { h: 'Put together',
          p: 'You are a science teacher for 9-year-olds. Explain why the sky is blue. I already know light is made of colours. Answer in 5 short bullet points and finish with one experiment I can do at home.' },
      ],
      drill: { h: 'Upgrade three prompts', steps: ['Write a lazy prompt: "tell me about volcanoes"', 'Now rewrite it with all four parts', 'Run both and put the answers side by side', 'Do this for three different topics'] } },

    { id: 'a4', title: 'Getting a better answer', icon: '🔁', level: 'Prompting',
      cards: [
        { h: 'The first answer is a draft',
          p: 'Professionals almost never use the first reply. Treat it as a starting point and steer: "shorter", "funnier", "give me 5 more", "explain that last bit again".' },
        { h: 'Show it an example',
          p: 'If you want something in a particular style, paste an example. "Write it like this: …" works far better than describing the style in words.' },
        { h: 'Ask it to think out loud',
          p: 'For anything tricky — maths, puzzles, planning — add "explain your steps one at a time". Making it show its working makes it noticeably more accurate, and lets you spot where it went wrong.' },
        { h: 'Give it a limit',
          p: 'Numbers work: "in exactly 3 sentences", "using only words a 9-year-old knows", "under 50 words". Vague requests get vague answers.' },
        { tip: 'Magic follow-up when you are stuck: "What would you need to know from me to answer that better?" It will tell you exactly what your prompt was missing.' },
      ],
      drill: { h: 'Three-turn rule', steps: ['Ask your question', 'Turn 2: make it shorter or simpler', 'Turn 3: ask for something extra — an example, a joke, a quiz question', 'Compare turn 3 to turn 1. It is always better'] } },

    { id: 'a5', title: 'When AI gets it wrong', icon: '⚠️', level: 'Thinking',
      cards: [
        { h: 'It makes things up — confidently',
          p: 'Because it predicts likely-sounding text, it will sometimes invent a fact, a book, a date or a person that does not exist and state it perfectly calmly. That is called a hallucination. It is not lying — it genuinely has no way of knowing the difference.' },
        { h: 'Confidence is not correctness',
          p: 'There is no relationship between how sure it sounds and how right it is. A made-up answer reads exactly like a true one.' },
        { h: 'It can be biased',
          p: 'It learned from text written by people, so it soaked up their assumptions too. If an answer feels unfair or one-sided, say so and ask for the other side.' },
        { h: 'Always check anything that matters',
          p: 'Homework facts, dates, numbers, anything you are going to repeat to someone else — check it somewhere else first. Use AI to explain and to draft, not as your only source of truth.' },
        { tip: 'House rule: if you would be embarrassed to be wrong about it, check it.' },
      ],
      drill: { h: 'Hallucination hunt', steps: ['Ask the AI for facts about something you know inside out', 'Read carefully and find at least one thing that is wrong or fuzzy', 'Tell it: "that is not right, check again"', 'Watch what it does — does it fix it, or apologise and make up something new?'] } },

    { id: 'a6', title: 'Safe and fair AI rules', icon: '🛡️', level: 'Thinking',
      cards: [
        { h: 'Never share private things',
          p: 'No full name, address, school, phone number, passwords or photos of yourself. Once it is typed in, treat it as public forever.' },
        { h: 'A grown-up knows what you are using',
          p: 'Which AI tools he uses, and roughly what for, is a conversation with a parent — not a secret.' },
        { h: 'Do not hand in AI work as your own',
          p: 'Using AI to explain a topic, quiz you or check your spelling is smart. Copying its answer into your homework is cheating, and teachers can tell. The rule is simple: AI can help you learn it, it cannot learn it for you.' },
        { h: 'Be kind to it, and about it',
          p: 'Not because it has feelings — it does not — but because how you talk when nobody is watching is a habit, and habits leak.' },
        { tip: 'If an AI ever says something scary, mean or strange, close it and tell a grown-up. It is a program having a glitch, not a person threatening you.' },
      ],
      drill: { h: 'Write the house rules', steps: ['Ruben writes 5 AI rules for this house, in his own words', 'A grown-up writes 5 too', 'Compare, argue, agree on the final list', 'Stick it on the wall near the computer'] } },

    { id: 'a7', title: 'Build your own game with AI', icon: '🎮', level: 'Building',
      cards: [
        { h: 'Start tiny and finishable',
          p: 'Not "an open-world RPG". Something like: a catch-the-falling-apples game, a quiz, a maze, a clicker. One screen, one rule, one score. You can always add more once it runs.' },
        { h: 'Describe it like a recipe',
          p: 'Tell the AI four things: what the player SEES, what they DO, how they WIN and how they LOSE. That is a complete game design.',
          eg: ['SEE: a basket at the bottom, apples falling from the top',
               'DO: move the basket left and right with the arrow keys',
               'WIN: catch 20 apples',
               'LOSE: miss 3 apples'] },
        { h: 'The prompt that works',
          p: 'Say: "You are a game programmer. Make me a single HTML file I can double-click to play. It should be a game where… Use plain JavaScript, no libraries. Add comments so a 9-year-old can read it. Give me the whole file."' },
        { h: 'Then change ONE thing at a time',
          p: 'Make the apples faster. Add a bomb you must avoid. Add a high score. Change one thing, test it, keep it if it works. That is how real games get built.' },
        { tip: 'If the code breaks, paste the error message back and say "this error came up, fix it and give me the whole file again". Asking for the whole file every time saves a lot of confusion.' },
      ],
      drill: { h: 'Ship one game this week', steps: ['Write the SEE / DO / WIN / LOSE for your idea', 'Get the first working version from the AI', 'Make three changes of your own', 'Show someone and watch them play it without helping them'] } },

    { id: 'a8', title: 'Other cool things to try', icon: '✨', level: 'Building',
      cards: [
        { h: 'Make it quiz YOU',
          p: '"You are a quizmaster. Ask me 10 questions about the water cycle, one at a time. Wait for my answer before the next one, and tell me if I am right." This turns any topic into a game and is genuinely one of the best ways to revise.' },
        { h: 'Explain-it-five-ways',
          p: 'Stuck on something? "Explain long division five different ways: as a story, as a picture in words, with Lego, with money, and in one sentence." One of the five will click.' },
        { h: 'Story machine',
          p: '"Write a story where I am the hero and my dog can talk. Stop every few paragraphs and ask me what I do next." An interactive adventure that he steers.' },
        { h: 'Art prompts',
          p: 'Image tools want the same four parts: subject, style, detail, mood. "A red dragon (subject), in the style of a comic book (style), curled around a lighthouse (detail), stormy and dramatic (mood)."' },
        { h: 'Turn it into a teacher',
          p: '"You are a chess coach. Look at these moves and tell me the ONE biggest mistake I made, and how to fix it." Specific beats general, every time.' },
        { h: 'Plan something real',
          p: 'A birthday party, a Lego build order, a 3D print project, a week of piano practice. AI is good at turning a vague idea into a checklist.' },
      ],
      drill: { h: 'Five uses in five days', steps: ['Monday: make it quiz you on a school topic', 'Tuesday: explain-it-five-ways on something confusing', 'Wednesday: write an interactive story', 'Thursday: plan a real project', 'Friday: build or improve your game'] } },
  ],

  tips: [
    { icon: '🎯', h: 'Specific in, specific out', p: 'The quality of the answer is set by the quality of the question. This is the whole skill.' },
    { icon: '🗣️', h: 'Say who it should be', p: 'Starting with "You are a…" changes the entire answer. It is the cheapest upgrade there is.' },
    { icon: '📏', h: 'Give it a size and a shape', p: '"3 bullet points", "under 50 words", "as a table". Otherwise you get a wall of text.' },
    { icon: '🔍', h: 'Check anything that matters', p: 'It can invent facts that sound perfect. Confidence tells you nothing about correctness.' },
    { icon: '🔒', h: 'Nothing private, ever', p: 'No real name, address, school or photos. Typed in means public.' },
    { icon: '🧩', h: 'One change at a time', p: 'When building, change a single thing and test. Ten changes at once and you cannot tell what broke it.' },
    { icon: '🏫', h: 'It helps you learn, it does not learn for you', p: 'Use it to explain and quiz. Handing in its work is cheating and it shows.' },
    { icon: '💡', h: 'Ask it what it needs', p: '"What would help you answer that better?" is the best unstick button in AI.' },
  ],

  /* The Prompt Lab is scored entirely offline — see HobbiesView.scorePrompt. */
  extra: 'promptLab',
};

/* Weak prompt → strong prompt, for the Prompt Lab examples. */
const PROMPT_EXAMPLES = [
  { weak: 'tell me about dogs',
    strong: 'You are a vet. Explain how to look after a puppy in its first month, for a 9-year-old who has never had a dog. Give me 6 short bullet points and one thing most people get wrong.' },
  { weak: 'help with my maths',
    strong: 'You are a patient maths tutor. I am in Class 3 and I keep getting long division wrong. Show me one worked example step by step, then give me 3 practice questions and wait for my answers.' },
  { weak: 'make a game',
    strong: 'You are a game programmer. Make me one HTML file I can double-click to play. The player moves a spaceship left and right with arrow keys, dodging falling rocks. Win at 30 seconds, lose on one hit. Plain JavaScript, no libraries, with comments a 9-year-old can read.' },
  { weak: 'write a story',
    strong: 'Write a funny 200-word story for a 9-year-old about a goalkeeper who is secretly a robot. Use short sentences, end on a cliffhanger, and stop to ask me what should happen next.' },
];
