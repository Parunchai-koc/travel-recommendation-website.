
const btnSearch = document.getElementById('btnSearch');


function resetForm() {
    document.getElementById('destinationInput').value = '';
  }


  function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let specificMatch = false;
  
        const matchingCountries = data.countries.filter(item => item.name.toLowerCase().includes(input));
        if (matchingCountries.length > 0) {
          specificMatch = true;
          matchingCountries.forEach(country => {
            resultDiv.innerHTML += `<h2>${country.name}</h2>`;
            country.cities.forEach(city => {
              resultDiv.innerHTML += `
                <div class="city">
                  <h3>${city.name}</h3>
                  <img src="${city.imageUrl}" alt="${city.name}">
                  <p><strong>Description:</strong> ${city.description}</p>
                </div>
              `;
            });
          });
        }
        
        data.countries.forEach(country => {
          const matchingCities = country.cities.filter(city => city.name.toLowerCase().includes(input));
          if (matchingCities.length > 0) {
            specificMatch = true;
            matchingCities.forEach(city => {
              resultDiv.innerHTML += `
                <h2>${city.name}</h2>
                <img src="${city.imageUrl}" alt="${city.name}">
                <p><strong>Description:</strong> ${city.description}</p>
              `;
            });
          }
        });

        const matchingTemples = data.temples.filter(item => item.name.toLowerCase().includes(input));
        if (matchingTemples.length > 0) {
          specificMatch = true;
          matchingTemples.forEach(temple => {
            resultDiv.innerHTML += `
              <h2>${temple.name}</h2>
              <img src="${temple.imageUrl}" alt="${temple.name}">
              <p><strong>Description:</strong> ${temple.description}</p>
            `;
          });
        }
  
        const matchingBeaches = data.beaches.filter(item => item.name.toLowerCase().includes(input));
        if (matchingBeaches.length > 0) {
          specificMatch = true;
          matchingBeaches.forEach(beach => {
            resultDiv.innerHTML += `
              <h2>${beach.name}</h2>
              <img src="${beach.imageUrl}" alt="${beach.name}">
              <p><strong>Description:</strong> ${beach.description}</p>
            `;
          });
        }
  
        if (!specificMatch) {
          if (input === 'country' || input === 'countries') {
            data.countries.forEach(country => {
              resultDiv.innerHTML += `<h2>${country.name}</h2>`;
              country.cities.forEach(city => {
                resultDiv.innerHTML += `
                  <div class="city">
                    <h3>${city.name}</h3>
                    <img src="${city.imageUrl}" alt="${city.name}">
                    <p><strong>Description:</strong> ${city.description}</p>
                  </div>
                `;
              });
            });
          } else if (input === 'temple' || input === 'temples') {
            data.temples.forEach(temple => {
              resultDiv.innerHTML += `
                <h2>${temple.name}</h2>
                <img src="${temple.imageUrl}" alt="${temple.name}">
                <p><strong>Description:</strong> ${temple.description}</p>
              `;
            });
          } else if (input === 'beach' || input === 'beaches') {
            data.beaches.forEach(beach => {
              resultDiv.innerHTML += `
                <h2>${beach.name}</h2>
                <img src="${beach.imageUrl}" alt="${beach.name}">
                <p><strong>Description:</strong> ${beach.description}</p>
              `;
            });
          } else {
            resultDiv.innerHTML = 'Destination not found.';
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
  

  //btnSearch.addEventListener('click', searchDestination());