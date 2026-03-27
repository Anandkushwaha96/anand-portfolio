const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - Allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// In-memory storage (messages will reset on server restart)
let messages = [];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API is running 🚀',
    status: 'active',
    totalMessages: messages.length,
    endpoints: {
      contact: 'POST /api/contact',
      messages: 'GET /api/messages',
      admin: 'GET /admin'
    }
  });
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    console.log('📧 New message received:', { name, email });
    
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
    
    // Save to memory
    const newMessage = {
      id: messages.length + 1,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    console.log(`✅ Message saved from: ${name}`);
    console.log(`📊 Total messages: ${messages.length}`);
    
    res.json({
      success: true,
      message: 'Message sent successfully! ✅ Thank you for contacting me.'
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
app.get('/api/messages', (req, res) => {
  res.json({
    success: true,
    count: messages.length,
    messages: messages
  });
});

// Resume download endpoint - Forces download on all devices
app.get('/api/download-resume', (req, res) => {
  const filePath = path.join(__dirname, '../client/public/anand23.pdf');
  
  // Set headers to force download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Anand_Kumar_Resume.pdf"');
  res.setHeader('Cache-Control', 'no-cache');
  
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(404).send('File not found');
    }
  });
});

// Admin panel - Beautiful UI to view messages
app.get('/admin', (req, res) => {
  const messagesCount = messages.length;
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin - Portfolio Messages</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }
            .container { max-width: 1000px; margin: 0 auto; }
            .header {
                background: white;
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            h1 { color: #667eea; margin-bottom: 10px; font-size: 28px; }
            .stats {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                display: inline-block;
                font-size: 14px;
                font-weight: bold;
            }
            .message-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 15px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .message-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            .message-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;
                padding-bottom: 10px;
                border-bottom: 2px solid #f0f0f0;
            }
            .name { 
                font-size: 18px; 
                font-weight: bold; 
                color: #667eea; 
            }
            .email { 
                color: #666; 
                font-size: 13px; 
                margin-top: 4px; 
            }
            .date { 
                color: #999; 
                font-size: 12px; 
                text-align: right;
            }
            .message-text { 
                color: #333; 
                line-height: 1.6; 
                margin-top: 12px;
                font-size: 14px;
            }
            .refresh-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                margin-left: 15px;
                transition: transform 0.2s;
                font-weight: bold;
            }
            .refresh-btn:hover { transform: scale(1.05); }
            .empty {
                text-align: center;
                padding: 60px;
                background: white;
                border-radius: 12px;
                color: #999;
                font-size: 16px;
            }
            .loading {
                text-align: center;
                padding: 40px;
                color: white;
                font-size: 18px;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                color: rgba(255,255,255,0.7);
                font-size: 12px;
            }
            .badge {
                display: inline-block;
                background: #f0f0f0;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
                color: #666;
                margin-left: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <div>
                        <h1>📬 Portfolio Messages</h1>
                        <div class="stats" id="stats">📊 Loading...</div>
                    </div>
                    <button class="refresh-btn" onclick="loadMessages()">🔄 Refresh</button>
                </div>
            </div>
            <div id="messages"></div>
            <div class="footer">
                💾 Messages stored in memory • Total messages: <span id="totalCount">0</span>
            </div>
        </div>

        <script>
            async function loadMessages() {
                const messagesDiv = document.getElementById('messages');
                const statsDiv = document.getElementById('stats');
                const totalCountSpan = document.getElementById('totalCount');
                
                messagesDiv.innerHTML = '<div class="loading">📡 Loading messages...</div>';
                
                try {
                    const response = await fetch('/api/messages');
                    const data = await response.json();
                    
                    if (data.success) {
                        statsDiv.innerHTML = \`📊 Total Messages: \${data.count}\`;
                        totalCountSpan.textContent = data.count;
                        
                        if (data.messages.length === 0) {
                            messagesDiv.innerHTML = \`
                                <div class="empty">
                                    🎉 No messages yet!<br>
                                    <small style="color: #999; margin-top: 10px; display: block;">Send a message from your portfolio to see it here</small>
                                </div>
                            \`;
                            return;
                        }
                        
                        messagesDiv.innerHTML = data.messages.map(msg => \`
                            <div class="message-card">
                                <div class="message-header">
                                    <div>
                                        <div class="name">👤 \${escapeHtml(msg.name)}</div>
                                        <div class="email">📧 \${escapeHtml(msg.email)}</div>
                                    </div>
                                    <div class="date">
                                        📅 \${new Date(msg.createdAt).toLocaleString()}
                                        <div class="badge">ID: \${msg.id}</div>
                                    </div>
                                </div>
                                <div class="message-text">
                                    💬 \${escapeHtml(msg.message)}
                                </div>
                            </div>
                        \`).join('');
                    } else {
                        messagesDiv.innerHTML = '<div class="empty">❌ Failed to load messages</div>';
                    }
                } catch(e) {
                    console.error('Error:', e);
                    messagesDiv.innerHTML = '<div class="empty">🔌 Error connecting to server. Make sure backend is running.</div>';
                }
            }
            
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            
            // Load immediately
            loadMessages();
            // Auto-refresh every 10 seconds
            setInterval(loadMessages, 10000);
        </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n╔══════════════════════════════════════════════════════════╗`);
  console.log(`║     🚀 PORTFOLIO BACKEND SERVER IS RUNNING!            ║`);
  console.log(`╚══════════════════════════════════════════════════════════╝\n`);
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  console.log(`📝 Contact API: POST http://localhost:${PORT}/api/contact`);
  console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`💾 Storage: In-memory (messages will reset on restart)`);
  console.log(`✅ Ready to receive messages!\n`);
});