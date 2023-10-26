/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        segment: ['Seven Segment', 'system-ui', 'sans-erif'],
        poppins: ["'Poppins'", 'system-ui', 'sans-erif'],
      }
    }
  },
  plugins: []
};