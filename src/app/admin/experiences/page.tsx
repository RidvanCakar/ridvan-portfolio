'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '@/lib/actions';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: 'long' }).format(date);
  } catch (e) {
    return dateStr;
  }
};

export default function ExperiencesAdmin() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [editingId, setEditingId] = useState<number | null>(null);
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

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await updateExperience(editingId, { company, role, start_date: startDate, end_date: endDate, details });
    } else {
      await addExperience({ company, role, start_date: startDate, end_date: endDate, details });
    }
    closeModal();
    await loadData();
    setLoading(false);
  };

  const openEditModal = (ex: any) => {
    setEditingId(ex.id);
    setCompany(ex.company);
    setRole(ex.role);
    setStartDate(ex.start_date);
    setEndDate(ex.end_date || '');
    setDetails(ex.details);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setCompany('');
    setRole('');
    setStartDate('');
    setEndDate('');
    setDetails('');
    setShowModal(false);
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
                <td>{formatDate(ex.start_date)} - {ex.end_date ? formatDate(ex.end_date) : 'Devam Ediyor'}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEditModal(ex)} className="btn btn-secondary" style={{padding: '0.5rem 1rem'}}>Düzenle</button>
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
            <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Deneyimi Düzenle' : 'Deneyim Ekle'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input className="input" placeholder="Şirket Adı" value={company} onChange={e => setCompany(e.target.value)} required />
              <input className="input" placeholder="Pozisyon / Rol" value={role} onChange={e => setRole(e.target.value)} required />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'rgba(255,255,255,0.7)' }}>Başlangıç Tarihi</label>
                  <input type="date" className="input" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'rgba(255,255,255,0.7)' }}>Bitiş Tarihi (Boş=Devam)</label>
                  <input type="date" className="input" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>
              <textarea className="textarea" placeholder="Yaptığınız işin detayları..." rows={4} value={details} onChange={e => setDetails(e.target.value)} required />
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn" disabled={loading}>{loading ? 'Kaydediliyor...' : 'Kaydet'}</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal} disabled={loading}>İptal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
