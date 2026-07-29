"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const navigation = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#competencias", label: "Competências" },
  { href: "#experiencia", label: "Experiência" }
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)")
      .matches
      ? "light"
      : "dark";
    const initialTheme = storedTheme ?? preferredTheme;
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header" data-menu-open={menuOpen}>
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Daniel Coutinho — início">
          <span className="brand-mark" aria-hidden="true">
            DC
          </span>
          <span className="brand-name">
            Daniel Coutinho
            <small>Desenvolvedor .NET</small>
          </span>
        </a>

        <nav
          className="primary-nav"
          aria-label="Navegação principal"
          id="primary-navigation"
        >
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-contact" href="#contato" onClick={closeMenu}>
            Vamos conversar
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}
