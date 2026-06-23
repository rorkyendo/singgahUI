import React from 'react';
import { useLanguage } from '../i18n';
import { FiCpu, FiSearch, FiMessageCircle, FiLink, FiHome, FiZap, FiMessageSquare, FiCheck } from 'react-icons/fi';

const iconMap = {
    cpu: FiCpu,
    search: FiSearch,
    chat: FiMessageCircle,
    link: FiLink,
    home: FiHome,
    zap: FiZap,
    messageSquare: FiMessageSquare,
    check: FiCheck,
};

const Icon = ({ name, size = 32 }) => {
    const Component = iconMap[name];
    return Component ? <Component size={size} /> : null;
};

const LandingPage = ({ onOpenWidget, onOpenPrivacy }) => {
    const { lang, toggleLanguage } = useLanguage();

    const content = {
        id: {
            nav: { features: 'Fitur', howItWorks: 'Cara Kerja', embed: 'Untuk Developer', cta: 'Coba Sekarang' },
            hero: {
                badge: 'AI-Powered Housing Assistant',
                title: 'Temukan Tempat Tinggal Idealmu dengan Bantuan AI',
                subtitle: 'Singgah mencarikan kost dan kontrakan terbaik dari berbagai sumber sekaligus, disesuaikan dengan budget dan lokasimu — dalam hitungan detik.',
                cta: 'Mulai Cari Sekarang',
                ctaSub: 'Gratis · Tanpa daftar · Langsung chat',
            },
            stats: [
                { value: '5+', label: 'Sumber Properti' },
                { value: 'AI', label: 'Rekomendasi Cerdas' },
                { value: 'Chat', label: 'Natural Language' },
                { value: '100%', label: 'Gratis Digunakan' },
            ],
            features: {
                title: 'Mengapa Pilih Singgah?',
                subtitle: 'Tidak perlu buka banyak tab. Singgah mencari dari semua platform properti sekaligus.',
                items: [
                    { icon: 'cpu', title: 'Rekomendasi AI', desc: 'AI kami memahami kebutuhanmu — status pernikahan, budget, lokasi — lalu memberikan rekomendasi yang benar-benar cocok.' },
                    { icon: 'search', title: 'Multi-Platform', desc: 'Kami mengumpulkan listing dari Rumah123, Pinhome, Lamudi, Mamikost, dan 99.co. Satu chat, semua hasil.' },
                    { icon: 'chat', title: 'Chat Natural', desc: 'Cukup cerita seperti ngobrol biasa. "Aku lajang, budget 1,5jt, cari kost di Depok" — Singgah langsung paham.' },
                    { icon: 'link', title: 'Link Langsung', desc: 'Setiap rekomendasi disertai foto, harga, dan link langsung ke sumbernya. Tinggal klik dan hubungi pemilik.' },
                    { icon: 'home', title: 'Kost & Kontrakan', desc: 'Lajang? Kami carikan kost. Sudah menikah? Kami carikan kontrakan. Otomatis sesuai statusmu.' },
                    { icon: 'zap', title: 'Hasil Instan', desc: 'Tidak perlu tunggu lama. Dalam hitungan detik, kamu sudah punya daftar pilihan dengan harga, foto, dan link langsung.' },
                ],
            },
            howItWorks: {
                title: 'Cara Kerja Singgah',
                subtitle: 'Tiga langkah mudah menuju hunian impianmu',
                steps: [
                    { num: '01', icon: 'messageSquare', title: 'Buka Chat', desc: 'Klik tombol chat dan sapa Mbok Yem. Tidak perlu registrasi, langsung mulai.' },
                    { num: '02', icon: 'cpu', title: 'Ceritakan Kebutuhan', desc: 'Sebutkan status, budget, dan lokasi yang kamu inginkan. Cukup seperti ngobrol biasa.' },
                    { num: '03', icon: 'home', title: 'Dapat Rekomendasi', desc: 'Lihat daftar properti yang cocok dengan foto, harga, dan link langsung ke sumbernya.' },
                ],
            },
            embed: {
                title: 'Integrasikan Singgah ke Website Anda',
                subtitle: 'Singgah tersedia sebagai embeddable widget. Cukup tambahkan 2 baris kode ke website Anda.',
                tag: 'Untuk Developer & Mitra',
                items: ['Cocok untuk portal properti, website developer, dan platform kos-kosan', 'Tidak perlu server tambahan — widget berjalan di atas infrastruktur Singgah', 'Kustomisasi warna dan bahasa sesuai brand Anda'],
                ctaLabel: 'Hubungi Kami untuk Akses',
            },
            footer: {
                tagline: 'Asisten hunian cerdas untuk Indonesia.',
                links: ['Kebijakan Privasi', 'Tentang Kami', 'Kontak'],
                copy: '© 2025 Singgah SmartAdvisor. All rights reserved.',
            },
        },
        en: {
            nav: { features: 'Features', howItWorks: 'How It Works', embed: 'For Developers', cta: 'Try Now' },
            hero: {
                badge: 'AI-Powered Housing Assistant',
                title: 'Find Your Ideal Home with AI Assistance',
                subtitle: 'Singgah searches for the best boarding houses and rentals from multiple sources simultaneously, tailored to your budget and location — in seconds.',
                cta: 'Start Searching Now',
                ctaSub: 'Free · No registration · Chat directly',
            },
            stats: [
                { value: '5+', label: 'Property Sources' },
                { value: 'AI', label: 'Smart Recommendations' },
                { value: 'Chat', label: 'Natural Language' },
                { value: '100%', label: 'Free to Use' },
            ],
            features: {
                title: 'Why Choose Singgah?',
                subtitle: 'No need to open multiple tabs. Singgah searches all property platforms at once.',
                items: [
                    { icon: 'cpu', title: 'AI Recommendations', desc: 'Our AI understands your needs — marital status, budget, location — and gives truly matching recommendations.' },
                    { icon: 'search', title: 'Multi-Platform', desc: 'We aggregate listings from Rumah123, Pinhome, Lamudi, Mamikost, and 99.co. One chat, all results.' },
                    { icon: 'chat', title: 'Natural Chat', desc: 'Just talk naturally. "I\'m single, budget 1.5M, looking for kost in Depok" — Singgah understands immediately.' },
                    { icon: 'link', title: 'Direct Links', desc: 'Every recommendation includes photos, price, and a direct link to the source. Just click and contact the owner.' },
                    { icon: 'home', title: 'Kost & Kontrakan', desc: 'Single? We find boarding houses. Married? We find rentals. Automatically based on your status.' },
                    { icon: 'zap', title: 'Instant Results', desc: 'No waiting. In seconds, you have a list of options with prices, photos, and direct links.' },
                ],
            },
            howItWorks: {
                title: 'How Singgah Works',
                subtitle: 'Three easy steps to your dream home',
                steps: [
                    { num: '01', icon: 'messageSquare', title: 'Open Chat', desc: 'Click the chat button and say hi to Mbok Yem. No registration needed, start right away.' },
                    { num: '02', icon: 'cpu', title: 'Tell Your Needs', desc: 'Mention your status, budget, and desired location. Just chat naturally.' },
                    { num: '03', icon: 'home', title: 'Get Recommendations', desc: 'Browse a curated list of properties with photos, prices, and direct links to the sources.' },
                ],
            },
            embed: {
                title: 'Integrate Singgah into Your Website',
                subtitle: 'Singgah is available as an embeddable widget. Just add 2 lines of code to your website.',
                tag: 'For Developers & Partners',
                items: ['Perfect for property portals, developer websites, and rental platforms', 'No additional server needed — widget runs on Singgah\'s infrastructure', 'Customize colors and language to match your brand'],
                ctaLabel: 'Contact Us for Access',
            },
            footer: {
                tagline: 'Smart housing assistant for Indonesia.',
                links: ['Privacy Policy', 'About Us', 'Contact'],
                copy: '© 2025 Singgah SmartAdvisor. All rights reserved.',
            },
        },
    };

    const c = content[lang] || content.id;

    return (
        <div style={{ fontFamily: 'Rubik, Arial, sans-serif', background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>

            {/* NAVBAR */}
            <nav style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                borderBottom: '1px solid #f0fdf4',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 24px', height: 64,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src="avatar.jpg" alt="Singgah" style={{ height: 44, width: 44, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #dcfce7' }} />
                    <span style={{ fontWeight: 700, fontSize: 20, color: '#16a34a' }}>Singgah</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ display: 'none', gap: 24, alignItems: 'center' }} className="nav-links">
                        <a href="#features" style={navLinkStyle}>{c.nav.features}</a>
                        <a href="#how-it-works" style={navLinkStyle}>{c.nav.howItWorks}</a>
                        <a href="#embed" style={navLinkStyle}>{c.nav.embed}</a>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        style={{ background: 'none', border: '1px solid #16a34a', borderRadius: 20, padding: '4px 12px', cursor: 'pointer', fontSize: 12, color: '#16a34a', fontWeight: 600 }}
                    >
                        {lang === 'id' ? 'EN' : 'ID'}
                    </button>
                    <button onClick={onOpenWidget} style={navCtaStyle}>{c.nav.cta}</button>
                </div>
            </nav>

            {/* HERO */}
            <section style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 40%, #fff 100%)',
                padding: '80px 24px 60px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, background: 'radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />

                <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
                    <div style={{ display: 'inline-block', background: '#dcfce7', color: '#15803d', borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 600, marginBottom: 20 }}>
                        {c.hero.badge}
                    </div>
                    <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: 20 }}>
                        {c.hero.title.split(' ').map((word, i) =>
                            ['AI', 'Idealmu', 'Ideal', 'AI-Powered'].includes(word)
                                ? <span key={i} style={{ color: '#16a34a' }}>{word} </span>
                                : word + ' '
                        )}
                    </h1>
                    <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#4b5563', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
                        {c.hero.subtitle}
                    </p>
                    <button onClick={onOpenWidget} style={heroCta}>
                        {c.hero.cta} →
                    </button>
                    <div style={{ marginTop: 12, fontSize: 12, color: '#9ca3af' }}>{c.hero.ctaSub}</div>
                </div>

                <div style={{ maxWidth: 700, margin: '48px auto 0', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', border: '1px solid #e5e7eb' }}>
                    <img src="bgDashboard.svg" alt="Singgah Preview" style={{ width: '100%', display: 'block' }} onError={e => { const target = e.currentTarget || e.target; if (target && target.style) target.style.display = 'none'; }} />
                    <div style={{ background: '#f0fdf4', padding: '20px 24px', borderTop: '1px solid #dcfce7' }}>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                            {['Rumah123', 'Pinhome', 'Lamudi', 'Mamikost', '99.co'].map(s => (
                                <span key={s} style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: '#15803d', fontWeight: 600 }}>{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section style={{ background: '#16a34a', padding: '40px 24px' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24, textAlign: 'center' }}>
                    {c.stats.map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>{s.value}</div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" style={{ padding: '80px 24px', background: '#fff' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: '#111827', marginBottom: 12 }}>{c.features.title}</h2>
                        <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 480, margin: '0 auto' }}>{c.features.subtitle}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
                        {c.features.items.map((f, i) => (
                            <div key={i} style={{
                                background: '#f9fafb', borderRadius: 16, padding: 24,
                                border: '1px solid #f3f4f6',
                                transition: 'box-shadow 0.2s',
                            }}>
                                <div style={{ fontSize: 48, marginBottom: 14, lineHeight: 1, color: '#16a34a' }}><Icon name={f.icon} size={48} /></div>
                                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 8 }}>{f.title}</div>
                                <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" style={{ padding: '80px 24px', background: '#f0fdf4' }}>
                <div style={{ maxWidth: 860, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: '#111827', marginBottom: 12 }}>{c.howItWorks.title}</h2>
                        <p style={{ fontSize: 15, color: '#6b7280' }}>{c.howItWorks.subtitle}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
                        {c.howItWorks.steps.map((s, i) => (
                            <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                                <div style={{ width: 80, height: 80, background: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff' }}>
                                    <Icon name={s.icon} size={36} />
                                </div>
                                <div style={{ position: 'absolute', top: 20, left: '60%', width: 'calc(40% + 16px)', height: 2, background: '#bbf7d0', display: i < 2 ? 'block' : 'none' }} />
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', marginBottom: 6, letterSpacing: 1 }}>STEP {s.num}</div>
                                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 8 }}>{s.title}</div>
                                <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6 }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EMBED / DEVELOPER */}
            <section id="embed" style={{ padding: '80px 24px', background: '#fff' }}>
                <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'inline-block', background: '#dcfce7', color: '#15803d', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, marginBottom: 16 }}>
                            {c.embed.tag}
                        </div>
                        <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 800, color: '#111827', marginBottom: 16 }}>{c.embed.title}</h2>
                        <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 20 }}>{c.embed.subtitle}</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                            {c.embed.items.map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13, color: '#374151' }}>
                                    <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}><Icon name="check" size={12} /></span> {item}
                                </li>
                            ))}
                        </ul>
                        <button style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                            {c.embed.ctaLabel}
                        </button>
                    </div>
                    <div style={{ background: '#0f172a', borderRadius: 16, padding: 24, fontFamily: 'monospace' }}>
                        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>HTML · 2 lines only</div>
                        <div style={{ fontSize: 12, lineHeight: 1.8 }}>
                            <span style={{ color: '#94a3b8' }}>&lt;</span>
                            <span style={{ color: '#7dd3fc' }}>script</span>
                            <span style={{ color: '#94a3b8' }}> src=</span>
                            <span style={{ color: '#86efac' }}>"https://singgah.app/widget.js"</span>
                            <span style={{ color: '#94a3b8' }}>&gt;&lt;/</span>
                            <span style={{ color: '#7dd3fc' }}>script</span>
                            <span style={{ color: '#94a3b8' }}>&gt;</span>
                            <br />
                            <span style={{ color: '#94a3b8' }}>&lt;</span>
                            <span style={{ color: '#7dd3fc' }}>div</span>
                            <span style={{ color: '#94a3b8' }}> id=</span>
                            <span style={{ color: '#86efac' }}>"singgah-widget"</span>
                            <span style={{ color: '#fbbf24' }}> data-lang=</span>
                            <span style={{ color: '#86efac' }}>"id"</span>
                            <span style={{ color: '#94a3b8' }}>&gt;&lt;/</span>
                            <span style={{ color: '#7dd3fc' }}>div</span>
                            <span style={{ color: '#94a3b8' }}>&gt;</span>
                        </div>
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #1e293b', fontSize: 11, color: '#64748b' }}>
                            <Icon name="check" size={11} /> Zero dependency &nbsp;·&nbsp; <Icon name="check" size={11} /> Responsive &nbsp;·&nbsp; <Icon name="check" size={11} /> Bi-lingual
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section style={{ background: 'linear-gradient(135deg, #16a34a 0%, #0d6b2e 100%)', padding: '64px 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
                    {lang === 'id' ? 'Siap Menemukan Hunian Idealmu?' : 'Ready to Find Your Ideal Home?'}
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 32 }}>
                    {lang === 'id' ? 'Mulai chat dengan Mbok Yem sekarang. Gratis, cepat, dan langsung dari browser kamu.' : 'Start chatting with Mbok Yem now. Free, fast, and directly from your browser.'}
                </p>
                <button onClick={onOpenWidget} style={{ background: '#fff', color: '#16a34a', border: 'none', borderRadius: 12, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                    {lang === 'id' ? 'Mulai Sekarang →' : 'Get Started →'}
                </button>
            </section>

            {/* FOOTER */}
            <footer style={{ background: '#0f172a', padding: '40px 24px', color: '#94a3b8' }}>
                <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <img src="avatar.jpg" alt="Singgah" style={{ height: 40, width: 40, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #334155' }} />
                            <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Singgah</span>
                        </div>
                        <div style={{ fontSize: 12 }}>{c.footer.tagline}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                        {c.footer.links.map((l, i) => {
                            const isContact = l === 'Kontak' || l === 'Contact';
                            const isPrivacy = l === 'Kebijakan Privasi' || l === 'Privacy Policy';
                            if (isContact) {
                                return (
                                    <a key={i} href="https://wa.me/6282276648478" target="_blank" rel="noopener noreferrer" style={footerLinkBtn}>
                                        {l}
                                    </a>
                                );
                            }
                            return (
                                <button key={i} type="button" style={footerLinkBtn} onClick={() => isPrivacy ? onOpenPrivacy() : onOpenWidget()}>
                                    {l}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div style={{ maxWidth: 860, margin: '20px auto 0', borderTop: '1px solid #1e293b', paddingTop: 20, fontSize: 11, color: '#475569', textAlign: 'center' }}>
                    {c.footer.copy}
                </div>
            </footer>
        </div>
    );
};

const navLinkStyle = { fontSize: 14, color: '#374151', textDecoration: 'none', fontWeight: 500 };
const footerLinkBtn = { fontSize: 12, color: '#94a3b8', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 };
const navCtaStyle = {
    background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8,
    padding: '8px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
};
const heroCta = {
    background: '#16a34a', color: '#fff', border: 'none', borderRadius: 12,
    padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(22,163,74,0.3)',
};

export default LandingPage;
