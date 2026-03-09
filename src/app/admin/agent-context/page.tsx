'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getAgentContext, addAgentContext, updateAgentContext, deleteAgentContext } from '@/lib/actions';

const CATEGORIES = [
  'Eğitim',
  'Sertifikalar',
  'Teknik Yetkinlikler',
  'Kişisel Gelişim',
  'Kişilik & Çalışma Tarzı',
  'Kariyer Hedefleri',
  'İK Soruları & Cevaplar',
  'Diğer',
];

export default function AgentContextAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getAgentContext();
    setItems(data);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await updateAgentContext(editingId, { category, title, content });
    } else {
      await addAgentContext({ category, title, content });
    }
    closeModal();
    await loadData();
    setLoading(false);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setCategory(item.category);
    setTitle(item.title);
    setContent(item.content);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setCategory(CATEGORIES[0]);
    setTitle('');
    setContent('');
    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu bilgiyi silmek istediğinize emin misiniz?')) {
      await deleteAgentContext(id);
      await loadData();
    }
  };

  // Group items by category
  const grouped = items.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>🤖 AI Bilgi Tabanı</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Bu bilgiler sadece AI asistanı tarafından kullanılır. Anasayfada görünmez.
          </p>
        </div>
        <button className="btn" onClick={() => setShowModal(true)}>+ Bilgi Ekle</button>
      </div>

      {items.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.5)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Henüz bilgi eklenmemiş.</p>
          <p style={{ fontSize: '0.875rem' }}>Eğitim, sertifika, kişisel gelişim çalışmalarını buraya ekleyerek AI asistanını daha akıllı hale getir.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([cat, catItems]: any) => (
          <div key={cat} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1rem', color: 'var(--brand)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {cat}
            </h2>
            <div className="glass-panel table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Başlık</th>
                    <th>İçerik</th>
                    <th style={{ width: '120px' }}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {catItems.map((item: any) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 500 }}>{item.title}</td>
                      <td style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                        {item.content.length > 100 ? item.content.substring(0, 100) + '...' : item.content}
                      </td>
                      <td style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => openEditModal(item)} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>Düzenle</button>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>Sil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Bilgiyi Düzenle' : 'AI\'ya Bilgi Ekle'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'rgba(255,255,255,0.7)' }}>Kategori</label>
                <select
                  className="input"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'rgba(255,255,255,0.7)' }}>Başlık</label>
                <input
                  className="input"
                  placeholder="Örn: Bilgisayar Mühendisliği Lisans, AWS Sertifikası..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'rgba(255,255,255,0.7)' }}>İçerik / Detay</label>
                <textarea
                  className="textarea"
                  placeholder="Bu bilgiyle ilgili detaylı açıklama yazın. AI asistanı bu metni kullanarak soru cevaplayacak..."
                  rows={5}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
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
