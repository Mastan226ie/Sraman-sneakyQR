/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                olive: {
                    50: '#F5F7F4',
                    100: '#E6EAE3',
                    200: '#CDD6C8',
                    300: '#B0BFA8',
                    400: '#94A68B',
                    500: '#8B9D77',
                    600: '#6B7C5C',
                    700: '#526046',
                    800: '#3D4A34',
                    900: '#323D2B',
                    950: '#192015',
                },
                beige: {
                    50: '#FCFBF9',
                    100: '#F5F1E8',
                    200: '#E8E4D9',
                    300: '#D4CFC0',
                    400: '#B8B3A4',
                    500: '#9C9888',
                    600: '#7E7B6C',
                    700: '#636054',
                    800: '#4D4A41',
                    900: '#403E36',
                    950: '#23211C',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 2px 10px rgba(0, 0, 0, 0.02), 0 4px 20px rgba(0, 0, 0, 0.04)',
                'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            }
        },
    },
    plugins: [],
}
