import { useState, useEffect, useRef } from "react";

const GOLD = "#D4A017";
const GOLD_DIM = "rgba(212,160,23,0.15)";
const GOLD_BORDER = "rgba(212,160,23,0.35)";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Navbar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "hero", label: "Басты бет" },
    { id: "about", label: "Мен туралы" },
    { id: "skills", label: "Дағдылар" },
    { id: "plans", label: "Жоспарлар" },
    { id: "contact", label: "Байланыс" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0.75)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${GOLD_BORDER}`,
        transition: "background 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <span
          onClick={() => scrollTo("hero")}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", cursor: "pointer" }}
        >
          МИРАС
        </span>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 36 }} className="nav-links-desktop">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: active === l.id ? GOLD : "#aaaaaa",
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "color 0.2s",
                padding: "4px 0",
                borderBottom: active === l.id ? `1px solid ${GOLD}` : "1px solid transparent",
              }}
              onMouseEnter={e => { if (active !== l.id) (e.target as HTMLElement).style.color = "#dddddd"; }}
              onMouseLeave={e => { if (active !== l.id) (e.target as HTMLElement).style.color = "#aaaaaa"; }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", color: GOLD, cursor: "pointer", fontSize: 24 }}
          className="nav-hamburger"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ borderTop: `1px solid ${GOLD_BORDER}`, padding: "16px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: active === l.id ? GOLD : "#bbbbbb",
                textAlign: "left",
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        alignItems: "center",
        padding: "120px 32px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr auto", gap: 80, alignItems: "center" }} className="hero-grid">
        {/* Left */}
        <div>
          <FadeIn delay={0}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: GOLD_DIM,
              border: `1px solid ${GOLD_BORDER}`,
              borderRadius: 4,
              padding: "6px 14px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: GOLD,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
              Портфолио · 2026
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: "0 0 20px",
              color: "#f0ece4",
            }}>
              Сәлем, мен —{" "}
              <span style={{ color: GOLD, fontStyle: "italic" }}>Мирас</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 300,
              color: "#888888",
              letterSpacing: "0.04em",
              marginBottom: 24,
            }}>
              Веб-әзірлеуші · Жасаушы · Зерттеуші
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              lineHeight: 1.8,
              color: "#999999",
              maxWidth: 480,
              marginBottom: 40,
            }}>
              Мен технологиялар арқылы идеяларды өмірге әкелуге құмармын. Қазір
              веб-технологияларды, жасанды интеллектті және UI/UX дизайнын үйренудемін.
              Әр жоба — жаңа мүмкіндік.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: GOLD,
                  color: "#080808",
                  border: "none",
                  borderRadius: 4,
                  padding: "14px 28px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.opacity = "0.85"; (e.target as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
              >
                Жобаларды көру
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "transparent",
                  color: GOLD,
                  border: `1px solid ${GOLD_BORDER}`,
                  borderRadius: 4,
                  padding: "14px 28px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { const el = e.target as HTMLElement; el.style.borderColor = GOLD; el.style.background = GOLD_DIM; el.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { const el = e.target as HTMLElement; el.style.borderColor = GOLD_BORDER; el.style.background = "transparent"; el.style.transform = "translateY(0)"; }}
              >
                Хабарласу
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Right: Avatar */}
        <FadeIn delay={0.3} className="hero-avatar-wrap">
          <div style={{ position: "relative", width: 280, height: 280 }}>
            {/* spinning ring */}
            <div style={{
              position: "absolute",
              inset: -12,
              borderRadius: "50%",
              border: `2px dashed ${GOLD_BORDER}`,
              animation: "spin 18s linear infinite",
            }} />
            <div style={{
              position: "absolute",
              inset: -6,
              borderRadius: "50%",
              border: `1px solid ${GOLD_BORDER}`,
              animation: "spin-rev 24s linear infinite",
            }} />
            {/* Avatar circle */}
            <div style={{
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "#1a1a1a",
              border: `2px solid ${GOLD_BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 80,
                fontWeight: 700,
                color: GOLD,
                opacity: 0.7,
                userSelect: "none",
              }}>М</div>
              {/* Subtle radial glow */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `radial-gradient(circle at 60% 35%, rgba(212,160,23,0.08) 0%, transparent 70%)`,
              }} />
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 48px !important; }
          .hero-avatar-wrap { display: flex; justify-content: center; }
        }
      `}</style>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const infoRows = [
    { label: "Аты", value: "Мирас" },
    { label: "Мамандық", value: "Веб-әзірлеуші" },
    { label: "Қала", value: "Астана, Қазақстан" },
    { label: "Оқу орны", value: "Astana IT College" },
    { label: "Хобби", value: "Спидкубинг, Оқу, Шахмат" },
    { label: "Тіл", value: "Қазақша" },
  ];

  const stats = [
    { num: "6", label: "Жоспарлы жоба" },
    { num: "3+", label: "Технологиялар" },
    { num: "1+", label: "Жыл оқу" },
  ];

  return (
    <section id="about" style={{ background: "#111111", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 60 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}>02 — Мен туралы</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#f0ece4", marginTop: 12 }}>
              Танысайық
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64 }} className="about-grid">
          {/* Left */}
          <div>
            <FadeIn delay={0.1}>
              {/* Info card */}
              <div style={{
                background: "#0d0d0d",
                border: `1px solid ${GOLD_BORDER}`,
                borderRadius: 6,
                overflow: "hidden",
                marginBottom: 24,
              }}>
                {infoRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      borderBottom: i < infoRows.length - 1 ? `1px solid rgba(212,160,23,0.12)` : "none",
                      padding: "14px 20px",
                    }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", width: 120, flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#cccccc" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#0d0d0d",
                      border: `1px solid ${GOLD_BORDER}`,
                      borderRadius: 6,
                      padding: "20px 16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: GOLD }}>{s.num}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: bio */}
          <FadeIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                "Мен — Мирас, жас веб-әзірлеуші және технологияға деген қызығушылығы зор студентпін. Бастауыш деңгейден бастап, HTML мен CSS арқылы веб-сайттар жасауды үйрендім.",
                "Қазір JavaScript, Python және UI/UX дизайнын тереңірек зерделеп жатырмын. Жасанды интеллект құралдарын пайдалану арқылы жұмысымды тиімді етуге тырысамын.",
                "Спидкубинг — менің тек хоббим ғана емес, ол менде логикалық ойлауды және шыдамдылықты дамытты. Кез келген күрделі есепті шешуге дайынмын.",
                "Болашақта нақты пайдаланушыларға арналған веб-қосымшалар жасап, Қазақстандағы технологиялық экожүйеге өз үлесімді қосқым келеді.",
              ].map((p, i) => (
                <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#999999", margin: 0 }}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function SkillBar({ pct, delay }: { pct: number; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ marginTop: 14 }}>
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: visible ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${GOLD} 0%, #f0c040 100%)`,
            borderRadius: 2,
            transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const skills = [
    { icon: "🌐", name: "HTML5", pct: 90 },
    { icon: "🎨", name: "CSS3", pct: 85 },
    { icon: "⚡", name: "JavaScript", pct: 70 },
    { icon: "🐍", name: "Python", pct: 55 },
    { icon: "🤖", name: "AI Tools", pct: 80 },
    { icon: "✏️", name: "UI/UX", pct: 65 },
  ];

  return (
    <section id="skills" style={{ background: "#080808", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 60 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}>03 — Дағдылар</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#f0ece4", marginTop: 12 }}>
              Мен үйренгім келетін дағдылар
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="skills-grid">
          {skills.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{
                  background: "#1a1a1a",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  borderRadius: 6,
                  padding: "28px 24px",
                  cursor: "default",
                  transition: "border-color 0.25s, transform 0.25s",
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = GOLD_BORDER; el.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: "#e0e0e0" }}>{s.name}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: GOLD, fontWeight: 600 }}>{s.pct}%</span>
                </div>
                <SkillBar pct={s.pct} delay={0.2 + i * 0.07} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── PLANS ────────────────────────────────────────────────────────────────────
function Plans() {
  const plans = [
    { emoji: "⏱️", title: "Спидкубинг таймері", desc: "Рубик кубін шешу уақытын өлшейтін, статистика жүргізетін веб-қосымша.", tags: ["React", "JavaScript"] },
    { emoji: "🌿", title: "Экология сайты", desc: "Қазақстандағы экологиялық мәселелер туралы ақпарат беретін ақпараттық платформа.", tags: ["HTML", "CSS", "JS"] },
    { emoji: "📚", title: "Қазақ әдебиеті порталы", desc: "Қазақ жазушылары мен олардың шығармаларын жинақтайтын цифрлық кітапхана.", tags: ["React", "Python"] },
    { emoji: "🛍️", title: "Шағын интернет-дүкен", desc: "Жергілікті тауарларды онлайн сату үшін жасалған электрондық коммерция сайты.", tags: ["JavaScript", "CSS"] },
    { emoji: "🌤️", title: "Ауа райы қосымшасы", desc: "API арқылы нақты уақытта Қазақстан қалаларының ауа райын көрсетеді.", tags: ["JavaScript", "API"] },
    { emoji: "✍️", title: "Жазба блогы", desc: "Технология, ғылым және жастар тақырыптарына арналған жеке блог платформасы.", tags: ["React", "Markdown"] },
  ];

  return (
    <section id="plans" style={{ background: "#111111", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}>04 — Болашақ</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#f0ece4", margin: 0 }}>
              Жоспарлар
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#666", maxWidth: 340, margin: 0, lineHeight: 1.7 }}>
              Бұл менің болашақта жүзеге асырғым келетін жобаларым. Олар әлі орындалу үстінде емес — бірақ жаттанды идеялар.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="plans-grid">
          {plans.map((p, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div
                style={{
                  background: "#0d0d0d",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  borderRadius: 6,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.25s, transform 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = GOLD_BORDER; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.transform = "translateY(0)"; }}
              >
                {/* Thumbnail area */}
                <div style={{ position: "relative", background: "#151515", height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 40 }}>{p.emoji}</span>
                  <span style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: GOLD,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    padding: "3px 8px",
                    borderRadius: 3,
                    textTransform: "uppercase",
                  }}>Жоспар</span>
                </div>

                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                    {p.tags.map((t, j) => (
                      <span key={j} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: GOLD,
                        border: `1px solid ${GOLD_BORDER}`,
                        borderRadius: 3,
                        padding: "2px 8px",
                        letterSpacing: "0.06em",
                      }}>{t}</span>
                    ))}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "#e8e4da", margin: "0 0 10px" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.75, color: "#777", margin: 0, flex: 1 }}>{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .plans-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .plans-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contacts = [
    { icon: "📍", label: "Қала", value: "Астана, Қазақстан" },
    { icon: "✉️", label: "Пошта", value: "rysbaimiras10@gmail.com" },
    { icon: "🐙", label: "GitHub", value: "github.com/miras" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1a1a1a",
    border: `1px solid rgba(255,255,255,0.1)`,
    borderRadius: 4,
    padding: "12px 16px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: "#f0ece4",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ background: "#080808", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 60 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}>05 — Байланыс</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#f0ece4", marginTop: 12 }}>
              Хабарласыңыз
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 }} className="contact-grid">
          {/* Left */}
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#888", marginBottom: 40 }}>
              Сізбен байланысуға қуаныштымын! Жоба идеялары, ынтымақтастық немесе кез-келген сұрақ бойынша хабарлаңыз.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {contacts.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    background: GOLD_DIM,
                    border: `1px solid ${GOLD_BORDER}`,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#cccccc" }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn delay={0.2}>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>Атыңыз</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handle}
                    placeholder="Мирас"
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = GOLD_BORDER}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>Пошта</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handle}
                    placeholder="you@example.kz"
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = GOLD_BORDER}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>Тақырып</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handle}
                  placeholder="Жоба туралы сөйлесейік"
                  required
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = GOLD_BORDER}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>Хабарлама</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  placeholder="Сіздің хабарламаңыз..."
                  required
                  rows={6}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = GOLD_BORDER}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
              <button
                type="submit"
                style={{
                  alignSelf: "flex-start",
                  background: sent ? "#2a6a2a" : GOLD,
                  color: sent ? "#88ff88" : "#080808",
                  border: "none",
                  borderRadius: 4,
                  padding: "14px 32px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  transition: "background 0.3s, transform 0.2s",
                }}
                onMouseEnter={e => { if (!sent) (e.target as HTMLElement).style.opacity = "0.85"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.opacity = "1"; }}
              >
                {sent ? "✓ Жіберілді" : "Жіберу →"}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const socials = ["𝕏", "in", "gh"];
  return (
    <footer style={{
      background: "#111111",
      borderTop: `1px solid ${GOLD_BORDER}`,
      padding: "32px",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
      }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: GOLD, letterSpacing: "0.12em" }}>МИРАС</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555" }}>© 2026 Мирас. Барлық құқықтар сақталған.</span>
        <div style={{ display: "flex", gap: 10 }}>
          {socials.map((s, i) => (
            <button
              key={i}
              style={{
                width: 36,
                height: 36,
                background: "transparent",
                border: `1px solid ${GOLD_BORDER}`,
                borderRadius: 4,
                color: "#888",
                fontFamily: "monospace",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color = GOLD; el.style.borderColor = GOLD; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color = "#888"; el.style.borderColor = GOLD_BORDER; }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "skills", "plans", "contact"];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <div style={{ background: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <About />
      <Skills />
      <Plans />
      <Contact />
      <Footer />

      <style>{`
        * { scrollbar-width: thin; scrollbar-color: rgba(212,160,23,0.2) transparent; }
        *::-webkit-scrollbar { width: 5px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(212,160,23,0.25); border-radius: 3px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
