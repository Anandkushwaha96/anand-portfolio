const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// MongoDB Connection (use local MongoDB first for testing)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API is running 🚀',
    status: 'active',
    endpoints: {
      contact: 'POST /api/contact',
      messages: 'GET /api/messages',
      admin: 'GET /admin'
    }
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    
    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    console.log('📧 New message from:', name, '-', email);
    console.log('📝 Message:', message.substring(0, 50) + '...');
    console.log('📊 Total messages:', await Contact.countDocuments());
    
    res.json({
      success: true,
      message: 'Message sent successfully! Thank you for contacting me.'
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// Get all messages (admin endpoint)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: messages.length,
      messages: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching messages' 
    });
  }
});

// Simple admin page
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin - Messages</title>
        <style>
            body { font-family: Arial; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
            .container { max-width: 800px; margin: 0 auto; }
            .card { background: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
            h1 { color: #667eea; }
            .message { border-left: 3px solid #667eea; padding: 10px; margin: 10px 0; background: #f9f9f9; }
            .name { font-weight: bold; color: #667eea; }
            .email { color: #666; font-size: 12px; }
            .date { color: #999; font-size: 12px; }
            .loading { text-align: center; padding: 20px; }
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
                div.innerHTML = '<div class="loading">Loading messages...</div>';
                try {
                    const res = await fetch('/api/messages');
                    const data = await res.json();
                    if (data.success && data.messages.length > 0) {
                        div.innerHTML = data.messages.map(msg => \`
                            <div class="message">
                                <div class="name">\${escapeHtml(msg.name)}</div>
                                <div class="email">\${escapeHtml(msg.email)}</div>
                                <div class="date">\${new Date(msg.createdAt).toLocaleString()}</div>
                                <p>\${escapeHtml(msg.message)}</p>
                            </div>
                        \`).join('');
                    } else {
                        div.innerHTML = '<div class="loading">No messages yet. 🎉</div>';
                    }
                } catch(e) {
                    div.innerHTML = '<div class="loading">Error loading messages</div>';
                }
            }
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            loadMessages();
            setInterval(loadMessages, 30000);
        </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Contact endpoint: POST http://localhost:${PORT}/api/contact`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`✅ Ready to receive messages!\n`);
});