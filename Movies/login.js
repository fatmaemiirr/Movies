// Login Register Referansları
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");
const loginContainer = document.querySelector(".login-container");

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