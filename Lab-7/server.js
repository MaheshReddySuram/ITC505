const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Random number route with enhanced styling
server.get('/do_a_random', (req, res) => {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Random Number</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #f0f2f5;
        }
        h1 {
          color: #6d28d9;
          text-align: center;
          font-size: 3rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .container {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your Random Number: ${randomNum}</h1>
      </div>
    </body>
    </html>
  `);
});

// Mad Lib route
server.post('https://maheshreddysuram.github.io/ITC505/Lab-7/madlib', (req, res) => {
    const { 
        'space-object': spaceObject, 
        'alien-name': alienName,
        'tech-device': techDevice,
        'space-action': spaceAction,
        'cosmic-emotion': cosmicEmotion,
        'quantity': quantity
    } = req.body;

    // Check if any field is empty
    if (!spaceObject || !alienName || !techDevice || !spaceAction || !cosmicEmotion || !quantity) {
        return res.redirect('/ITC505/lab-7/index.html');
    }

    // Success response
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Your Space Adventure</title>
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Space Grotesk', sans-serif;
                    background: #0f172a;
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 1rem;
                    text-align: center;
                    background-image: 
                        radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.15) 0px, transparent 50%),
                        radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 0.1) 0px, transparent 50%);
                }
                .result-container {
                    max-width: 600px;
                    padding: 2.5rem;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                h1 {
                    background: linear-gradient(to right, #a78bfa, #7dd3fc);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    margin-bottom: 1.5rem;
                }
                p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                a {
                    display: inline-block;
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(to right, #6d28d9, #7c3aed);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                }
            </style>
        </head>
        <body>
            <div class="result-container">
                <h1>Your Space Adventure</h1>
                <p>While exploring the ${spaceObject}, you encountered ${quantity} ${alienName}${quantity > 1 ? 's' : ''} who ${quantity > 1 ? 'were' : 'was'} 
                using a ${techDevice}. Together you began ${spaceAction}, feeling 
                ${cosmicEmotion} about the whole experience!</p>
                <a href="/ITC505/lab-7/index.html">Create Another Story</a>
            </div>
        </body>
        </html>
    `);
});

// Set port
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}

server.listen(port, () => console.log('Server ready on port ' + port));
