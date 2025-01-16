/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		keyframes: {
		  'accordion-down': {
			from: { height: '0' },
			to: { height: 'var(--radix-accordion-content-height)' },
		  },
		  'accordion-up': {
			from: { height: 'var(--radix-accordion-content-height)' },
			to: { height: '0' },
		  },
		  blob: {
			"0%": {
			  transform: "translate(0px, 0px) scale(1)",
			},
			"33%": {
			  transform: "translate(30px, -50px) scale(1.1)",
			},
			"66%": {
			  transform: "translate(-20px, 20px) scale(0.9)",
			},
			"100%": {
			  transform: "translate(0px, 0px) scale(1)",
			},
		  },
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out',
		  blob: "blob 7s infinite",
		},
	  },
	},
	plugins: [
	  function ({ addUtilities }) {
		const newUtilities = {
		  ".animation-delay-2000": {
			"animation-delay": "2s",
		  },
		  ".animation-delay-4000": {
			"animation-delay": "4s",
		  },
		};
		addUtilities(newUtilities);
	  },
	],
  }
  
  