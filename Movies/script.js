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
// Search referansı
const searchBar = document.getElementById("search-bar");
// Footer referansı
const footer = document.querySelector(".footer");
// header referansı
const header = document.querySelector('.header')

// -------------------------------------------------------------------------

// Sayfa yüklendiğinde giriş ekranını göster diğeerlerini gizle
document.addEventListener("DOMContentLoaded", () => {
  loginContainer.style.display = "block"; // Giriş ekranı görünür
  moviesContainer.style.display = "none"; // Film ekranı gizli
  footer.style.display = "none"; // Footer başlangıçta gizli
  header.style.display = "none";
});

// --------------------------------------------------------------------------
// login 
switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// register 
switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

// Kayıt İşlemini Yap
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  if (localStorage.getItem(username)) {
    alert("Kullanıcı adı zaten mevcut. Lütfen farklı bir tane seçin.");
    return;
  }

  // Kullanıcı verilerini localStorage'a kaydet
  localStorage.setItem (username,JSON.stringify({username : username, password: password}));
  alert("Kayıt başarılı! Artık giriş yapabilirsiniz.");
  registerForm.reset();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

// -------------------------------------------------------------------------

// Giriş başarılı olduğunda film sayfasını göster
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const userData = JSON.parse(localStorage.getItem(username));
  console.log(userData);
  if (userData && userData.password === password) {
    
    alert(`Hoşgeldiniz, ${username}! Giriş yaptınız.`);
    loginForm.reset();

    // Giriş ekranını gizle ve afişler sayfasını göster
    loginContainer.style.display = "none"; // Giriş ekranı
    fetchMovies(); // Filmleri yükle
    moviesContainer.style.display = "block"; // Film ekranı

    // menu  Arama  footer header  görünür yap
    menuContainer.style.display = "flex"; // menu görünür
    searchContainer.style.display = "block"; // Arama kutusu görünür
    footer.style.display = "block";
    header.style.display = "block"


  } else {
    alert("Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.");
  
    }
});

// -------------------------------------------------------------------------

// Global değişkenler
let allMovies = []; // API'den gelen tüm filmler burada saklanacak

// -------------------------------------------------------------------------

// Sayfa yüklendiğinde filmleri getir
document.addEventListener('DOMContentLoaded', async () => {
  await fetchMovies(); // Filmleri API'den çek
  displayMovies(allMovies); // Tüm filmleri başlangıçta göster
});

// -------------------------------------------------------------------------

// Arama ve menu için geçiş için
const menuContainer = document.getElementById("menu-container");
const searchContainer = document.getElementById("search-container");

// -------------------------------------------------------------------------

// Arama kutusunda yazılan ifadeyi kontrol et ve filtrele
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();

  // Filmleri filtrele
  const filteredMovies = allMovies.filter((movie) =>
    movie.titleText?.text?.toLowerCase().includes(query)
  );

  displayMovies(filteredMovies); // Filtrelenmiş filmleri göster
});

// -------------------------------------------------------------------------

// Filmleri API'den çek
async function fetchMovies() {
  const url = "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3",
      "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    allMovies = data.results || []; // API'den gelen verileri allMovies'e kaydet
  } catch (error) {
    console.error("API Hatası:", error);
    const moviesGrid = document.getElementById("movies-grid");
    moviesGrid.innerHTML = "<p>Filmleri yüklerken bir hata oluştu.</p>";
  }
}
// -------------------------------------------------------------------------

// !!!!ÖÖNNNEEEMMMLLLİİİİ!!!!!//
// Filmleri ekrana listeleme
function displayMovies(movies) {
  const moviesGrid = document.getElementById("movies-grid");
  moviesGrid.innerHTML = ""; // Önceki içerikleri temizle

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";

    // Filmin bilgilerini al
    const title = movie.titleText?.text || "Başlık Yok";
    const poster = movie.primaryImage?.url || "https://via.placeholder.com/200";

    movieItem.innerHTML = `
      <img src="${poster}" alt="${title} Afişi">
      <h3>${title}</h3>
    `;

    // Detayları göstermek için tıklama olayı ekle
    movieItem.addEventListener("click", () => showMovieDetails(movie));
    moviesGrid.appendChild(movieItem);
  });
}

// -------------------------------------------------------------------------

// Detayları göster
function showMovieDetails(movie) {

  const title = movie.titleText?.text || "Başlık Yok";
  const description = movie.plot?.plotText?.plainText || "Açıklama Yok";
  const releaseDate =
    movie.releaseDate?.day && movie.releaseDate?.month && movie.releaseDate?.year
      ? `${movie.releaseDate.day}/${movie.releaseDate.month}/${movie.releaseDate.year}`
      : "Yayın Tarihi Yok";
  const year = movie.releaseYear?.year || "Yıl Yok";
  const image = movie.primaryImage?.url || "https://via.placeholder.com/200";

// Detayları doldur
movieDetails.innerHTML = `
<img src="${image}" alt="${title} Afişi">
<h1>${title}</h1>
<p><strong>Yayın Tarihi:</strong> ${releaseDate}</p>
<p><strong>Yıl:</strong> ${year}</p>
<p>${description}</p>
`;

// Detay ekranını kapatma fonksiyonu
closeDetails.addEventListener("click", closeMovieDetails);

// !!!!!ARAŞTIR!!!!!!//
// URL'yi güncelle ve detay ekranını aç
history.pushState({ movieDetails: true }, "", `#details/${movie.id || "unknown"}`);
movieDetailsContainer.style.display = "flex";
movieDetailsContainer.classList.add("fade-in"); // Açılış animasyonu
movieDetailsContainer.classList.add("fullscreen-transition"); // Tam ekran geçiş havası için
}

// !!!!!ARAŞTIR!!!!!!//
function closeMovieDetails() {
movieDetailsContainer.classList.add("fade-out"); // Çıkış animasyonu başlat
setTimeout(() => {
movieDetailsContainer.style.display = "none";
movieDetailsContainer.classList.remove("fade-out", "fade-in", "fullscreen-transition"); // Sınıfları temizle
history.back();
}, 300); // Animasyon süresi (CSS ile senkronize edilmelidir)
}

// !!!!!ARAŞTIR!!!!!!//
// Geri tuşu desteği için popstate olayı
window.addEventListener("popstate", (event) => {
if (!event.state?.movieDetails) {
closeMovieDetails();
}
});

// -------------------------------------------------------------------------
