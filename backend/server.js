require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(CLIENT_ID);

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({ idToken: token, audience: CLIENT_ID });
    const payload = ticket.getPayload();
    const jwtToken = jwt.sign({ email: payload.email, name: payload.name, picture: payload.picture }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ jwt: jwtToken, user: payload });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
