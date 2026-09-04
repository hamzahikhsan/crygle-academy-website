/**
 * CRYGLE ACADEMY - INTERACTIVE LOGIC
 * High performance, vanilla JS for micro-interactions and smooth user experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initProgramSwitcher();
  initFaqAccordion();
  initTestimonialSlider();
  initSmoothScroll();
  initDynamicCourseDetails();
  initCourseDetailTabs();
  initCurriculumAccordion();
  initShareButton();
  initCheckoutPaymentMethods();
  initPromoCode();
  initReceiptModal();
  initDashboardFilters();
  initDashboardHashRouter();
  initHeaderDropdowns();
  initBootcampSubTabs();
  initBookingSlotPicker();
  initExploreCatalogFilters();
  initChatWorkspace();
  initAffiliateCopy();
  initSettingsForm();
  initAuthForms();
  initForgotPasswordForm();
  initOtpVerification();
  initKatalogFilters();
  initPaymentSimulation();
  initNavbarDropdowns();
  initHeroVideoModal();
  initDynamicClassroom();
  initClassroomPlayer();
  initClassroomSyllabus();
  initClassroomTabs();
  initNextModulButton();
  initMentorChatModal();
});

/* -------------------------------------------------------------------------- */
/* 1. STICKY NAVBAR WITH BLUR TRANSITION                                     */
/* -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar-wrapper');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* -------------------------------------------------------------------------- */
/* 1.1 MEGA DROPDOWN WORKSPACE (VIDEO KELAS & BOOTCAMP INTENSIF)              */
/* -------------------------------------------------------------------------- */
function initNavbarDropdowns() {
  const dropdownWrappers = document.querySelectorAll('.nav-dropdown-wrapper');
  if (!dropdownWrappers.length) return;

  dropdownWrappers.forEach(wrapper => {
    const triggerBtn = wrapper.querySelector('button.nav-item');
    if (!triggerBtn) return;

    triggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('open');

      // Close all other dropdowns
      dropdownWrappers.forEach(w => {
        if (w !== wrapper) {
          w.classList.remove('open');
          const btn = w.querySelector('button.nav-item');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        wrapper.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      } else {
        wrapper.classList.add('open');
        triggerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown-wrapper')) {
      dropdownWrappers.forEach(w => {
        w.classList.remove('open');
        const btn = w.querySelector('button.nav-item');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownWrappers.forEach(w => {
        w.classList.remove('open');
        const btn = w.querySelector('button.nav-item');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 1.2 HERO VIDEO TRAILER MODAL                                              */
/* -------------------------------------------------------------------------- */
function initHeroVideoModal() {
  const playBtn = document.getElementById('btn-play-hero-video');
  const modal = document.getElementById('hero-video-modal');
  const closeBtn = document.getElementById('btn-close-hero-modal');
  const iframe = document.getElementById('hero-iframe-video');
  if (!playBtn || !modal) return;

  const originalSrc = iframe ? iframe.src : '';

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (iframe) {
      iframe.src = originalSrc.includes('autoplay=1') ? originalSrc : originalSrc + '&autoplay=1';
    }
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (iframe) {
      iframe.src = originalSrc;
    }
  };

  playBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 2. RANGKAIAN PROGRAM SWITCHER                                              */
/* -------------------------------------------------------------------------- */
function initProgramSwitcher() {
  const programItems = document.querySelectorAll('.program-card-item');
  const previewContainer = document.querySelector('.program-preview-display');
  if (!programItems.length || !previewContainer) return;

  const programData = {
    'tentang': {
      title: 'Tentang Crygle Academy',
      tag: 'Sanctuary Belajar Kreatif K-12',
      desc: 'Crygle Academy x Boarding School adalah wadah pendidikan digital terstruktur untuk siswa SD hingga SMK. Kami menyeimbangkan teori dengan aksi nyata untuk menghasilkan karya bernilai.',
      skills: ['Belajar Berbasis Proyek Nyata', 'Sertifikat Kompetensi Resmi', 'Grup Komunitas & Diskusi Terarah', 'Jadwal Fleksibel Menyesuaikan Asrama'],
      badgeText: 'Kolaborasi Sekolah Asrama',
      ctaText: 'Pelajari Filosofi Kami'
    },
    'design': {
      title: 'Kreatif Design Track',
      tag: 'UI/UX · 3D Modeling · Vector Art',
      desc: 'Mulai dari memahami dasar estetika, riset pengguna, hingga memproduksi UI Kit dan aset 3D yang siap dijual di platform global seperti Freepik & UI8.',
      skills: ['Figma Masterclass & Dev Mode Handoff', 'Pembuatan 3D Objek di Blender', 'Desain UI Kit Komersial', 'Portfolio Review Berkala'],
      badgeText: 'Flagship Terpopuler',
      ctaText: 'Lihat Kurikulum Design'
    },
    'coding': {
      title: 'Kreatif Coding Track',
      tag: 'Front-End · Game Dev · Logika Pemrograman',
      desc: 'Mengenalkan logika komputasional dan pemrograman web dengan pendekatan visual interaktif. Dari membuat game mini hingga merancang website portofolio sendiri.',
      skills: ['HTML5, CSS3 & JavaScript Modern', 'Logika Algoritma & Problem Solving', 'Pembuatan Game 2D Sederhana', 'Deploy Web Portofolio Live'],
      badgeText: 'Tingkat Pemula s/d Mahir',
      ctaText: 'Lihat Kurikulum Coding'
    },
    'robot': {
      title: 'Kreatif Robot Track',
      tag: 'Robotika Dasar · IoT · Smart Device',
      desc: 'Mengenal teknologi hardware dan kecerdasan buatan sejak dini. Belajar merakit sensor, mikrokontroler, dan memprogram logika gerak robot secara menyenangkan.',
      skills: ['Pengenalan Komponen & Sirkuit', 'Pemrograman Mikrokontroler Arduino/ESP', 'Sensor Gerak & Otomasi Cerdas', 'Proyek Robot Kompetisi'],
      badgeText: 'Praktik & Eksperimen',
      ctaText: 'Lihat Kurikulum Robotika'
    }
  };

  programItems.forEach(item => {
    item.addEventListener('click', () => {
      const trackKey = item.getAttribute('data-program');
      const data = programData[trackKey];
      if (!data) return;

      // Update active state in list
      programItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      // Animate preview box transition
      previewContainer.style.opacity = '0.5';
      previewContainer.style.transform = 'scale(0.99)';

      setTimeout(() => {
        previewContainer.innerHTML = `
          <div class="preview-header">
            <span class="badge badge-primary" style="margin-bottom: 16px;">${data.badgeText}</span>
            <h3 style="font-size: 28px; font-weight: 800; color: var(--color-dark); margin-bottom: 8px;">${data.title}</h3>
            <p style="font-size: 15px; font-weight: 600; color: var(--color-primary); margin-bottom: 16px;">${data.tag}</p>
            <p style="font-size: 15px; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 24px;">${data.desc}</p>
          </div>
          
          <div class="preview-skills" style="margin-bottom: 32px;">
            <p style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-light); margin-bottom: 12px;">Fokus Keterampilan:</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              ${data.skills.map(s => `
                <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--color-dark);">
                  <span style="color: var(--color-success); font-weight: bold;">✓</span> ${s}
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="preview-action" style="display: flex; align-items: center; justify-content: space-between; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.06);">
            <span style="font-size: 13px; color: var(--color-text-muted);">Diampu oleh Mentor Praktisi Industri</span>
            <a href="#popular-courses" class="btn btn-primary" style="padding: 10px 20px; font-size: 14px;">${data.ctaText} →</a>
          </div>
        `;

        previewContainer.style.opacity = '1';
        previewContainer.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 3. FAQ ACCORDION INTERACTION                                              */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items in the same column (optional for cleaner view)
      const siblingItems = item.closest('.faq-column')?.querySelectorAll('.faq-item') || [];
      siblingItems.forEach(sib => {
        if (sib !== item) sib.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. TESTIMONIAL SLIDER                                                     */
/* -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const testimonials = [
    {
      quote: "“Awalnya aku nggak ngerti coding sama sekali dan bingung harus mulai dari mana. Setelah ikut Crygle Academy, materinya gampang dipahami karena step by step. Sekarang aku sudah bisa bikin game sederhana sendiri!”",
      name: "Andi Hidayat",
      role: "Peserta Creative Coding · Kelas 10 SMK Boarding School",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "“Kelas UI/UX dari Mas Dimas sangat aplikatif! Bukan cuma diajarin cara gambar di Figma, tapi juga pola pikir desainer dan cara monetize karya jadi UI Kit di platform global.”",
      name: "Rania Faradiba",
      role: "Alumni UI/UX Flagship · Siswi SMA Asrama",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "“Sebagai orang tua murid di sekolah asrama, saya merasa aman karena anak saya mendapatkan bimbingan digital terarah. Materinya berkualitas, mentornya suportif, dan ada progres berkala.”",
      name: "Bambang Sudibyo",
      role: "Wali Murid Siswa Boarding School",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    }
  ];

  let currentIndex = 0;
  const quoteEl = document.querySelector('.testi-quote-text');
  const nameEl = document.querySelector('.testi-name');
  const roleEl = document.querySelector('.testi-role');
  const avatarEl = document.querySelector('.testi-avatar');
  const btnPrev = document.querySelector('.testi-btn-prev');
  const btnNext = document.querySelector('.testi-btn-next');
  const dots = document.querySelectorAll('.testi-dot');

  if (!quoteEl || !nameEl || !btnPrev || !btnNext) return;

  const updateTestimonial = (index) => {
    currentIndex = (index + testimonials.length) % testimonials.length;
    const data = testimonials[currentIndex];

    // Smooth fade
    quoteEl.style.opacity = '0.3';
    quoteEl.style.transform = 'translateY(4px)';

    setTimeout(() => {
      quoteEl.textContent = data.quote;
      nameEl.textContent = data.name;
      roleEl.textContent = data.role;
      if (avatarEl) avatarEl.src = data.avatar;

      // Update dots
      dots.forEach((dot, idx) => {
        dot.style.background = idx === currentIndex ? 'var(--color-primary)' : 'var(--color-border)';
        dot.style.transform = idx === currentIndex ? 'scale(1.25)' : 'scale(1)';
      });

      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
    }, 150);
  };

  btnPrev.addEventListener('click', () => updateTestimonial(currentIndex - 1));
  btnNext.addEventListener('click', () => updateTestimonial(currentIndex + 1));
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateTestimonial(idx));
  });
}

/* -------------------------------------------------------------------------- */
/* 5. SMOOTH SCROLLING FOR NAVIGATION LINKS                                  */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not(.dashboard-menu-item):not([data-panel])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      try {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 90;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } catch (err) {
        // Ignore invalid selectors
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. COURSE DETAILS TAB SWITCHER (SPA-Like In-Page)                         */
/* -------------------------------------------------------------------------- */
function initCourseDetailTabs() {
  const tabBtns = document.querySelectorAll('.course-tab-btn');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (!targetTab) return;

      // Update active state on tab buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active state on tab panes
      const tabPanes = document.querySelectorAll('.course-tab-pane');
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
      });

      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/**
 * Membuat course-details.html merespons `?slug=<id>` — dipakai supaya klik kelas
 * manapun di Home/Katalog/Explore Kelas menampilkan header, harga, dan mentor yang
 * BENAR sesuai kelas yang diklik (sebelumnya semua kelas menampilkan konten UI/UX
 * yang sama). Data ada di scripts/course-catalog.js.
 *
 * Untuk kelas flagship (atau kalau tidak ada ?slug=), halaman dibiarkan seperti
 * konten asli — tidak ada perubahan. Untuk kelas lain, tab Overview/Kurikulum/Reviews
 * menampilkan status "segera hadir" yang jujur (bukan kurikulum karangan), sementara
 * tab Tentang Mentor menampilkan mentor asli dari mentor.html yang relevan dengan
 * kategori kelasnya.
 */
function initDynamicCourseDetails() {
  const titleEl = document.getElementById('course-title-h1');
  if (!titleEl || typeof CRYGLE_COURSES === 'undefined') return; // bukan course-details.html, atau data belum ke-load

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug || !(slug in CRYGLE_COURSES) || CRYGLE_COURSES[slug] === null) return; // flagship atau slug tidak dikenal → biarkan konten asli

  const course = CRYGLE_COURSES[slug];
  const mentor = CRYGLE_MENTORS[course.mentor];

  document.title = `${course.title} — Crygle Academy`;
  document.getElementById('course-breadcrumb-current').textContent = `Course ${course.title}`;
  document.getElementById('course-player-img').src = course.image;
  document.getElementById('course-player-img').alt = course.title;
  document.getElementById('course-trailer-badge').textContent = '📷 Preview Kelas';
  document.getElementById('course-mentor-name-overlay').textContent = mentor.name;
  document.getElementById('course-trailer-duration').style.display = 'none';
  titleEl.textContent = course.title;
  document.getElementById('course-header-desc-p').textContent =
    `Kelas ${course.level} yang dipandu langsung oleh ${mentor.name} — belajar praktik nyata, bukan cuma teori, dengan pendekatan step-by-step khas Crygle Academy.`;
  document.getElementById('course-rating-score-stat').textContent = course.rating;
  document.getElementById('course-rating-count-stat').textContent = course.ratingCount;
  document.getElementById('course-duration-label').textContent = 'Modul';
  document.getElementById('course-duration-stat').textContent = `${course.moduleCount} Modul`;
  document.getElementById('course-level-stat').textContent = course.level;

  document.getElementById('sidebar-current-price').textContent = course.price;
  document.getElementById('sidebar-original-price').textContent = course.originalPrice;
  document.getElementById('sidebar-discount-badge').textContent = course.discount;
  document.getElementById('sidebar-cta-btn').href = `checkout.html?slug=${encodeURIComponent(slug)}`;
  document.getElementById('sidebar-duration-benefit').textContent = `${course.moduleCount} Modul Pembelajaran Terstruktur`;

  document.getElementById('tab-overview').innerHTML = `
    <h3 class="overview-heading">Course Overview</h3>
    <p class="overview-paragraph">
      Kelas <strong>${course.title}</strong> dirancang untuk santri dan siswa level ${course.level} yang ingin membangun kemampuan ${course.category} dari dasar hingga siap portofolio. Dipandu langsung oleh ${mentor.name}, kamu akan belajar dengan pendekatan praktik nyata — bukan cuma teori — sama seperti seluruh kelas Crygle Academy lainnya.
    </p>
    <p class="overview-paragraph" style="color: var(--color-text-muted); font-style: italic;">
      Deskripsi modul per pertemuan untuk kelas ini sedang disiapkan tim kurikulum. Sementara itu, chat mentor untuk tanya detail materi sebelum mendaftar.
    </p>`;

  document.getElementById('tab-curriculum').innerHTML = `
    <div style="text-align: center; padding: 48px 24px; background: var(--color-bg-subtle); border-radius: var(--radius-lg);">
      <h3 class="overview-heading">Kurikulum Kelas — Segera Hadir</h3>
      <p style="color: var(--color-text-muted); max-width: 480px; margin: 12px auto 20px;">
        ${course.moduleCount} modul terstruktur untuk kelas ini sedang disiapkan oleh ${mentor.name}. Kamu akan mendapat notifikasi begitu modul pertama rilis.
      </p>
      <a href="dashboard.html#chat" class="btn btn-outline" style="padding: 12px 28px; border-radius: 50px; text-decoration: none; display: inline-block;">Chat Mentor untuk Info Kurikulum</a>
    </div>`;

  const skillsHtml = (mentor.skills || [])
    .map((s) => `<span style="font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; background: var(--color-primary-50); color: var(--color-primary);">${s}</span>`)
    .join('');
  document.getElementById('tab-mentor').innerHTML = `
    <div class="mentor-card-box">
      <div class="mentor-header-flex">
        <img src="${mentor.image}" alt="${mentor.name}" class="mentor-avatar-lg">
        <div>
          <h3 class="mentor-name-title">${mentor.name}</h3>
          <p class="mentor-designation">${mentor.role}</p>
        </div>
      </div>
      <p class="mentor-bio-text">${mentor.bio || ''}</p>
      <div class="mentor-metrics-row">
        <div>
          <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-text-light);">Rating</span>
          <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; margin-top: 4px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-secondary)"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span>${mentor.rating}</span>
            <span style="color: var(--color-text-muted); font-weight: 500;">${mentor.reviews}</span>
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px;">${skillsHtml}</div>
    </div>`;

  document.getElementById('tab-reviews').innerHTML = `
    <h3 class="overview-heading">Ulasan Siswa ${course.ratingCount}</h3>
    <div style="background: #fff; padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--color-border); margin-top: 20px; text-align: center;">
      <div style="color: var(--color-secondary); font-size: 20px; margin-bottom: 8px;">★ ${course.rating}</div>
      <p style="font-size: 14px; color: var(--color-text-muted); max-width: 440px; margin: 0 auto;">
        Ulasan individual untuk kelas ini sedang dikumpulkan. Rating agregat di atas berdasarkan feedback santri di seluruh program Crygle Academy.
      </p>
    </div>`;
}

/* -------------------------------------------------------------------------- */
/* 7. CURRICULUM ACCORDION (Interactive Chapters)                            */
/* -------------------------------------------------------------------------- */
function initCurriculumAccordion() {
  const chapters = document.querySelectorAll('.curriculum-chapter');
  if (!chapters.length) return;

  chapters.forEach(chapter => {
    const headerBtn = chapter.querySelector('.curriculum-chapter-header');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      chapter.classList.toggle('active');
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 8. SHARE BUTTON INTERACTION (Toast Feedback)                              */
/* -------------------------------------------------------------------------- */
function initShareButton() {
  const shareBtn = document.getElementById('btn-share-course');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToastNotification('Tautan kelas berhasil disalin ke clipboard!');
      }).catch(() => {
        showToastNotification('Bagikan halaman ini dengan teman belajarmu!');
      });
    } else {
      showToastNotification('Bagikan halaman ini dengan teman belajarmu!');
    }
  });
}

function showToastNotification(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: #12171A;
      color: #ffffff;
      padding: 14px 22px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      z-index: 9999;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3000);
}

/* -------------------------------------------------------------------------- */
/* 8. COMMERCE & CHECKOUT INTERACTIONS                                       */
/* -------------------------------------------------------------------------- */

/**
 * Switch payment methods (Card, BNI, Mandiri, BSI, QRIS)
 */
function initCheckoutPaymentMethods() {
  const methodItems = document.querySelectorAll('.payment-method-item');
  if (!methodItems.length) return;

  methodItems.forEach(item => {
    const header = item.querySelector('.payment-method-header');
    if (!header) return;

    header.addEventListener('click', () => {
      methodItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('selected');
        }
      });
      item.classList.add('selected');

      const methodName = item.dataset.method;
      // Save selected method preference to localStorage for Review screen
      try {
        localStorage.setItem('crygle_selected_payment', methodName || 'card');
      } catch (e) {}
    });
  });
}

/**
 * Interactive Promo Code calculation
 */
function initPromoCode() {
  const promoInput = document.getElementById('input-promo-code');
  const applyBtn = document.getElementById('btn-apply-promo');
  const messageEl = document.getElementById('promo-message');
  const discountRow = document.getElementById('row-promo-discount');
  const discountVal = document.getElementById('summary-promo-discount');
  const totalVal = document.getElementById('summary-total-price');

  if (!applyBtn || !promoInput) return;

  applyBtn.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();

    if (!code) {
      if (messageEl) {
        messageEl.textContent = 'Harap masukkan kode promo terlebih dahulu.';
        messageEl.className = 'promo-feedback-msg promo-error';
      }
      return;
    }

    // Supported promo codes
    if (code === 'CRYGLE50' || code === 'SANCTUARY' || code === 'SMKJUARA') {
      const discount = 50000;
      const basePrice = 499000;
      const regFee = 8000;
      const finalPrice = basePrice + regFee - discount;

      if (discountRow) discountRow.style.display = 'flex';
      if (discountVal) discountVal.textContent = '-Rp50.000';
      if (totalVal) totalVal.textContent = 'Rp' + finalPrice.toLocaleString('id-ID');

      if (messageEl) {
        messageEl.textContent = `✓ Kode "${code}" berhasil digunakan! Potongan Rp50.000 diterapkan.`;
        messageEl.className = 'promo-feedback-msg promo-success';
      }

      showToastNotification(`Voucher ${code} berhasil dipasang!`);
    } else {
      if (messageEl) {
        messageEl.textContent = 'Kode promo tidak valid atau kuota telah habis.';
        messageEl.className = 'promo-feedback-msg promo-error';
      }
    }
  });

  // Enable pressing Enter in promo input
  promoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyBtn.click();
    }
  });
}

/**
 * Official Digital Receipt Modal Logic
 */
function initReceiptModal() {
  const openBtn = document.getElementById('btn-open-receipt');
  const modal = document.getElementById('receipt-modal');
  const closeBtn = document.getElementById('btn-close-receipt');

  if (!openBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking outside card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 9. DASHBOARD FILTERS & SEARCH (Node 814:5929)                             */
/* -------------------------------------------------------------------------- */
function initDashboardFilters() {
  const searchInput = document.getElementById('dashboard-search-input');
  const courseCards = document.querySelectorAll('.dashboard-course-card');

  if (searchInput && courseCards.length) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      courseCards.forEach(card => {
        const title = card.querySelector('.dashboard-card-title')?.textContent.toLowerCase() || '';
        const level = card.querySelector('.dashboard-card-level')?.textContent.toLowerCase() || '';
        if (title.includes(q) || level.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Filter feedback
  const filterPills = [
    { id: 'filter-level', label: 'Filter Level (Semua Level)' },
    { id: 'filter-category', label: 'Filter Kategori (Design & 3D)' },
    { id: 'filter-sort', label: 'Urutan: Populer & Progres Terbaru' }
  ];

  filterPills.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.addEventListener('click', () => {
        showToastNotification(item.label);
      });
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 10. CLASSROOM VIDEO PLAYER & TIMELINE (Node 855:684)                       */
/**
 * Membuat classroom.html merespons `?course=<slug>` — mengatasi keterbatasan yang sama
 * seperti course-details.html (lihat initDynamicCourseDetails di atas): 2 dari 3 kelas
 * di panel "Course Saya" dashboard (3D Blender Animation, 3D Bangunan Digital) tadinya
 * selalu menampilkan konten Classroom milik kelas UI/UX. Progress (%, X/8 Modul) diambil
 * dari data nyata yang sudah ditampilkan di kartu dashboard.html (CRYGLE_ENROLLED_PROGRESS
 * di scripts/course-catalog.js), bukan angka karangan.
 *
 * Sama seperti course-details.html: modul per-lesson tidak dikarang — ditampilkan sebagai
 * daftar modul bernomor generik ("Modul 1", "Modul 2", ...) tanpa judul lesson spesifik
 * yang tidak ada sumbernya, dan video player menampilkan status jujur "segera hadir".
 */
function initDynamicClassroom() {
  const titleEl = document.getElementById('classroom-course-title');
  if (!titleEl || typeof CRYGLE_COURSES === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('course');
  if (!slug || !(slug in CRYGLE_COURSES) || CRYGLE_COURSES[slug] === null) return; // flagship atau slug tidak dikenal → biarkan konten asli

  const course = CRYGLE_COURSES[slug];
  const mentor = CRYGLE_MENTORS[course.mentor];
  const progress = CRYGLE_ENROLLED_PROGRESS[slug] || { percent: 0, doneModules: 0, colorClass: 'progress-yellow' };

  document.title = `Play Kelas: ${course.title} — Crygle Academy`;
  titleEl.textContent = course.title;

  const fillEl = document.getElementById('classroom-progress-fill');
  fillEl.style.width = `${progress.percent}%`;
  fillEl.classList.remove('progress-green', 'progress-yellow');
  fillEl.classList.add(progress.colorClass);
  document.getElementById('classroom-progress-modul').textContent = `${progress.doneModules}/${course.moduleCount} Modul`;
  document.getElementById('classroom-progress-percent').textContent = `${progress.percent}%`;
  document.getElementById('classroom-progress-percent').style.color = progress.percent >= 50 ? '#31BC53' : '#FCC112';

  // Daftar modul generik bernomor — jumlah "selesai" mengikuti progress.doneModules asli
  let modulesHtml = '';
  for (let i = 1; i <= course.moduleCount; i += 1) {
    const isDone = i <= progress.doneModules;
    modulesHtml += `
      <div class="classroom-modul-block">
        <div class="classroom-modul-header" style="cursor: default;">
          <span class="classroom-modul-name">MODUL ${i}${isDone ? ' — Selesai' : ''}</span>
          <span class="classroom-modul-toggle-icon">${isDone ? '✅' : '🔒'}</span>
        </div>
      </div>`;
  }
  document.getElementById('classroom-modules-accordion').innerHTML = modulesHtml;

  // Mentor card (sidebar)
  document.getElementById('classroom-mentor-avatar').src = mentor.image;
  document.getElementById('classroom-mentor-avatar').alt = mentor.name;
  document.getElementById('classroom-mentor-name').textContent = mentor.name;
  document.getElementById('classroom-mentor-role').textContent = mentor.role;

  // Video area — jujur belum ada video nyata untuk kelas ini
  const poster = document.getElementById('player-poster');
  if (poster) poster.src = course.image;
  const heading = document.getElementById('current-lesson-heading');
  if (heading) heading.textContent = 'Video Modul Segera Hadir';
  const timeDisplay = document.getElementById('player-time-display');
  if (timeDisplay) timeDisplay.textContent = '--:-- / --:--';
  const nextModulBtn = document.getElementById('btn-next-modul');
  if (nextModulBtn) nextModulBtn.style.display = 'none';
  // Lepas id tombol play supaya initClassroomPlayer() (jalan setelah fungsi ini) tidak
  // menimpa balik tampilan waktu di atas dengan angka demo 04:20/20:05 milik flagship.
  const bigPlayBtn = document.getElementById('btn-toggle-play');
  if (bigPlayBtn) {
    bigPlayBtn.removeAttribute('id');
    bigPlayBtn.style.opacity = '0.4';
    bigPlayBtn.style.cursor = 'not-allowed';
    bigPlayBtn.setAttribute('aria-disabled', 'true');
  }

  // 3 tab (Resources/Ringkasan/Review) — status jujur, bukan konten UI/UX yang di-reuse
  const resourcesPane = document.getElementById('pane-resources');
  if (resourcesPane) {
    resourcesPane.innerHTML = `
      <h3 style="font-size: 18px; font-weight: 800; color: #202020; margin-bottom: 6px;">Aset & Materi Belum Tersedia</h3>
      <p style="font-size: 14px; color: #797979;">Aset unduhan untuk kelas ${course.title} sedang disiapkan mentor. Chat mentor untuk update terbaru.</p>`;
  }
  const ringkasanPane = document.getElementById('pane-ringkasan');
  if (ringkasanPane) {
    ringkasanPane.innerHTML = `
      <h3 style="font-size: 18px; font-weight: 800; color: #202020; margin-bottom: 6px;">Ringkasan Belum Tersedia</h3>
      <p style="font-size: 14px; color: #797979;">Rangkuman modul akan muncul di sini setelah materi kelas ini rilis.</p>`;
  }
  const reviewPane = document.getElementById('pane-review');
  if (reviewPane) {
    reviewPane.innerHTML = `
      <h3 style="font-size: 18px; font-weight: 800; color: #202020; margin-bottom: 6px;">Diskusi & Ulasan</h3>
      <p style="font-size: 14px; color: #797979;">Belum ada diskusi untuk kelas ini. Jadilah santri pertama yang bertanya lewat Chat Mentor.</p>`;
  }

  // Modal Chat Mentor — sinkronkan ke mentor yang benar
  const modalAvatar = document.getElementById('modal-mentor-avatar');
  if (modalAvatar) modalAvatar.src = mentor.image;
  const modalHeading = document.getElementById('modal-mentor-heading');
  if (modalHeading) modalHeading.textContent = `Konsultasi Mentor: ${mentor.name.split(' ')[0]} ${mentor.name.split(' ')[1] || ''}`.trim();
  const modalIntro = document.getElementById('modal-mentor-intro');
  if (modalIntro) modalIntro.innerHTML = `Punya kendala saat mengikuti kelas <em>${course.title}</em>? Sampaikan langsung pada sesi konsultasi santri.`;
  const modalWaLink = document.getElementById('modal-wa-link');
  if (modalWaLink) {
    const waText = encodeURIComponent(`Halo Kak ${mentor.name}, saya santri kelas ${course.title} Crygle Academy. Mau konsultasi.`);
    modalWaLink.href = `https://wa.me/6282283901120?text=${waText}`;
  }
}

/* -------------------------------------------------------------------------- */
let isVideoPlaying = false;
let videoTimerInterval = null;
let currentSeconds = 260; // 04:20
let totalSeconds = 1205;  // 20:05

function initClassroomPlayer() {
  const bigPlayBtn = document.getElementById('btn-toggle-play');
  const ctrlPlayBtn = document.getElementById('ctrl-play-pause');
  const timelineBar = document.getElementById('player-timeline');
  const timelineFill = document.getElementById('player-timeline-fill');
  const timeDisplay = document.getElementById('player-time-display');
  const fullscreenBtn = document.getElementById('ctrl-fullscreen');
  const videoPlayerBox = document.getElementById('main-video-player');

  if (!bigPlayBtn || !timeDisplay) return;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const updateDisplay = () => {
    const percent = Math.min(100, Math.max(0, (currentSeconds / totalSeconds) * 100));
    if (timelineFill) timelineFill.style.width = `${percent}%`;
    timeDisplay.textContent = `${formatTime(currentSeconds)} / ${formatTime(totalSeconds)}`;
  };

  const togglePlay = () => {
    isVideoPlaying = !isVideoPlaying;
    if (isVideoPlaying) {
      bigPlayBtn.style.opacity = '0';
      bigPlayBtn.style.pointerEvents = 'none';
      if (ctrlPlayBtn) {
        ctrlPlayBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
      }
      showToastNotification('Memutar video modul...');

      videoTimerInterval = setInterval(() => {
        if (currentSeconds < totalSeconds) {
          currentSeconds++;
          updateDisplay();
        } else {
          togglePlay();
        }
      }, 1000);
    } else {
      bigPlayBtn.style.opacity = '1';
      bigPlayBtn.style.pointerEvents = 'auto';
      if (ctrlPlayBtn) {
        ctrlPlayBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
      }
      clearInterval(videoTimerInterval);
    }
  };

  bigPlayBtn.addEventListener('click', togglePlay);
  if (ctrlPlayBtn) ctrlPlayBtn.addEventListener('click', togglePlay);

  // Rewind 10s
  const rewindBtn = document.getElementById('ctrl-rewind');
  if (rewindBtn) {
    rewindBtn.addEventListener('click', () => {
      currentSeconds = Math.max(0, currentSeconds - 10);
      updateDisplay();
      showToastNotification('Mundur 10 detik');
    });
  }

  // Forward 10s
  const forwardBtn = document.getElementById('ctrl-forward');
  if (forwardBtn) {
    forwardBtn.addEventListener('click', () => {
      currentSeconds = Math.min(totalSeconds, currentSeconds + 10);
      updateDisplay();
      showToastNotification('Maju 10 detik');
    });
  }

  // Click on timeline to seek
  if (timelineBar) {
    timelineBar.addEventListener('click', (e) => {
      const rect = timelineBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      currentSeconds = Math.round(ratio * totalSeconds);
      updateDisplay();
    });
  }

  // Fullscreen
  if (fullscreenBtn && videoPlayerBox) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        videoPlayerBox.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    });
  }

  updateDisplay();
}

/* -------------------------------------------------------------------------- */
/* 11. CLASSROOM SYLLABUS & LESSON SELECTOR                                   */
/* -------------------------------------------------------------------------- */
function initClassroomSyllabus() {
  const modulHeaders = document.querySelectorAll('.classroom-modul-header');
  const lessonRows = document.querySelectorAll('.classroom-lesson-row');
  const currentHeading = document.getElementById('current-lesson-heading');
  const timeDisplay = document.getElementById('player-time-display');

  // Accordion toggle
  modulHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const block = header.closest('.classroom-modul-block');
      if (!block) return;
      block.classList.toggle('open');
    });
  });

  // Lesson selector
  lessonRows.forEach(row => {
    row.addEventListener('click', () => {
      lessonRows.forEach(r => {
        r.classList.remove('active');
        const icon = r.querySelector('.lesson-status-icon');
        if (icon && !icon.classList.contains('done')) {
          icon.outerHTML = `
            <svg class="lesson-status-icon" viewBox="0 0 24 24" fill="#C4D5E8">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          `;
        }
      });

      row.classList.add('active');
      const leftEl = row.querySelector('.classroom-lesson-left');
      const icon = row.querySelector('.lesson-status-icon');
      if (icon && !icon.classList.contains('done')) {
        icon.outerHTML = `
          <svg class="lesson-status-icon active" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;
      }

      const lessonTitle = row.dataset.title || row.querySelector('.lesson-title-text')?.textContent;
      const lessonTime = row.dataset.time || '15:00';

      if (currentHeading && lessonTitle) {
        currentHeading.textContent = lessonTitle;
      }

      // Parse time
      const parts = lessonTime.split(':');
      if (parts.length === 2) {
        totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        currentSeconds = 0;
      }

      const timeBox = document.getElementById('player-time-display');
      if (timeBox) timeBox.textContent = `00:00 / ${lessonTime}`;

      showToastNotification(`Membuka: ${lessonTitle}`);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 12. CLASSROOM TABBAR SWITCHER (Resources / Ringkasan / Review)             */
/* -------------------------------------------------------------------------- */
function initClassroomTabs() {
  const tabBtns = document.querySelectorAll('.classroom-tab-btn');
  const panes = document.querySelectorAll('.classroom-pane');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      if (!targetId) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 13. NEXT MODUL ACTION LOGIC                                               */
/* -------------------------------------------------------------------------- */
function initNextModulButton() {
  const nextBtn = document.getElementById('btn-next-modul');
  if (!nextBtn) return;

  nextBtn.addEventListener('click', () => {
    const lessonRows = Array.from(document.querySelectorAll('.classroom-lesson-row'));
    const activeIndex = lessonRows.findIndex(row => row.classList.contains('active'));

    if (activeIndex !== -1 && activeIndex < lessonRows.length - 1) {
      const nextRow = lessonRows[activeIndex + 1];
      const parentBlock = nextRow.closest('.classroom-modul-block');
      if (parentBlock) parentBlock.classList.add('open');
      nextRow.click();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      showToastNotification('🎉 Selamat! Anda telah menyelesaikan seluruh modul kelas ini!');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 14. MENTOR CHAT MODAL LOGIC                                               */
/* -------------------------------------------------------------------------- */
function initMentorChatModal() {
  const openBtn = document.getElementById('btn-chat-mentor');
  const modal = document.getElementById('mentor-chat-modal');
  const closeBtn = document.getElementById('btn-close-mentor-chat');

  if (!openBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* -------------------------------------------------------------------------- */
/* 15. DASHBOARD HASH ROUTER & PANEL CONTROLLER (PRD §9.11, §10, §11.6)      */
/* -------------------------------------------------------------------------- */
function initDashboardHashRouter() {
  const menuLinks = document.querySelectorAll('.dashboard-sidebar .dashboard-menu-item');
  const panels = document.querySelectorAll('.dashboard-panel');
  const mainTitle = document.getElementById('dashboard-main-title');
  const searchFilterBar = document.getElementById('dashboard-search-bar-wrap');

  if (!menuLinks.length || !panels.length) return;

  const panelConfig = {
    'panel-overview': { title: 'Overview Belajar', hash: '#overview', showSearch: false },
    'panel-courses': { title: 'Kelas Saya', hash: '#courses', showSearch: true },
    'panel-bootcamp': { title: 'Bootcamp Intensif Saya', hash: '#bootcamp', showSearch: false },
    'panel-explore': { title: 'Explore & Katalog Kelas', hash: '#explore', showSearch: true },
    'panel-chat': { title: 'Chat Konsultasi Mentor', hash: '#chat', showSearch: false },
    'panel-affiliate': { title: 'Program Affiliate Santri', hash: '#affiliate', showSearch: false },
    'panel-setting': { title: 'Pengaturan Akun & Profil', hash: '#setting', showSearch: false }
  };

  const hashToPanel = {
    '#overview': 'panel-overview',
    '#courses': 'panel-courses',
    '#bootcamp': 'panel-bootcamp',
    '#explore': 'panel-explore',
    '#chat': 'panel-chat',
    '#affiliate': 'panel-affiliate',
    '#setting': 'panel-setting'
  };

  const activatePanel = (panelId, updateUrl = true) => {
    const config = panelConfig[panelId] || panelConfig['panel-courses'];

    // Update Panels
    panels.forEach(p => {
      if (p.id === panelId) {
        p.classList.add('active');
        p.style.display = 'block';
      } else {
        p.classList.remove('active');
        p.style.display = 'none';
      }
    });

    // Update Sidebar Links
    menuLinks.forEach(link => {
      if (link.dataset.panel === panelId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Header Title
    if (mainTitle) mainTitle.textContent = config.title;

    // Toggle Search Filter Bar
    if (searchFilterBar) {
      searchFilterBar.style.display = config.showSearch ? 'flex' : 'none';
    }

    if (updateUrl && window.location.hash !== config.hash) {
      history.pushState(null, '', config.hash);
    }
  };

  // Click listener on sidebar menu items
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const panelId = link.dataset.panel;
      if (panelId) {
        e.preventDefault();
        activatePanel(panelId, true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Listen to browser Back/Forward or direct Hash URL
  const handleHashChange = () => {
    const hash = window.location.hash || '#courses';
    const targetPanelId = hashToPanel[hash] || 'panel-courses';
    activatePanel(targetPanelId, false);
  };

  window.addEventListener('hashchange', handleHashChange);

  // Initial load
  handleHashChange();
}

/* -------------------------------------------------------------------------- */
/* 16. HEADER DROPDOWNS (Notifications & Profile)                            */
/* -------------------------------------------------------------------------- */
function initHeaderDropdowns() {
  const notifBtn = document.getElementById('btn-header-notif');
  const notifDropdown = document.getElementById('header-notif-dropdown');
  const profileBtn = document.getElementById('btn-header-profile');
  const profileDropdown = document.getElementById('header-profile-dropdown');
  const redDot = document.getElementById('notif-red-dot');
  const markAllReadBtn = document.getElementById('btn-mark-all-read');

  const setDropdownState = (el, isOpen) => {
    if (!el) return;
    if (isOpen) {
      el.classList.add('active');
      el.style.display = 'block';
    } else {
      el.classList.remove('active');
      el.style.display = 'none';
    }
  };

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = notifDropdown.style.display !== 'block';
      if (profileDropdown) setDropdownState(profileDropdown, false);
      setDropdownState(notifDropdown, willOpen);
    });
  }

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = profileDropdown.style.display !== 'block';
      if (notifDropdown) setDropdownState(notifDropdown, false);
      setDropdownState(profileDropdown, willOpen);
    });
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (redDot) redDot.style.display = 'none';
      document.querySelectorAll('.notif-item-row.unread').forEach(item => {
        item.classList.remove('unread');
      });
      showToastNotification('Semua notifikasi ditandai sudah dibaca');
    });
  }

  document.addEventListener('click', (e) => {
    if (notifDropdown && !notifDropdown.contains(e.target) && e.target !== notifBtn) {
      setDropdownState(notifDropdown, false);
    }
    if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileBtn) {
      setDropdownState(profileDropdown, false);
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 17. BOOTCAMP SUB-TABS (PRD §10: 10.1 - 10.6)                               */
/* -------------------------------------------------------------------------- */
function initBootcampSubTabs() {
  const tabBtns = document.querySelectorAll('.bootcamp-tab-btn');
  const panes = document.querySelectorAll('.bootcamp-subtab-pane');

  if (!tabBtns.length || !panes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subtabId = btn.dataset.subtab;
      if (!subtabId) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panes.forEach(p => {
        if (p.id === subtabId) {
          p.style.display = 'block';
        } else {
          p.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 18. BOOKING SLOT MENTOR PICKER (PRD §10.2)                                 */
/* -------------------------------------------------------------------------- */
function initBookingSlotPicker() {
  const mentorCards = document.querySelectorAll('.booking-mentor-card');
  const slotBtns = document.querySelectorAll('.slot-time-btn');
  const summaryMentor = document.getElementById('summary-mentor-name');
  const summarySlot = document.getElementById('summary-slot-time');
  const confirmBtn = document.getElementById('btn-confirm-booking');

  mentorCards.forEach(card => {
    card.addEventListener('click', () => {
      mentorCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const name = card.dataset.mentor;
      if (summaryMentor && name) summaryMentor.textContent = name;
    });
  });

  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (summarySlot) summarySlot.textContent = btn.textContent;
    });
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const mName = summaryMentor ? summaryMentor.textContent : 'Mentor';
      const mTime = summarySlot ? summarySlot.textContent : 'Waktu Terjadwal';
      showToastNotification(`🎉 Sesi bimbingan bersama ${mName} (${mTime}) berhasil dipesan!`);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 19. EXPLORE CATALOG FILTERS (PRD §11.2)                                     */
/* -------------------------------------------------------------------------- */
function initExploreCatalogFilters() {
  const chipBtns = document.querySelectorAll('.category-chip-pill');
  const catalogItems = document.querySelectorAll('.catalog-course-item');

  if (!chipBtns.length || !catalogItems.length) return;

  chipBtns.forEach(chip => {
    chip.addEventListener('click', () => {
      chipBtns.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const cat = chip.dataset.cat;
      catalogItems.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 20. CHAT MENTOR WORKSPACE LOGIC (PRD §11.6, §11.7)                         */
/* -------------------------------------------------------------------------- */
function initChatWorkspace() {
  const form = document.getElementById('chat-composer-form');
  const input = document.getElementById('chat-input-text');
  const container = document.getElementById('chat-messages-container');
  const quickBtns = document.querySelectorAll('.quick-reply-btn');
  const threadRows = document.querySelectorAll('.chat-thread-row');
  const activeMentorTitle = document.getElementById('chat-active-mentor-name');

  if (!form || !input || !container) return;

  const scrollToBottom = () => {
    container.scrollTop = container.scrollHeight;
  };

  const addStudentMessage = (text) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;

    const row = document.createElement('div');
    row.className = 'chat-msg-row student';
    row.innerHTML = `
      <div>
        <div class="chat-bubble student">${escapeHtml(text)}</div>
        <span style="font-size: 11px; color: #A6A6A6; float: right; margin-right: 6px;">${timeStr}</span>
      </div>
    `;
    container.appendChild(row);
    scrollToBottom();

    // Simulated Mentor Auto-Reply
    setTimeout(() => {
      const replyRow = document.createElement('div');
      replyRow.className = 'chat-msg-row mentor';
      replyRow.innerHTML = `
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="Mentor" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
        <div>
          <div class="chat-bubble mentor">
            Terima kasih pertanyaannya Dion! Pertanyaan ini bagus sekali untuk dibahas saat sesi mentoring live sore ini. Pastikan file Figma kamu sudah kamu beri permission view ya! 👍
          </div>
          <span style="font-size: 11px; color: #A6A6A6; margin-left: 6px;">Baru saja</span>
        </div>
      `;
      container.appendChild(replyRow);
      scrollToBottom();
      showToastNotification('Pesan baru dari Mentor Dimas Pradipa');
    }, 1200);
  };

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addStudentMessage(text);
    input.value = '';
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.msg;
      if (msg) addStudentMessage(msg);
    });
  });

  threadRows.forEach(thread => {
    thread.addEventListener('click', () => {
      threadRows.forEach(t => t.classList.remove('active'));
      thread.classList.add('active');
      const name = thread.querySelector('span[style*="font-weight: 800"]')?.textContent || 'Mentor';
      if (activeMentorTitle) activeMentorTitle.textContent = `${name} · Crygle Mentor`;
      showToastNotification(`Membuka percakapan bersama: ${name}`);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 21. AFFILIATE REFERRAL LINK & CODE COPY (PRD §11.6)                        */
/* -------------------------------------------------------------------------- */
function initAffiliateCopy() {
  const copyBtn = document.getElementById('btn-copy-affiliate');
  const codeEl = document.getElementById('affiliate-code-text');

  if (copyBtn && codeEl) {
    copyBtn.addEventListener('click', () => {
      const code = codeEl.textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        showToastNotification(`✅ Kode Referral "${code}" berhasil disalin ke clipboard!`);
      }).catch(() => {
        showToastNotification(`Kode Referral: ${code}`);
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 22. SETTINGS SUB-TABS & FORM HANDLING (PRD §11.6)                          */
/* -------------------------------------------------------------------------- */
function initSettingsForm() {
  const subtabLinks = document.querySelectorAll('.setting-subtab-link');

  if (subtabLinks.length) {
    subtabLinks.forEach(link => {
      link.addEventListener('click', () => {
        subtabLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const tabKey = link.dataset.settingsTab;
        showToastNotification(`Membuka Pengaturan: ${link.textContent}`);
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 23. AUTHENTICATION MODULE (LOGIN & SIGNUP - Nodes 735:4450 & 735:5405)     */
/* -------------------------------------------------------------------------- */
function initAuthForms() {
  // 1. Password Visibility Toggle
  const toggleBtns = document.querySelectorAll('.auth-password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      // Swap SVG icon
      if (isPassword) {
        btn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        `;
        btn.setAttribute('aria-label', 'Sembunyikan Password');
      } else {
        btn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
        btn.setAttribute('aria-label', 'Lihat Password');
      }
    });
  });

  // 2. Login Form Submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const emailVal = emailInput ? emailInput.value.trim() : 'Santri';

      showToastNotification(`👋 Selamat datang kembali! Mengalihkan ke dashboard...`);
      const submitBtn = document.getElementById('btn-submit-login');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Memproses...</span>`;
      }

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    });
  }

  // 3. Signup Form Submission
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('signup-password')?.value;
      const confirmPassword = document.getElementById('signup-confirm-password')?.value;

      if (password !== confirmPassword) {
        showToastNotification('⚠️ Konfirmasi password tidak cocok. Silakan periksa kembali.');
        return;
      }

      const emailInput = document.getElementById('signup-email');
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (emailVal) {
        sessionStorage.setItem('crygle-pending-verification-email', emailVal);
      }

      showToastNotification('📩 Kode verifikasi OTP sudah dikirim ke email kamu.');
      const submitBtn = document.getElementById('btn-submit-signup');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Membuat Akun...</span>`;
      }

      setTimeout(() => {
        window.location.href = 'verifikasi-otp.html';
      }, 900);
    });
  }

  // 4. Google SSO Simulation
  const googleBtns = [document.getElementById('btn-google-auth'), document.getElementById('btn-google-signup')];
  googleBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        showToastNotification('🔐 Masuk dengan Google Workspace Santri... Mengalihkan...');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
      });
    }
  });
}

/**
 * Halaman Lupa Password (lupa-password.html) — PRD §11.10.
 * Form request → tampilkan state "Cek Email Kamu" tanpa reload halaman.
 */
function initForgotPasswordForm() {
  const form = document.getElementById('forgot-password-form');
  if (!form) return;

  const requestState = document.getElementById('forgot-password-request-state');
  const sentState = document.getElementById('forgot-password-sent-state');
  const emailDisplay = document.getElementById('forgot-email-display');
  const resendBtn = document.getElementById('btn-resend-forgot-password');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email')?.value.trim();
    if (!email) return;

    if (emailDisplay) emailDisplay.textContent = email;
    if (requestState) requestState.style.display = 'none';
    if (sentState) sentState.style.display = 'block';
    showToastNotification(`📩 Instruksi reset kata sandi telah dikirim ke ${email}`);
  });

  if (resendBtn) {
    resendBtn.addEventListener('click', () => {
      showToastNotification('📩 Email reset password dikirim ulang.');
    });
  }
}

/**
 * Halaman Verifikasi OTP (verifikasi-otp.html) — PRD §11.11.
 * Step baru setelah Signup, sebelum masuk Dashboard.
 */
function initOtpVerification() {
  const form = document.getElementById('otp-verification-form');
  if (!form) return;

  const emailDisplay = document.getElementById('otp-email-display');
  const pendingEmail = sessionStorage.getItem('crygle-pending-verification-email');
  if (emailDisplay && pendingEmail) emailDisplay.textContent = pendingEmail;

  // Auto-advance ke digit berikutnya saat diisi
  const digitInputs = Array.from(document.querySelectorAll('.otp-digit-input'));
  digitInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
      if (input.value && index < digitInputs.length - 1) {
        digitInputs[index + 1].focus();
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        digitInputs[index - 1].focus();
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = digitInputs.map((i) => i.value).join('');
    if (code.length < 6) {
      showToastNotification('⚠️ Masukkan 6 digit kode OTP terlebih dahulu.');
      return;
    }

    sessionStorage.removeItem('crygle-pending-verification-email');
    showToastNotification('🎉 Email berhasil diverifikasi! Selamat bergabung di Crygle Academy.');
    const submitBtn = document.getElementById('btn-submit-otp');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Memverifikasi...</span>`;
    }
    setTimeout(() => {
      window.location.href = 'dashboard.html#courses';
    }, 900);
  });

  // Resend dengan cooldown 30 detik, konsisten dgn pola showToastNotification di file ini
  const resendLink = document.getElementById('btn-resend-otp');
  const cooldownLabel = document.getElementById('otp-resend-cooldown');
  if (resendLink && cooldownLabel) {
    resendLink.addEventListener('click', () => {
      showToastNotification('📩 Kode OTP baru sudah dikirim ulang.');
      let secondsLeft = 30;
      resendLink.style.display = 'none';
      cooldownLabel.style.display = 'inline';
      cooldownLabel.textContent = `Kirim ulang dalam ${secondsLeft}s`;
      const timer = setInterval(() => {
        secondsLeft -= 1;
        cooldownLabel.textContent = `Kirim ulang dalam ${secondsLeft}s`;
        if (secondsLeft <= 0) {
          clearInterval(timer);
          cooldownLabel.style.display = 'none';
          resendLink.style.display = 'inline';
        }
      }, 1000);
    });
  }
}

/**
 * Filter kategori di Katalog Publik (kelas.html) — PRD §11.2.
 * Pola identik dengan initExploreCatalogFilters() di dashboard, disamakan agar UX konsisten.
 */
function initKatalogFilters() {
  const chipsRow = document.getElementById('katalog-filter-chips');
  const grid = document.getElementById('katalog-courses-grid');
  if (!chipsRow || !grid) return;

  const chips = Array.from(chipsRow.querySelectorAll('.category-chip-pill'));
  const cards = Array.from(grid.querySelectorAll('.course-card'));
  const emptyState = document.getElementById('katalog-empty-state');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const category = chip.dataset.cat;

      let visibleCount = 0;
      cards.forEach((card) => {
        const matches = category === 'all' || card.dataset.cat === category;
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount += 1;
      });

      if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  });
}

/**
 * Sandbox mode di payment-review.html + payment-processing.html — PRD §11.3.
 * Menyimpan skenario "Berhasil"/"Gagal" yang dipilih user secara sadar (bukan acak),
 * supaya alur Pembayaran Gagal bisa ditinjau on-demand tanpa menebak-nebak.
 */
function initPaymentSimulation() {
  // Bagian A: di payment-review.html — simpan pilihan skenario sebelum redirect ke processing
  const confirmPaymentBtn = document.getElementById('btn-submit-payment');
  if (confirmPaymentBtn) {
    confirmPaymentBtn.addEventListener('click', () => {
      const scenarioInput = document.querySelector('input[name="payment-scenario"]:checked');
      const scenario = scenarioInput ? scenarioInput.value : 'success';
      sessionStorage.setItem('crygle-payment-scenario', scenario);
    });
  }

  // Bagian B: di payment-processing.html — baca skenario, arahkan ke halaman yang sesuai
  const processingCard = document.querySelector('.processing-card');
  if (processingCard) {
    const scenario = sessionStorage.getItem('crygle-payment-scenario') || 'success';
    setTimeout(() => {
      window.location.href = scenario === 'failed' ? 'payment-failed.html' : 'payment-success.html';
    }, 2400);
  }
}





