import { getProjects, getExperiences } from '@/lib/actions';

export default async function Home() {
  const projects = await getProjects();
  const experiences = await getExperiences();

  return (
    <div className="container">
      {/* Hero Section */}
      <section id="about" style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '4rem 0'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '999px',
          color: 'var(--brand)',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          animation: 'fadeInDown 0.8s ease'
        }}>
          Merhaba, Ben Rıdvan 👋
        </div>
        <h1 style={{
          fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          letterSpacing: '-2px',
          animation: 'fadeInUp 1s ease'
        }}>
          Yazılım Mühendisi.<br/>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Kodla Çözüm Üretir.</span>
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px',
          marginBottom: '2.5rem',
          lineHeight: 1.6,
          animation: 'fadeInUp 1.2s ease'
        }}>
          Modern web teknolojileri ile kullanıcı odaklı, performanslı ve ölçeklenebilir dijital deneyimler geliştiriyorum. İşleri hızlandırmayı ve problemleri kodla çözmeyi severim.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeInUp 1.4s ease' }}>
          <a href="#projects" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Projelerimi İncele
          </a>
          <a href="https://github.com/ridvan" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/ridvan" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://instagram.com/ridvan" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://x.com/ridvan" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="X (Twitter)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ padding: '6rem 0' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          Öne Çıkan Projeler
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {projects.map((p: any) => (
            <div key={p.id} className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              {p.image_url ? (
                <div style={{ height: '220px', width: '100%', background: `url(${p.image_url}) center/cover no-repeat`, borderBottom: '1px solid var(--glass-border)' }} />
              ) : (
                <div style={{ height: '220px', width: '100%', background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), transparent)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                  Görsel Yok
                </div>
              )}
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', flex: 1 }}>{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
                    Projeyi Görüntüle &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Geçmiş projeler yakında eklenecek.</p>
          )}
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experience" style={{ padding: '6rem 0' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          Deneyimlerim
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
          {/* Vertical Timeline Line */}
          {experiences.length > 0 && <div style={{ position: 'absolute', left: '26px', top: '10px', bottom: '10px', width: '2px', background: 'var(--glass-border)' }} />}

          {experiences.map((ex: any, idx: number) => (
            <div key={ex.id} style={{ display: 'flex', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '54px', height: '54px',
                borderRadius: '50%',
                background: 'var(--background)',
                border: '2px solid var(--brand)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
              }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--brand)', borderRadius: '50%' }} />
              </div>

              <div className="glass-panel" style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.2rem' }}>{ex.role}</h3>
                    <div style={{ fontSize: '1.1rem', color: 'var(--brand)', fontWeight: 500 }}>{ex.company}</div>
                  </div>
                  <div style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
                    {ex.start_date} &mdash; {ex.end_date || 'Devam Ediyor'}
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                  {ex.details}
                </p>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '4rem' }}>Çalışma geçmişi yakında eklenecek.</p>
          )}
        </div>
      </section>

    </div>
  );
}
