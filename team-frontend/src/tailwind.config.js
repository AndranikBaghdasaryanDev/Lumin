/** @type {import('tailwindcss').Config} */


module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}", // make sure paths match your project
  ],
    theme: {
        extend: {
            backgroundImage: {
                'primary-gradient':
                    'linear-gradient(90deg, #86B2FE 0%, #5E99FE 100%)',
                'primary-fade':
                    'linear-gradient(180deg, #ffffff 0%, #ffffff 15%, #0E66FE 100%)',
            },
            colors: {

                primary: {
                    25: '#CFE0FF',
                    200: '#0E66FE',
                },
                greyscale: {
                    100: "#DFE1E7",
                    200: "#C1C7D0",
                    300: "#A6A6A6",
                    400: "#818898",
                    500: "#666E6D",
                    600: "#5A5A66",
                    800: '#14201F',
                    900: "#0D0D12"
                },
                greyscale2: {
                    800: "#181624",

                },
                success: {
                    100: '#3AC348',
                    200: '#278231',
                }
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
        },
    },
}
