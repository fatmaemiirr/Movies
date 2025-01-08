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
const mainContent = document.getElementById('main-content');
// Search referansı
const searchBar = document.getElementById("search-bar");
const menuContainer = document.getElementById("menu-container");
//menü referansı
const searchContainer = document.getElementById("search-container");
//çıkış işlemi referansı
const logoutButton = document.getElementById("logoutButton");

// -------------------------------------------------------------------------------------------------

// Sayfa yüklendiğinde işlemleri başlat
// login.html dosyası

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    console.log("Kullanıcı oturumu açık. Anasayfaya yönlendiriliyor.");
    window.location.href = "index.html";
  } else {
    console.log("Kullanıcı oturumu kapalı. Login sayfası görüntüleniyor.");
    showElement(loginContainer);
    hideElement(moviesContainer);
  }
});

// -------------------------------------------------------------------------------------------------

// Görünürlük sınıfı ekleme/kaldırma fonksiyonları
function showElement(element) {
  element.classList.remove("hidden");
  element.classList.add("visible");
}

function hideElement(element) {
  element.classList.remove("visible");
  element.classList.add("hidden");
}

// -------------------------------------------------------------------------------------------------

if (switchToRegister) {
  switchToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    hideElement(loginForm);
    showElement(registerForm);
  });
} else {
  console.error("switchToRegister bulunamadı!");
}

if (switchToLogin) {
  switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    hideElement(registerForm);
    showElement(loginForm);
  });
} else {
  console.error("switchToLogin bulunamadı!");
}


// -------------------------------------------------------------------------------------------------

// Kayıt İşlemi
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const userData = localStorage.getItem(username);
  if (userData && JSON.parse(userData).username === username) {
    alert("Kullanıcı adı zaten mevcut. Lütfen farklı bir tane seçin.");
    return;
  }

  localStorage.setItem(username, JSON.stringify({ username: username, password: password }));
  alert("Kayıt başarılı! Artık giriş yapabilirsiniz.");
  registerForm.reset();
  hideElement(registerForm);
  showElement(loginForm);
});

// -------------------------------------------------------------------------------------------------

// Giriş İşlemi
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const userData = JSON.parse(localStorage.getItem(username));

  if (userData && userData.username === username && userData.password === password) {
    console.log("Giriş başarılı!");
    alert(`Hoşgeldiniz, ${username}! Giriş yaptınız.`);
    localStorage.setItem("isLoggedIn", "true");
    loginForm.reset();

    // Giriş başarılı, index.html'e yönlendir
    window.location.href = "index.html";
  } else {
    console.log("Giriş başarısız!");
    alert("Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.");
  }
});

  // Çıkış yap butonu dinleyicisi
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      console.log("Kullanıcı oturumu kapatılıyor...");
      localStorage.removeItem("isLoggedIn");
      alert("Başarıyla çıkış yaptınız!");
      window.location.href = "login.html";
    });
  } else {
    console.error("Çıkış yap butonu bulunamadı!");
  }

// -------------------------------------------------------------------------------------------------