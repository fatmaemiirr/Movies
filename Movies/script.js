// Login Register Referansları
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");
const loginContainer = document.querySelector(".login-container"); 
// Movies referansları
const moviesContainer = document.getElementById("movies-container");
const moviesGrid = document.getElementById("movies-grid");
const moviesList = document.getElementById("movies-list");
//Details referansı
const movieDetailsContainer = document.getElementById("movie-details-container");
const movieDetails = document.getElementById("movie-details");
const closeDetails = document.getElementById("close-details");
// Footer referansı
const footer = document.querySelector(".footer");
// header referansı
const header = document.querySelector('.header')
const doubleheader = document.querySelector('.double-header')
const doubleheadertwo = document.querySelector('.double-headertwo')
const headers = document.querySelector('.headers')
// people referansı
const peopleContainer = document.getElementById('people-container');
const actorsList = document.getElementById('actors-list');
const mainContent = document.getElementById('main-contend');
// Search referansı
const searchBar = document.getElementById("search-bar");
const menuContainer = document.getElementById("menu-container");
//menü referansı
const searchContainer = document.getElementById("search-container");
  //çıkış butonu referansı
  const logoutButton = document.getElementById("logoutButton");

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
