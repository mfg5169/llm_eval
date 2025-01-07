// server.js

const express = require('express');
const next = require('next');
const Models = require("./app/utils/models");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler(); // This allows Next.js to handle the rendering of pages




app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  // Custom API route (handled by Express)
  server.post('/api/resp/:model', async (req, res) => {
    console.log("resp:", req.body)
    console.log("params:", req.params)
      // Access prompt and model from request body
      // Check if the model exists in the dictionary
    if (!Models[req.params.model]) {
      return res.status(404).json({ error: `Model '${req.params.model}' not found.` });
    }

    console.log("THE ACTIVE MODEL: " +req.params.model )
    reading =  await Models[req.params.model].method(req.body.prompt)
    console.log("read: ",  reading)
    
    // Example processing logic
    res.json({response: reading
    });
  });

  server.get('/api/convo:focus', (req, res) => {
    res.json({ prompt: 'Who are you',  message: 'im good' });
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
