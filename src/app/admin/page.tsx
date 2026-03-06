export default function AdminDashboard() {
  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>
      <div className="glass-panel">
        <p>Hoş geldiniz! Sol menüden portfolyo içeriklerinizi (Projeler, Deneyimler, Sosyal Medya hesapları) yönetebilirsiniz.</p>
        <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)' }}>
          Bu panel üzerinden yaptığınız tüm değişiklikler anında ziyaretçilerin gördüğü ana portfolyo sayfanıza yansıyacaktır.
        </p>
      </div>
    </div>
  );
}
