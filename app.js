// Execute when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Get the current domain (e.g., https://example.com)
  const domain = window.location.origin;
  // Construct the new URL
  const newUrl = `${domain}/pr/fC7hpda9`;
  // Update the URL in the browser's navigation bar without reloading
  window.history.replaceState(null, null, newUrl);
});
