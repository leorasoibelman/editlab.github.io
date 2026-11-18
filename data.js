/* Edit the course below to change weeks, lessons, assignments or resources.
   Each YouTube item is an object with id, title, channel, and why.
   Video IDs are the 11-character codes after watch?v= in YouTube links. */
window.EDIT_LAB_WEEKS = [
  {
    id: 1, category: 'EFFICIENCY', title: 'Fast hands, clean cuts.', short: 'Keyboard fluency',
    description: 'Make the actions you repeat every day automatic. Build a personal layout and stop dragging your way through the timeline.',
    outcome: 'Assemble and refine a sequence without manually dragging trim handles.',
    videos: [
      { id:'uhw50nxeDQY', title:'Edit Faster With These Hotkeys in Premiere Pro', channel:'Adobe Video × Film Riot', why:'See how an experienced editor builds a shortcut layout around their actual habits.' },
      { id:'GZ4t2_m16uk', title:'5 Premiere Pro Keyboard Shortcuts for Faster Editing', channel:'Adobe Video', why:'J/K/L, ripple deletion, and shortcut remapping, demonstrated in a timeline.' }
    ],
    resources: [
      { label:'Adobe Learn: Speed up your workflow', url:'https://www.adobe.com/learn/premiere-pro/web/speed-up-your-workflow' },
      { label:'Noble Desktop: Tricks of the Trade, Ep. 2', url:'https://www.nobledesktop.com/learn/premiere-pro/premiere-pro-tutorial-tricks-of-the-trade-episode-2' },
      { label:'Adobe Video Quick Tips playlist', url:'https://www.youtube.com/playlist?list=PLzTRmaCL97qtGgxrHgVKXise43x1Goby3' }
    ],
    assignment: { title:'The keyboard-only recut', brief:'Recut a 30-second US Open-style vertical. Use the mouse only when you actually need it. Time two attempts and compare.', steps:['Choose 12–20 raw clips and record your baseline time','Use J/K/L, I/O, Q/W, F and edit-point navigation','Save a custom keyboard shortcut layout','Repeat the edit and record your new time'], deliverable:'Two recorded edit times + one saved shortcut layout' },
    tip:'Shortcuts matter most when they eliminate repeated context switches. Keep the layout comfortable, not encyclopedic.'
  },
  {
    id: 2, category: 'EFFICIENCY', title: 'Build a better workflow.', short:'Timeline systems',
    description: 'Move from raw media to structured selects to a finished sequence without rebuilding your edit halfway through.',
    outcome: 'Finish a timed edit faster while keeping a clean, handoff-ready project.',
    videos: [
      { id:'qNsW8HkPkt4', title:'Edit Fast: Top & Tail Editing Keyboard Shortcuts', channel:'Premiere Gal', why:'Use Q/W and timeline navigation to trim without breaking rhythm.' },
      { id:'fMNvFIqLLck', title:'How to Edit Faster With Scene Edit Detection', channel:'Adobe Video × Valentina Vee', why:'Learn when automated scene detection can save prep time, and when it cannot.' }
    ],
    resources: [{label:'Adobe shortcut reference',url:'https://helpx.adobe.com/premiere-pro/using/keyboard-shortcuts.html'}],
    assignment: {title:'The 90-minute turnaround',brief:'Build a 60-second sports recap with a selects sequence, organized bins, audio tracks, and a clean export. Redo a second version and compare.',steps:['Create a consistent bin and sequence naming system','Make a selects timeline before the main cut','Use ripple, rolling, slip, and slide edits where appropriate','Save an export preset and record the elapsed time'],deliverable:'60-second recap + reusable project template + editing time'},
    tip:'A fast editor spends less time searching for footage, repairing sync, or figuring out where a clip went.'
  },
  {
    id: 3, category: 'AUDIO', title: 'Hear the difference.', short:'Dialogue & loudness',
    description: 'Understand loudness, gain, EQ, compression, multiple mics, and the tools that make dialogue sound consistent.',
    outcome: 'Deliver dialogue that sounds natural, clear, consistent, and meets an actual loudness spec.',
    videos: [
      { id:'0T-B2NINRHw', title:'How to Mix Sound for Video in Premiere Pro', channel:'Premiere Gal', why:'A strong Premiere-specific tour of Essential Sound, dialogue cleanup, music and effects.' },
      { id:'pSPi3MjchN8', title:'Split Multi-Channel Audio to Separate Tracks', channel:'Curtis Judd', why:'Essential when you have several microphones or separately recorded camera channels.' },
      { id:'_uerzCQEpg8', title:'Controlling LUFS (Loudness) in Premiere Pro', channel:'VideoRevealed', why:'Learn to measure loudness rather than guessing from peak meters.' }
    ],
    resources:[
      {label:'Javier Mercedes: Advanced audio editing',url:'https://viewinder.com/audio-premiere-pro-advanced/'},
      {label:'Adobe Premiere tutorials: audio mixing',url:'https://helpx.adobe.com/premiere-pro/view-all-tutorials.filter-bar.html'},
      {label:'Curtis Judd: Consistent audio breakdown',url:'https://lensvid.com/technique/how-to-get-loud-consistent-sound-for-video/'}
    ],
    assignment:{title:'Fix the interview',brief:'Take a noisy or uneven 60-second sports interview. Repair speech, balance the speakers, and mix to a clearly specified loudness target.',steps:['Separate and identify mic channels before editing','Level dialogue with clip gain before heavy processing','Use EQ and compression sparingly and deliberately','Measure final loudness and true peak; compare before/after'],deliverable:'Before-and-after dialogue mix + notes explaining the processing chain'},
    tip:'−14 LUFS is a possible practice target for online video, not a universal requirement. Follow the platform or client specification.'
  },
  {
    id: 4, category: 'AUDIO', title: 'Make it feel alive.', short:'Sound design',
    description: 'Build a mix around dialogue, natural sound, atmosphere and music. Create transitions with intention rather than volume alone.',
    outcome: 'Use audio to carry story and momentum, not simply fill silence.',
    videos:[
      {id:'Xn5ZjYMVB7o',title:'The Best Sound Editing Tutorial — Premiere Pro',channel:'Premiere Gal',why:'Track organization, effect automation, low-pass filters and the Audio Track Mixer.'},
      {id:'0T-B2NINRHw',title:'How to Mix Sound for Video — Revisit Music and SFX',channel:'Premiere Gal',why:'Revisit the music and effects sections, this time focusing on mix hierarchy.',start:13*60+21}
    ],
    resources:[{label:'Adobe Essential Sound learning hub',url:'https://helpx.adobe.com/premiere-pro/using/essential-sound-panel.html'}],
    assignment:{title:'The sound-driven sports feature',brief:'Create a 45-second tennis piece featuring a sound-led opening, speech, crowd ambience, music, and a purposeful ending.',steps:['Build a bed of natural sound and room tone','Create smooth J- and L-cut audio transitions','Duck music under spoken words without pumping','Test the mix on headphones and laptop speakers'],deliverable:'45-second video + one exported final mix'},
    tip:'Audio hierarchy beats arbitrary rules: every sound should have a reason to be heard at the level you choose.'
  },
  {
    id: 5, category: 'COLOR', title: 'Learn to read the image.', short:'Scopes & correction',
    description: 'Correct first. Grade second. Use waveforms, vectorscopes and RGB Parade to diagnose actual footage issues.',
    outcome: 'Match technically inconsistent shots before applying a look.',
    videos:[
      {id:'moSKhf-566A',title:'How to Color Grade Any Type of Video in Premiere Pro',channel:'Trentorials',why:'Work from Log or standard footage using the convert → correct → grade workflow.'},
      {id:'knJjc9eg8Kg',title:'The Ultimate Guide to Color Grading in Premiere Pro',channel:'Envato Tuts+',why:'Deep treatment of scopes, skin tone, color correction, and shot matching.',start:5*60+33}
    ],
    resources:[{label:'Original suggested beginner color tutorial',url:'https://www.youtube.com/watch?v=GBqHcCbOY2o'},{label:'Envato: Written guide to color grading',url:'https://photography.tutsplus.com/articles/color-grading-in-premiere-pro--cms-106839'},{label:'Adobe Lumetri color documentation',url:'https://helpx.adobe.com/premiere-pro/using/color-workflows.html'}],
    assignment:{title:'The camera-matching test',brief:'Match six to eight shots from different cameras or lighting conditions. Make individual corrections before designing a shared creative look.',steps:['Identify exposure and white-balance issues before changing sliders','Use waveform, RGB Parade and vectorscope deliberately','Correct each shot individually, not with a single universal LUT','Compare adjacent shots at playback speed'],deliverable:'Matched before/after sequence + screenshots of your scopes'},
    tip:'Scopes tell you what the signal is doing. Your eye and the scene context tell you what it should look like.'
  },
  {
    id: 6, category: 'COLOR', title: 'Find the look.', short:'Grading & consistency',
    description: 'Move beyond one-click LUTs. Separate technical correction, selective adjustments, and an intentional creative look.',
    outcome: 'Develop two distinct grades while maintaining consistency across a sequence.',
    videos:[
      {id:'Fc2Ift2BMRw',title:'Color Correcting in Premiere Pro — HSL Secondary',channel:'Adobe Video × Olufemii',why:'Use HSL Secondary to isolate and refine skin tones without changing the entire image.'},
      {id:'knJjc9eg8Kg',title:'The Ultimate Guide — Matching Clips and Looks',channel:'Envato Tuts+',why:'Revisit matching multiple clips, skin-tone refinement, and adjustment layers.',start:43*60+20}
    ],
    resources:[{label:'Casey Faris: Advanced Lumetri breakdown',url:'https://cinescopophilia.com/advanced-colour-grading-lumetri-adobe-premiere-color-correction-tutorial/'}],
    assignment:{title:'One sequence, two looks',brief:'Use the same 20–30 seconds of footage to create a natural broadcast look and an intentional cinematic grade.',steps:['Keep source correction separate from creative grading','Use HSL Secondary to protect important skin tones','Create a consistent look across all shots','Export a side-by-side comparison for review'],deliverable:'Broadcast grade + cinematic grade + saved effect preset'},
    tip:'A shared adjustment layer is useful for a creative look, but it does not replace per-shot exposure and white-balance correction.'
  },
  {
    id: 7, category: 'MASKING', title: 'Control what gets seen.', short:'Masks & tracking',
    description: 'Master classic masks and 2026 Object Mask workflows, including tracking, edge refinement and practical compositing.',
    outcome: 'Keep a mask convincing across motion without obvious slipping, halos or edge chatter.',
    videos:[
      {id:'0ktE4ks8C58',title:'How to Mask Anything Using the Classic Tools',channel:'Javier Mercedes',why:'Where the traditional pen, ellipse and rectangle tools live in Premiere 2026.'},
      {id:'-kZ-cITWLCk',title:'Masking in Adobe Premiere: Complete Guide 2026',channel:'Adobe Care',why:'Walk through classic masks, the Object Mask tool, tracking and keyframing.'},
      {id:'q2P3ln2tx-U',title:'Adobe Care: Object Mask Guide',channel:'Adobe Care',why:'The official overview of automatic subject isolation and tracking.'},
      {id:'PuQ-q9YQpuM',title:'How to Edit Text Behind Objects',channel:'Adobe Video × Film Riot',why:'Put typography behind a moving subject with realistic tracking and overlap.'}
    ],
    resources:[{label:'Adobe: 2026 masking FAQs and official links',url:'https://community.adobe.com/questions-729/premiere-2026-masking-faqs-links-1555462'},{label:'Adobe Basics: Masking guide',url:'https://adobebasics.com/blogs/news/masking-premiere-pro'},{label:'Blur faces: additional masking demo',url:'https://www.youtube.com/watch?v=276cRXhGDKI'}],
    assignment:{title:'Three masking challenges',brief:'Produce three 5–10 second studies using your own footage. Refine masks manually after the automatic pass when needed.',steps:['Selective face-brightening mask on a moving player','Tracked blur on a moving face or object','A title-behind-athlete effect with clean edges','Inspect each mask frame by frame for slipping and halos'],deliverable:'Three short exports + one screenshot of a refined mask'},
    tip:'When a 2026 masking tutorial looks different from an old one, check the toolbar and clip/frame mode first.'
  },
  {
    id: 8, category: 'FINAL', title: 'Put it all together.', short:'The final edit',
    description: 'Prove the skills in a realistic deliverable. Work to a brief, not just a tutorial, and review the project as if someone else needed to open it.',
    outcome: 'Deliver a polished sports feature and a social cutdown efficiently.',
    videos:[{id:'EJO8dinLWCQ',title:'Editing Cinematic Vertical Video for Social Media',channel:'Adobe Live × James Bonanno',why:'A complete workflow: pancake editing, pacing, audio, color, captions and export.',start:24*60+55}],
    resources:[{label:'Adobe Premiere user guide',url:'https://helpx.adobe.com/premiere-pro/user-guide.html'}],
    assignment:{title:'The 90-second sports feature',brief:'Cut a 60–90 second athlete or behind-the-scenes feature using footage you have permission to edit. Create both a horizontal master and a vertical cutdown.',steps:['Build the cut efficiently with organized media and shortcuts','Deliver a dialogue, music and natural-sound mix to the brief','Match every shot and apply a consistent look','Use masking purposefully and export both aspect ratios'],deliverable:'60–90s master + vertical cutdown + clean Premiere project'},
    tip:'The point is not to use every effect. The point is to solve the brief cleanly and confidently under a deadline.'
  }
];
