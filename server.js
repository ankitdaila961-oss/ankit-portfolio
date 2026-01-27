const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if you were serving the site from here)
app.use(express.static('.'));

// POST endpoint for contact form
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validation (Simple)
    if (!name || !email || !message) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    // Simulate Database processing
    console.log('--------------------------------');
    console.log('Received Contact Request:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------------');

    // Respond to frontend
    // In a real app, you would save to MongoDB/SQL or send an email here
    res.status(200).json({
        status: 'success',
        message: 'Message received successfully!',
        data: { name, email }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Ready to receive contact form submissions...');
});
