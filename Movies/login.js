// Login Register Referansları
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");
const loginContainer = document.querySelector(".login-container");

// Görünürlük sınıfı ekleme/kaldırma fonksiyonları
function showElement(element) {
  element.classList.remove("hidden");
  element.classList.add("visible");
}

function hideElement(element) {
  element.classList.remove("visible");
  element.classList.add("hidden");
}

// login - register
document.addEventListener("DOMContentLoaded", () => {  
  const isLoggedIn = localStorage.getItem("isLoggedIn");   // Daha önce giriş yapılmış mı kontrol et
  
  if (isLoggedIn === "true") {    // Eğer giriş yapılmışsa anasayfayı göster
    console.log("Kullanıcı oturumu açık. Anasayfa görüntüleniyor.");
    hideElement(loginContainer); 
    showElement(moviesContainer); 
  
    // Menü, arama, footer ve header görünür yap
    showElement(menuContainer);
    showElement(searchContainer);
    showElement(footer);
    showElement(header);
    showElement(doubleheader);
    showElement(doubleheadertwo);
    showElement(headers);
  } else {
    console.log("Kullanıcı oturumu kapalı. Giriş ekranı görüntüleniyor.");
    // Eğer giriş yapılmamışsa sadece giriş ekranını göster
    showElement(loginContainer);
    hideElement(moviesContainer);
    hideElement(footer);
    hideElement(header);
    hideElement(doubleheader);
    hideElement(doubleheadertwo);
    hideElement(headers);
    hideElement(menuContainer);
    hideElement(searchContainer);
  }
});

// login 
switchToRegister.addEventListener("click", (e) => {   //kayıt ol formu görünür
  e.preventDefault();
  hideElement(loginForm);
  showElement(registerForm);
});

// register 
switchToLogin.addEventListener("click", (e) => {  //giriş yap formu görünür
  e.preventDefault();
  hideElement(registerForm);
  showElement(loginForm);
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
  hideElement(registerForm);
  showElement(loginForm); 
});

// Giriş başarılı olduğunda film sayfasını göster
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const userData = JSON.parse(localStorage.getItem(username));

  // Footer ve diğer eleman referansları
  const footer = document.querySelector(".footer");
  const header = document.querySelector('.header');
  const doubleheader = document.querySelector('.double-header');
  const doubleheadertwo = document.querySelector('.double-headertwo');
  const headers = document.querySelector('.headers');
  const searchContainer = document.getElementById("search-container");

  if (userData && userData.username === username && userData.password === password) {
    console.log("Giriş başarılı!")
    alert(`Hoşgeldiniz, ${username}! Giriş yaptınız.`);
    localStorage.setItem("isLoggedIn", "true"); // Kullanıcının giriş yaptığını işaretle
    loginForm.reset();

    // Giriş ekranını gizle ve afişler sayfasını göster
    hideElement(loginContainer);
    showElement(moviesContainer);

    // Menü, arama, footer ve header görünür yap
    showElement(menuContainer);
    showElement(searchContainer);
    showElement(footer);
    showElement(header);
    showElement(doubleheader);
    showElement(doubleheadertwo);
    showElement(headers);

  } else {
    console.log("Giriş başarısız!")
    alert("Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.");
  }
});

// Kullanıcının oturumu kapatmasını sağla
logoutButton.addEventListener("click", () => {
  console.log("Kullanıcı oturumu kapatılıyor.");
  localStorage.removeItem("isLoggedIn");  // Giriş durumunu belirten "isLoggedIn" anahtarını `localStorage`'dan kaldır
  console.log("Oturum kapatma başarılı. Kullanıcı giriş ekranına yönlendiriliyor.");
  alert("Başarıyla çıkış yaptınız!");
  window.location.href = "index.html";  //sayfa giriş yapılmamış duruma gelir
});
