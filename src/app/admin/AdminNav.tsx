'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAdmin } from '@/lib/auth';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/login');
  };

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
      <h2>Yönetim</h2>
      <nav className="admin-nav">
        <Link href="/" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand)', fontWeight: 600 }}>
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
          >
            {nav.name}
          </Link>
        ))}
        <button onClick={handleLogout} className="logout-btn">Çıkış Yap</button>
      </nav>
    </aside>
  );
}
