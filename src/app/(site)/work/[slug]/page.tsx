import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/redesign/chrome/Reveal";
import { Cover } from "@/redesign/components/Cover";
import { getCaseStudy } from "@/redesign/content/caseStudies";
import { projects, workHref } from "@/redesign/content/projects";
import styles from "./page.module.css";

type Props = { params: { slug: string } };

// One static page per project; any other slug is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find(p => p.slug === params.slug);
  return project ? { title: project.title, description: project.pitch } : {};
}

export default function CaseStudyPage({ params }: Props) {
  const index = projects.findIndex(p => p.slug === params.slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const study = getCaseStudy(project.slug);
  const written = projects.find(p => p.slug !== project.slug && getCaseStudy(p.slug));

  return (
    <div className="wrap pg">
      <header className={styles.hero}>
        <Link className="eyebrow" href="/index#work">← Work</Link>
        <h1>{project.title}</h1>
        <p>{project.pitch}</p>
      </header>

      <Cover cover={project.cover} />

      <dl className={styles.meta}>
        <div><dt>Role</dt><dd>{study?.role ?? "Solo"}</dd></div>
        <div><dt>Timeline</dt><dd>{study?.timeline ?? project.year}</dd></div>
        <div><dt>Stack</dt><dd>{project.stack.join(", ")}</dd></div>
        <div><dt>Type</dt><dd>{project.type}</dd></div>
      </dl>

      {study ? (
        <>
          {study.sections.map(section => (
            <Reveal key={section.heading}>
              <section className={styles.body}>
                <h2>{section.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.html }} />
              </section>
            </Reveal>
          ))}
          {study.stats.length > 0 && (
            <div className={styles.stats}>
              {study.stats.map(stat => <div key={stat.label}><b>{stat.value}</b>{stat.label}</div>)}
            </div>
          )}
        </>
      ) : (
        <section className={styles.body}>
          <h2>Case study</h2>
          <div>
            <p>
              The full write-up for {project.title} is coming soon.
              {written && <> In the meantime, <Link href={workHref(written)}>read the {written.title} case study</Link>.</>}
            </p>
          </div>
        </section>
      )}

      <Link className={styles.next} href={workHref(next)}>
        <span><span className="eyebrow">Next project</span>{next.title}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
