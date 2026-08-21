/* Golf — lessons, drills, tips and a range routine. */

HOBBIES.golf = {
  id: 'golf', name: 'Golf', icon: '⛳', rarity: 'uncommon',
  tagline: 'Grip, aim, balance. Everything else is decoration.',
  blurb: 'The grip, the set-up, a swing that turns instead of lifts, plus putting, chipping and the etiquette every junior needs.',
  goal: 30,

  routine: [
    { m: 5,  h: 'Putting first', p: 'Ten putts from 3 feet until five go in a row. It builds confidence and it is where scores are actually made.' },
    { m: 10, h: 'Chipping', p: 'Land the ball on a towel or headcover from three different distances. Aim for where it LANDS, not where it stops.' },
    { m: 10, h: 'Half swings', p: 'Waist-high to waist-high with a 7-iron. Balance and contact matter far more than distance at this age.' },
    { m: 5,  h: 'Full swings, finish held', p: 'Ten full swings, each one held in the finish position for three seconds. If he cannot hold it, he swung too hard.' },
  ],

  lessons: [
    { id: 'g1', title: 'The grip', icon: '🤝', level: 'Fundamentals',
      cards: [
        { h: 'It is a hold, not a grab', p: 'The club sits in the FINGERS of the lead hand (left hand for a right-hander), not squeezed in the palm. Fingers give you speed; palms take it away.' },
        { h: 'Two knuckles', p: 'Looking down at the lead hand, he should see about two knuckles. The "V" between thumb and index finger on both hands should point up towards his trail shoulder.' },
        { h: 'Joining the hands', p: 'At nine, small hands often do best with a ten-finger (baseball) grip, with the hands touching. Overlap and interlock both work later — the important part is that the hands act as one unit.' },
        { tip: 'Grip pressure about 5 out of 10 — firm enough that the club will not twist, loose enough that his forearms stay soft.' },
      ],
      drill: { h: 'Re-grip ten times', steps: ['Set the grip, check the two knuckles, then let go completely', 'Do it ten times before every session', 'Good grips are built by repetition off the course, not mid-swing'] } },

    { id: 'g2', title: 'Set-up: stance, posture, aim', icon: '📐', level: 'Fundamentals',
      cards: [
        { h: 'Posture — tilt from the hips', p: 'Stand tall, then bow forward from the hips (not the waist) so the bottom sticks out slightly. Small knee flex, arms hanging straight down under the shoulders.' },
        { h: 'Stance width', p: 'Feet about shoulder-width for a mid-iron, a little narrower for wedges, a little wider for a driver.' },
        { h: 'Ball position', p: 'Middle of the stance for short irons, one ball forward for mid-irons, and just inside the lead heel for the driver.' },
        { h: 'Aim the clubface FIRST', p: 'Set the clubface at the target, then build the stance parallel to the target line — like railway tracks. Most juniors aim their body at the flag, which sends the ball right.' },
      ],
      drill: { h: 'Railway tracks', steps: ['Lay one club on the ground pointing at the target', 'Lay a second club parallel, along his toes', 'Hit five balls with both clubs down, then five without'] } },

    { id: 'g3', title: 'The swing: turn, do not lift', icon: '🌀', level: 'Full swing',
      cards: [
        { h: 'The chest does the work', p: 'The backswing is the chest and shoulders turning away from the target. Arms just go along for the ride. Lifting the arms without turning is the most common junior fault.' },
        { h: 'L to L', p: 'Halfway back, the lead arm and the club shaft should make an L. Halfway through, the trail arm and shaft make a mirror-image L. Get those two positions and the middle looks after itself.' },
        { h: 'Finish facing the target', p: 'A good swing ends with weight on the front foot, belt buckle at the target and the back foot up on its toe — balanced enough to hold for three seconds.' },
        { tip: 'Swing at 70% power. Almost every junior hits the ball further at 70% than at 100%, because the strike is centred.' },
      ],
      drill: { h: 'Hold the finish', steps: ['Hit a shot and freeze the finish for a slow count of three', 'If he wobbles or steps, that swing was too hard', 'Ten balls, ten held finishes'] } },

    { id: 'g4', title: 'Putting', icon: '🥅', level: 'Short game',
      cards: [
        { h: 'The pendulum', p: 'Shoulders rock the arms and putter as one triangle. Hands and wrists stay quiet — no flick at the ball.' },
        { h: 'Eyes over the ball', p: 'Set up so the eyes are directly above the ball. Drop a ball from between his eyes: it should land on top of the one on the ground.' },
        { h: 'Same length back and through', p: 'Distance comes from how long the stroke is, not from hitting harder. Short back, long through, every time.' },
      ],
      drill: { h: 'The gate and the ladder', steps: ['Gate: two tees just wider than the putter, swing through without touching them', 'Ladder: putt to 3, 6 and 9 feet in turn, then back down', 'Finish with five 3-footers holed in a row'] } },

    { id: 'g5', title: 'Chipping around the green', icon: '⛳', level: 'Short game',
      cards: [
        { h: 'Set up small', p: 'Narrow stance, feet slightly open, about 60% of the weight on the lead foot and hands a touch ahead of the ball. Keep that weight forward the whole way through.' },
        { h: 'No wrist flick', p: 'Chipping is a small version of the putting stroke with a lofted club. Trying to scoop the ball into the air is what causes thin and fat shots — the loft does the lifting.' },
        { h: 'Pick a landing spot', p: 'Choose the exact spot the ball should LAND, usually a couple of steps onto the green, and let it roll from there. Aiming at the hole in the air rarely works.' },
      ],
      drill: { h: 'Towel landing zone', steps: ['Put a towel two steps onto the green', 'Chip ten balls trying to land each on the towel', 'Change clubs — 9-iron rolls further, sand wedge stops sooner'] } },

    { id: 'g6', title: 'Rules and etiquette', icon: '🎩', level: 'On the course',
      cards: [
        { h: 'Safety comes first', p: 'Never swing a club when anyone is near. Never hit until the group ahead is out of range. Shout "FORE!" loudly the moment a ball heads anywhere near a person.' },
        { h: 'Leave it better than you found it', p: 'Replace divots, rake the bunker behind you, and fix your ball mark on the green (plus one more).' },
        { h: 'Keep up', p: 'Be ready to play when it is your turn, and let a faster group through. "Ready golf" — whoever is ready hits — is normal now.' },
        { h: 'Count every shot', p: 'Golf is the game where players call penalties on themselves. Counting honestly, even on a bad hole, is the whole culture of the sport.' },
        { tip: 'Stand still and stay quiet while someone else is hitting, and never stand directly behind or in front of them.' },
      ],
      drill: { h: 'Nine-hole honesty round', steps: ['Play nine holes and write down every single stroke', 'Add penalties yourself', 'Compare the score to last time — the number matters less than the honesty'] } },
  ],

  tips: [
    { icon: '🎯', h: 'Putt more than you drive', p: 'Roughly 40% of shots in a round are putts. Practice time should reflect that.' },
    { icon: '⚖️', h: 'Balance beats power', p: 'If he cannot hold his finish, he swung too hard. Centre-face contact goes further than a wild lash.' },
    { icon: '📏', h: 'Clubs must fit', p: 'Adult clubs cut down are too heavy and too stiff. Junior-flex, properly sized clubs change everything at this age.' },
    { icon: '👀', h: 'Aim the face, then the feet', p: 'Always in that order. Body first is why so many shots leak right.' },
    { icon: '🧊', h: 'One thought per swing', p: 'Kids cannot hold five swing thoughts. Pick one for the session and stick to it.' },
    { icon: '🏌️', h: 'Play, do not just practise', p: 'Nine holes teaches decisions, pace and pressure that a bucket of range balls never will.' },
    { icon: '💧', h: 'Water and a snack', p: 'A nine-hole round is a two-hour walk. Tired kids swing badly and stop enjoying it.' },
    { icon: '😀', h: 'Bad holes are normal', p: 'Even tour pros make double bogeys. The skill is starting the next hole fresh.' },
  ],
};
