// Shared content for every demo. Anything wrapped in TBD() is a placeholder to fill in.
(function () {
  const PUB = '../../../public/';
  const TBD = s => `<span class="tbd" title="placeholder">${s}</span>`;

  const person = {
    name: 'Sterling Kelly',
    first: 'Sterling',
    title: 'Full Stack Software Engineer',
    tagline: 'Full stack engineer, founder, and occasional novelist. I build things and write about it.',
    photo: PUB + 'Sterling.jpg',
    location: TBD('City, ST'),
    email: 'hello@sterlingkelly.dev', // placeholder address
    booking: 'https://cal.com/sterlingkelly', // placeholder booking link
    site: 'https://sterlingkelly.dev',
    github: 'https://github.com/sterlkel',
    linkedin: 'https://www.linkedin.com/in/sterling-kelly-2970241b0/',
    resumePdf: PUB + 'resume.pdf',
    bio: [
      `I'm a full stack engineer who likes building tools that make everyday things a little less annoying, for the people I work with and for myself.`,
      `I studied Information Science at Cornell, co-founded a civic tech company straight out of school, and have spent the years since shipping product on platform teams. ${TBD('One line about the current role.')}`,
      `Outside of work I write. I've published a fantasy novel, and this site is where I'm starting to write more often, mostly about tech, sometimes about life.`,
    ],
  };

  // kind: role | founded | milestone | published
  const timeline = [
    { kind: 'role', start: TBD('20XX'), end: 'Present', title: TBD('Current Title'), org: TBD('Current Company'),
      text: 'Placeholder for the role held the last few years: what you own and the impact.',
      chapter: { head: 'Where I am now.', body: 'Placeholder: a short first-person paragraph about the current role, what the work is and why it matters to you.' } },
    { kind: 'role', start: '2021', end: TBD('20XX'), title: 'Full Stack Software Engineer', org: 'Bonterra',
      text: 'C#, React and SQL on Mobile Messaging and Process Automation for the NGP VAN Action Platform. Led Redux refactors and shipped a payments integration on an expedited timeline.',
      chapter: { head: 'Learning to build at scale.', body: 'After running my own company, I joined a large platform team: Mobile Messaging, Process Automation, and the craft of refactoring something many people depend on every day.' } },
    { kind: 'founded', start: '2020', end: '2022', title: 'Co-Founder & CEO', org: 'Swing Campaign',
      text: 'Built an app that showed people who best represented them. React Native + Django, led design, ran user interviews.',
      chapter: { head: 'Starting something.', body: 'Fresh out of Cornell, I co-founded an app to help people understand who actually represented them, and learned what it means to lead design, engineering and outreach at the same time.' } },
    { kind: 'milestone', start: '2020', title: 'B.A. Information Science', org: 'Cornell University',
      chapter: { head: 'Graduating into a pandemic.', body: 'Cornell gave me the vocabulary for how people and technology shape each other. I graduated in 2020 and started building almost immediately.' } },
    { kind: 'role', start: '2019', end: '2019', title: 'Research Analyst', org: 'Cornell CCT Lab',
      text: 'A Chrome extension that produced toxicity reports for Reddit threads, backed by research into which words start arguments.',
      chapter: { head: 'Where it started.', body: 'Research into which words start arguments online, turned into a browser extension that measured toxicity in Reddit threads. My first taste of shipping something people could use.' } },
    { kind: 'role', start: TBD('20XX'), end: TBD('20XX'), title: 'Full Stack Engineer Intern', org: 'Cobu (formerly Doorbell.me)',
      text: 'Built admin tooling the operations team asked for and talked to residents about what would make the app better.' },
    { kind: 'published', start: TBD('Year?'), title: 'The Unknown', org: 'Jato Lee Chronicles, Book One',
      text: 'A published fantasy novel.',
      chapter: { head: 'Before any of it, a book.', body: 'Long before I wrote software for a living, I wrote a fantasy novel and got it published. I still think about structure, pacing and character when I design products.' } },
  ];

  const projects = [
    { key: 'cli', title: 'sting-cli', pitch: 'A personal command line for notes, AI and automation.', type: 'Tools', year: '2026', stack: ['Python', 'uv', 'Claude API'] },
    { key: 'music', title: 'Apple Music Manager', pitch: 'Tools to tame a sprawling music library.', type: 'Apps', year: '2026', stack: ['Swift', 'AppleScript'] },
    { key: 'meal', title: 'Meal Planner', pitch: 'Plan the week, generate the grocery list.', type: 'Apps', year: '2026', stack: ['TypeScript', 'React'] },
    { key: 'nix', title: 'nix config', pitch: 'My whole machine, declared and reproducible.', type: 'Tools', year: '2026', stack: ['Nix', 'nix-darwin', 'home-manager'] },
    { key: 'swing', title: 'Swing Campaign', pitch: 'A civic app showing who really represents you.', type: 'Ventures', year: '2020', stack: ['React Native', 'Django'] },
    { key: 'book', title: 'The Unknown', pitch: 'A published fantasy novel.', type: 'Writing', year: '—', stack: ['Ink', 'Stubbornness'] },
  ];

  const caseStudy = {
    cli: {
      role: 'Solo · design & engineering', timeline: '2025 – ongoing', links: [['GitHub', 'https://github.com/sterlkel']],
      sections: [
        ['The problem', `My automation lived in a graveyard of shell aliases, one-off Python scripts and launcher commands I forgot existed. The scripts weren't the problem. Finding them again three months later was.`],
        ['The idea', `One entry point, <code>sting</code>, with subcommands for everything: notes, AI helpers, music library chores, calendar glue. If <code>sting --help</code> lists it, it exists.`],
        ["How it's built", `Each command is a small module. Shared helpers for calling an LLM, reading my Obsidian vault and talking to calendars live in a separate library (<code>stingtools</code>), so standalone scripts can reuse them too. It's installed as a <code>uv</code> tool, so it's on every machine my nix config touches.`],
        ['What I learned', `Write the help text first. Designing commands as if I were explaining them to someone else forced better names than any refactor did.`],
      ],
      stats: [['30+', 'subcommands'], ['1', 'entry point'], ['0', 'forgotten aliases']],
    },
  };

  const skills = [
    { n: 'React', f: 'reactjs.png', w: 5, c: '#61dafb' }, { n: 'TypeScript', f: 'typescript.png', w: 5, c: '#3178c6' },
    { n: 'C#', f: 'csharp.png', w: 4, c: '#9b4f96' }, { n: 'Python', f: 'python.svg', w: 4, c: '#ffd43b' },
    { n: 'SQL', f: 'sqlserver.svg', w: 4, c: '#cfd6dd' }, { n: 'JavaScript', f: 'javascript.png', w: 4, c: '#f7df1e' },
    { n: 'Django', f: 'django_short.png', w: 3, c: '#44b78b' }, { n: 'Redux', f: 'redux.png', w: 3, c: '#b089f5' },
    { n: 'Next.js', f: 'next.svg', w: 3, c: '#e8e8e8' }, { n: 'Git', w: 3, c: '#f05033' },
    { n: 'Nix', w: 2, c: '#7eb7e2' }, { n: 'Swift', w: 2, c: '#f05138' },
    { n: 'Java', f: 'java.svg', w: 2, c: '#f89820' }, { n: 'Docker', w: 2, c: '#2496ed' },
  ].map(s => ({ ...s, src: s.f ? PUB + s.f : null }));

  const posts = [
    { slug: 'personal-cli', t: 'Building a personal CLI I actually use', d: '2026-10-01', m: 8, c: 'tech',
      x: 'Why I stopped collecting shell aliases and wrote one tool to hold all my small automations, and what I\'d do differently.',
      body: `
<p>For years my automation lived in a graveyard of shell aliases, half-finished Python scripts and launcher commands I forgot existed. This year I folded all of it into one tool: <code>sting</code>.</p>
<h2 id="why-one-tool">Why one tool</h2>
<p>The problem was never writing the scripts. It was finding them again three months later<span class="fn" data-note="I once rewrote the same 'rename screenshots' script three times because I couldn't find the first two."></span>. A single entry point with subcommands means <code>sting --help</code> is the documentation.</p>
<blockquote>The best automation is the one you remember exists.</blockquote>
<h2 id="the-shape-of-it">The shape of it</h2>
<p>Every command is a small module. Shared helpers for calling an LLM, reading my vault and talking to calendars live in a separate library, so scripts can reuse them too<span class="fn" data-note="That library is called stingtools. Naming things after yourself is a rite of passage."></span>.</p>
<pre><span class="c"># a typical morning</span>
<span class="k">$</span> sting notes today
<span class="k">$</span> sting ai <span class="s">"summarize my unread email"</span>
<span class="k">$</span> sting music dedupe --dry-run</pre>
<h2 id="what-id-change">What I'd change</h2>
<p>I'd write the help text first. Designing the commands as if explaining them to someone else forced better names than any refactor did.</p>
<p>Lorem ipsum filler so you can feel the reading length. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>` },
    { slug: 'nix-darwin', t: 'Declaring my whole Mac with nix-darwin', d: '2026-09-12', m: 12, c: 'tech',
      x: 'What it took to make a fresh laptop a one-command setup.',
      body: `
<p>A new laptop used to cost me a weekend. Now it costs one command and a coffee.</p>
<h2 id="why-nix">Why Nix</h2>
<p>Every dotfile, app and system preference lives in one repository<span class="fn" data-note="Including the Dock's auto-hide delay. Especially the Dock's auto-hide delay."></span>. If it isn't in the repo, it doesn't exist.</p>
<pre><span class="k">$</span> darwin-rebuild switch --flake .#laptop</pre>
<h2 id="the-catch">The catch</h2>
<p>The learning curve is a cliff. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>` },
    { slug: 'finishing-a-novel', t: 'On finishing a novel', d: '2026-08-30', m: 6, c: 'life',
      x: 'Looking back at The Unknown, and why I want to write again.',
      body: `
<p>I don't remember deciding to write a book. I remember deciding, every night for a long time, to write one more page.</p>
<p>That is most of what I know about finishing things. The decision you make once matters less than the one you make every evening when nobody is watching and nothing is due<span class="fn" data-note="This applies, embarrassingly well, to side projects."></span>.</p>
<h2 id="what-the-book-taught-me">What the book taught me</h2>
<p>Characters need to want something on every page. So do users, it turns out. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<h2 id="writing-again">Writing again</h2>
<p>This blog is partly a way back to that habit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>` },
    { slug: 'meal-planner', t: 'A meal planner for people who hate meal planning', d: '2026-07-04', m: 7, c: 'tech', x: 'Small app, real constraints: budget, leftovers, laziness.' },
    { slug: 'apple-music', t: 'Taming 40,000 songs in Apple Music', d: '2025-12-11', m: 9, c: 'tech', x: 'Deduping, tagging and scripting a music library that got away from me.' },
    { slug: 'swing-lessons', t: 'Lessons from co-founding a civic tech startup', d: '2025-11-02', m: 10, c: 'life', x: 'What Swing Campaign taught me about building for people.' },
  ];

  // Resume bullets tagged with skills so the interactive resume can highlight them.
  const resume = [
    { org: TBD('Current Company'), title: TBD('Current Title'), dates: `${TBD('20XX')} – Present`, bullets: [
      ['Placeholder bullet about the biggest thing you own today.', ['TypeScript', 'React']],
      ['Placeholder bullet about measurable impact.', []] ] },
    { org: 'Bonterra', title: 'Full Stack Software Engineer', dates: `Sep 2021 – ${TBD('20XX')}`, bullets: [
      ['Developed features for the Mobile Messaging and Process Automation applications of the NGP VAN Action Platform CRM and API.', ['C#', 'React', 'SQL']],
      ['Led refactors to streamline stateful data flow using Redux slices and selectors.', ['Redux', 'React', 'TypeScript']],
      ['Wrote Selenium end-to-end tests simulating real user workflows for Mobile Messaging.', ['C#']],
      ['Planned and shipped the onboarding piece of a new payments integration on an expedited timeline.', ['React', 'C#', 'SQL']] ] },
    { org: 'Swing Campaign', title: 'Co-Founder & CEO', dates: 'Mar 2020 – Jan 2022', bullets: [
      ['Founded a civic app that showed users which representatives best matched their views.', []],
      ['Wrote most of the code with React Native and Django, and led the design team.', ['React', 'Python', 'Django']],
      ['Ran user interviews and coordinated marketing, political outreach and dev teams.', []] ] },
    { org: 'Cornell CCT Lab', title: 'Research Analyst', dates: 'Jun 2019 – Dec 2019', bullets: [
      ['Built a Chrome extension that analyzes a Reddit thread and reports comment toxicity.', ['JavaScript']],
      ['Researched which words most often lead to arguments and used the results to direct the algorithm.', ['Python']] ] },
    { org: 'Cobu (formerly Doorbell.me)', title: 'Full Stack Engineer Intern', dates: TBD('dates'), bullets: [
      ['Built admin application features requested by the operations team.', ['JavaScript']],
      ['Interviewed residents about the app and analyzed company processes for scalability.', []] ] },
  ];
  const education = [['Cornell University', 'B.A. Information Science', '2020'], ['Advanced Math & Science Academy', 'High School Diploma', '2016']];

  window.SK = { PUB, TBD, person, timeline, projects, caseStudy, skills, posts, resume, education };
})();
