// script.js (Güncellenmiş Kod)

// Footer referansı
const footer = document.querySelector(".footer");
// header referansı
const header = document.querySelector(".header");
const doubleheader = document.querySelector(".double-header");
const doubleheadertwo = document.querySelector(".double-headertwo");
const headers = document.querySelector(".headers");
// Menü referansı
const searchContainer = document.getElementById("search-container");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Görünürlük kontrol fonksiyonu
function toggleVisibility(element, visible) {
  if (visible) {
    element.classList.add("visible");
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
    element.classList.remove("visible");
  }
}

// Menü durumunu güncelle
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("visible");
  menu.classList.toggle("hidden");
});

// Sayfa yüklendiğinde gerekli elementleri kontrol et
window.addEventListener("DOMContentLoaded", () => {
  toggleVisibility(header, true);
  toggleVisibility(footer, true);
  toggleVisibility(searchContainer, true);
});

// Menüdeki elemanlara tıklandığında menü gizle
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.add("hidden");
    menu.classList.remove("visible");
  }
});

// CSS ile "visible" ve "hidden" sınıflarını kullanarak görünürlük kontrolü:
// .visible {
//   display: block;
// }
// .hidden {
//   display: none;
// }
