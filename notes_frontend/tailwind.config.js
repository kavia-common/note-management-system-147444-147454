module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#22d3ee",
        background: "#f9fafb",
        // for minimal, neutral light look:
        surface: "#fff",
        muted: "#f1f5f9",
        border: "#e5e7eb"
      },
    },
  },
  plugins: [],
};
