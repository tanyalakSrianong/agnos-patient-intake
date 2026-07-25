import Link from "next/link";

export default function Home() {
  return (
    <main className="home-shell">
      <div className="home-glow home-glow-one" />
      <div className="home-glow home-glow-two" />

      <section className="home-content">
        <header className="brand">
          <span className="brand-mark">A</span>
          <span>Agnos Care</span>
        </header>

        <div className="eyebrow">Patient intake, made simple</div>
        <h1>One form. Clear information. Better care.</h1>
        <p className="home-lead">
          A real-time patient intake experience designed for patients and care
          teams to stay in sync.
        </p>

        <div className="role-grid">
          <Link className="role-card role-card-primary" href="/patient">
            <span className="role-icon">P</span>
            <span>
              <strong>I&apos;m a patient</strong>
              <small>Start or continue your intake form</small>
            </span>
            <span className="arrow">→</span>
          </Link>

          <Link className="role-card" href="/staff">
            <span className="role-icon">S</span>
            <span>
              <strong>Staff dashboard</strong>
              <small>Monitor patient progress in real time</small>
            </span>
            <span className="arrow">→</span>
          </Link>
        </div>

        <div className="trust-row">
          <span>Secure intake</span>
          <span>Real-time updates</span>
          <span>Responsive design</span>
        </div>
      </section>

      <aside className="home-visual" aria-label="Product preview">
        <div className="preview-card preview-main">
          <div className="preview-top">
            <span className="preview-avatar">JD</span>
            <span>
              <strong>Patient intake</strong>
              <small>In progress</small>
            </span>
            <span className="live-pill">Live</span>
          </div>
          <div className="preview-progress">
            <span />
          </div>
          <div className="preview-field">
            <small>Full name</small>
            <strong>Jordan Davis</strong>
          </div>
          <div className="preview-field-row">
            <div className="preview-field">
              <small>Date of birth</small>
              <strong>12 Mar 1994</strong>
            </div>
            <div className="preview-field">
              <small>Preferred language</small>
              <strong>English</strong>
            </div>
          </div>
          <div className="preview-line" />
          <div className="preview-line short" />
        </div>
        <div className="preview-card preview-float">
          <span className="status-dot" />
          <span>
            <strong>Updates instantly</strong>
            <small>Staff view is synchronized</small>
          </span>
        </div>
      </aside>
    </main>
  );
}
