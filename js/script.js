const dropDownButton = document.querySelector('.dropdown-btn');
const dropDownOptions = document.querySelector('.dropdown-options');
const regionOptions = document.querySelectorAll('.regions');
const searchBar = document.getElementById('search-bar');



function displayCountriesOnLoad() {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      const countryInfoContainer = document.getElementById("country-info");
      countryInfoContainer.innerHTML = '';

      // Shuffle the data array to get a random order
      const shuffledData = data.slice();
      for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
      }

      // Display properties of 8 random countries
      for (let i = 0; i < 8; i++) {
        const item = shuffledData[i];

        const countryInfo = document.createElement("div");
        countryInfo.classList.add("info");

        countryInfo.innerHTML = `
          <a href="country_detail.html?code=${item.alpha3Code}">
            <div class="card">
              <img src="${item.flags.svg}" alt="${item.name} Flag">
              <h2>${item.name}</h2>
              <p><strong>Capital:</strong> ${item.capital}</p>
              <p><strong>Region:</strong> ${item.region}</p>
              <p><strong>Population:</strong> ${item.population}</p>
            </div>
          </a>
        `;

        countryInfoContainer.appendChild(countryInfo);
      }
    });
}

// Call the function to display countries when the page loads
displayCountriesOnLoad();


// Function to filter and display countries by name
function filterCountriesByNameAndRegion(countryName, selectedRegion) {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      const countryInfoContainer = document.getElementById("country-info");
      countryInfoContainer.innerHTML = '';

      const filteredData = data.filter((country) => {
        const nameMatch = country.name.toLowerCase().includes(countryName.toLowerCase());
        const regionMatch = selectedRegion === 'All' || country.region === selectedRegion;
        return nameMatch && regionMatch;
      });

      // Display the filtered countries
      for (const item of filteredData) {
        const countryInfo = document.createElement("div");
        countryInfo.classList.add("info");

        countryInfo.innerHTML = `
          <a href="country_detail.html?code=${item.alpha3Code}">
            <div class="card">
              <img src="${item.flags.svg}" alt="${item.name} Flag">
              <h2>${item.name}</h2>
              <p><strong>Capital:</strong> ${item.capital}</p>
              <p><strong>Region:</strong> ${item.region}</p>
              <p><strong>Population:</strong> ${item.population}</p>
            </div>
          </a>
        `;

        countryInfoContainer.appendChild(countryInfo);
      }
    });
}


dropDownButton.addEventListener('click', e =>{
  dropDownOptions.classList.toggle('show-options');
});


regionOptions.forEach((option) => {
  option.addEventListener('click', (e) => {
    const selectedRegion = e.target.dataset.region;
    filterCountriesByNameAndRegion(searchBar.value, selectedRegion);
  });
});

// Attach an input event listener to the search bar
searchBar.addEventListener('input', (e) => {
  const searchText = e.target.value;
  const selectedRegion = document.querySelector('.regions.active')?.dataset.region || 'All';
  filterCountriesByNameAndRegion(searchText, selectedRegion);
});

