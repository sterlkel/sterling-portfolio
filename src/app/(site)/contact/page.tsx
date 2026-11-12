import type { Metadata } from "next";
import { Reveal } from "@/redesign/chrome/Reveal";
import { person } from "@/redesign/site";
import { CopyEmail } from "./CopyEmail";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email is best. A call works too.",
};

const channels = [
  { title: "Book 20 minutes", text: "Pick a time that works. No prep needed.", action: "open calendar →", href: person.booking, accent: true },
  { title: "LinkedIn", text: "Professional history and recommendations.", action: "connect →", href: person.linkedin },
  { title: "GitHub", text: "Code, dotfiles and side projects.", action: "browse →", href: person.github },
  { title: "Writing", text: "Notes on building things.", action: "read →", href: "/index#writing" },
];

export default function ContactPage() {
  return (
    <div className="wrap pg">
      <p className="eyebrow">{"// contact"}</p>
      <h1 className="page-title">Email is best.<br />A call works too.</h1>

      <CopyEmail email={person.email} />
      <p className={styles.mailto}>or <a href={`mailto:${person.email}`}>open it in your mail app</a></p>

      <Reveal>
        <div className={styles.channels}>
          {channels.map(channel => (
            <a className={`${styles.channel} ${channel.accent ? styles.book : ""}`} href={channel.href} key={channel.title}>
              <b>{channel.title}</b>
              <span>{channel.text}</span>
              <span className={styles.action}>{channel.action}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
