/** @type {import('tailwindcss').Config} */
export default {

    darkMode: "class",

    content: [
        "./index.html",
        "./src/**/*.{js,jsx}"
    ],

    theme: {

        extend: {

            colors: {

                primary: "#2563EB",

                secondary: "#7C3AED",

                accent: "#F59E0B",

                success: "#10B981",

                danger: "#EF4444",

                dark: "#111827",

                light: "#F9FAFB",

                grayText: "#6B7280"

            },

            fontFamily: {

                sans: [
                    "Poppins",
                    "sans-serif"
                ]

            },

            borderRadius: {

                xl: "1rem",

                "2xl": "1.5rem"

            },

            boxShadow: {

                card:
                    "0 8px 30px rgba(0,0,0,0.08)",

                hover:
                    "0 20px 40px rgba(37,99,235,0.25)",

                glass:
                    "0 8px 32px rgba(31,38,135,0.2)"

            },

            backdropBlur: {

                xs: "2px"

            },

            animation: {

                fadeIn: "fadeIn 0.5s ease",

                slideUp: "slideUp .5s ease",

                bounceSlow:
                    "bounce 2s infinite"

            },

            keyframes: {

                fadeIn: {

                    "0%": {
                        opacity: 0
                    },

                    "100%": {
                        opacity: 1
                    }

                },

                slideUp: {

                    "0%": {

                        opacity: 0,

                        transform:
                            "translateY(25px)"

                    },

                    "100%": {

                        opacity: 1,

                        transform:
                            "translateY(0)"

                    }

                }

            }

        }

    },

    plugins: []

};




