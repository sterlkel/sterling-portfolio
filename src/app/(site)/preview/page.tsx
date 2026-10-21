import type { Metadata } from "next";
import { Reveal } from "@/redesign/chrome/Reveal";

// Temporary page for checking the redesign shell (STI-343). Delete it when the homepage moves over (STI-252).
export const metadata: Metadata = { title: "Shell preview", robots: { index: false } };

const swatches = ["--bg", "--bg2", "--card", "--line", "--muted", "--fg", "--accent", "--hi"];

export default function ShellPreview() {
  return (
    <div className="wrap" style={{ paddingBlock: "40px 110px" }}>
      <p className="eyebrow">STI-343 · shell preview</p>
      <h1 style={{ font: "700 clamp(40px,6vw,72px)/1.02 var(--display)", letterSpacing: "-.03em", margin: ".15em 0 .4em" }}>
        Tokens, fonts and the theme toggle.
      </h1>
      <p style={{ font: "400 21px/1.6 var(--serif)", maxWidth: "56ch", color: "var(--muted)" }}>
        Newsreader for reading, Fraunces for display, Inter for UI and <span className="mono">JetBrains Mono</span> for code.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "28px 0 64px" }}>
        <a className="btn" href="#swatches">Primary button</a>
        <a className="btn ghost" href="#swatches">Ghost button</a>
      </div>
      {swatches.map(v => (
        <Reveal key={v}>
          <div id={v === "--bg" ? "swatches" : undefined} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0", borderTop: "1px solid var(--line)" }}>
            <span style={{ width: 56, height: 56, borderRadius: "var(--r)", background: `var(${v})`, border: "1px solid var(--line)" }} />
            <span className="mono">{v}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
