"use client";

import { projectData } from "@/constants";
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image,
  SegmentedControl,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconArrowRight,
  IconBriefcase2,
  IconCode,
  IconMail,
  IconRocket,
  IconSparkles,
  IconTimeline,
  IconWindow,
} from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import styles from "./page.module.css";

const featuredProjects = projectData.slice(0, 3);

const concepts = [
  {
    value: "editorial",
    label: "Editorial split",
    description: "A type-led introduction with a quiet, magazine-like rhythm.",
  },
  {
    value: "command",
    label: "Command center",
    description: "A high-signal view of what I build, use, and am open to.",
  },
  {
    value: "timeline",
    label: "Living timeline",
    description: "A career narrative where the work is part of the story.",
  },
  {
    value: "studio",
    label: "Studio window",
    description: "A playful workbench assembled from open project windows.",
  },
  {
    value: "case-study",
    label: "Case-study first",
    description: "One project gets the stage before the rest of the portfolio.",
  },
] as const;

type Concept = (typeof concepts)[number]["value"];

function ProjectLink({ index = 0 }: { index?: number }) {
  const project = featuredProjects[index] ?? featuredProjects[0];

  if (!project) return null;

  return (
    <Card
      component="a"
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={styles.projectCard}
      padding="xl"
      radius="lg"
      withBorder
    >
      <Image src={project.image} alt="" h={82} fit="contain" />
      <Title order={3} mt="lg">
        {project.title}
      </Title>
      <Text c="dimmed" mt="xs">
        {project.body}
      </Text>
      <Group gap={4} mt="lg" c="brand" fw={700}>
        <span>View project</span>
        <IconArrowRight size={16} />
      </Group>
    </Card>
  );
}

function EditorialSplit() {
  return (
    <div className={styles.editorial}>
      <section className={styles.editorialHero}>
        <div>
          <Text className={styles.eyebrow}>01 / Independent software engineer</Text>
          <Title order={1} className={styles.editorialTitle}>
            Good software begins with paying attention.
          </Title>
          <Text size="lg" className={styles.editorialCopy}>
            I&apos;m Sterling Kelly. I turn early ideas and complicated problems
            into digital products people want to keep using.
          </Text>
          <Button component="a" href="/projects" rightSection={<IconArrowRight size={16} />}>
            Read the work
          </Button>
        </div>
        <div className={styles.editorialPortrait}>
          <Image src="/Sterling.jpg" alt="Sterling Kelly" />
          <Text className={styles.portraitCaption}>Based wherever the interesting work is.</Text>
        </div>
      </section>
      <section className={styles.editorialNote}>
        <Text className={styles.eyebrow}>The approach</Text>
        <Title order={2}>Equal parts product sense, engineering depth, and curiosity.</Title>
        <Text>
          From React and Django to C# and SQL, I bring enough range to make the
          first version useful—and enough care to make it feel considered.
        </Text>
      </section>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <ProjectLink />
        <ProjectLink index={1} />
      </SimpleGrid>
    </div>
  );
}

function CommandCenter() {
  return (
    <div className={styles.commandCenter}>
      <section className={styles.commandHero}>
        <div>
          <Badge color="lime" variant="filled">Available for thoughtful collaborations</Badge>
          <Title order={1}>Build mode: on.</Title>
          <Text size="lg">A portfolio that works more like a product dashboard than a brochure.</Text>
        </div>
        <div className={styles.signalGrid}>
          <div><Text size="xs">CURRENT FOCUS</Text><strong>Useful systems</strong></div>
          <div><Text size="xs">TOOLKIT</Text><strong>React · Django · C#</strong></div>
          <div><Text size="xs">OPERATING MODE</Text><strong>0 → 1 builder</strong></div>
          <div><Text size="xs">STATUS</Text><strong className={styles.online}>● Open to ideas</strong></div>
        </div>
      </section>
      <section className={styles.commandModules}>
        <div className={styles.activityModule}>
          <Group justify="space-between"><Text fw={700}>NOW SHIPPING</Text><IconRocket size={18} /></Group>
          <Title order={2}>Products with a clear reason to exist.</Title>
          <Text c="dimmed">Small teams, ambiguous briefs, and ambitious side projects are my favorite terrain.</Text>
          <Button component="a" href="/contact" variant="light" color="lime" mt="md">Send a signal</Button>
        </div>
        <ProjectLink />
        <div className={styles.stackModule}>
          <IconCode size={24} />
          <Text fw={700}>SYSTEMS I LIKE</Text>
          <p>Clear defaults<br />Fast feedback<br />Room to evolve</p>
        </div>
      </section>
    </div>
  );
}

function LivingTimeline() {
  const stops = [
    ["Start with curiosity", "Learning to make ideas tangible through code."],
    ["Build with people", "Co-founded Swing Campaign and learned product decisions in the real world."],
    ["Keep the useful bits", "Now I combine full-stack engineering with practical product thinking."],
  ];
  return (
    <div className={styles.timeline}>
      <section className={styles.timelineIntro}>
        <ThemeIcon size="xl" radius="xl" variant="light"><IconTimeline /></ThemeIcon>
        <Text className={styles.eyebrow}>A work in progress</Text>
        <Title order={1}>The thread through every project: make it useful, then make it better.</Title>
      </section>
      <section className={styles.timelineRail}>
        {stops.map(([title, copy], index) => (
          <article key={title} className={styles.timelineStop}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><Title order={2}>{title}</Title><Text>{copy}</Text></div>
          </article>
        ))}
      </section>
      <section className={styles.timelineWork}>
        <div><Text className={styles.eyebrow}>The next chapter</Text><Title order={2}>Selected work along the way.</Title></div>
        <ProjectLink />
      </section>
    </div>
  );
}

function StudioWindow() {
  return (
    <div className={styles.studio}>
      <section className={styles.studioIntro}>
        <Text className={styles.eyebrow}>Sterling&apos;s studio / open tabs</Text>
        <Title order={1}>A workbench for turning loose ideas into real things.</Title>
        <Text size="lg">Pick a window. Every one is a different way into the work.</Text>
      </section>
      <section className={styles.windowStage}>
        <article className={`${styles.window} ${styles.windowAbout}`}><WindowBar label="about-me.md" /><Title order={2}>Curious by default.</Title><Text>I&apos;m a full-stack engineer with an entrepreneurial streak and a bias toward making.</Text><Button component="a" href="/resume" variant="subtle">Open resume →</Button></article>
        <article className={`${styles.window} ${styles.windowWork}`}><WindowBar label="featured-work" /><IconBriefcase2 size={28} /><Title order={2}>Things I&apos;ve built</Title><Text>Products, experiments, and messy problems made clearer.</Text><Button component="a" href="/projects" rightSection={<IconArrowRight size={16} />}>Browse projects</Button></article>
        <article className={`${styles.window} ${styles.windowContact}`}><WindowBar label="new-conversation" /><IconMail size={28} /><Text fw={700}>Have an interesting problem?</Text><Button component="a" href="/contact" variant="light">Let&apos;s talk</Button></article>
      </section>
    </div>
  );
}

function WindowBar({ label }: { label: string }) {
  return <div className={styles.windowBar}><span>● ● ●</span><Text size="xs">{label}</Text></div>;
}

function CaseStudyFirst() {
  const project = featuredProjects[0];
  if (!project) return null;
  return (
    <div className={styles.caseStudy}>
      <section className={styles.caseHero}>
        <div><Text className={styles.eyebrow}>Featured case study / 01</Text><Title order={1}>{project.title}</Title><Text size="lg">{project.body}</Text><Button component="a" href={project.url} target="_blank" rel="noreferrer" rightSection={<IconArrowRight size={16} />}>Explore the project (opens in a new tab)</Button></div>
        <div className={styles.caseVisual}><Image src={project.image} alt="" fit="contain" /><span>Built to make a useful dent.</span></div>
      </section>
      <section className={styles.caseEvidence}>
        <div><Text className={styles.eyebrow}>Why lead with work?</Text><Title order={2}>The best introduction is something that already exists.</Title></div>
        <Text size="lg">I&apos;m Sterling: an engineer who likes the overlap between an interesting problem, a focused team, and a product people can use immediately.</Text>
        <Button component="a" href="/projects" variant="light">See the rest of the work</Button>
      </section>
    </div>
  );
}

export default function HomepageDemo() {
  const [concept, setConcept] = useState<Concept>("editorial");
  const shouldReduceMotion = useReducedMotion();
  const activeConcept = concepts.find((item) => item.value === concept) ?? concepts[0];
  const variants: Record<Concept, React.ReactNode> = {
    editorial: <EditorialSplit />,
    command: <CommandCenter />,
    timeline: <LivingTimeline />,
    studio: <StudioWindow />,
    "case-study": <CaseStudyFirst />,
  };

  return (
    <main className={styles.page}>
      <Container size="lg" className={styles.container}>
        <header className={styles.demoHeader}>
          <div><Badge variant="light" color="brand">Homepage explorations</Badge><Text c="dimmed" size="sm" mt="xs">Five distinct directions for the portfolio&apos;s next front door.</Text></div>
          <SegmentedControl
            value={concept}
            onChange={(value) => setConcept(value as Concept)}
            data={concepts.map(({ value, label }) => ({ value, label }))}
            aria-label="Choose homepage concept"
            className={styles.picker}
          />
        </header>
        <motion.div
          key={concept}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Text className={styles.conceptDescription}>{activeConcept.description}</Text>
          {variants[concept]}
        </motion.div>
      </Container>
    </main>
  );
}
