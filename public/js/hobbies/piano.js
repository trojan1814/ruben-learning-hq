/* Piano — lessons, drills, tips and a practice routine. */

HOBBIES.piano = {
  id: 'piano', name: 'Piano', icon: '🎹', rarity: 'legendary',
  tagline: 'Ten minutes a day beats two hours on Sunday.',
  blurb: 'Hand shape, the keyboard map, reading notes, counting rhythm — and how to practise so it actually sticks.',
  goal: 20, // target minutes per day

  routine: [
    { m: 3,  h: 'Warm up', p: 'Five-finger position, hands separately, slow and even. Listen for one finger louder than the rest.' },
    { m: 5,  h: 'Scales or exercises', p: 'Whatever the teacher set. Slow enough to be perfect, then a notch faster.' },
    { m: 8,  h: 'The hard bit', p: 'NOT the whole piece — the two or three bars that keep going wrong. Five correct repeats in a row, then move on.' },
    { m: 4,  h: 'Play it through', p: 'One run of the piece for fun. Do not stop for mistakes; just keep going, like a real performance.' },
  ],

  lessons: [
    { id: 'p1', title: 'Sit like a pianist', icon: '🪑', level: 'Set-up',
      cards: [
        { h: 'Bench height and distance', p: 'Sit on the front half of the bench. Elbows should be level with the keys or a touch higher — never below. Sit far enough back that your elbows stay slightly in front of your body.' },
        { h: 'Curved fingers', p: 'Let your arm hang loose by your side, then lift it to the keys without changing the shape. That relaxed curve is the hand shape you want — as if holding a small ball.',
          eg: ['Knuckles up, not collapsed', 'Fingertips on the keys, not flat pads', 'Wrists level with the back of the hand'] },
        { h: 'Feet', p: 'Both feet flat on the floor or on a footstool. If his feet dangle, he will use the bench for balance instead of his core, and the hands tense up.' },
      ],
      drill: { h: 'Floppy-arm test', steps: ['Play a note and hold it', 'Let a grown-up gently lift and drop your wrist', 'If it moves freely, you are relaxed. If it is stiff, shake the arm out and try again'] } },

    { id: 'p2', title: 'Read the keyboard', icon: '🗺️', level: 'Basics',
      cards: [
        { h: 'The black keys come in groups', p: 'Look along the keyboard: two black keys, then three black keys, over and over. That pattern is the map — it tells you where you are without counting from the end.' },
        { h: 'Finding C', p: 'C is the white key immediately to the LEFT of any group of two black keys. Once you can find C anywhere, you can find everything.',
          eg: ['C — left of the group of 2', 'F — left of the group of 3', 'Middle C is the C nearest the middle of the piano'] },
        { h: 'The names only go A to G', p: 'After G it starts again at A. Seven letters, repeating all the way up the piano.' },
      ],
      drill: { h: 'Find-them-all race', steps: ['Set a 30-second timer', 'Play every C on the piano, lowest to highest, saying "C" out loud', 'Repeat with F, then G'] } },

    { id: 'p3', title: 'Finger numbers and C position', icon: '🖐️', level: 'Basics',
      cards: [
        { h: 'Both thumbs are 1', p: 'Thumb 1, index 2, middle 3, ring 4, little finger 5 — on BOTH hands. The numbers count outwards from the thumbs, not left to right.' },
        { h: 'C position', p: 'Right-hand thumb on middle C, then one finger per white key: C D E F G under fingers 1 2 3 4 5. Left hand goes down from middle C the same way.' },
        { h: 'One finger per key', p: 'The whole point is that no hand movement is needed. If the hand is sliding around, the fingers are in the wrong place.' },
      ],
      drill: { h: 'Up and down, eyes closed', steps: ['Right hand in C position', 'Play 1-2-3-4-5-4-3-2-1 slowly and evenly', 'Now close your eyes and do it again — the fingers should already know'] } },

    { id: 'p4', title: 'Counting rhythm', icon: '🥁', level: 'Rhythm',
      cards: [
        { h: 'Notes are worth beats', p: 'A whole note lasts 4 beats, a half note 2, a quarter note 1, and two eighth notes share a single beat.' },
        { table: { head: ['Note', 'Beats', 'Count it as'], rows: [['Whole 𝅝', '4', '1 - 2 - 3 - 4'], ['Half 𝅗𝅥', '2', '1 - 2'], ['Quarter ♩', '1', '1'], ['Two eighths ♫', '1 together', '1 and']] } },
        { h: 'Count OUT LOUD', p: 'Counting in your head is not the same thing. Saying "1 and 2 and 3 and 4 and" out loud while playing is the single fastest fix for uneven rhythm.' },
      ],
      drill: { h: 'Clap before you play', steps: ['Clap the rhythm of the line while counting out loud', 'Only when the clapping is steady, put it on the keys', 'If it falls apart, go back to clapping'] } },

    { id: 'p5', title: 'Reading the treble staff', icon: '🎼', level: 'Reading',
      cards: [
        { h: 'Lines and spaces', p: 'The treble staff has five lines and four spaces. Notes sit either ON a line or IN a space, and each position is one letter name.' },
        { h: 'The two sayings', p: 'Lines from the bottom: E G B D F — "Every Good Boy Deserves Fudge". Spaces from the bottom spell a word by themselves: F A C E.' },
        { h: 'Middle C has its own little line', p: 'Middle C sits just below the treble staff on a short line of its own — a ledger line. That is your anchor between the two hands.' },
      ],
      drill: { h: 'Name five, play five', steps: ['Open any piece', 'Point at five notes in a row and say the letter names out loud — no playing yet', 'Then play those five notes', 'Do this for one line a day'] } },

    { id: 'p6', title: 'How to practise so it sticks', icon: '🎯', level: 'Method',
      cards: [
        { h: 'Slow is the shortcut', p: 'Playing fast with mistakes teaches the mistakes. Play it at the speed where it is perfect, even if that feels painfully slow, then speed up a little at a time.' },
        { h: 'Practise the bar, not the piece', p: 'Starting from the top every time means the first line gets brilliant and the middle never improves. Find the two bars that break, and practise only those.' },
        { h: 'Five in a row', p: 'A bar is learnt when you can play it correctly five times in a row. Get it wrong on the fourth? Back to one. It sounds harsh — it works.' },
        { tip: 'Always finish practice with something he can already play well. Ending on a win is what makes him want to sit down again tomorrow.' },
      ],
      drill: { h: 'Hands separately, then together', steps: ['Right hand alone, slow, 3 times perfect', 'Left hand alone, slow, 3 times perfect', 'Both hands at HALF that speed', 'Only speed up when both hands together are perfect'] } },
  ],

  tips: [
    { icon: '⏰', h: '15 minutes daily beats 2 hours weekly', p: 'Fingers learn by repetition spread over days. Little and often wins every time.' },
    { icon: '✂️', h: 'Short nails', p: 'Long nails force flat fingers and a clicking sound. Trim before practice.' },
    { icon: '🗣️', h: 'Say it out loud', p: 'Note names, finger numbers, counting — saying them aloud doubles how fast they are learnt.' },
    { icon: '🐢', h: 'Metronome slow', p: 'Set it slower than feels necessary. If he can play it perfectly at 60, he will play it at 100 within a week.' },
    { icon: '🔁', h: 'Never restart from the top', p: 'When a mistake happens, fix that spot. Do not run the whole piece again to get to it.' },
    { icon: '🎧', h: 'Listen to the piece', p: 'Hearing a good recording of what he is learning makes reading it far easier — he knows where it is going.' },
    { icon: '📱', h: 'Record him once a week', p: 'He will hear things he cannot feel while playing, and a month of recordings is hugely motivating.' },
    { icon: '🎵', h: 'Learn one fun piece alongside the set work', p: 'A theme from a game or film keeps the habit alive when the exercises get dull.' },
  ],
};
