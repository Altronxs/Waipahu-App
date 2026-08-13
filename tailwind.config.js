const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        impact: ["Impact", "sans-serif"],
        "roboto-regular": ["Roboto_400Regular", ...fontFamily.sans],
        "roboto-bold": ["Roboto_700Bold", ...fontFamily.sans],
        "roboto-italic": ["Roboto-Italic", "sans-serif"],
        "noto-serif-regular": ["NotoSerif_400Regular", ...fontFamily.serif],
        "noto-serif-bold": ["NotoSerif_700Bold", ...fontFamily.serif],
        "noto-serif-bold-italic": [
          "NotoSerif_700Bold_Italic",
          ...fontFamily.serif,
        ],
        "barlow-regular": [
          "BarlowSemiCondensed_400Regular",
          ...fontFamily.sans,
        ],
        "barlow-italic": [
         
          "BarlowSemiCondensed_600SemiBold_Italic",
          ...fontFamily.sans,
        ],
        "barlow-semibold": [
          "BarlowSemiCondensed_600SemiBold",
          ...fontFamily.sans,
        ],
        "source-serif-regular": [
          "SourceSerifPro_400Regular",
          ...fontFamily.serif,
        ],
        "source-serif-italic": [
          "SourceSerifPro_400Regular_Italic",
          ...fontFamily.serif,
        ],
        "source-serif-bold": ["SourceSerifPro_700Bold", ...fontFamily.serif],
        "source-serif-bold-italic": [
          "SourceSerifPro_700Bold_Italic",
          ...fontFamily.serif,
        ],
        "source-serif-600": ["SourceSerifPro_600SemiBold", ...fontFamily.serif],
      },
      colors: {
        "whs-gold": "#b28d3e",
        "whs-blue": "#17273d",
      },
    },
  },
  plugins: [],
};
