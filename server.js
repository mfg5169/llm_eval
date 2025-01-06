// server.js

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler(); // This allows Next.js to handle the rendering of pages

app.prepare().then(() => {
  const server = express();

  // Custom API route (handled by Express)
  server.get('/api/ath', (req, res) => {
    res.json({ message: 'This is a custom route handled by Express' });
  });

  // Catch-all route handler for Next.js pages
  server.all('*', (req, res) => {
    // This tells Next.js to handle the page rendering
    return handle(req, res);
  });

  // Start the server on port 3000
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
