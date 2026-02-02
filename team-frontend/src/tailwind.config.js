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
            keyframes: {
        'wholesome-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)', borderRadius: '30%' },
          '50%': { transform: 'rotate(180deg) scale(1.1)', borderRadius: '45%' },
          '100%': { transform: 'rotate(360deg) scale(1)', borderRadius: '30%' },
        },
        'leaf-breathe': {
          '0%, 100%': { transform: 'scale(0.8) rotate(45deg)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1) rotate(45deg)', opacity: '1' },
        }
      },
      animation: {
        'wholesome-spin': 'wholesome-spin 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'leaf-breathe': 'leaf-breathe 1.5s ease-in-out infinite',
      },
        },
    },
}
