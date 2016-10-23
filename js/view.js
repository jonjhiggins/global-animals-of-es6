/*jshint esversion: 6 */

module.exports = () => {

    const utils = require('./utils');
    const view = {};

    // Elements
    view.el = {
        nameSelect: document.getElementById('animals-name'),
        countrySelect: document.getElementById('animals-country'),
        selects: document.querySelectorAll('select'),
        contentDiv: document.getElementById('animals-content')
    };

    // Attach events
    view.attachEvents = (data) => {

        // [ES6: destructing objects]
        const {nameSelect, countrySelect, contentDiv, selects} = view.el;

        const selectChange = function() {
            const name = nameSelect.value;
            const country = countrySelect.value;
            const match = data.filter(animal => {

                const namePass = name ? (utils.dashify(animal.name) === name) : true;
                const countryPass = country ? (utils.dashify(animal.country) === country) : true;

                return namePass && countryPass;
            });

            // Check if combination exists in data
            if (match.length) {
                contentDiv.innerHTML = view.buildImage(name, utils.dashify(match[0].name), country, utils.dashify(match[0].country));
            } else {
                contentDiv.innerHTML = `
                    <p>Sorry, that combination of name and place doesn't exist.</p>
                `;
            }
        };

        for (const select of selects) {
            select.addEventListener('change', selectChange);
        }
    };

    view.buildImage = (name, matchName, country, matchCountry) => {
        return `<img src="img/${name ? name : matchName}_${country ? country : matchCountry}_600.jpg" class="animals-content__img" alt="">`;
    };

    // Render form fields
    view.renderFormFields = (animals) => {

        const {nameSelect, countrySelect, contentDiv, selects} = view.el;

        const names = animals.map(animal => animal.name);
        const countries = animals.map(animal => animal.country);
        // [ES6: Set]
        const namesUnique = Array.from(new Set(names));
        const countriesUnique = Array.from(new Set(countries));


        // [ES6: template strings, template string functions]
        const renderOption = (value) => {
            return `<option value="${utils.dashify(value)}">${value}</option>`;
        };

        const nameHtml = `${namesUnique.map(renderOption).join('')}`;
        const countryHtml = `${countriesUnique.map(renderOption).join('')}`;

        // Render HTML
        nameSelect.innerHTML += nameHtml;
        countrySelect.innerHTML += countryHtml;

        return animals;
    };


    return view;


};
