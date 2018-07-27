const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        tailwindcss('./build/tailwindcss.config.js'),
        require('autoprefixer')
    ]
}