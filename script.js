
// ======================================
// MENU NAVIGASI
// ======================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');

// Membuka dan menutup menu HP
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
   const isOpen = navLinks.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


// ======================================
// NAVIGASI AKTIF DAN ANIMASI
// ======================================

const sections = document.querySelectorAll('main section[id]');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, {
    rootMargin: '-35% 0px -55% 0px'
  });

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Animasi elemen saat muncul di layar
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.querySelectorAll('.reveal').forEach((item) => {
    revealObserver.observe(item);
  });

} else {
  document.querySelectorAll('.reveal').forEach((item) => {
    item.classList.add('visible');
  });
}


// ======================================
// TOMBOL KEMBALI KE ATAS
// ======================================

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 450);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// ======================================
// TAHUN OTOMATIS DI FOOTER
// ======================================

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ======================================
// NOTIFIKASI TOAST
// ======================================

function showToast(message) {
  const oldToast = document.querySelector('.toast-notification');

  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Notifikasi hilang setelah 3 detik
  setTimeout(() => {
    toast.classList.remove('show');

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}


// ======================================
// FORMULIR KONTAK
// ======================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    // Memeriksa kolom kosong
    if (!name || !email || !message) {
      showToast('Mohon lengkapi semua kolom terlebih dahulu 💗');
      return;
    }

    // Memeriksa format email
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Masukkan alamat email yang valid ya!');
      return;
    }

    // Menampilkan notifikasi berhasil
    showToast('Pesan berhasil diperiksa! Terima kasih 💗');

    // Mengosongkan formulir
    contactForm.reset();
  });
}
