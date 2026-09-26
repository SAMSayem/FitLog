'use client';


import Link from 'next/link';


import { usePathname } from 'next/navigation';


import { Dumbbell, Menu, X } from 'lucide-react';


import { useState } from 'react';


import { useFitLog } from './fitlog-provider';


export default function SiteHeader() {
  
  const pathname = usePathname();

  
  const [open, setOpen] = useState(false);

  
  const { plan, saved } = useFitLog();


  const links = [
    { href: '/', label: 'Workout' },
    { href: '/my-plan', label: 'My Plan' },
  ];


  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/' || pathname.startsWith('/workout');
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <div className="container-fitlog header-inner">
       
        <button
          className="mobile-menu-button"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        
        <Link
          href="/"
          className="brand-link"
          onClick={() => setOpen(false)}
        >
          <img
            className="brand-icon"
            src="/logo.png"
            alt="FitLog"
          />
          <span className="brand-name">FITLOG</span>
        </Link>

     
        <nav className="main-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

     
        <div className="header-status">
          <Link
            href="/my-plan?tab=plan"
            className="status-badge plan"
          >
            <Dumbbell size={14} />
            <span>Plan</span>
            <strong>{plan.length}</strong>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="status-badge saved"
          >
            <span>Saved</span>
            <strong>{saved.length}</strong>
          </Link>
        </div>

       
        <div className={`mobile-menu ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          
          <Link
            href="/my-plan?tab=plan"
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            Plan ({plan.length})
          </Link>

          
          <Link
            href="/my-plan?tab=saved"
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            Saved ({saved.length})
          </Link>
        </div>
      </div>
    </header>
  );
}
