require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL; // Use your Zapier webhook URL

// Endpoint to receive request from SynthFlow
app.post('/find-client', async (req, res) => {
    try {
        const { phone_number } = req.body;
        const { data } = req.body; // Extract data from query parameters

        if (phone_number) {
          const response = await axios.post(ZAPIER_WEBHOOK_URL, { phone_number });
          console.log('✅ Data sent to Zapier:', response.data);
        }
        else if (data) {
          res.json({ message: 'Data received', data });
        }
        else {
          res.status(400).json({ error: 'Invalid request' });
        }

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to process request' });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
