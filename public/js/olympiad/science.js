/* International Science Olympiad (ISO) — Class 3
   35 questions: 20 core · 10 logical reasoning · 5 HOTs
   Modelled on published Class 3 previous-year papers. */

OLYMPIAD_PAPERS.science = [{
  id: 'iso-1',
  title: 'ISO Mock Paper 1',
  questions: [

    /* ---------------- Section 1 — Core (20) ---------------- */
    { sec: 'core', t: 'mcq', q: 'Which of these is a living thing?',
      o: ['A moving car', 'A growing mushroom', 'A flowing river', 'A burning candle'], a: 1,
      why: 'Living things grow, breathe, feed and reproduce on their own. A car moves but only because we drive it.' },

    { sec: 'core', t: 'mcq', q: 'Which part of a plant makes food?',
      o: ['Root', 'Stem', 'Leaf', 'Flower'], a: 2,
      why: 'Leaves make food using sunlight, water and air. That process is called photosynthesis.' },

    { sec: 'core', t: 'mcq', q: 'Which part of the plant carries water from the roots to the leaves?',
      o: ['Stem', 'Petal', 'Fruit', 'Seed'], a: 0,
      why: 'The stem holds the plant up and carries water and food between the roots and the leaves.' },

    { sec: 'core', t: 'mcq', q: 'Two means of WATER transport are:',
      o: ['Boat and submarine', 'Ship and helicopter', 'Boat and car', 'Yacht and tram'], a: 0,
      why: 'Both a boat and a submarine travel on or under water. Helicopters fly, cars and trams travel on land.' },

    { sec: 'core', t: 'mcq', q: 'Which food is the richest source of calcium for strong bones and teeth?',
      o: ['Rice', 'Milk', 'Sugar', 'Cooking oil'], a: 1,
      why: 'Milk and other dairy foods are packed with calcium, which builds bones and teeth.' },

    { sec: 'core', t: 'mcq', q: 'Which of these gives us energy to run and play?',
      o: ['Vitamins', 'Carbohydrates', 'Water', 'Minerals'], a: 1,
      why: 'Carbohydrates — rice, roti, potatoes, bread — are the body’s main energy foods.' },

    { sec: 'core', t: 'mcq', q: 'Wool and silk are fibres that come from:',
      o: ['Plants', 'Animals', 'Rocks', 'Factories only'], a: 1,
      why: 'Wool comes from sheep and silk comes from silkworms. Cotton and jute are the plant fibres.' },

    { sec: 'core', t: 'mcq', q: 'A camel is well suited to the desert because it:',
      o: ['Has gills to breathe', 'Stores fat in its hump and can go days without water', 'Has thick white fur', 'Sleeps all winter'], a: 1,
      why: 'Its hump stores fat for energy, and its body loses very little water — perfect for a hot, dry habitat.' },

    { sec: 'core', t: 'mcq', q: 'Which organ pumps blood around the body?',
      o: ['Lungs', 'Brain', 'Heart', 'Stomach'], a: 2,
      why: 'The heart is a muscle that pumps blood to every part of the body, all day and night.' },

    { sec: 'core', t: 'mcq', q: 'We breathe in oxygen using our:',
      o: ['Lungs', 'Liver', 'Kidneys', 'Bones'], a: 0,
      why: 'Air goes down the windpipe into the lungs, where the body takes the oxygen out of it.' },

    { sec: 'core', t: 'mcq', q: 'Which habit best prevents the spread of germs?',
      o: ['Eating fast', 'Washing hands with soap before eating', 'Drinking cold water', 'Sleeping late'], a: 1,
      why: 'Soap and water wash germs off the hands before they can get into your mouth with food.' },

    { sec: 'core', t: 'mcq', q: 'Which substance does NOT dissolve in water?',
      o: ['Salt', 'Sugar', 'Sand', 'Lemon juice'], a: 2,
      why: 'Sand stays as visible grains and settles at the bottom — it is insoluble in water.' },

    { sec: 'core', t: 'mcq', q: 'A gas takes:',
      o: ['A fixed shape and fixed volume', 'The shape of its container and fills it completely', 'A fixed shape but no fixed volume', 'No space at all'], a: 1,
      why: 'Gases have neither a fixed shape nor a fixed volume — they spread out to fill whatever holds them.' },

    { sec: 'core', t: 'mcq', q: 'When water is heated to 100 °C it changes into steam. This change is called:',
      o: ['Melting', 'Freezing', 'Evaporation', 'Condensation'], a: 2,
      why: 'Liquid turning into gas is evaporation. Gas turning back into liquid is condensation.' },

    { sec: 'core', t: 'mcq', q: 'Which of these is the best way to save water at home?',
      o: ['Leaving the tap running while brushing', 'Washing the car with a hose daily', 'Fixing leaking taps', 'Taking longer showers'], a: 2,
      why: 'A dripping tap can waste many litres a day. Fixing leaks is the easiest saving there is.' },

    { sec: 'core', t: 'mcq', q: 'Rainwater harvesting means:',
      o: ['Growing rice in the rain', 'Collecting and storing rainwater for later use', 'Watching the weather', 'Making rain'], a: 1,
      why: 'Rainwater is collected from roofs and stored in tanks or sent underground instead of being wasted.' },

    { sec: 'core', t: 'mcq', q: 'We can see objects because they:',
      o: ['Make their own light', 'Reflect light into our eyes', 'Are always hot', 'Make a sound'], a: 1,
      why: 'Most things do not glow. They bounce (reflect) light into our eyes, and that is what we see.' },

    { sec: 'core', t: 'mcq', q: 'A shadow is formed when:',
      o: ['Light passes through an object', 'An opaque object blocks light', 'An object is very small', 'The Sun sets'], a: 1,
      why: 'Opaque objects block light, and the dark patch behind them is the shadow.' },

    { sec: 'core', t: 'mcq', q: 'Sound is produced by:',
      o: ['Vibrations', 'Light', 'Heat only', 'Gravity'], a: 0,
      why: 'Every sound starts with something vibrating — a guitar string, a drum skin, your vocal cords.' },

    { sec: 'core', t: 'mcq', q: 'Which instrument is used to measure temperature?',
      o: ['Barometer', 'Thermometer', 'Rain gauge', 'Anemometer'], a: 1,
      why: 'A thermometer measures how hot or cold something is. A rain gauge measures rainfall.' },

    /* ---------------- Section 2 — Logical Reasoning (10) ---------------- */
    { sec: 'lr', t: 'mcq', q: 'Which one does NOT belong with the others?',
      o: ['Cow', 'Goat', 'Tiger', 'Sheep'], a: 2,
      why: 'Cows, goats and sheep are herbivores. The tiger is a carnivore.' },

    { sec: 'lr', t: 'mcq', q: 'Fish is to Water as Bird is to ___',
      o: ['Nest', 'Air', 'Tree', 'Feather'], a: 1,
      why: 'A fish moves through water in the same way a bird moves through air.' },

    { sec: 'lr', t: 'mcq', q: 'What comes next? Seed → Seedling → Plant → ___',
      o: ['Soil', 'Tree with flowers and fruit', 'Water', 'Root'], a: 1,
      why: 'This is the life cycle of a plant: it grows up and then makes flowers, fruit and new seeds.' },

    { sec: 'lr', t: 'mcq', q: 'All roses are flowers. Some flowers are red. Which must be TRUE?',
      o: ['All roses are red', 'All flowers are roses', 'Roses are flowers', 'No rose is red'], a: 2,
      why: 'Only the first statement is guaranteed. The rest go beyond what we were told.' },

    { sec: 'lr', t: 'mcq', q: 'Which of these belongs in the group: Eye, Ear, Nose, ___',
      o: ['Shoe', 'Tongue', 'Chair', 'Ball'], a: 1,
      why: 'They are all sense organs. The tongue is the fifth one, with the skin.' },

    { sec: 'lr', t: 'mcq', q: 'If summer comes after spring and autumn comes after summer, which season comes just before spring?',
      o: ['Winter', 'Summer', 'Autumn', 'Monsoon'], a: 0,
      why: 'The cycle runs spring → summer → autumn → winter → back to spring.' },

    { sec: 'lr', t: 'mcq', q: 'Odd one out by habitat:',
      o: ['Frog', 'Crocodile', 'Eagle', 'Turtle'], a: 2,
      why: 'Frogs, crocodiles and turtles live both in water and on land. The eagle does not.' },

    { sec: 'lr', t: 'mcq', q: 'Cotton comes from a plant and wool comes from an animal. Which pair is matched the SAME way?',
      o: ['Silk — plant', 'Jute — plant', 'Leather — plant', 'Nylon — animal'], a: 1,
      why: 'Jute, like cotton, is a plant fibre. Silk and leather come from animals; nylon is man-made.' },

    { sec: 'lr', t: 'mcq', q: 'Arrange from smallest to largest: Earth, Moon, Sun.',
      o: ['Sun, Earth, Moon', 'Moon, Earth, Sun', 'Earth, Moon, Sun', 'Moon, Sun, Earth'], a: 1,
      why: 'The Moon is smaller than the Earth, and the Sun is far bigger than both.' },

    { sec: 'lr', t: 'mcq', q: 'A thermometer is to temperature as a clock is to ___',
      o: ['Weight', 'Time', 'Length', 'Speed'], a: 1,
      why: 'Each instrument measures one thing: thermometer → temperature, clock → time.' },

    /* ---------------- Section 3 — HOTs (5) ---------------- */
    { sec: 'hots', t: 'mcq', q: 'A plant is kept in a dark cupboard for two weeks but watered normally. What will most likely happen?',
      o: ['It grows faster', 'Its leaves turn pale and it weakens', 'It grows more flowers', 'Nothing changes'], a: 1,
      why: 'Without light the leaves cannot make food, so the plant turns pale yellow and gets weak.' },

    { sec: 'hots', t: 'mcq', q: 'Wet clothes dry fastest on a day that is:',
      o: ['Hot and windy', 'Cold and still', 'Cool and rainy', 'Warm and foggy'], a: 0,
      why: 'Heat and moving air both speed up evaporation, so hot + windy dries clothes quickest.' },

    { sec: 'hots', t: 'mcq', q: 'You see lightning and hear the thunder a few seconds later. Why?',
      o: ['Thunder happens later', 'Light travels much faster than sound', 'Sound is louder', 'The cloud moved'], a: 1,
      why: 'They happen together, but light reaches you almost instantly while sound takes about 3 seconds per kilometre.' },

    { sec: 'hots', t: 'mcq', q: 'Ice is left in two glasses — one wrapped in a woollen cloth, one open. Which melts faster and why?',
      o: ['The wrapped one, wool is warm', 'The open one, wool keeps the heat out', 'Both at the same speed', 'Neither melts'], a: 1,
      why: 'Wool is an insulator: it slows heat from the room reaching the ice, so the open glass melts first.' },

    { sec: 'hots', t: 'mcq', q: 'A boy stands 2 m from a lamp, then moves to 1 m from it. What happens to his shadow on the wall behind?',
      o: ['It gets smaller', 'It gets bigger', 'It disappears', 'It stays the same'], a: 1,
      why: 'The closer he is to the light, the more light he blocks — so the shadow grows larger.' },
  ],
}];
