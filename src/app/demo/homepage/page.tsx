"use client";

import { projectData } from "@/constants";
import {
  Anchor,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconArrowRight, IconMail, IconSparkles } from "@tabler/icons-react";
import { motion } from "motion/react";
import styles from "./page.module.css";

const featuredProjects = projectData.slice(0, 2);

export default function HomepageDemo() {
  return (
    <main className={styles.page}>
      <Container size="lg" className={styles.container}>
        <motion.section
          className={styles.hero}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.heroCopy}>
            <Badge variant="light" color="brand" size="lg">
              Software engineer · builder · storyteller
            </Badge>
            <Title order={1} className={styles.heroTitle}>
              I build thoughtful software for people with ideas worth shipping.
            </Title>
            <Text size="lg" c="dimmed" className={styles.heroText}>
              I&apos;m Sterling Kelly, a full-stack engineer who pairs practical
              product thinking with a love of ambitious side projects.
            </Text>
            <Group gap="md">
              <Button
                component="a"
                href="/projects"
                size="md"
                rightSection={<IconArrowRight size={16} />}
              >
                Explore my work
              </Button>
              <Button
                component="a"
                href="/contact"
                size="md"
                variant="subtle"
                color="dark"
              >
                Start a conversation
              </Button>
            </Group>
          </div>
          <motion.div
            className={styles.portraitFrame}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Image
              src="/Sterling.jpg"
              alt="Sterling Kelly"
              className={styles.portrait}
            />
          </motion.div>
        </motion.section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <ThemeIcon variant="light" color="brand" size="lg" radius="xl">
              <IconSparkles size={18} />
            </ThemeIcon>
            <div>
              <Text fw={700} c="brand">
                A little about me
              </Text>
              <Title order={2}>
                Curious by default, deliberate by practice.
              </Title>
            </div>
          </div>
          <Text size="lg" className={styles.aboutText}>
            I&apos;m a full-stack software engineer with a passion for
            entrepreneurship. I&apos;ve worked across React, Django, C#, and
            SQL, and I previously co-founded Swing Campaign. I enjoy turning
            messy problems into useful, well-considered products.
          </Text>
          <Anchor href="/resume" fw={700} className={styles.inlineLink}>
            More about my experience <IconArrowRight size={16} />
          </Anchor>
        </section>

        <section className={styles.section}>
          <div className={styles.projectsHeader}>
            <div>
              <Text fw={700} c="brand">
                Selected work
              </Text>
              <Title order={2}>A few things I&apos;ve made.</Title>
            </div>
            <Button
              component="a"
              href="/projects"
              variant="light"
              color="brand"
              rightSection={<IconArrowRight size={16} />}
            >
              View all projects
            </Button>
          </div>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                component="a"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={styles.projectCard}
                padding="xl"
                radius="lg"
                withBorder
              >
                <Image
                  src={project.image}
                  alt=""
                  h={96}
                  w="auto"
                  fit="contain"
                  className={styles.projectImage}
                />
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
            ))}
          </SimpleGrid>
        </section>

        <section className={styles.contactCta}>
          <div>
            <Text fw={700} c="brand">
              Have a project in mind?
            </Text>
            <Title order={2}>Let&apos;s make something useful.</Title>
            <Text c="dimmed" mt="sm">
              I&apos;m always happy to talk through a new idea, an interesting
              problem, or what&apos;s next.
            </Text>
          </div>
          <Button
            component="a"
            href="/contact"
            size="lg"
            leftSection={<IconMail size={18} />}
          >
            Get in touch
          </Button>
        </section>
      </Container>
    </main>
  );
}
