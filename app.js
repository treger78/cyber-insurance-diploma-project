const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/vehicle', require('./routes/vehicle.routes'));
app.use('/api/personal', require('./routes/personal.routes'));
app.use('/api/trip', require('./routes/trip.routes'));
app.use('/api/estate', require('./routes/estate.routes'));
app.use('/api/health', require('./routes/health.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build'), { dotfiles: 'allow' }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // https server
    https.createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/asfuture.ru/privkey.pem', 'utf8'),
      cert: fs.readFileSync('/etc/letsencrypt/live/asfuture.ru/cert.pem', 'utf8')
    }, app).listen(443, () => console.log('HTTPS Server Started'));

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch(e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
