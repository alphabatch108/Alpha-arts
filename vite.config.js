import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(__dirname, 'src/data/db.json');

const getDbData = () => {
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('Error reading db.json:', e);
  }
  return { pdfs: [], youtubeLectures: [], faqs: [], tickets: [], users: [], adsSettings: {} };
};

const saveDbData = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error writing db.json:', e);
    return false;
  }
};

const apiServerPlugin = () => ({
  name: 'api-server-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url.startsWith('/api/')) {
        return next();
      }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
      }

      const db = getDbData();

      if (req.url === '/api/data' && req.method === 'GET') {
        res.statusCode = 200;
        return res.end(JSON.stringify(db));
      }

      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        let payload = {};
        try {
          if (body) payload = JSON.parse(body);
        } catch (err) { }

        if (req.url === '/api/pdfs' && req.method === 'POST') {
          const newPdf = {
            id: `pdf-${Date.now()}`,
            ...payload,
            downloads: 0,
            views: 0,
            rating: 5.0,
            uploadDate: new Date().toISOString().split('T')[0]
          };
          db.pdfs = [newPdf, ...(db.pdfs || [])];
          saveDbData(db);
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, pdf: newPdf, data: db }));
        }

        if (req.url === '/api/pdfs/delete' && req.method === 'POST') {
          db.pdfs = (db.pdfs || []).filter(p => p.id !== payload.id);
          saveDbData(db);
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, data: db }));
        }

        if (req.url === '/api/youtube' && req.method === 'POST') {
          const newYt = {
            id: `yt-${Date.now()}`,
            ...payload,
            views: '1,200'
          };
          db.youtubeLectures = [newYt, ...(db.youtubeLectures || [])];
          saveDbData(db);
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, lecture: newYt, data: db }));
        }

        if (req.url === '/api/youtube/delete' && req.method === 'POST') {
          db.youtubeLectures = (db.youtubeLectures || []).filter(y => y.id !== payload.id);
          saveDbData(db);
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, data: db }));
        }

        if (req.url === '/api/tickets' && req.method === 'POST') {
          const newTicket = {
            id: Math.floor(1000 + Math.random() * 9000),
            ...payload,
            status: 'Open',
            createdAt: new Date().toLocaleString(),
            replies: []
          };
          db.tickets = [newTicket, ...(db.tickets || [])];
          saveDbData(db);
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, ticket: newTicket, data: db }));
        }

        if (req.url === '/api/tickets/reply' && req.method === 'POST') {
          db.tickets = (db.tickets || []).map(t => {
            if (t.id === payload.id) {
              return {
                ...t,
                status: 'Replied',
                replies: [...(t.replies || []), { text: payload.text, timestamp: new Date().toLocaleString() }]
              };
            }
            return t;
          });
          saveDbData(db);
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, data: db }));
        }

        if (req.url === '/api/users/block' && req.method === 'POST') {
          db.users = (db.users || []).map(u => {
            if (u.id === payload.id) return { ...u, blocked: !u.blocked };
            return u;
          });
          saveDbData(db);
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, data: db }));
        }

        if (req.url === '/api/ads' && req.method === 'POST') {
          db.adsSettings = payload;
          saveDbData(db);
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, data: db }));
        }

        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Endpoint not found' }));
      });
    });
  }
});

export default defineConfig({
  plugins: [react(), apiServerPlugin()],
  base: '/Alpha-arts/',
  server: {
    host: true,
    allowedHosts: [
      'my-beautiful-sincerely-goody.network-free.dev',
      'all'
    ]
  }
});
