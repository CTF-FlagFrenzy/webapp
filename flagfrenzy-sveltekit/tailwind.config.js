/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      'custom': {
        100: '#333640',
        110: '#40424B',
        200: '#F3CC59',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      'Easy': '#59F359',
      'Medium': '#F3CC59',
      'Hard': '#F35977',
      'Expert': '#B259F3',
      'Default': '#A5A2A2',
    },
    extend: {
      boxShadow: {
        'EasyShadow': '0 0px 20px #59F359',
        'MediumShadow': '0 0px 20px #F3CC59',
        'HardShadow': '0 0px 20px #F35977',
        'ExpertShadow': '0 0px 20px #B259F3',
        'DefaultShadow': '0 0px 20px #A5A2A2',
      },
    },
  },
  plugins: [],
}

