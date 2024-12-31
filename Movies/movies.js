 
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
const menuContainer = document.getElementById("menu-container");

// Footer referansı
const footer = document.querySelector(".footer");
// header referansı
const header = document.querySelector('.header')
const doubleheader = document.querySelector('.double-header')
const doubleheadertwo = document.querySelector('.double-headertwo')
const headers = document.querySelector('.headers')
//menü referansı
const searchContainer = document.getElementById("search-container");

// -----------------------------------------------------------------------------------------------------

// Global değişkenler
let allMovies = []; // API'den gelen tüm filmler burada saklanacak

// -----------------------------------------------------------------------------------------------------

// Sayfa yüklendiğinde filmleri getir
document.addEventListener('DOMContentLoaded', async () => {
  await fetchMovies(); // Filmleri API'den çek
  displayMovies(allMovies); // Tüm filmleri başlangıçta göster
  console.log(allMovies);
});

// -----------------------------------------------------------------------------------------------------

// Arama kutusunda yazılan ifadeyi kontrol et ve filtrele
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();

  // Filmleri filtrele
  const filteredMovies = allMovies.filter((movie) =>
    movie.titleText?.text?.toLowerCase().includes(query)
  );
  console.log("Aranılan filmler" , filteredMovies);
  displayMovies(filteredMovies); // Filtrelenmiş filmleri göster
});

// -----------------------------------------------------------------------------------------------------

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
// -----------------------------------------------------------------------------------------------------

// Swiper'ı başlatma
function initializeSwiper() {
  new Swiper(".mySwiper", {
    slidesPerView: 5,  // Görünen slide sayısı
    spaceBetween: 20, // Slide'lar arasındaki boşluk 
    freeMode: true,   // Serbest kaydırma 
    pagination: {
      el: ".swiper-pagination",
      clickable: true,  // Sayfalama noktalarına tıklanabilirlik
    },
    
    navigation: {
      nextEl: ".swiper-button-next",   // "Sonraki" butonu
      prevEl: ".swiper-button-prev",  // "Önceki" butonu
    },
    breakpoints: {
      1024: {
        slidesPerView: 5, // pc görünümünde 3 slide
      },
      768: {
        slidesPerView: 2, // Mobilde 2 slide
      },
      480: {
        slidesPerView: 1, // Küçük ekranlarda 1 slide
      },
    },
  });
}

// Filmleri ekrana listeleme
function displayMovies(movies) {
  const moviesGrid = document.getElementById("movies-grid");
  moviesGrid.innerHTML = ""; // Önceki içerikleri temizle

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.className = "swiper-slide";

    // Filmin bilgilerini al
    const title = movie.titleText?.text || "Başlık Yok";
    const poster = movie.primaryImage?.url || "https://via.placeholder.com/200";
    // console.log(movies)


    movieItem.innerHTML = `
      <img src="${poster}" alt="${title} Afişi">
      <h3>${title}</h3>
    `;

    // Detayları göstermek için tıklama olayı ekle
    movieItem.addEventListener("click", () => showMovieDetails(movie));
    moviesGrid.appendChild(movieItem);
  });

  // Swiper'ı yeniden başlat
  initializeSwiper();
}

// Swiper ve filmleri başlat
document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
});

// -----------------------------------------------------------------------------------------------------

// Detayları göster
function showMovieDetails(movie) {
  console.log("Detayı gösterilecek film" ,movie);

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

// URL'yi güncelle ve detay ekranını aç
history.pushState({ movieDetails: true }, "", `#details/${movie.id || "unknown"}`);
movieDetailsContainer.style.display = "flex";

movieDetailsContainer.classList.add("fade-in"); // Açılış animasyonu
movieDetailsContainer.classList.add("fullscreen-transition"); // Tam ekran geçiş havası için
}

function closeMovieDetails() {
movieDetailsContainer.classList.add("fade-out"); // Çıkış animasyonu başlat
setTimeout(() => {
movieDetailsContainer.style.display = "none";
movieDetailsContainer.classList.remove("fade-out", "fade-in", "fullscreen-transition"); // Sınıfları temizle
    
    history.replaceState(null, "", location.pathname); // URL'yi detay ekranını açmadan önceki haline döndür
  }, 300);
}

// Geri tuşu desteği için popstate olayı
window.addEventListener("popstate", (event) => {
  if (!event.state?.movieDetails) {  // Eğer detay ekranında değilsek, detay ekranını kapat
    closeMovieDetails();
  } else {   // Eğer detay ekranına geri dönüldüyse, ekranı aç
    movieDetailsContainer.style.display = "flex";
    movieDetailsContainer.classList.add("fade-in");
  }
});

// -----------------------------------------------------------------------------------------------------