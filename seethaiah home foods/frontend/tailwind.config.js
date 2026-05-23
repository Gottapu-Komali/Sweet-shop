/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // "Sweet Shop" orange branding could live here if needed, 
                // but Tailwind defaults work well with my current code (orange-50, orange-600)
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
                // Note: I might need to import these fonts or rely on user system fonts/Google Fonts import
            }
        },
    },
    plugins: [],
}
