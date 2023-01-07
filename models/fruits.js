const fruits = [
    {
        name: 'apple', 
        color: 'red',
        readyToEat: false 
    },

    {
        name: 'pear', 
        color: 'green',
        readyToEat: true 
    },
    {
        name: 'banana', 
        color: 'yellow',
        readyToEat: true 
    },

];

module.exports = fruits; //tell Node.js which bits of code(functions, objects, strings, etc.)to export from a given file so that other files are allowed to access the exported code.
console.log(module);