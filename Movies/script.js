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
// Header referansı
const header = document.querySelector('.header');
const doubleheader = document.querySelector('.double-header');
const doubleheadertwo = document.querySelector('.double-headertwo');
const headers = document.querySelector('.headers');
// People referansı
const peopleContainer = document.getElementById('people-container');
const actorsList = document.getElementById('actors-list');
const mainContent = document.getElementById('main-contend');
// Search referansı
const searchBar = document.getElementById("search-bar");
const menuContainer = document.getElementById("menu-container");
// Çıkış butonu referansı
const logoutButton = document.getElementById("logoutButton");

// Görünürlük fonksiyonları
function toggleVisibility(element, isVisible) {
  element.classList.toggle('hidden', !isVisible);
  element.classList.toggle('visible', isVisible);
}

// Menü görünürlüğünü güncelle
function updateMenuVisibility() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  toggleVisibility(menuContainer, isLoggedIn);
  toggleVisibility(loginContainer, !isLoggedIn);
  if (mainContent) {
    toggleVisibility(mainContent, isLoggedIn);
  }
}

// Footer görünürlüğünü güncelle
function ensureFooterVisibility() {
  const isLoginPage = window.location.pathname.includes('login.html');
  footer.classList.toggle('hidden', isLoginPage);
  footer.classList.toggle('visible', !isLoginPage);
}

// Sayfa yüklendiğinde işlemleri başlat
document.addEventListener('DOMContentLoaded', () => {
  updateMenuVisibility();
  ensureFooterVisibility();

  // Giriş formu gönderildiğinde
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
      alert(`Hoşgeldiniz, ${username}!`);
      localStorage.setItem("isLoggedIn", "true");
      updateMenuVisibility();
    } else {
      alert("Geçersiz kullanıcı adı veya şifre!");
    }
  });

  // Kayıt formu gönderildiğinde
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (localStorage.getItem(username)) {
      alert("Bu kullanıcı adı zaten kayıtlı!");
    } else {
      localStorage.setItem(username, JSON.stringify({ username, password }));
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      toggleVisibility(registerForm, false);
      toggleVisibility(loginForm, true);
    }
  });

  // Oturum kapatma
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    alert("Başarıyla çıkış yaptınız!");
    updateMenuVisibility();
  });

  // Formlar arası geçiş
  switchToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    toggleVisibility(loginForm, false);
    toggleVisibility(registerForm, true);
  });

  switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    toggleVisibility(registerForm, false);
    toggleVisibility(loginForm, true);
  });
});
