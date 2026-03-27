const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - Sab allow
app.use(cors());
app.use(express.json());

// In-memory storage - messages yahan store honge
let messages = [];

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API is running 🚀',
    status: 'active',
    totalMessages: messages.length
  });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  console.log('=== NEW MESSAGE ===');
  console.log('Body:', req.body);
  
  const { name, email, message } = req.body;
  
  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and message'
    });
  }
  
  // Email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }
  
  // Save to memory
  const newMessage = {
    id: messages.length + 1,
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };
  
  messages.push(newMessage);
  
  console.log(`✅ Saved from: ${name}`);
  console.log(`📊 Total: ${messages.length}`);
  
  res.json({
    success: true,
    message: 'Message sent successfully! ✅'
  });
});

// Get all messages
app.get('/api/messages', (req, res) => {
  res.json({
    success: true,
    count: messages.length,
    messages: messages
  });
});

// Resume download
app.get('/api/download-resume', (req, res) => {
  const filePath = path.join(__dirname, '../client/public/anand23.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Anand_Kumar_Resume.pdf"');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(404).send('File not found');
    }
  });
});

// Admin panel - Beautiful UI
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Messages</title>
        <style>
            body { font-family: Arial; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
            .container { max-width: 800px; margin: 0 auto; }
            .card { background: white; border-radius: 10px; padding: 20px; }
            h1 { color: #667eea; }
            .message { border-left: 3px solid #667eea; padding: 10px; margin: 10px 0; background: #f9f9f9; }
            .name { font-weight: bold; color: #667eea; }
            .email { color: #666; font-size: 12px; }
            .date { color: #999; font-size: 12px; }
            button { background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <h1>📬 Messages (${messages.length})</h1>
                <button onclick="location.reload()">🔄 Refresh</button>
                <div id="messages">
                    ${messages.map(msg => `
                        <div class="message">
                            <div class="name">${msg.name}</div>
                            <div class="email">📧 ${msg.email}</div>
                            <div class="date">📅 ${new Date(msg.createdAt).toLocaleString()}</div>
                            <p>💬 ${msg.message}</p>
                        </div>
                    `).join('')}
                    ${messages.length === 0 ? '<p>🎉 No messages yet. Send a message from your portfolio!</p>' : ''}
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📝 Admin: http://localhost:${PORT}/admin`);
  console.log(`✅ Ready to receive messages!\n`);
});