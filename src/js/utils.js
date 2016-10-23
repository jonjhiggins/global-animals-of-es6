/*jshint esversion: 6 */

module.exports = {
    dashify: (string) => string.toLowerCase().replace(' ', '-'),
    undashify: (string) => {
        const strings = string.split('-');
        let newString = '';

        for (const [i, item] of strings.entries()) {
            newString += item.substr(0,1).toUpperCase() + item.substr(1, item.length);
            newString += (i < strings.length - 1) ? ' ' : ''; // add space
        }
        return newString;
    }
};
