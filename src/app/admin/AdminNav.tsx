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
  ];

  return (
    <aside className="admin-sidebar">
      <h2>Yönetim</h2>
      <nav className="admin-nav">
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
