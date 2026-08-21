/* ============================================================
   CURRICULUM — Class 3 (NCERT / CBSE aligned)

   Every subject file registers itself into CURRICULUM.

   UNIT SHAPE
   ----------
   {
     id:    'ma1',                     unique across the subject
     title: 'Numbers up to 9,999',
     icon:  '🔢',
     goal:  'One line describing what he can do after this unit.',
     lesson: [                          teaching cards, shown before the quiz
       { h: 'Heading', p: 'Paragraph of explanation.' },
       { h: 'Heading', p: '...', eg: ['example line', 'another'] },
       { tip: 'A short highlighted tip.' },
       { table: { head: ['A','B'], rows: [['1','2']] } }
     ],
     questions: [
       { t:'mcq',   q:'Question?', o:['a','b','c','d'], a:2, why:'Explanation.' },
       { t:'input', q:'Question?', a:['725','725.0'],   why:'Explanation.' },
       { t:'tf',    q:'Statement.', a:true,             why:'Explanation.' },
       { t:'match', q:'Match them up.', pairs:[['left','right'], ...] }
     ]
   }

   'a' for mcq is the zero-based index of the correct option.
   'a' for input is an array of accepted answers (compared case-insensitively,
   trimmed, and with commas/spaces in numbers ignored).
   ============================================================ */

const CURRICULUM = {};
