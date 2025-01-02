
document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const logoutButton = document.getElementById('logoutButton');
    const loginContainer = document.querySelector('.login-container');
    const mainContent = document.querySelector('.main-content'); // Ana içerik bölgesi
  
    // Sayfanın başlangıç durumunu ayarla
    function updateMenuVisibility() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      menuContainer.style.display = isLoggedIn ? 'flex' : 'none';
      loginContainer.style.display = isLoggedIn ? 'none' : 'block';
      if (mainContent) {
        mainContent.style.display = isLoggedIn ? 'block' : 'none';
      }
    }
  
    // Kullanıcı oturumunu kapatma
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      alert('Başarıyla çıkış yaptınız!');
      updateMenuVisibility();
    });
  
    // Menü elemanlarına tıklama işlemleri
    const menuLinks = document.querySelectorAll('#menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
  
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href; // Sayfa yönlendirme
        }
      });
    });
  
    // Başlangıç durumunu kontrol et
    updateMenuVisibility();
  });
  
  // Footer gösterimi için JavaScript
const footer = document.querySelector('.footer');

// Footer'ı her zaman görünür yap (Login ekranı hariç)
function ensureFooterVisibility() {
  const isLoginPage = window.location.pathname.includes('login.html');
  if (!isLoginPage) {
    footer.style.display = 'block'; // Login sayfası değilse footer'ı göster
  } else {
    footer.style.display = 'none'; // Login sayfasında footer'ı gizle
  }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', ensureFooterVisibility);
