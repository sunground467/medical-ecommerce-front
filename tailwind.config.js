/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#5B2C6F",
				darkPrimary: "#17171E",
				darkSecoundary: "#212130"
			},
			screens: {
				xm: "500px"
			}
		}
	},
	plugins: []
}
