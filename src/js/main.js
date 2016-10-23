
/*jshint esversion: 6 */

// Requires
const utils = require('./utils');
const loadData = require('./loadData');
const view = require('./view');

// Config
const config = {
    dataUrl: 'data/animals.json'
};

// Init
// [ES6: const]
const init = function() {
    const animals = new Promise((resolve, reject) => {
        loadData(config.dataUrl, resolve, reject);
    });

    animals
        .then(view().renderFormFields)
        .then(view().attachEvents);
};




init();
