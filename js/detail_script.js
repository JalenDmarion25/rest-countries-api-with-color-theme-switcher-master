const urlParam = new URLSearchParams(window.location.search);
const code = urlParam.get("code");

function fetchCountryInfo(alpha3Code, fullCountryList) {
    const country = fullCountryList.find((item) => item.alpha3Code === alpha3Code);
    return country;
}

let fullCountryList = [];

fetch("./data.json")
    .then((response) => {
        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        fullCountryList = data;

        const alpha3CodeToFind = code;
        const countryInfo = fetchCountryInfo(alpha3CodeToFind, fullCountryList);

        if (countryInfo) {
            document.getElementById('name').textContent = countryInfo.name;
            document.getElementById('nativename').textContent = countryInfo.nativeName;
            document.getElementById('population').textContent = countryInfo.population;
            document.getElementById('region').textContent = countryInfo.region;
            document.getElementById('subregion').textContent = countryInfo.subregion;
            document.getElementById('capital').textContent = countryInfo.capital;
            const currencies = countryInfo.currencies.map(currency => currency.name).join(', ');
            document.getElementById('currencies').textContent = currencies;
            document.getElementById('topLevel').textContent = countryInfo.topLevelDomain;
            const languages = countryInfo.languages.map(language => language.name).join(', ');
            document.getElementById('languages').textContent = languages;

            const flagImage = document.getElementById('flag');
            flagImage.src = countryInfo.flags.svg;
            flagImage.alt = `Flag of ${countryInfo.name}`;

            // Update bordering countries
            const bordersDiv = document.getElementById('borders');
            if (countryInfo.borders.length > 0) {
                const borderCountries = countryInfo.borders.map(borderCode => {
                    const borderCountry = fullCountryList.find(item => item.alpha3Code === borderCode);
                    if (borderCountry) {
                        const anchor = document.createElement('a');
                        anchor.href = `country_detail.html?code=${borderCode}`;
                        anchor.textContent = borderCountry.name;
                        anchor.classList.add('border-country');
                        return anchor;
                    }
                    return null;
                });
                borderCountries.forEach(anchor => {
                    if (anchor) {
                        bordersDiv.appendChild(anchor);
                    }
                });
            } else {
                const noneExistText = document.createTextNode('None exist');
                bordersDiv.appendChild(noneExistText);
            }
        } else {
            console.log("Country not found.");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
