import { getProjects, getExperiences } from '@/lib/actions';

export default async function Home() {
  const projects = await getProjects();
  const experiences = await getExperiences();

  return (
    <div className="container">
      {/* Hero Section */}
      <section id="about" className="hero-section" style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '8rem 0 4rem 0',
        position: 'relative'
      }}>
        <div className="hero-glow"></div>
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
          Sizin İçin Kodluyorum 🚀
        </div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          letterSpacing: '-1.5px',
          animation: 'fadeInUp 1s ease'
        }}>
          Profesyonel <br/>
          <span style={{ color: 'var(--brand)' }}>Yazılım Çözümleri.</span>
        </h1>
        <p style={{
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '700px',
          marginBottom: '2.5rem',
          lineHeight: 1.7,
          animation: 'fadeInUp 1.2s ease'
        }}>
          Her türlü yazılım ihtiyacınızda size özel profesyonel destek sağlıyorum. 
          Modern web uygulamalarından sağlam arka uç (backend) sistemlerine kadar projenizin A'dan Z'ye tüm aşamalarında 
          yanınızdayım. Sorunlarınızı dinler, analiz eder ve kodla kalıcı şekilde çözerim.
        </p>
        
        <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeInUp 1.4s ease' }}>
          <a href="#projects" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Projelerimi İncele
          </a>
          <a href="https://github.com/RidvanCakar" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/ridvancakar" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://instagram.com/ridvan.cakarr" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '6rem 0', position: 'relative' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          Nasıl Yardımcı Olabilirim?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          
          <div className="service-card">
            <div className="service-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Web Geliştirme</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              İşletmeniz veya kişisel markanız için hızlı, modern, SEO uyumlu ve mobil cihazlarla kusursuz çalışan profesyonel web siteleri oluşturuyorum.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Mobil Odaklı Çözümler</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Fikrinizi her cihazda (telefon, tablet) harika görünen ve kullanıcı dostu bir şekilde çalışan duyarlı (responsive) web uygulamalarına dönüştürüyorum.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Sistem & API (Backend)</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Güvenli veritabanı tasarımları, RESTful API'ler ve uygulamanızın kalbini oluşturacak güçlü, ölçeklenebilir arkaplan sistemleri kuruyorum.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Danışmanlık & Sorun Çözümü</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Mevcut projelerinizde yaşadığınız tasarımsal, mantıksal veya performans sorunlarını tespit edip, projelerinizi hızla iyileştirir ve profesyonelleştiririm.
            </p>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ padding: '6rem 0' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          Öne Çıkan Projeler
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {projects.map((p: any) => (
            <div key={p.id} className="glass-panel project-card">
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
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
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
          {experiences.length > 0 && <div className="timeline-line" style={{ position: 'absolute', left: '26px', top: '10px', bottom: '10px', width: '2px', background: 'var(--glass-border)' }} />}

          {experiences.map((ex: any, idx: number) => (
            <div key={ex.id} className="experience-item" style={{ display: 'flex', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
              <div className="timeline-icon" style={{
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

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>İletişime Geçin</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          Yeni bir projeniz mi var veya mevcut projeniz için desteğe mi ihtiyacınız var? Sistemlerinizi baştan inşa edebilir veya var olan sorunları kalıcı şekilde çözebilirim. Benimle iletişime geçmekten çekinmeyin.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <a href="tel:05418015310" className="glass-panel contact-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 2.5rem', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem' }}>Telefon</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', letterSpacing: '1px' }}>0541 801 53 10</div>
            </div>
          </a>
          
          <a href="https://wa.me/905418015310" target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            WhatsApp'tan Yazın
          </a>
        </div>
      </section>

    </div>
  );
}
