/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')
/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
        document.body.classList.add('show-menu-open')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
        document.body.classList.remove('show-menu-open')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
    document.body.classList.remove('show-menu-open')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== REMOVE MENU ON SCROLL ====================*/
window.addEventListener('scroll', () => {
    const navMenu = document.getElementById('nav-menu')
    if (navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu')
        document.body.classList.remove('show-menu-open')
    }
})
/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
    let isOpen = this.parentNode.classList.contains('skills__open');

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].classList.remove('skills__open');
        skillsContent[i].classList.add('skills__close');
    }
    if (!isOpen) {
        this.parentNode.classList.remove('skills__close');
        this.parentNode.classList.add('skills__open');
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/


/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal')

function openModal(index) {
    const target = modalViews[index]
    if (target) {
        target.classList.add('active-modal')
        document.body.classList.add('modal-open')
    }
}

function closeModals() {
    modalViews.forEach(modalView => modalView.classList.remove('active-modal'))
    document.body.classList.remove('modal-open')
}

// Event delegation: works for buttons/modals regardless of load order
document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('.services__button')
    if (openBtn) {
        const buttons = [...document.querySelectorAll('.services__button')]
        openModal(buttons.indexOf(openBtn))
        return
    }
    if (e.target.closest('.services__modal-close') || e.target.classList.contains('services__modal')) {
        closeModals()
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals()
})
/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,


    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints:{
        568:{
            slidesPerview: 2,
        }
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if(!link) return

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            link.classList.add('active-link')
        }else{
            link.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== LANGUAGE TOGGLE ====================*/
const languageButton = document.getElementById('language-button')
const langCode = languageButton?.querySelector('.lang-code')

// Translations object
const translations = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      skills: 'Keahlian',
      experience: 'Pengalaman',
      portfolio: 'Portofolio',
      blog: 'Blog',
      organization: 'Organisasi',
      contact: 'Kontak'
    },
    home: {
      greeting: 'Halo, saya',
      available: 'Tersedia untuk peluang baru',
      subtitle: 'Fullstack Web Developer',
      description: 'Fresh graduate D-IV Teknologi Rekayasa Perangkat Lunak Politeknik Negeri Banyuwangi dengan pengalaman 2+ tahun di bidang software development melalui proyek freelance dan magang.',
      connect: 'Unduh CV',
      viewPortfolio: 'Lihat Portofolio',
      scrollDown: 'Gulir ke bawah'
    },
    about: {
      title: 'Ringkasan Profesional',
      subtitle: 'Latar Belakang Saya',
      description: 'Fresh graduate Program Studi D-IV Teknologi Rekayasa Perangkat Lunak Politeknik Negeri Banyuwangi dengan pengalaman 2+ tahun di bidang software development melalui proyek freelance sejak semester 3 dan magang yang menggunakan berbagai teknologi.<br><br>Dinamis untuk belajar tentang hal baru dan komitmen mencapai tujuan tepat waktu dengan hasil yang berkualitas. Berpengalaman di full stack: React, Next.js, Laravel, dan FastAPI, didukung 3 sertifikasi profesional BNSP.'
    },
    skills: {
      title: 'Kompetensi Inti',
      subtitle: 'Keahlian Saya',
      soft: 'Kompetensi Non-Teknis'
    },
    organization: {
      title: 'Pengalaman Organisasi',
      subtitle: 'Kepemimpinan & Kontribusi'
    },
    blog: {
      title: 'Blog',
      subtitle: 'Catatan & Wawasan'
    },
    experience: {
      title: 'Pengalaman & Pendidikan',
      subtitle: 'Perjalanan Profesional Saya',
      work: 'Pengalaman Kerja',
      education: 'Pendidikan'
    },
    portfolio: {
      title: 'Portofolio',
      subtitle: 'Proyek Web & Sistem Unggulan',
      note: 'Catatan: Proyek yang ditampilkan adalah pilihan unggulan. Proyek klien lainnya dari 15+ karya freelance disimpan privat demi menghormati kerahasiaan klien (NDA).'
    },
    contact: {
      title: 'Kontak',
      subtitle: 'Hubungi Saya',
      email: 'Email',
      linkedin: 'LinkedIn',
      whatsapp: 'WhatsApp',
      name: 'Nama',
      emailPlaceholder: 'Masukkan email Anda',
      subject: 'Subjek',
      subjectPlaceholder: 'Tentang apa ini?',
      message: 'Pesan',
      messagePlaceholder: 'Tulis pesan Anda di sini...',
      send: 'Kirim Pesan'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      portfolio: 'Portfolio',
      blog: 'Blog',
      organization: 'Organization',
      contact: 'Contact'
    },
    home: {
      greeting: 'Hello, I am',
      available: 'Available for new opportunities',
      subtitle: 'Fullstack Web Developer',
      description: 'Fresh graduate of D-IV Software Engineering Technology at Politeknik Negeri Banyuwangi with 2+ years of software development experience through freelance projects and internships.',
      connect: 'Download CV',
      viewPortfolio: 'View Portfolio',
      scrollDown: 'Scroll down'
    },
    about: {
      title: 'Professional Summary',
      subtitle: 'My Background',
      description: 'Fresh graduate of the D-IV Software Engineering Technology study program at Politeknik Negeri Banyuwangi with 2+ years of experience in software development through freelance projects since the 3rd semester and internships using a wide range of technologies.<br><br>Dynamic in learning new things and committed to achieving goals on time with quality results. Experienced across the full stack: React, Next.js, Laravel, and FastAPI, backed by 3 BNSP professional certifications.'
    },
    skills: {
      title: 'Core Competencies',
      subtitle: 'My Expertise',
      soft: 'Non-Technical Skills'
    },
    organization: {
      title: 'Organizational Experience',
      subtitle: 'Leadership & Involvement'
    },
    blog: {
      title: 'Blog',
      subtitle: 'Notes & Insights'
    },
    experience: {
      title: 'Experience & Education',
      subtitle: 'My Professional Journey',
      work: 'Work Experience',
      education: 'Education'
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Featured Web & System Projects',
      note: 'Note: These projects are a selected showcase. Other client projects from 15+ freelance works are kept private to respect client confidentiality (NDA).'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get In Touch',
      email: 'Email',
      linkedin: 'LinkedIn',
      whatsapp: 'WhatsApp',
      name: 'Name',
      emailPlaceholder: 'Enter your email',
      subject: 'Subject',
      subjectPlaceholder: 'What is this regarding?',
      message: 'Message',
      messagePlaceholder: 'Write your message here...',
      send: 'Send Message'
    }
  }
}

let currentLang = localStorage.getItem('language') || 'en'

// Initialize language
if (langCode) {
  langCode.textContent = currentLang.toUpperCase()
  updateContent(currentLang)
}

// Language toggle function
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'id' : 'en'
  localStorage.setItem('language', currentLang)

  if (langCode) {
    langCode.textContent = currentLang.toUpperCase()
  }

  updateContent(currentLang)
}

// Update content based on language
function updateContent(lang) {
  const t = translations[lang]

  // Navigation
  document.querySelectorAll('.nav__link').forEach((link, index) => {
    const keys = ['home', 'about', 'skills', 'experience', 'portfolio', 'blog', 'organization', 'contact']
    if (keys[index]) {
      const iconSpan = link.querySelector('.nav__icon')
      const textContent = t.nav[keys[index]]
      link.innerHTML = iconSpan ? `${iconSpan.outerHTML} ${textContent}` : textContent
    }
  })

  // Home section
  const greeting = document.querySelector('.home__greeting')
  const available = document.querySelector('.availability-badge')
  const homeDesc = document.querySelector('.home__description')
  const connectBtn = document.querySelector('.home__actions .button:first-child')
  const codasiaBtn = document.querySelector('.home__actions .button--outline')
  const scrollName = document.querySelector('.home__scroll-name')

  if (greeting) greeting.textContent = t.home.greeting
  if (available) {
    const dot = available.querySelector('.availability-dot')
    available.innerHTML = `${dot.outerHTML} ${t.home.available}`
  }
  if (homeDesc) homeDesc.textContent = t.home.description
  if (connectBtn) {
    const icon = connectBtn.querySelector('.button__icon')
    connectBtn.innerHTML = `${t.home.connect} ${icon.outerHTML}`
  }
  if (codasiaBtn) codasiaBtn.textContent = t.home.viewPortfolio
  if (scrollName) scrollName.textContent = t.home.scrollDown

  // About section
  const aboutTitle = document.querySelector('.about .section__title')
  const aboutSubtitle = document.querySelector('.about .section__subtitle')
  const aboutDesc = document.querySelector('.about__description')

  if (aboutTitle) aboutTitle.textContent = t.about.title
  if (aboutSubtitle) aboutSubtitle.textContent = t.about.subtitle
  if (aboutDesc) aboutDesc.innerHTML = t.about.description

  // Skills section
  const skillsTitle = document.querySelector('.skills .section__title')
  const skillsSubtitle = document.querySelector('.skills .section__subtitle')

  if (skillsTitle) skillsTitle.textContent = t.skills.title
  if (skillsSubtitle) skillsSubtitle.textContent = t.skills.subtitle

  // Soft skills
  const softTitle = document.querySelector('.skills__soft-title')
  if (softTitle) softTitle.textContent = t.skills.soft

  // Organization section
  const orgTitle = document.querySelector('.organization .section__title')
  const orgSubtitle = document.querySelector('.organization .section__subtitle')

  if (orgTitle) orgTitle.textContent = t.organization.title
  if (orgSubtitle) orgSubtitle.textContent = t.organization.subtitle

  // Blog section
  const blogTitle = document.querySelector('.blog .section__title')
  const blogSubtitle = document.querySelector('.blog .section__subtitle')

  if (blogTitle) blogTitle.textContent = t.blog.title
  if (blogSubtitle) blogSubtitle.textContent = t.blog.subtitle

  // Experience section
  const expTitle = document.querySelector('.experience .section__title')
  const expSubtitle = document.querySelector('.experience .section__subtitle')

  if (expTitle) expTitle.textContent = t.experience.title
  if (expSubtitle) expSubtitle.textContent = t.experience.subtitle

  // Update experience content titles
  const workTitle = document.querySelector('.services__content:first-child .services__title')
  const eduTitle = document.querySelector('.services__content:last-child .services__title')

  if (workTitle) workTitle.innerHTML = `<i class="uil uil-briefcase-alt"></i> ${t.experience.work}`
  if (eduTitle) eduTitle.innerHTML = `<i class="uil uil-graduation-cap"></i> ${t.experience.education}`

  // Portfolio section
  const portfolioTitle = document.querySelector('.portfolio .section__title')
  const portfolioSubtitle = document.querySelector('.portfolio .section__subtitle')
  const portfolioNote = document.querySelector('.portfolio .container p')

  if (portfolioTitle) portfolioTitle.textContent = t.portfolio.title
  if (portfolioSubtitle) portfolioSubtitle.textContent = t.portfolio.subtitle
  if (portfolioNote) {
    const icon = portfolioNote.querySelector('i')
    portfolioNote.innerHTML = `${icon.outerHTML} <strong>${t.portfolio.note.split(':')[0]}:</strong> ${t.portfolio.note.split(':')[1]}`
  }

  // Contact section
  const contactTitle = document.querySelector('.contact .section__title')
  const contactSubtitle = document.querySelector('.contact .section__subtitle')

  if (contactTitle) {
    contactTitle.textContent = t.contact.title
    contactTitle.style.display = 'block'
    contactTitle.style.visibility = 'visible'
  }
  if (contactSubtitle) {
    contactSubtitle.textContent = t.contact.subtitle
    contactSubtitle.style.display = 'block'
    contactSubtitle.style.visibility = 'visible'
  }

  // Contact form labels
  const contactLabels = document.querySelectorAll('.contact__label')
  const contactInputs = document.querySelectorAll('.contact__input, .contact__input::placeholder')
  const sendBtn = document.querySelector('.contact__form .button')

  if (contactLabels.length >= 4) {
    contactLabels[0].textContent = t.contact.name
    contactLabels[1].textContent = t.contact.email
    contactLabels[2].textContent = t.contact.subject
    contactLabels[3].textContent = t.contact.message
  }

  if (sendBtn) {
    const icon = sendBtn.querySelector('.button__icon')
    sendBtn.innerHTML = `${t.contact.send} ${icon.outerHTML}`
  }

  // Contact information titles
  const contactInfoTitles = document.querySelectorAll('.contact__title')
  const contactInfoSubtitles = document.querySelectorAll('.contact__subtitle')

  if (contactInfoTitles.length >= 3) {
    contactInfoTitles[0].textContent = t.contact.email
    contactInfoTitles[1].textContent = t.contact.linkedin
    contactInfoTitles[2].textContent = t.contact.whatsapp
  }
}

// Add event listener for language toggle
if (languageButton) {
  languageButton.addEventListener('click', toggleLanguage)
}

/*==================== PARTICLE BACKGROUND ANIMATION ====================*/
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 200;
const connectionDistance = 150;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;

        // Warna berubah secara halus
        this.hue = 217 + Math.random() * 20;
        this.saturation = 91;
        this.lightness = 60;
        this.hueSpeed = (Math.random() - 0.5) * 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Perubahan warna yang lembut
        this.hue += this.hueSpeed;
        if (this.hue > 237 || this.hue < 197) {
            this.hueSpeed *= -1;
        }

        // Bounce dari edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0.3)`;
        ctx.fill();
    }
}

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const opacity = (1 - distance / connectionDistance) * 0.15;
                ctx.beginPath();
                ctx.strokeStyle = `hsla(${particles[i].hue}, 91%, 60%, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    drawConnections();
    requestAnimationFrame(animateParticles);
}

// Initialize dan start animation
initParticles();
animateParticles();

// Responsive resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});