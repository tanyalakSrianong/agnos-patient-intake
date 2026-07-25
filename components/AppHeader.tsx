import Link from "next/link";

export default function AppHeader({
  backLabel = "Back to home",
}: {
  backLabel?: string;
}) {
  return (
    <header className="app-header">
      <Link className="app-brand" href="/">
        <span className="brand-mark">A</span>
        <span>Agnos Care</span>
      </Link>
      <div className="app-header-actions">
        <span className="secure-label">Secure connection</span>
        <Link className="back-link" href="/">
          ← {backLabel}
        </Link>
      </div>
    </header>
  );
}
