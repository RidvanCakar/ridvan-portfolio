'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getExperiences, addExperience, deleteExperience } from '@/lib/actions';

export default function ExperiencesAdmin() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getExperiences();
    setExperiences(data);
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addExperience({ company, role, start_date: startDate, end_date: endDate, details });
    setCompany(''); setRole(''); setStartDate(''); setEndDate(''); setDetails('');
    setShowModal(false);
    await loadData();
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if(confirm('Silmek istediğinize emin misiniz?')) {
      await deleteExperience(id);
      await loadData();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Deneyimler / Çalışılan Yerler</h1>
        <button className="btn" onClick={() => setShowModal(true)}>+ Yeni Ekle</button>
      </div>

      <div className="glass-panel table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Şirket</th>
              <th>Rol</th>
              <th>Tarih</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map(ex => (
              <tr key={ex.id}>
                <td>{ex.company}</td>
                <td>{ex.role}</td>
                <td>{ex.start_date} - {ex.end_date || 'Devam Ediyor'}</td>
                <td>
                  <button onClick={() => handleDelete(ex.id)} className="btn btn-danger btn-secondary" style={{padding: '0.5rem 1rem'}}>Sil</button>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && <tr><td colSpan={4}>Henüz deneyim eklenmemiş.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2 style={{ marginBottom: '1.5rem' }}>Deneyim Ekle</h2>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input className="input" placeholder="Şirket Adı" value={company} onChange={e => setCompany(e.target.value)} required />
              <input className="input" placeholder="Pozisyon / Rol" value={role} onChange={e => setRole(e.target.value)} required />
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input className="input" placeholder="Başlangıç Tarihi (Örn: 2023)" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                <input className="input" placeholder="Bitiş Tarihi (Boş=Devam)" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
              <textarea className="textarea" placeholder="Yaptığınız işin detayları..." rows={4} value={details} onChange={e => setDetails(e.target.value)} required />
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn" disabled={loading}>{loading ? 'Kaydediliyor...' : 'Kaydet'}</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={loading}>İptal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
