
/*jshint esversion: 6 */

// Utils
const dashify = function(string) {
    return string.toLowerCase().replace(' ', '-');
};

const undashify = function(string) {
    const strings = string.split('-');
    let newString = '';

    for (const [i, item] of strings.entries()) {
        newString += item.substr(0,1).toUpperCase() + item.substr(1, item.length);
        newString += (i < strings.length - 1) ? ' ' : ''; // add space
    }
    return newString;
};

// Elements
const el = {
    nameSelect: document.getElementById('animals-name'),
    countrySelect: document.getElementById('animals-country'),
    selects: document.querySelectorAll('select'),
    content: document.getElementById('animals-content')
};

// Init
// [ES6: const]
const init = function() {
    const animals = new Promise((resolve, reject) => {
        getAnimals(resolve, reject);
    });

    animals
        .then(renderFormFields)
        .then(attachEvents);
};

const buildImage = function(name, matchName, country, matchCountry) {
    return `<img src="img/${name ? name : matchName}_${country ? country : matchCountry}_600.jpg" class="animals-content__img" alt="">`;
};

// Attach events
const attachEvents = function(data) {

    const selectChange = function() {
        const name = el.nameSelect.value;
        const country = el.countrySelect.value;
        const match = data.filter(animal => {

            const namePass = name ? (dashify(animal.name) === name) : true;
            const countryPass = country ? (dashify(animal.country) === country) : true;

            return namePass && countryPass;
        });

        // Check if combination exists in data
        if (match.length) {
            el.content.innerHTML = buildImage(name, dashify(match[0].name), country, dashify(match[0].country));
        } else {
            el.content.innerHTML = `
                <p>Sorry, that combination of name and place doesn't exist.</p>
            `;
        }
    };

    for (const select of el.selects) {
        select.addEventListener('change', selectChange);
    }
};



// Render form fields

const renderFormFields = function(animals) {

    let nameHtml = '';
    let countryHtml = '';

    const names = animals.map(animal => animal.name);
    const countries = animals.map(animal => animal.country);
    // [ES6: Set]
    const namesUnique = Array.from(new Set(names));
    const countriesUnique = Array.from(new Set(countries));

    // [ES6: for... of..]
    for (const value of namesUnique) {
        // [ES6: template strings, template string functions]
        nameHtml += `<option value="${dashify(value)}">${value}</option>`;
    }

    for (const value of countriesUnique) {
        // [ES6: template strings, template string functions]
        countryHtml += `<option value="${dashify(value)}">${value}</option>`;
    }

    // Render HTML
    el.nameSelect.innerHTML += nameHtml;
    el.countrySelect.innerHTML += countryHtml;

    return animals;
};

// Get animals

const getAnimals = function(resolve, reject) {

    const reqUrl = 'data/animals.json';

    // [ES6: fetch]
    const animalsPromise = fetch(reqUrl);
    animalsPromise
        // [ES6: implicit return]
        .then(data => data.json())
        .then(animals => {
            resolve(animals);
        })
        // [ES6: catch]
        .catch((error) => {
            reject(error);
            console.error(error);
        }
    );
};

init();
