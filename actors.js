// people referansı
const peopleContainer = document.getElementById('people-container');
const actorsList = document.getElementById('actors-list');
const mainContent = document.getElementById('main-contend');

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
  