// tailwind.config.js

module.exports = {
  // Specify the paths to all of your project's HTML, CSS, and JavaScript files
  // This is required for Tailwind CSS to scan your project and generate the necessary utility classes
  // You can specify the paths as an array of file paths or an object with globs
  content: [
    './src/**/*.html', // HTML files
    './src/**/*.jsx', // JSX files (for React)
    // Add more file paths as needed
  ],

  // Customize or extend Tailwind CSS theme configuration
  theme: {
    extend: {
      // Add custom or extended theme values here
    },
  },

  // Add Tailwind CSS plugins
  plugins: [
    // Add any Tailwind CSS plugins here
  ],
};
