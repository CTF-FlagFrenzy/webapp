/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {  // Alle Anpassungen hier rein!
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        custom: {
          100: '#0d1116',
          110: '#151a22',
          200: '#F3CC59',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        Easy: '#59F359',
        Medium: '#FF962E',
        Hard: '#F35977',
        Expert: '#B259F3',
        Default: '#A5A2A2',
        EasyPastel: '#A7F7A7',
        MediumPastel: '#F5A75A',
        HardPastel: '#f6889e',
        ExpertPastel: '#deb8fa',
        DefaultPastel: '#A5A2A2',
      },
      boxShadow: {
        EasyShadow: '0 0px 20px #59F359',
        MediumShadow: '0 0px 20px #FF962E',
        HardShadow: '0 0px 20px #F35977',
        ExpertShadow: '0 0px 20px #B259F3',
        DefaultShadow: '0 0px 20px #A5A2A2',
        BackdropShadow: '-5px 5px 5px #35363c',
        BackdropShadow2: '0px -5px 5px #35363c',
        BackdropShadow3: '-2px 2px 5px 3px #35363c',
        BackdropShadow4: '0px 5px 5px #35363c',
      },
      backgroundImage: {
        Hero: "url('/images/Hero.png')",
        Hacker: "url('/images/Hacker.png')",
        Anonymous: "url('/images/Anonymous.png')",
        Queen: "url('/images/Queen.png')",
        Spy: "url('/images/Spy.png')",
        Warrior: "url('/images/Warrior.png')",
      },
    },
  },
  plugins: [],
}