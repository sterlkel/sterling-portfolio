"use client";

import { useState } from "react";

// Opens the phone's share sheet; where there isn't one, copies the link instead.
export function ShareButton({ title, url }: { title: string; url: string }) {
  const [label, setLabel] = useState("Share");

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* the person closed the sheet */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setLabel("Link copied!");
    } catch {
      setLabel("Couldn't copy");
    }
    setTimeout(() => setLabel("Share"), 1600);
  };

  return <button type="button" className="btn ghost" onClick={share}>{label}</button>;
}
