const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ SIMPLE CORS - Sab allow karo
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// MongoDB Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err.message));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running 🚀' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    console.log('📧 New message from:', name);
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully! ✅' 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again.' 
    });
  }
});

app.get('/api/messages', async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, messages });
});

app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin - Messages</title>
        <style>
            body { font-family: Arial; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
            .container { max-width: 800px; margin: 0 auto; }
            .card { background: white; border-radius: 10px; padding: 20px; }
            h1 { color: #667eea; }
            .message { border-left: 3px solid #667eea; padding: 10px; margin: 10px 0; background: #f9f9f9; }
            button { background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <h1>📬 Portfolio Messages</h1>
                <button onclick="loadMessages()">🔄 Refresh</button>
                <div id="messages"></div>
            </div>
        </div>
        <script>
            async function loadMessages() {
                const div = document.getElementById('messages');
                div.innerHTML = '<div>Loading...</div>';
                try {
                    const res = await fetch('/api/messages');
                    const data = await res.json();
                    if (data.messages && data.messages.length > 0) {
                        div.innerHTML = data.messages.map(msg => \`
                            <div class="message">
                                <div class="name">\${msg.name}</div>
                                <div class="email">\${msg.email}</div>
                                <div class="date">\${new Date(msg.createdAt).toLocaleString()}</div>
                                <p>\${msg.message}</p>
                            </div>
                        \`).join('');
                    } else {
                        div.innerHTML = '<div>No messages yet. 🎉</div>';
                    }
                } catch(e) {
                    div.innerHTML = '<div>Error loading messages</div>';
                }
            }
            loadMessages();
            setInterval(loadMessages, 30000);
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});