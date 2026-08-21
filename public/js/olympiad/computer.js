/* International Computer Olympiad (ICO) — Class 3
   35 questions: 20 core · 10 logical reasoning · 5 HOTs
   Modelled on published Class 3 previous-year papers. */

OLYMPIAD_PAPERS.computer = [{
  id: 'ico-1',
  title: 'ICO Mock Paper 1',
  questions: [

    /* ---------------- Section 1 — Core (20) ---------------- */
    { sec: 'core', t: 'mcq', q: 'The "brain" of the computer is the:',
      o: ['Monitor', 'CPU', 'Keyboard', 'Printer'], a: 1,
      why: 'The CPU (Central Processing Unit) does all the thinking and processing.' },

    { sec: 'core', t: 'mcq', q: 'Which of these is an INPUT device?',
      o: ['Monitor', 'Speaker', 'Mouse', 'Printer'], a: 2,
      why: 'Input devices send information INTO the computer. A mouse does; a monitor and printer show results.' },

    { sec: 'core', t: 'mcq', q: 'Which of these is an OUTPUT device?',
      o: ['Scanner', 'Microphone', 'Printer', 'Joystick'], a: 2,
      why: 'A printer takes information OUT of the computer and puts it on paper.' },

    { sec: 'core', t: 'mcq', q: 'How many function keys (F1 to F12) are there on a normal keyboard?',
      o: ['10', '11', '12', '14'], a: 2,
      why: 'They run from F1 all the way to F12 — twelve keys, in a row at the top.' },

    { sec: 'core', t: 'mcq', q: 'Which key is used to make a CAPITAL letter while typing one letter?',
      o: ['Ctrl', 'Shift', 'Alt', 'Tab'], a: 1,
      why: 'Hold Shift and press the letter. Caps Lock keeps every letter capital until you turn it off.' },

    { sec: 'core', t: 'mcq', q: 'Which key deletes the character to the LEFT of the cursor?',
      o: ['Delete', 'Backspace', 'Enter', 'Esc'], a: 1,
      why: 'Backspace rubs out backwards. Delete removes the character to the right.' },

    { sec: 'core', t: 'mcq', q: 'Which of these is a STORAGE device?',
      o: ['Pen drive', 'Monitor', 'Mouse', 'Speaker'], a: 0,
      why: 'A pen drive stores files so you can carry them and use them later.' },

    { sec: 'core', t: 'mcq', q: 'The smallest unit of computer memory is a:',
      o: ['Byte', 'Bit', 'Kilobyte', 'Megabyte'], a: 1,
      why: 'A bit is a single 0 or 1. Eight bits make one byte.' },

    { sec: 'core', t: 'mcq', q: 'A computer is BETTER than a human at:',
      o: ['Feeling emotions', 'Doing the same calculation many times without getting tired', 'Making friends', 'Deciding what is right'], a: 1,
      why: 'Computers are fast, accurate and never get bored — but they have no feelings and no common sense.' },

    { sec: 'core', t: 'mcq', q: 'Which of these is NOT a part of a desktop computer?',
      o: ['Monitor', 'Keyboard', 'Steering wheel', 'CPU'], a: 2,
      why: 'A steering wheel belongs in a car. The rest are computer parts.' },

    { sec: 'core', t: 'mcq', q: 'In MS-Paint, which tool would you use to draw a straight line?',
      o: ['Pencil', 'Line', 'Eraser', 'Fill with colour'], a: 1,
      why: 'The Line tool draws a perfectly straight line between two points.' },

    { sec: 'core', t: 'mcq', q: 'In MS-Paint, which tool fills a closed shape with colour in one click?',
      o: ['Brush', 'Fill with colour (paint bucket)', 'Text', 'Magnifier'], a: 1,
      why: 'The paint bucket floods a closed area with the chosen colour.' },

    { sec: 'core', t: 'mcq', q: 'Which MS-Paint tool removes part of your drawing?',
      o: ['Eraser', 'Picker', 'Curve', 'Select'], a: 0,
      why: 'The Eraser rubs out whatever you drag it over, leaving the background colour.' },

    { sec: 'core', t: 'mcq', q: 'In MS-Word, which command makes a copy of the selected text so you can put it somewhere else?',
      o: ['Cut', 'Copy', 'Delete', 'Undo'], a: 1,
      why: 'Copy leaves the original where it is. Cut removes it and holds it for pasting.' },

    { sec: 'core', t: 'mcq', q: 'Which shortcut key is used to SAVE a document?',
      o: ['Ctrl + S', 'Ctrl + P', 'Ctrl + V', 'Ctrl + Z'], a: 0,
      why: 'Ctrl + S saves. Ctrl + P prints, Ctrl + V pastes and Ctrl + Z undoes.' },

    { sec: 'core', t: 'mcq', q: 'Which command reverses your last action?',
      o: ['Redo', 'Undo', 'Paste', 'Save'], a: 1,
      why: 'Undo (Ctrl + Z) steps backwards. Redo puts the change back again.' },

    { sec: 'core', t: 'mcq', q: 'The internet is best described as:',
      o: ['A single computer', 'A worldwide network of connected computers', 'A type of printer', 'A game'], a: 1,
      why: 'It is millions of computers all over the world, linked together so they can share information.' },

    { sec: 'core', t: 'mcq', q: 'A program used to look at websites is called a:',
      o: ['Browser', 'Scanner', 'Folder', 'Speaker'], a: 0,
      why: 'Chrome, Edge, Firefox and Safari are all web browsers.' },

    { sec: 'core', t: 'mcq', q: 'Which of these is the SAFEST thing to do online?',
      o: ['Share your home address in a game chat', 'Tell an adult if a stranger messages you', 'Click every pop-up you see', 'Use your birthday as your password'], a: 1,
      why: 'Never share personal details online, and always tell a trusted adult about a stranger contacting you.' },

    { sec: 'core', t: 'mcq', q: 'What does a robot vacuum cleaner use to avoid bumping into walls?',
      o: ['Sensors', 'A printer', 'A keyboard', 'A monitor'], a: 0,
      why: 'Sensors are input devices that let a machine detect the world around it.' },

    /* ---------------- Section 2 — Logical Reasoning (10) ---------------- */
    { sec: 'lr', t: 'mcq', q: 'Which one does NOT belong?',
      o: ['Keyboard', 'Mouse', 'Scanner', 'Monitor'], a: 3,
      why: 'The first three are input devices. A monitor is an output device.' },

    { sec: 'lr', t: 'mcq', q: 'Complete the pattern: 1, 2, 4, 8, 16, ___',
      o: ['20', '24', '32', '18'], a: 2,
      why: 'Each number doubles: 16 × 2 = 32. Computers count in doubles like this too.' },

    { sec: 'lr', t: 'mcq', q: 'Keyboard is to Typing as Mouse is to ___',
      o: ['Printing', 'Clicking', 'Saving', 'Singing'], a: 1,
      why: 'Each device is matched with the action you do with it.' },

    { sec: 'lr', t: 'mcq', q: 'If SAVE is written in code as 4321, what is the code for VASE?',
      o: ['3241', '2341', '3214', '1234'], a: 1,
      why: 'From SAVE = 4321: S=4, A=3, V=2, E=1. So V-A-S-E becomes 2-3-4-1 = 2341.' },

    { sec: 'lr', t: 'mcq', q: 'Which comes next in the sequence of steps? Switch on → Log in → ___ → Shut down',
      o: ['Unplug the cable', 'Use the computer', 'Break the screen', 'Switch on again'], a: 1,
      why: 'That is the normal order of using a computer from start to finish.' },

    { sec: 'lr', t: 'mcq', q: 'Odd one out by what it stores:',
      o: ['Pen drive', 'CD', 'Hard disk', 'Loudspeaker'], a: 3,
      why: 'The first three store data. A loudspeaker plays sound — it stores nothing.' },

    { sec: 'lr', t: 'mcq', q: 'A folder contains 3 folders, and each of those contains 4 files. How many files in total?',
      o: ['7', '12', '4', '3'], a: 1,
      why: '3 folders × 4 files each = 12 files.' },

    { sec: 'lr', t: 'mcq', q: 'Which mirror image is correct for the letter "E" held up to a mirror?',
      o: ['E facing the same way', 'E facing backwards', 'E upside down', 'W'], a: 1,
      why: 'A mirror swaps left and right, so the arms of the E point the other way.' },

    { sec: 'lr', t: 'mcq', q: 'Arrange from smallest to largest: Megabyte, Bit, Kilobyte, Byte',
      o: ['Bit, Byte, Kilobyte, Megabyte', 'Byte, Bit, Kilobyte, Megabyte', 'Bit, Kilobyte, Byte, Megabyte', 'Megabyte, Kilobyte, Byte, Bit'], a: 0,
      why: '8 bits = 1 byte, about 1,000 bytes = 1 kilobyte, about 1,000 KB = 1 megabyte.' },

    { sec: 'lr', t: 'mcq', q: 'Continue the shape pattern: ■ ● ■ ● ■ ___',
      o: ['■', '●', '▲', 'Nothing'], a: 1,
      why: 'Square and circle alternate, so a circle comes next.' },

    /* ---------------- Section 3 — HOTs (5) ---------------- */
    { sec: 'hots', t: 'mcq', q: 'You type a page in MS-Word, close it WITHOUT saving, and open the file again. What do you see?',
      o: ['Everything you typed', 'The file as it was before you typed', 'A blank screen forever', 'Only the first line'], a: 1,
      why: 'Unsaved work lives only in temporary memory. Closing without saving throws it away.' },

    { sec: 'hots', t: 'mcq', q: 'Your keyboard types capital letters even when Shift is not pressed. What is the most likely cause?',
      o: ['The mouse is broken', 'Caps Lock is on', 'The monitor is off', 'The printer is out of paper'], a: 1,
      why: 'Caps Lock keeps every letter capital until you press it again to switch it off.' },

    { sec: 'hots', t: 'mcq', q: 'A picture is drawn in MS-Paint and saved. It is opened next day and one wrong line needs removing. Which is BEST?',
      o: ['Press Undo', 'Use the Eraser on that line', 'Delete the whole picture and start again', 'Print it'], a: 1,
      why: 'Undo does not work across sessions once the file has been closed, so erase just that line.' },

    { sec: 'hots', t: 'mcq', q: 'A pen drive holds 8 files of 2 MB each and has 4 MB free. What is the total size of the pen drive?',
      o: ['16 MB', '20 MB', '12 MB', '24 MB'], a: 1,
      why: '8 × 2 MB = 16 MB used, plus 4 MB free = 20 MB in total.' },

    { sec: 'hots', t: 'mcq', q: 'A computer switched on shows a lit power light but a completely black screen. What should you check FIRST?',
      o: ['That the monitor is switched on and its cable is plugged in', 'Buy a new computer', 'Type faster', 'Print a page'], a: 0,
      why: 'The simplest cause first: the CPU has power, so the problem is most likely the monitor or its cable.' },
  ],
}];
