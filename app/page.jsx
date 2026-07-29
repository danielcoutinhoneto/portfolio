import ClientEffects from "@/components/ClientEffects";
import CopyEmailButton from "@/components/CopyEmailButton";
import Icon from "@/components/Icon";
import SiteHeader from "@/components/SiteHeader";

const githubUrl = "https://github.com/danielcoutinhoneto";
const linkedinUrl = "https://www.linkedin.com/in/daniel-coutinho-neto";
const email = "danielcoutinhoneto@outlook.com";

const projects = [
  {
    id: "sisageli",
    order: "01",
    label: "Case principal",
    title: "SisAgeLi",
    subtitle: "Autenticação e controle de acesso",
    description:
      "Aplicação web corporativa em .NET 8 estruturada para proteger o acesso, organizar responsabilidades e sustentar a evolução de funcionalidades.",
    challenge:
      "Centralizar autenticação, autorização e recuperação de acesso com regras claras e uma experiência segura para o usuário.",
    solution:
      "Cookies e Claims, BCrypt, bloqueio após tentativas inválidas, recuperação por token, envio de e-mail e separação entre serviços e repositórios.",
    tags: [
      ".NET 8",
      "ASP.NET Core MVC",
      "ADO.NET",
      "SQL Server",
      "BCrypt",
      "MailKit"
    ],
    featured: true
  },
  {
    id: "clean-architecture",
    order: "02",
    label: "Arquitetura",
    title: "Aplicação em Clean Architecture",
    subtitle: ".NET, EF Core e SQL Server",
    description:
      "Solução organizada em Domain, Application, Infrastructure e Presentation para exercitar baixo acoplamento, testabilidade e evolução sustentável.",
    challenge:
      "Evitar que regras de negócio, persistência e interface evoluam como um único bloco fortemente acoplado.",
    solution:
      "Entidades de domínio, comandos, validators, mappers, repositórios e injeção de dependência, com EF Core na camada de infraestrutura.",
    tags: [
      "C#",
      "Entity Framework Core",
      "SOLID",
      "Repository",
      "Unit of Work"
    ]
  },
  {
    id: "sisexaminou",
    order: "03",
    label: "Produto web",
    title: "SisExaminou",
    subtitle: "Orientações de coleta de exames",
    description:
      "Sistema para consulta pública de orientações e gestão restrita de conteúdo, com perfis de acesso, auditoria e modelagem relacional.",
    challenge:
      "Facilitar o acesso a orientações de exames e preservar controle, rastreabilidade e consistência nas alterações administrativas.",
    solution:
      "ASP.NET Core MVC, pesquisa pública, área autenticada, perfis, auditoria, relacionamentos SQL e operações CRUD.",
    tags: [
      ".NET 8",
      "ASP.NET Core MVC",
      "SQL Server 2022",
      "Auditoria",
      "APIs REST"
    ]
  }
];

const skillGroups = [
  {
    icon: "code",
    title: "Back-end .NET",
    description: "Construção e sustentação de aplicações web corporativas.",
    skills: [
      "C#",
      ".NET 8",
      "ASP.NET Core MVC",
      "ASP.NET Framework",
      "APIs REST",
      "HTTP",
      "async/await",
      "HttpClient"
    ]
  },
  {
    icon: "database",
    title: "Dados & integrações",
    description: "Persistência, consultas e comunicação entre sistemas.",
    skills: [
      "SQL Server",
      "ADO.NET",
      "Entity Framework Core",
      "Modelagem relacional",
      "JOINs",
      "Procedures",
      "Swagger/OpenAPI"
    ]
  },
  {
    icon: "layers",
    title: "Arquitetura & qualidade",
    description: "Organização de código com decisões proporcionais ao contexto.",
    skills: [
      "SOLID",
      "Injeção de Dependência",
      "IoC",
      "Repository",
      "Factory",
      "Unit of Work",
      "Clean Architecture"
    ]
  },
  {
    icon: "terminal",
    title: "Web & entrega",
    description: "Interfaces, versionamento e operação de aplicações.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Razor Views",
      "Bootstrap",
      "Git/GitHub",
      "Azure",
      "Docker"
    ]
  }
];

const experiences = [
  {
    period: "mar/2024 — mar/2026",
    role: "Desenvolvedor .NET",
    company: "Avatim",
    summary:
      "Desenvolvimento Full Stack, manutenção e sustentação de aplicações web corporativas.",
    highlights: [
      "C#, ASP.NET Core, ASP.NET Framework, HTML, CSS, JavaScript e Bootstrap.",
      "APIs REST, integrações, operações CRUD e evolução de funcionalidades.",
      "SQL Server, troubleshooting, análise de incidentes e comunicação com áreas de negócio."
    ],
    accent: true
  },
  {
    period: "set/2017 — mar/2024",
    role: "Analista de Suporte",
    company: "Lidi Laboratório",
    summary:
      "Sustentação de aplicações e infraestrutura em ambiente corporativo.",
    highlights: [
      "Investigação de incidentes e atendimento remoto e presencial.",
      "Documentação técnica, treinamento de usuários e padronização de processos.",
      "Apoio a ISO 9001 e DICQ, com foco em rastreabilidade e conformidade."
    ]
  },
  {
    period: "jun/2015 — set/2017",
    role: "Estagiário de Sistemas de Informação",
    company: "Lidi Laboratório",
    summary:
      "Início da trajetória profissional em suporte, aplicações e infraestrutura.",
    highlights: [
      "Manutenção de computadores e apoio a aplicações internas.",
      "Configuração de softwares, impressoras e rotinas de rede.",
      "Classificação e direcionamento de chamados técnicos."
    ]
  }
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Coutinho Neto",
  jobTitle: "Desenvolvedor .NET Full Stack",
  email: `mailto:${email}`,
  url: "https://danielcoutinhoneto.github.io/portfolio",
  sameAs: [githubUrl, linkedinUrl],
  knowsAbout: [
    "C#",
    ".NET",
    "ASP.NET Core",
    "SQL Server",
    "APIs REST",
    "Clean Architecture"
  ]
};

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function SocialLink({ href, icon, children, label }) {
  return (
    <a
      className="social-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <Icon name={icon} size={19} />
      <span>{children}</span>
      <Icon name="external" size={15} />
    </a>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <SiteHeader />
      <ClientEffects />

      <main id="conteudo">
        <section className="hero section" id="inicio" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker" data-reveal>
                Desenvolvedor .NET Full Stack · foco em back-end
              </p>
              <h1 id="hero-title" data-reveal>
                Transformo demandas de negócio em{" "}
                <span>software .NET confiável.</span>
              </h1>
              <p className="hero-description" data-reveal>
                C#, ASP.NET Core, SQL Server e APIs REST aplicados à construção,
                integração e sustentação de aplicações web corporativas.
              </p>
              <div className="hero-actions" data-reveal>
                <a className="button button-primary" href="#projetos">
                  Conhecer projetos
                  <Icon name="arrow" size={18} />
                </a>
                <a className="button button-ghost" href={`mailto:${email}`}>
                  <Icon name="mail" size={18} />
                  Entrar em contato
                </a>
              </div>
              <ul className="hero-proof" data-reveal aria-label="Resumo da trajetória">
                <li>
                  <strong>Desde 2015</strong>
                  <span>atuando em tecnologia</span>
                </li>
                <li>
                  <strong>4+ anos</strong>
                  <span>
                    de experiência prática com .NET, incluindo 2 anos em
                    ambiente corporativo
                  </span>
                </li>
                <li>
                  <strong>3 cases</strong>
                  <span>técnicos em destaque</span>
                </li>
              </ul>
            </div>

            <div className="hero-visual" data-reveal>
              <div className="code-card">
                <div className="code-card-header">
                  <div className="window-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span>DeveloperProfile.cs</span>
                  <span className="code-status">.NET</span>
                </div>
                <pre aria-label="Resumo técnico em formato de código C Sharp">
                  <code>
                    <span className="code-purple">public sealed record</span>{" "}
                    <span className="code-blue">DeveloperProfile</span>
                    {"(\n"}
                    {"    "}
                    <span className="code-purple">string</span> Focus,
                    {"\n    "}
                    <span className="code-purple">string</span> Stack,
                    {"\n    "}
                    <span className="code-purple">string</span> Strength
                    {"\n);\n\n"}
                    <span className="code-purple">var</span> daniel ={" "}
                    <span className="code-purple">new</span>
                    {"(\n    "}
                    <span className="code-green">
                      &quot;Back-end &amp; Web&quot;
                    </span>
                    {",\n    "}
                    <span className="code-green">
                      &quot;C# · ASP.NET · SQL&quot;
                    </span>
                    {",\n    "}
                    <span className="code-green">
                      &quot;Negócio + operação&quot;
                    </span>
                    {"\n);"}
                  </code>
                </pre>
                <div className="code-card-footer">
                  <span>
                    <i aria-hidden="true" /> Pronto para o próximo desafio
                  </span>
                  <span>UTF-8</span>
                </div>
              </div>
              <div className="orbit orbit-one" aria-hidden="true" />
              <div className="orbit orbit-two" aria-hidden="true" />
              <div className="floating-chip chip-csharp" aria-hidden="true">
                C#
              </div>
              <div className="floating-chip chip-sql" aria-hidden="true">
                SQL
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#sobre" aria-label="Continuar para Sobre">
            <span>Conheça meu trabalho</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section className="section about-section" id="sobre">
          <div className="container">
            <SectionHeading
              eyebrow="01 · Sobre"
              title="Tecnologia com contexto de negócio."
              description="Uma trajetória construída entre operação, usuários e desenvolvimento — visão que ajuda a encontrar a solução certa antes de escolher a tecnologia."
            />

            <div className="about-grid">
              <div className="about-story" data-reveal>
                <p className="lead">
                  Sou Daniel Coutinho Neto, desenvolvedor .NET com experiência
                  em aplicações corporativas e uma base sólida em sustentação de
                  ambientes críticos.
                </p>
                <p>
                  Minha transição do suporte para o desenvolvimento ampliou
                  minha visão sobre software: além de implementar
                  funcionalidades, considero quem usa, quem mantém e qual
                  processo precisa melhorar.
                </p>
                <p>
                  Atuo com desenvolvimento e manutenção evolutiva, integrações,
                  bancos relacionais, análise de incidentes e comunicação com
                  áreas de negócio. Busco oportunidades para evoluir produtos
                  .NET com qualidade, colaboração e responsabilidade técnica.
                </p>
              </div>

              <blockquote className="about-quote" data-reveal>
                <span aria-hidden="true">“</span>
                <p>
                  Software bom não termina no deploy: ele precisa funcionar para
                  o usuário, ser compreensível para o time e sustentável para o
                  negócio.
                </p>
              </blockquote>
            </div>

            <div className="value-grid">
              <article className="value-card" data-reveal>
                <span className="value-number">01</span>
                <h3>Engenharia .NET</h3>
                <p>
                  Aplicações web e APIs com C#, ASP.NET, responsabilidades
                  claras e código preparado para evoluir.
                </p>
              </article>
              <article className="value-card" data-reveal>
                <span className="value-number">02</span>
                <h3>Dados & integração</h3>
                <p>
                  SQL Server, modelagem relacional e integração de sistemas com
                  atenção a contratos HTTP e consistência dos dados.
                </p>
              </article>
              <article className="value-card" data-reveal>
                <span className="value-number">03</span>
                <h3>Operação & negócio</h3>
                <p>
                  Troubleshooting, atendimento e tradução de necessidades
                  reais em melhorias tecnológicas objetivas.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projetos">
          <div className="container">
            <SectionHeading
              eyebrow="02 · Projetos"
              title="Arquitetura explicada por decisões."
              description="Projetos selecionados para demonstrar segurança, organização de código, persistência e entendimento do problema — com evolução contínua no GitHub."
            />

            <div className="projects-list">
              {projects.map((project) => (
                <article
                  className={`project-card ${
                    project.featured ? "project-featured" : ""
                  }`}
                  id={project.id}
                  key={project.id}
                  data-reveal
                >
                  <div className="project-number">{project.order}</div>
                  <div className="project-content">
                    <div className="project-heading">
                      <div>
                        <span className="project-label">{project.label}</span>
                        <h3>{project.title}</h3>
                        <p className="project-subtitle">{project.subtitle}</p>
                      </div>
                      <Icon name="arrow" size={26} className="project-arrow" />
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-decisions">
                      <div>
                        <span>Desafio</span>
                        <p>{project.challenge}</p>
                      </div>
                      <div>
                        <span>Solução</span>
                        <p>{project.solution}</p>
                      </div>
                    </div>

                    {project.featured ? (
                      <div
                        className="architecture-flow"
                        aria-label="Fluxo arquitetural do SisAgeLi"
                      >
                        <span>Usuário</span>
                        <i aria-hidden="true">→</i>
                        <span>MVC</span>
                        <i aria-hidden="true">→</i>
                        <span>Serviços</span>
                        <i aria-hidden="true">→</i>
                        <span>Repositórios</span>
                        <i aria-hidden="true">→</i>
                        <span>SQL Server</span>
                      </div>
                    ) : null}

                    <ul className="tag-list" aria-label="Tecnologias">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div className="projects-cta" data-reveal>
              <p>
                Código, estudos e evolução técnica ficam concentrados no meu
                perfil.
              </p>
              <a
                className="text-link"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                Explorar GitHub
                <Icon name="external" size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="competencias">
          <div className="container">
            <SectionHeading
              eyebrow="03 · Competências"
              title="Base técnica para todo o ciclo da aplicação."
              description="Competências construídas em experiência profissional e projetos, apresentadas sem porcentagens artificiais de domínio."
            />

            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article className="skill-card" key={group.title} data-reveal>
                  <div className="skill-icon">
                    <Icon name={group.icon} size={23} />
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul>
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="practice-note" data-reveal>
              <div>
                <span className="practice-dot applied" aria-hidden="true" />
                <strong>Experiência aplicada</strong>
                <p>
                  C#, ASP.NET, SQL Server, APIs REST, ADO.NET, Git e tecnologias
                  web.
                </p>
              </div>
              <div>
                <span className="practice-dot projects" aria-hidden="true" />
                <strong>Aplicação em projetos</strong>
                <p>
                  .NET 8, EF Core, autenticação, padrões e Clean Architecture.
                </p>
              </div>
              <div>
                <span className="practice-dot learning" aria-hidden="true" />
                <strong>Evolução contínua</strong>
                <p>Testes automatizados, Docker, Azure e recursos de IA.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experiencia">
          <div className="container">
            <SectionHeading
              eyebrow="04 · Experiência"
              title="Da sustentação ao desenvolvimento."
              description="Uma evolução profissional que combina domínio operacional, relacionamento com usuários e entrega de software."
            />

            <div className="timeline">
              {experiences.map((experience) => (
                <article
                  className={`timeline-item ${
                    experience.accent ? "timeline-current" : ""
                  }`}
                  key={`${experience.role}-${experience.period}`}
                  data-reveal
                >
                  <div className="timeline-marker" aria-hidden="true">
                    <span />
                  </div>
                  <p className="timeline-period">{experience.period}</p>
                  <div className="timeline-content">
                    <p className="timeline-company">{experience.company}</p>
                    <h3>{experience.role}</h3>
                    <p className="timeline-summary">{experience.summary}</p>
                    <ul>
                      {experience.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section education-section" id="formacao">
          <div className="container education-grid">
            <div>
              <SectionHeading
                eyebrow="05 · Formação"
                title="Fundamentos e aprendizado contínuo."
              />
            </div>
            <div className="education-content">
              <article className="education-card" data-reveal>
                <span>2023</span>
                <div>
                  <p>Pós-graduação</p>
                  <h3>Desenvolvimento Web</h3>
                  <small>FTC</small>
                </div>
              </article>
              <article className="education-card" data-reveal>
                <span>2017</span>
                <div>
                  <p>Bacharelado</p>
                  <h3>Sistemas de Informação</h3>
                  <small>FTC</small>
                </div>
              </article>
              <div className="certifications" data-reveal>
                <p className="certifications-title">Certificações & formação complementar</p>
                <ul>
                  <li>
                    <span>2024</span>
                    Residência de Software — TIC18 / CEPEDI-UESC
                  </li>
                  <li>
                    <span>2022</span>
                    Programação Orientada a Objetos com C# — DIO
                  </li>
                  <li>
                    <span>2022</span>
                    Introdução ao C# e .NET — DIO
                  </li>
                  <li>
                    <span>2021</span>
                    Introdução ao Git e GitHub — DIO
                  </li>
                </ul>
              </div>
              <div className="languages" data-reveal>
                <span>Idiomas</span>
                <p>Português nativo · Espanhol intermediário · Inglês básico</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="contact-orb contact-orb-one" aria-hidden="true" />
          <div className="contact-orb contact-orb-two" aria-hidden="true" />
          <div className="container contact-inner" data-reveal>
            <p className="eyebrow">06 · Contato</p>
            <h2>Vamos construir a próxima solução .NET?</h2>
            <p>
              Tenho interesse em contribuir com projetos de desenvolvimento
              back-end, Full Stack .NET e aplicações corporativas.
            </p>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${email}`}>
                <Icon name="mail" size={18} />
                Enviar e-mail
              </a>
              <CopyEmailButton />
            </div>
            <div className="social-links">
              <SocialLink
                href={githubUrl}
                icon="github"
                label="Abrir perfil de Daniel no GitHub"
              >
                GitHub
              </SocialLink>
              <SocialLink
                href={linkedinUrl}
                icon="linkedin"
                label="Abrir perfil de Daniel no LinkedIn"
              >
                LinkedIn
              </SocialLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <span className="brand-mark" aria-hidden="true">
              DC
            </span>
            <p>
              Daniel Coutinho Neto
              <small>Desenvolvedor .NET</small>
            </p>
          </div>
          <p>
            Projetado com intenção. Construído com Next.js.
            <br />© 2026 Daniel Coutinho.
          </p>
          <a href="#inicio" className="back-to-top">
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
