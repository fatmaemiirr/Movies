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

// -----------------------------------------------------------------------------------------------------

// login - register
document.addEventListener("DOMContentLoaded", () => {  
  const isLoggedIn = localStorage.getItem("isLoggedIn");   // Daha önce giriş yapılmış mı kontrol et

  if (isLoggedIn === "true") {    // Eğer giriş yapılmışsa anasayfayı göster
    console.log("Kullanıcı oturumu açık. Anasayfa görüntüleniyor.");
    loginContainer.style.display = "none"; 
    fetchMovies(); 
    moviesContainer.style.display = "block"; 

    // Menü, arama, footer ve header görünür yap
    menuContainer.style.display = "flex";
    searchContainer.style.display = "block";
    footer.style.display = "block";
    header.style.display = "block";
    doubleheader.style.display = "flex";
    doubleheadertwo.style.display = "flex";
    headers.style.display = "block";

  } else {
    console.log("Kullanıcı oturumu kapalı. Giriş ekranı görüntüleniyor.");
    // Eğer giriş yapılmamışsa sadece giriş ekranını göster
    loginContainer.style.display = "block";
    moviesContainer.style.display = "none";
    footer.style.display = "none";
    header.style.display = "none";
    doubleheader.style.display ="none";
    doubleheadertwo.style.display = "none";
    headers.style.display = "none";
    menuContainer.style.display = "none";
    searchContainer.style.display = "none";
  }
});

// -----------------------------------------------------------------------------------------------------

// login 
switchToRegister.addEventListener("click", (e) => {   //kayıt ol formu görünür
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// register 
switchToLogin.addEventListener("click", (e) => {  //giriş yap formu görünür
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

// Kayıt İşlemini Yap
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const userData = localStorage.getItem(username);     //localde kullanıcı adıyla veri var mı kontol
  if (userData && JSON.parse(userData).username === username) {    //eğer varsa
    alert("Kullanıcı adı zaten mevcut. Lütfen farklı bir tane seçin.");
    return;   //sonlandır
  }

  // Kullanıcı verilerini localStorage'a kaydet
  localStorage.setItem(username, JSON.stringify({ username: username, password: password }));  //kullanıcı adı anahtarıyla  kaydet
  alert("Kayıt başarılı! Artık giriş yapabilirsiniz.");
  registerForm.reset();
  registerForm.style.display = "none";
  loginForm.style.display = "block"; 
});

// -----------------------------------------------------------------------------------------------------

// Giriş başarılı olduğunda film sayfasını göster
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const userData = JSON.parse(localStorage.getItem(username));

  if (userData && userData.username === username && userData.password === password) {
    console.log("Giriş başarılı!")
    alert(`Hoşgeldiniz, ${username}! Giriş yaptınız.`);
    localStorage.setItem("isLoggedIn", "true"); // Kullanıcının giriş yaptığını işaretle
    loginForm.reset();

    // Giriş ekranını gizle ve afişler sayfasını göster
    loginContainer.style.display = "none";
    fetchMovies();
    moviesContainer.style.display = "block";

    // Menü, arama, footer ve header görünür yap
    menuContainer.style.display = "flex";
    searchContainer.style.display = "block";
    footer.style.display = "block";
    header.style.display = "block";
    doubleheader.style.display ="flex";
    doubleheadertwo.style.display = "flex";
    headers.style.display = "flex";

  } else {
    console.log("Giriş başarısız!")
    alert("Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.");
  }
});

// -----------------------------------------------------------------------------------------------------

// Kullanıcının oturumu kapatmasını sağla
logoutButton.addEventListener("click", () => {
  console.log("Kullanıcı oturumu kapatılıyor.");
  localStorage.removeItem("isLoggedIn");  // Giriş durumunu belirten "isLoggedIn" anahtarını `localStorage`'dan kaldır
  console.log("Oturum kapatma başarılı. Kullanıcı giriş ekranına yönlendiriliyor.");
  alert("Başarıyla çıkış yaptınız!");
  window.location.href = "index.html";  //sayfa giriş yapılmamış duruma gelir
});
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

// aktör kartları people
document.addEventListener('DOMContentLoaded', async () => {
  // Eğer people.html'deysek, aktör kartlarını yükle
  const peopleContainer = document.getElementById('people-container');
  const actorsList = document.getElementById('actors-list');
  if (peopleContainer && actorsList) {
    const url = 'https://moviesdatabase.p.rapidapi.com/actors';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    try {
      // Yükleniyor mesajı göster
      peopleContainer.innerHTML = '<p>Yükleniyor...</p>';

      // API'den veri çek
      const response = await fetch(url, options);
      const data = await response.json();
      const actors = data.results || [];

      // Aktör kartlarını oluştur
      actors.forEach(actor => {
        const card = document.createElement('div');
        card.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        card.style.padding = '10px';
        card.style.borderRadius = '5px';
        card.style.textAlign = 'center';
        card.style.width = '150px';
        card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';

        // Aktör adı
        const actorName = document.createElement('p');
        actorName.textContent = actor?.primaryName || 'Bilinmeyen Aktör';

        // Görsel
        const image = document.createElement('img');
        image.src = `https://picsum.photos/150/200?random=${Math.random()}`;
        image.alt = 'Görsel Bulunamadı';
        image.style.width = '100%';
        image.style.borderRadius = '5px';

        // Kart içeriğini ekle
        card.appendChild(image);
        card.appendChild(actorName);

        // Kartı listeye ekle
        actorsList.appendChild(card);
      });

      // Yükleniyor mesajını kaldır
      peopleContainer.innerHTML = '';
      peopleContainer.appendChild(actorsList);

    } catch (error) {
      console.error("API'den veri çekilirken hata oluştu:", error);
      peopleContainer.innerHTML = '<p>Bir hata oluştu. Lütfen tekrar deneyin.</p>';
    }
    peopleContainer.style.display ="block";

  }
});

// -----------------------------------------------------------------------------------------------------


