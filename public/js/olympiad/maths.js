/* International Maths Olympiad (IMO) — Class 3
   35 questions: 20 core · 10 logical reasoning · 5 HOTs
   Modelled on published Class 3 previous-year papers. */

OLYMPIAD_PAPERS.maths = [{
  id: 'imo-1',
  title: 'IMO Mock Paper 1',
  questions: [

    /* ---------------- Section 1 — Core (20) ---------------- */
    { sec: 'core', t: 'mcq', q: 'In the number 6,472, what is the place value of the digit 4?',
      o: ['4', '40', '400', '4,000'], a: 2,
      why: 'The 4 sits in the hundreds place, so its place value is 4 × 100 = 400.' },

    { sec: 'core', t: 'mcq', q: 'Solve: 437 + 1,405 − 345 − 920',
      o: ['577', '631', '782', '494'], a: 0,
      why: '437 + 1,405 = 1,842. Then 1,842 − 345 = 1,497, and 1,497 − 920 = 577.' },

    { sec: 'core', t: 'mcq', q: 'Which is the largest 4-digit number you can make using 5, 0, 8 and 3 once each?',
      o: ['8,530', '8,503', '8,350', '5,830'], a: 0,
      why: 'Put the biggest digits first: 8, then 5, then 3, then 0 → 8,530.' },

    { sec: 'core', t: 'mcq', q: 'What is 24 × 5?',
      o: ['110', '115', '120', '125'], a: 2,
      why: '24 × 5 = (20 × 5) + (4 × 5) = 100 + 20 = 120.' },

    { sec: 'core', t: 'mcq', q: 'Genny has 18 flowers. She uses two-thirds of them in a bouquet. How many flowers are left over?',
      o: ['6', '8', '12', '16'], a: 0,
      why: 'One-third of 18 is 6, so two-thirds is 12 used. 18 − 12 = 6 left.' },

    { sec: 'core', t: 'mcq', q: 'A bus is meant to leave at 11:20 am but starts 20 minutes late. The journey takes 3 hours 15 minutes. When does it arrive?',
      o: ['2:35 pm', '2:55 pm', '3:05 pm', '1:55 pm'], a: 1,
      why: 'It really leaves at 11:40 am. 11:40 + 3 h = 2:40 pm, + 15 min = 2:55 pm.' },

    { sec: 'core', t: 'mcq', q: 'What is 96 ÷ 8?',
      o: ['11', '12', '13', '14'], a: 1,
      why: '8 × 12 = 96, so 96 ÷ 8 = 12.' },

    { sec: 'core', t: 'mcq', q: 'How many corners (vertices) does a cube have?',
      o: ['6', '8', '10', '12'], a: 1,
      why: 'A cube has 6 faces, 12 edges and 8 corners.' },

    { sec: 'core', t: 'mcq', q: 'Which of these is the same as 3 kg 250 g?',
      o: ['325 g', '3,025 g', '3,250 g', '32,500 g'], a: 2,
      why: '1 kg = 1,000 g, so 3 kg = 3,000 g. 3,000 + 250 = 3,250 g.' },

    { sec: 'core', t: 'mcq', q: 'Riya buys a book for ₹145 and a pen for ₹38. She pays with a ₹200 note. How much change does she get?',
      o: ['₹17', '₹27', '₹55', '₹62'], a: 0,
      why: '₹145 + ₹38 = ₹183. Then ₹200 − ₹183 = ₹17.' },

    { sec: 'core', t: 'mcq', q: 'What comes just before 5,000?',
      o: ['4,999', '5,001', '4,900', '4,099'], a: 0,
      why: 'The number just before means one less: 5,000 − 1 = 4,999.' },

    { sec: 'core', t: 'mcq', q: 'Which fraction is the biggest?',
      o: ['1/2', '1/4', '1/8', '1/16'], a: 0,
      why: 'The more pieces you cut a cake into, the smaller each piece is. Half is the biggest here.' },

    { sec: 'core', t: 'mcq', q: 'A rectangle is 8 cm long and 5 cm wide. What is its perimeter?',
      o: ['13 cm', '26 cm', '40 cm', '18 cm'], a: 1,
      why: 'Perimeter goes all the way round: 8 + 5 + 8 + 5 = 26 cm.' },

    { sec: 'core', t: 'mcq', q: 'How many days are there in the months of June and July together?',
      o: ['60', '61', '62', '59'], a: 1,
      why: 'June has 30 days and July has 31. 30 + 31 = 61.' },

    { sec: 'core', t: 'mcq', q: 'Round 4,673 to the nearest hundred.',
      o: ['4,600', '4,670', '4,700', '5,000'], a: 2,
      why: 'The tens digit is 7, which is 5 or more, so round up: 4,700.' },

    { sec: 'core', t: 'mcq', q: '7 children share 45 sweets equally. How many are left over?',
      o: ['1', '2', '3', '4'], a: 2,
      why: '7 × 6 = 42, so each child gets 6 sweets and 45 − 42 = 3 are left over.' },

    { sec: 'core', t: 'mcq', q: 'Which of these numbers is an even number?',
      o: ['437', '2,561', '1,308', '999'], a: 2,
      why: 'A number is even when its last digit is 0, 2, 4, 6 or 8. Only 1,308 ends in 8.' },

    { sec: 'core', t: 'mcq', q: 'A jug holds 2 litres. A glass holds 250 mL. How many full glasses can you pour from the jug?',
      o: ['4', '6', '8', '10'], a: 2,
      why: '2 L = 2,000 mL. 2,000 ÷ 250 = 8 glasses.' },

    { sec: 'core', t: 'mcq', q: 'The bar chart shows books read: Amy 6, Ben 4, Cara 9, Dev 5. How many more books did Cara read than Ben?',
      o: ['3', '4', '5', '13'], a: 2,
      why: 'Cara 9 − Ben 4 = 5 more books.' },

    { sec: 'core', t: 'mcq', q: 'Count in steps of 25: 25, 50, 75, ___',
      o: ['80', '95', '100', '125'], a: 2,
      why: 'Each step adds 25, so 75 + 25 = 100.' },

    /* ---------------- Section 2 — Logical Reasoning (10) ---------------- */
    { sec: 'lr', t: 'mcq', q: 'What comes next in the pattern? 2, 5, 11, 23, ___',
      o: ['35', '46', '47', '44'], a: 2,
      why: 'Each number is doubled and then 1 is added: 23 × 2 = 46, + 1 = 47.' },

    { sec: 'lr', t: 'mcq', q: 'If CAT is written as DBU, how is DOG written?',
      o: ['EPH', 'EPG', 'DPH', 'CNF'], a: 0,
      why: 'Every letter moves forward one: D→E, O→P, G→H, giving EPH.' },

    { sec: 'lr', t: 'mcq', q: 'Which one is the odd one out?',
      o: ['Square', 'Triangle', 'Circle', 'Rectangle'], a: 2,
      why: 'A circle has no straight sides or corners. All the others do.' },

    { sec: 'lr', t: 'mcq', q: 'Finger is to Hand as Toe is to ___',
      o: ['Leg', 'Foot', 'Shoe', 'Knee'], a: 1,
      why: 'Fingers are part of a hand in the same way toes are part of a foot.' },

    { sec: 'lr', t: 'mcq', q: 'In a race Meera finished ahead of Sam. Sam finished ahead of Ravi. Who came last?',
      o: ['Meera', 'Sam', 'Ravi', 'Cannot say'], a: 2,
      why: 'The order is Meera, then Sam, then Ravi — so Ravi is last.' },

    { sec: 'lr', t: 'mcq', q: 'Which letter is 3 places to the RIGHT of the letter M in the alphabet?',
      o: ['J', 'O', 'P', 'Q'], a: 2,
      why: 'After M comes N, then O, then P. So P.' },

    { sec: 'lr', t: 'mcq', q: 'Look at the mirror image of the word "b d". Which letter does "b" look like in a mirror?',
      o: ['b', 'd', 'p', 'q'], a: 1,
      why: 'A mirror flips left and right, so a "b" appears as a "d".' },

    { sec: 'lr', t: 'mcq', q: 'What comes next? ▲ ▲ ● ▲ ▲ ● ▲ ___',
      o: ['▲', '●', '■', 'Nothing'], a: 0,
      why: 'The group repeats as triangle, triangle, circle. After one triangle comes a second triangle.' },

    { sec: 'lr', t: 'mcq', q: 'Today is Wednesday. What day will it be 10 days from now?',
      o: ['Friday', 'Saturday', 'Sunday', 'Monday'], a: 1,
      why: '7 days from Wednesday is Wednesday again. 3 more days: Thursday, Friday, Saturday.' },

    { sec: 'lr', t: 'mcq', q: 'A clock shows 3:00. Through how many right angles does the minute hand turn in 45 minutes?',
      o: ['1', '2', '3', '4'], a: 2,
      why: 'Every 15 minutes is one right angle (a quarter turn). 45 minutes is three of them.' },

    /* ---------------- Section 3 — HOTs (5) ---------------- */
    { sec: 'hots', t: 'mcq', q: 'A shop sells pencils in boxes of 12. Riya buys 4 boxes and gives 9 pencils to her brother. How many does she have left?',
      o: ['39', '48', '41', '37'], a: 0,
      why: '4 × 12 = 48 pencils. 48 − 9 = 39 left.' },

    { sec: 'hots', t: 'mcq', q: 'A tap fills 15 litres every 5 minutes. How many litres does it fill in half an hour?',
      o: ['45 L', '75 L', '90 L', '150 L'], a: 2,
      why: 'Half an hour is 30 minutes — that is six lots of 5 minutes. 6 × 15 = 90 litres.' },

    { sec: 'hots', t: 'mcq', q: 'I am a 3-digit number. My hundreds digit is double my ones digit, and my tens digit is 0. My ones digit is 4. What number am I?',
      o: ['408', '804', '840', '480'], a: 1,
      why: 'Ones = 4, hundreds = double 4 = 8, tens = 0 → 804.' },

    { sec: 'hots', t: 'mcq', q: 'Amit is 3 years older than Bala. Bala is 2 years younger than Chirag. Chirag is 9. How old is Amit?',
      o: ['8', '9', '10', '11'], a: 2,
      why: 'Bala is 9 − 2 = 7. Amit is 7 + 3 = 10.' },

    { sec: 'hots', t: 'mcq', q: 'A rope 3 m long is cut into pieces 40 cm long. How many full pieces are cut, and how much rope is left?',
      o: ['7 pieces, 20 cm left', '7 pieces, 30 cm left', '8 pieces, 0 cm left', '6 pieces, 60 cm left'], a: 0,
      why: '3 m = 300 cm. 300 ÷ 40 = 7 pieces (7 × 40 = 280) with 300 − 280 = 20 cm left over.' },
  ],
}];
