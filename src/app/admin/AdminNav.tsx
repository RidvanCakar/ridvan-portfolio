'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAdmin } from '@/lib/auth';
import { useState } from 'react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/login');
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navs = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Projeler', path: '/admin/projects' },
    { name: 'Deneyimler', path: '/admin/experiences' },
    { name: '🤖 AI Bilgi Tabanı', path: '/admin/agent-context' },
    { name: '💬 Canlı Sohbetler (24 Saat)', path: '/admin/chat-logs' },
    { name: '📬 Gelen Mesajlar', path: '/admin/messages' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <button 
          className={`hamburger admin-hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menü"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h2>Yönetim</h2>
      </div>

      <nav className={`admin-nav ${isMenuOpen ? 'open' : ''}`}>
        <Link href="/" onClick={closeMenu} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand)', fontWeight: 600 }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Siteye Dön
        </Link>
        {navs.map(nav => (
          <Link 
            key={nav.path} 
            href={nav.path}
            className={pathname === nav.path ? 'active' : ''}
            onClick={closeMenu}
          >
            {nav.name}
          </Link>
        ))}
        <button onClick={handleLogout} className="logout-btn">Çıkış Yap</button>
      </nav>
    </aside>
  );
}
