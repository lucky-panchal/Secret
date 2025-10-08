const WebSocket = require('ws');

let wss = null;
let clients = new Set();

function setupWebSocket(server) {
  wss = new WebSocket.Server({ server });
  
  wss.on('connection', (ws, req) => {
    console.log('📡 New WebSocket connection established');
    clients.add(ws);
    
    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connection',
      message: 'Connected to KaushalX real-time updates',
      timestamp: new Date().toISOString()
    }));
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        console.log('📨 Received message:', data);
        
        // Handle different message types
        switch (data.type) {
          case 'subscribe':
            ws.subscriptions = data.channels || ['all'];
            ws.send(JSON.stringify({
              type: 'subscribed',
              channels: ws.subscriptions,
              timestamp: new Date().toISOString()
            }));
            break;
            
          case 'ping':
            ws.send(JSON.stringify({
              type: 'pong',
              timestamp: new Date().toISOString()
            }));
            break;
            
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('📡 WebSocket connection closed');
      clients.delete(ws);
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });
  
  console.log('🔌 WebSocket server initialized');
}

function broadcastUpdate(data) {
  if (!wss || clients.size === 0) {
    return;
  }
  
  const message = JSON.stringify({
    ...data,
    timestamp: new Date().toISOString()
  });
  
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        // Check if client is subscribed to this channel
        const subscriptions = client.subscriptions || ['all'];
        if (subscriptions.includes('all') || subscriptions.includes(data.type)) {
          client.send(message);
        }
      } catch (error) {
        console.error('Error sending WebSocket message:', error);
        clients.delete(client);
      }
    } else {
      clients.delete(client);
    }
  });
  
  console.log(`📡 Broadcasted update to ${clients.size} clients:`, data.type);
}

function broadcastCourseUpdate(course, action = 'update') {
  broadcastUpdate({
    type: 'course_update',
    action: action, // 'create', 'update', 'delete'
    course: {
      id: course._id,
      title: course.courseTitle,
      category: course.courseCategory,
      trend: course.trend,
      courseDemand: course.courseDemand,
      jobAvailability: course.jobAvailability,
      confidenceScore: course.confidenceScore,
      lastUpdated: course.lastUpdated
    }
  });
}

function broadcastTrendUpdate(trendData) {
  broadcastUpdate({
    type: 'trend_update',
    data: trendData
  });
}

function broadcastScrapingStatus(status) {
  broadcastUpdate({
    type: 'scraping_status',
    status: status
  });
}

function getConnectionCount() {
  return clients.size;
}

function closeAllConnections() {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.close();
    }
  });
  clients.clear();
}

module.exports = {
  setupWebSocket,
  broadcastUpdate,
  broadcastCourseUpdate,
  broadcastTrendUpdate,
  broadcastScrapingStatus,
  getConnectionCount,
  closeAllConnections
};