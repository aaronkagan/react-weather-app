/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'background-gradient':
          'linear-gradient(135deg, rgba(36,36,62,1) 0%,rgba(47,43,97,1) 50%,rgba(17,13,43,1) 100%)',

        'card-gradient':
          'linear-gradient(135deg, rgba(84,82,113,1) 0%, rgba(89,85,130,1) 50%, rgba(73,71,104,1) 100%)',
      },
    },
  },
  plugins: [],
};
1;
