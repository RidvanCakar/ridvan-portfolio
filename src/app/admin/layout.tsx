import { checkAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from './AdminNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkAdmin();
  
  if (!isAdmin) {
    redirect('/login');
  }

  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
