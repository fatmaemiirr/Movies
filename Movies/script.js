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
//çıkış işlemi referansı
const logoutButton = document.getElementById("logoutButton");

// -------------------------------------------------------------------------------------------------

// Görünürlük fonksiyonları
function toggleVisibility(element, isVisible) {
  element.classList.toggle('hidden', !isVisible);
  element.classList.toggle('visible', isVisible);
}

// -------------------------------------------------------------------------------------------------

// Menü görünürlüğünü güncelle
function updateMenuVisibility() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  toggleVisibility(scriptmenuContainer, isLoggedIn);
  toggleVisibility(scriptloginContainer, !isLoggedIn);
  if (scriptmainContent) {
    toggleVisibility(scriptmainContent, isLoggedIn);
  }
}

// -------------------------------------------------------------------------------------------------

// Footer görünürlüğünü güncelle
function ensureFooterVisibility() {
  const isLoginPage = window.location.pathname.includes('login.html');
  scriptfooter.classList.toggle('hidden', isLoginPage);
  scriptfooter.classList.toggle('visible', !isLoginPage);
}

// -------------------------------------------------------------------------------------------------

// Sayfa yüklendiğinde işlemleri başlat
document.addEventListener('DOMContentLoaded', () => {
  updateMenuVisibility();
  ensureFooterVisibility();

  // Giriş formu gönderildiğinde
  scriptloginForm.addEventListener("submit", (e) => {
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

  // -------------------------------------------------------------------------------------------------

  // Kayıt formu gönderildiğinde
  scriptregisterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (localStorage.getItem(username)) {
      alert("Bu kullanıcı adı zaten kayıtlı!");
    } else {
      localStorage.setItem(username, JSON.stringify({ username, password }));
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      toggleVisibility(scriptregisterForm, false);
      toggleVisibility(scriptloginForm, true);
    }
  });

  // -------------------------------------------------------------------------------------------------



  // -------------------------------------------------------------------------------------------------

  // Formlar arası geçiş
  scriptswitchToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    toggleVisibility(scriptloginForm, false);
    toggleVisibility(scriptregisterForm, true);
  });

  scriptswitchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    toggleVisibility(scriptregisterForm, false);
    toggleVisibility(scriptloginForm, true);
  });
});

// -------------------------------------------------------------------------------------------------
