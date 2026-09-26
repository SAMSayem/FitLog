
import Link from 'next/link';


export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-fitlog footer-inner">
        
        <Link href="/" className="footer-brand">
          <img
            className="brand-icon"
            src="/logo.png"
            alt="FitLog"/>
          <span>FITLOG</span>
        </Link>

   
        <p className="footer-copy">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
