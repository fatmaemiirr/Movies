
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
const mainContent = document.getElementById('main-content');
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
  
  toggleVisibility(menuContainer, isLoggedIn);
  toggleVisibility(loginContainer, !isLoggedIn);
  if (mainContent) {
    toggleVisibility(mainContent, isLoggedIn);
  }
}

// -------------------------------------------------------------------------------------------------

// Footer görünürlüğünü güncelle
function ensureFooterVisibility() {
  // const isLoginPage = window.location.pathname.includes('login.html');
  const isLoginPage = document.body.classList.contains('login-page');
  footer.classList.toggle('hidden', isLoginPage);
  footer.classList.toggle('visible', !isLoginPage);
}

// -------------------------------------------------------------------------------------------------

//!önemli // Sayfa yüklendiğinde fonksiyonları çağır
document.addEventListener('DOMContentLoaded', () => {
  updateMenuVisibility();
  ensureFooterVisibility();
});



