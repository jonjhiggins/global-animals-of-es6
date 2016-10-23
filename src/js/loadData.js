/*jshint esversion: 6 */

module.exports = (url, resolve, reject) => {
    // [ES6: fetch]
    const animalsPromise = fetch(url);
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
