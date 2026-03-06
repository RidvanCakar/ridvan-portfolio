'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/auth';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await loginAdmin(password);
    if (res.success) {
      router.push('/admin');
    } else {
      setError(res.error || 'Giriş yapılamadı.');
    }
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="glass-panel login-form">
        <h1 className="login-title">Yönetim Paneli Girişi</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="password" 
            placeholder="Şifrenizi girin..." 
            className="input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}
