import { getProjects, getExperiences } from '@/lib/actions';
import ExperienceItem from '@/components/ExperienceItem';

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
        {/* Animated Background Elements */}
        {/* Using style objects directly for custom properties isn't fully supported in React typings without casting sometimes, but we can use standard transform for rotation */}
        <div className="bg-code" style={{ top: '15%', right: '5%', transform: 'rotate(5deg)' }}>
          {`if (vision) {\n  build(amazing);\n}`}
        </div>
        <div className="bg-code" style={{ top: '65%', left: '-5%', transform: 'rotate(-5deg)', fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'rgba(59, 130, 246, 0.03)' }}>
          {`<Code />`}
        </div>
        
        {/* Ambient Light Beams */}
        <div className="light-beam" style={{ left: '10vw', animationDelay: '0s' }} />
        <div className="light-beam" style={{ right: '20vw', animationDelay: '3s', height: '200px' }} />
        <div className="light-beam" style={{ left: '50vw', animationDelay: '6s', height: '100px', opacity: 0.3 }} />
        <div style={{
          display: 'inline-block',
          padding: '0.4rem 0.8rem',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '999px',
          color: 'var(--brand)',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginBottom: '1rem',
          animation: 'fadeInDown 0.8s ease'
        }}>
          Sizin İçin Kodluyorum 
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: '1.25rem',
          letterSpacing: '-1px',
          animation: 'fadeInUp 1s ease'
        }}>
          Profesyonel <br/>
          <span style={{ color: 'var(--brand)' }}>Yazılım Çözümleri.</span>
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.75)',
          maxWidth: '800px',
          marginBottom: '2.5rem',
          lineHeight: 1.8,
          animation: 'fadeInUp 1.2s ease',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          Yazılım mühendisliği yaklaşımıyla web uygulamaları, backend sistemleri, veri entegrasyonları ve yapay zeka çözümleri geliştiriyorum. Amacım yalnızca çalışan yazılımlar üretmek değil; sürdürülebilir, ölçeklenebilir ve uzun vadede değer üreten sistemler tasarlamak.
        </p>
        
        <div className="hero-buttons" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', animation: 'fadeInUp 1.4s ease' }}>
          <a href="#projects" className="btn" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
            Projelerimi İncele
          </a>
          <a href="https://github.com/RidvanCakar" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/ridvancakar" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://instagram.com/ridvan.cakarr" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '4rem 0', position: 'relative' }}>
        <div className="bg-code" style={{ top: '20%', right: '-10%', textAlign: 'right', fontSize: 'clamp(2rem, 4vw, 3rem)', transform: 'rotate(-3deg)' }}>
          {`const services = [\n  'web', \n  'mobile', \n  'backend', \n  'ai'\n ];`}
        </div>

        {/* Additional accent light */}
        <div style={{ position: 'absolute', top: '30%', right: '0', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }} />

        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
          Nasıl Yardımcı Olabilirim?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.5rem' }}>
          
          <div className="service-card">
            <div className="service-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Modern Web Geliştirme</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              İşletmeniz veya kişisel markanız için hızlı, modern, SEO uyumlu profesyonel web siteleri oluşturuyorum. Yeni nesil framework'ler (Next.js, React) ve modern CSS yaklaşımlarıyla yüksek performanslı, etkileşimli ve ölçeklenebilir kullanıcı arayüzleri inşa ediyorum.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Sistem Entegrasyonları & AI</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Farklı yazılımlar ve üçüncü parti hizmetler (Ödeme sistemleri, CRM'ler) arasında sorunsuz köprüler kuruyorum. Mevcut iş süreçlerinizi otomatize edecek kurgularla donatarak yapay zeka entegrasyonlarıyla projenize değer katarım.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Mimarî & Backend Çözümleri</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Kararlı veritabanı tasarımları, RESTful & GraphQL API'ler ve uygulamanızın kalbini oluşturacak ölçeklenebilir arkaplan sistemleri kuruyorum. Güvenlik, hız ve veri doğruluğunu ön planda tutan sağlam altyapılar geliştiriyorum.
            </p>
          </div>


          <div className="service-card">
            <div className="service-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Mobil Uyumlu Deneyimler</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Fikrinizi her cihazda (telefon, tablet, masaüstü) harika görünen ve kesintisiz çalışan duyarlı (responsive) web uygulamalarına dönüştürüyorum. Gelişmiş kullanıcı deneyimi (UX) tasarımıyla sınırları ortadan kaldırıyorum.
            </p>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ padding: '4rem 0', position: 'relative' }}>
        <div className="bg-code" style={{ top: '40%', left: '-8%', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'rgba(255,255,255,0.02)', transform: 'rotate(4deg)' }}>
          {`{() => renderProjects()}`}
        </div>
        
        {/* Ambient Light Beams */}
        <div className="light-beam" style={{ left: '80vw', animationDelay: '2s', height: '250px' }} />
        
        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
          Öne Çıkan Projeler
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {projects.map((p: any) => (
            <div key={p.id} className="glass-panel project-card">
              {p.image_url ? (
                <div style={{ height: '180px', width: '100%', background: `url(${p.image_url}) center/cover no-repeat`, borderBottom: '1px solid var(--glass-border)' }} />
              ) : (
                <div style={{ height: '180px', width: '100%', background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), transparent)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                  Görsel Yok
                </div>
              )}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', flex: 1, fontSize: '0.9rem' }}>{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link" style={{ fontSize: '0.9rem' }}>
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
      <section id="experience" style={{ padding: '4rem 0', position: 'relative' }}>
        <div className="bg-code" style={{ bottom: '20%', right: '0%', textAlign: 'right', color: 'rgba(59, 130, 246, 0.02)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', transform: 'rotate(-6deg)' }}>
          {`git commit -m\n"added experience"`}
        </div>
        
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }} />

        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
          Deneyimlerim
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
          {/* Vertical Timeline Line */}
          {experiences.length > 0 && <div className="timeline-line" style={{ position: 'absolute', left: '20px', top: '10px', bottom: '10px', width: '2px', background: 'var(--glass-border)' }} />}

          {experiences.map((ex: any, idx: number) => (
            <ExperienceItem key={ex.id} ex={ex} />
          ))}
          {experiences.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '4rem' }}>Çalışma geçmişi yakında eklenecek.</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '5rem 0', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(15, 16, 20, 0) 70%)',
          zIndex: -1, pointerEvents: 'none'
        }} />
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>İletişime Geçin</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Yeni bir projeniz mi var veya mevcut projeniz için desteğe mi ihtiyacınız var? Fikirlerinizi hayata geçirmek için bir mesaj uzağınızdayım.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Phone Card */}
          <a href="tel:05418015310" className="glass-panel contact-card" style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', 
            padding: '2.5rem 2rem', textDecoration: 'none', background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
          }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', 
              background: 'rgba(59, 130, 246, 0.1)', color: 'var(--brand)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
            }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white' }}>Telefonla Arayın</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>Doğrudan görüşmek için beni arayabilirsiniz.</p>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--brand)', letterSpacing: '1px' }}>0541 801 53 10</div>
          </a>
          
          {/* WhatsApp Card */}
          <a href="https://wa.me/905418015310" target="_blank" rel="noopener noreferrer" className="glass-panel contact-card" style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', 
            padding: '2.5rem 2rem', textDecoration: 'none', background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
          }}>
             <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', 
              background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
              boxShadow: '0 0 20px rgba(37, 211, 102, 0.2)'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white' }}>WhatsApp'tan Yazın</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>Hızlı iletişim için mesaj gönderebilirsiniz.</p>
            <div style={{ fontSize: '1.1rem', fontWeight: 500, color: '#25D366', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Mesaja Başla 
              <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
            </div>
          </a>
        </div>
      </section>

    </div>
  );
}
