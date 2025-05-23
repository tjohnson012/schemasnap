const express = require('express');
const cors = require('cors');
const feedbackRoute = require('./routes/feedback');

const app = express();

// 🔥 THIS IS THE FIX:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use('/api/feedback', feedbackRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
