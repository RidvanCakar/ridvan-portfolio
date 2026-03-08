'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '@/lib/actions';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await updateProject(editingId, { title, description, link, image_url: imageUrl });
    } else {
      await addProject({ title, description, link, image_url: imageUrl });
    }
    closeModal();
    await loadProjects();
    setLoading(false);
  };

  const openEditModal = (p: any) => {
    setEditingId(p.id);
    setTitle(p.title);
    setDescription(p.description);
    setLink(p.link || '');
    setImageUrl(p.image_url || '');
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setLink('');
    setImageUrl('');
    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    if(confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      await deleteProject(id);
      await loadProjects();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Projeler</h1>
        <button className="btn" onClick={() => setShowModal(true)}>+ Yeni Proje</button>
      </div>

      <div className="glass-panel table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Proje Adı</th>
              <th>Bağlantı</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{textDecoration:'underline'}}>Linki Aç</a>}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEditModal(p)} className="btn btn-secondary" style={{padding: '0.5rem 1rem'}}>Düzenle</button>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-secondary" style={{padding: '0.5rem 1rem'}}>Sil</button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan={3}>Henüz proje eklenmemiş.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input className="input" placeholder="Proje Adı" value={title} onChange={e => setTitle(e.target.value)} required />
              <textarea className="textarea" placeholder="Proje Açıklaması" rows={4} value={description} onChange={e => setDescription(e.target.value)} required />
              <input className="input" placeholder="Proje Linki (https://...)" value={link} onChange={e => setLink(e.target.value)} />
              <input className="input" placeholder="Görsel Linki (https://...)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
              
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
