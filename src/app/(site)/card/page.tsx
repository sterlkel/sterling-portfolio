import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";
import { getAllPosts } from "@/redesign/content/posts";
import { person, siteUrl } from "@/redesign/site";
import { CardFlip } from "./CardFlip";
import { ShareButton } from "./ShareButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Card",
  description: `${person.name}, ${person.title}. Save my contact or find me elsewhere.`,
};

const cardUrl = `${siteUrl}/card`;

export default async function CardPage() {
  // Drawn at build time, so nothing is fetched and no QR code ships to the browser as JavaScript.
  const qrSvg = await QRCode.toString(cardUrl, { type: "svg", margin: 0, color: { dark: "#111111", light: "#ffffff" } });
  const latest = getAllPosts()[0];

  return (
    <div className={styles.page}>
      <CardFlip qrSvg={qrSvg} />

      <div className={styles.actions}>
        <a className="btn" href="/card/contact.vcf">+ Save contact</a>
        <ShareButton title={person.name} url={cardUrl} />
      </div>

      <nav className={styles.links} aria-label="Links">
        <Link href="/">Portfolio<span>→</span></Link>
        {latest && <Link href={`/writing/${latest.slug}`}>Latest: {latest.title}<span>→</span></Link>}
        <a href={person.booking}>Book 20 minutes<span>cal</span></a>
        <a href={person.github}>GitHub<span>@sterlkel</span></a>
        <a href={person.linkedin}>LinkedIn<span>in/</span></a>
        <a href={`mailto:${person.email}`}>Email<span>@</span></a>
      </nav>
    </div>
  );
}
