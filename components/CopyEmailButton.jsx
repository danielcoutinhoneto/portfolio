"use client";

import { useState } from "react";
import Icon from "./Icon";

const email = "danielcoutinhoneto@outlook.com";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button className="button button-secondary" type="button" onClick={copyEmail}>
      <Icon name={copied ? "check" : "mail"} size={18} />
      {copied ? "E-mail copiado" : "Copiar e-mail"}
    </button>
  );
}
