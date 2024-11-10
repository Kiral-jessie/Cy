const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log('Request Date Logger:', new Date()); // Log the request method and URL
    next(); // Pass control to the next middleware or route handler
});
app.use(express.static(__dirname));
app.get('/FAQS', (req, res) => {
  const query = 'SELECT * FROM faqs';
db.query(query, (err, results) => { // Use the callback pattern//
        if (err) {
            console.error('Error fetching FAQS:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data.' });
        }
        
  res.json(results);
        });
});
app.post('/FAQSS', (req, res) => {
  const { question, answer } = req.body;

  // Validate that both question and answer exist
  if (!question || !answer) {
    return res.status(400).json({ error: 'Please provide both a question and an answer.' });
  }

  // Insert the new FAQ into the database
  const query = 'INSERT INTO faqs (question, answer) VALUES (?, ?)';
  db.query(query, [question, answer], (err, results) => {
    if (err) {
      console.error('Error inserting FAQ:', err);
      return res.status(500).json({ error: 'An error occurred while saving the FAQ.' });
    }

    res.status(201).json({ message: 'FAQ added successfully!', faqId: results.insertId });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});