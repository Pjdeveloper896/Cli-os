
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());
app.use(express.json());

let fakeFS = {
  'home': {
    'user': {
      'readme.txt': 'Welcome to your browser OS!'
    }
  }
};

let notes = [];

function getDir(path) {
  let parts = path.split('/').filter(Boolean);
  let current = fakeFS;
  for (let part of parts) {
    if (!current[part]) return null;
    current = current[part];
  }
  return current;
}

app.get('/', (req, res) => {
  res.send("Browser CLI OS Backend Running");
});

app.post('/command', async (req, res) => {
  const { command, path } = req.body;
  const args = command.trim().split(' ');
  const base = args[0];
  const cwd = getDir(path) || fakeFS;

  let response = '';

  if (base === 'ls') {
    response = Object.keys(cwd).join('  ');
  } else if (base === 'cat') {
    const file = args[1];
    response = cwd[file] || 'File not found.';
  } else if (base === 'mkdir') {
    const dir = args[1];
    cwd[dir] = {};
    response = `Directory ${dir} created.`;
  } else if (base === 'touch') {
    const file = args[1];
    cwd[file] = '';
    response = `File ${file} created.`;
  } else if (base === 'cd') {
    const dir = args[1];
    const newPath = path + '/' + dir;
    if (getDir(newPath)) {
      response = `Changed to ${newPath}`;
    } else {
      response = `No such directory: ${dir}`;
    }
  } else if (base === 'edit') {
    const file = args[1];
    if (cwd[file] !== undefined) {
      cwd[file] = args.slice(2).join(' ') || 'Edited file.';
      response = `File ${file} updated.`;
    } else {
      response = 'File not found.';
    }
  } else if (base === 'note') {
    const sub = args[1];
    if (sub === 'add') {
      notes.push(args.slice(2).join(' '));
      response = 'Note added.';
    } else if (sub === 'list') {
      response = notes.map((n, i) => `${i + 1}. ${n}`).join('\n') || 'No notes yet.';
    } else if (sub === 'delete') {
      const index = parseInt(args[2]) - 1;
      if (notes[index]) {
        notes.splice(index, 1);
        response = 'Note deleted.';
      } else {
        response = 'Invalid note number.';
      }
    } else {
      response = 'Unknown note command.';
    }
  } else if (base === 'calendar') {
    const today = new Date();
    response = `ðŸ“… Today: ${today.toDateString()}`;
  } else if (base === 'fetch') {
    const url = args[1];
    try {
      const r = await fetch(url);
      const json = await r.json();
      response = JSON.stringify(json, null, 2).slice(0, 500);
    } catch {
      response = 'Failed to fetch.';
    }
  } else if (base === 'browser') {
    const url = args[1];
    try {
      const r = await fetch(url);
      const text = await r.text();
      response = text
        .replace(/<[^>]*>/g, '')  // strip HTML tags
        .replace(/\s+/g, ' ')    // simplify whitespace
        .slice(0, 1000);          // truncate to prevent flooding
    } catch {
      response = 'Failed to load page.';
    }
  } else if (base === 'sysinfo') {
    response = `
OS: Browser CLI OS
CPU: 1 core (simulated)
Memory: 256MB RAM (virtual)
Uptime: ${Math.floor(process.uptime())}s
User: guest
`.trim();
  } else if (base === 'clock') {
    response = `ðŸ•’ ${new Date().toLocaleTimeString()}`;
  } else if (base === 'clear') {
    response = '__clear__';
  } else {
    response = `Unknown command: ${base}`;
  }

  res.json({ response });
});

app.listen(3000, () => console.log("Backend running at http://localhost:3000"));