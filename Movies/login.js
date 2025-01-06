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
// Details referansı
const movieDetailsContainer = document.getElementById("movie-details-container");
const movieDetails = document.getElementById("movie-details");
const closeDetails = document.getElementById("close-details");
// Footer referansı
const footer = document.querySelector(".footer");
// Header referansı
const header = document.querySelector(".header");
const doubleheader = document.querySelector(".double-header");
const doubleheadertwo = document.querySelector(".double-headertwo");
const headers = document.querySelector(".headers");
// People referansı
const peopleContainer = document.getElementById("people-container");
const actorsList = document.getElementById("actors-list");
const mainContent = document.getElementById("main-content");
// Search referansı
const searchBar = document.getElementById("search-bar");
const menuContainer = document.getElementById("menu-container");
// Menü referansı
const searchContainer = document.getElementById("search-container");
//çıkış işlemi referansı
const logoutButton = document.getElementById("logoutButton");

// Görünürlük sınıfı ekleme/kaldırma fonksiyonları
function showElement(element) {
  element.classList.remove("hidden");
  element.classList.add("visible");
}

function hideElement(element) {
  element.classList.remove("visible");
  element.classList.add("hidden");
}

// Sayfa yüklendiğinde giriş durumunu kontrol et
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    // Giriş yapılmışsa index.html'e yönlendir
    console.log("Kullanıcı oturumu açık. Index sayfasına yönlendiriliyor.");
    window.location.href = "index.html";
  } else {
    console.log("Kullanıcı oturumu kapalı. Login sayfası görüntüleniyor.");
  }
});

// Login ve Register form geçişleri
switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  hideElement(loginForm);
  showElement(registerForm);
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  hideElement(registerForm);
  showElement(loginForm);
});

// Kayıt işlemi
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const userData = localStorage.getItem(username);
  if (userData && JSON.parse(userData).username === username) {
    alert("Kullanıcı adı zaten mevcut. Lütfen farklı bir tane seçin.");
    return;
  }

  localStorage.setItem(username, JSON.stringify({ username, password }));
  alert("Kayıt başarılı! Artık giriş yapabilirsiniz.");
  registerForm.reset();
  hideElement(registerForm);
  showElement(loginForm);
});

// Giriş işlemi
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const userData = JSON.parse(localStorage.getItem(username));

  if (userData && userData.username === username && userData.password === password) {
    console.log("Giriş başarılı!");
    alert(`Hoşgeldiniz, ${username}!`);
    localStorage.setItem("isLoggedIn", "true"); // Kullanıcının giriş durumunu kaydet
    window.location.href = "index.html"; // Giriş başarılı, index.html'e yönlendir
  } else {
    console.log("Giriş başarısız!");
    alert("Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.");
  }
});

// Çıkış işlemi
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    console.log("Kullanıcı oturumu kapatılıyor.");
    localStorage.removeItem("isLoggedIn"); // Oturum durumunu temizle
    alert("Başarıyla çıkış yaptınız!");
    window.location.href = "login.html"; // Çıkış sonrası login.html'e yönlendir
  });
} else {
  console.error("Çıkış butonu bulunamadı!");
}


// document.getElementById('logoutButton').addEventListener('click', function() {
//   alert('Çıkış yapılıyor...');
//   window.location.href = 'login.html';
// });
