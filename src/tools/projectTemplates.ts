import { ProjectBuilder, type ProjectFile } from "./projectBuilder.js";

export interface ProjectTemplate {
  name: string;
  description: string;
  files: ProjectFile[];
}

const templates: Record<string, () => ProjectFile[]> = {
  vanillaHTML: () => [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Welcome</h1>
    </header>
    <main>
      <p>Your content here</p>
    </main>
    <footer>
      <p>&copy; 2026</p>
    </footer>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
    },
    {
      path: "styles.css",
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2.5rem;
}

main {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

footer {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}`,
    },
    {
      path: "script.js",
      content: `document.addEventListener('DOMContentLoaded', () => {
  console.log('Project loaded');
  
  
});`,
    },
  ],

  reactVite: () => [
    {
      path: "package.json",
      content: `{
  "name": "react-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}`,
    },
    {
      path: "vite.config.js",
      content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});`,
    },
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
    },
    {
      path: "src/main.jsx",
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`,
    },
    {
      path: "src/index.css",
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
}

#root {
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}`,
    },
    {
      path: "src/App.jsx",
      content: `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header>
        <h1>My React App</h1>
      </header>
      <main>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}>Count: {count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Increment
          </button>
        </div>
      </main>
      <footer>
        <p>&copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;`,
    },
  ],

  nodeExpress: () => [
    {
      path: "package.json",
      content: `{
  "name": "express-api",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  }
}`,
    },
    {
      path: "server.js",
      content: `import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    },
  ],

  pythonFlask: () => [
    {
      path: "requirements.txt",
      content: `flask==3.0.0
flask-cors==4.0.0`,
    },
    {
      path: "app.py",
      content: `from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({
        'message': 'API is running',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)`,
    },
  ],

  staticSite: () => [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#" class="logo">Brand</a>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <section id="home" class="hero">
    <div class="hero-content">
      <h1>Welcome to Our Site</h1>
      <p>Professional solutions for your business</p>
      <a href="#contact" class="btn">Get Started</a>
    </div>
  </section>

  <section id="about" class="section">
    <div class="container">
      <h2>About Us</h2>
      <p>We are dedicated to providing exceptional service.</p>
    </div>
  </section>

  <section id="services" class="section bg-light">
    <div class="container">
      <h2>Our Services</h2>
      <div class="services-grid">
        <div class="service-card">
          <h3>Service 1</h3>
          <p>Description of service</p>
        </div>
        <div class="service-card">
          <h3>Service 2</h3>
          <p>Description of service</p>
        </div>
        <div class="service-card">
          <h3>Service 3</h3>
          <p>Description of service</p>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container">
      <h2>Contact Us</h2>
      <form class="contact-form">
        <input type="text" placeholder="Name" required>
        <input type="email" placeholder="Email" required>
        <textarea placeholder="Message" rows="5" required></textarea>
        <button type="submit" class="btn">Send Message</button>
      </form>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; 2026 Company Name. All rights reserved.</p>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>`,
    },
    {
      path: "css/styles.css",
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --dark: #333;
  --light: #f5f5f5;
  --white: #fff;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--dark);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  background: var(--white);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--dark);
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary);
}

.hero {
  height: 100vh;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  background: var(--white);
  color: var(--primary);
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: transform 0.3s;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn:hover {
  transform: translateY(-2px);
}

.section {
  padding: 5rem 0;
}

.bg-light {
  background: var(--light);
}

.section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background: var(--white);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}

.service-card h3 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.contact-form button {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
}

footer {
  background: var(--dark);
  color: var(--white);
  text-align: center;
  padding: 2rem 0;
}`,
    },
    {
      path: "js/main.js",
      content: `document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message!');
      contactForm.reset();
    });
  }
});`,
    },
  ],

  todoApp: () => [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app">
    <header>
      <h1>Todo List</h1>
    </header>
    <main>
      <form id="todo-form">
        <input type="text" id="todo-input" placeholder="Add a new task..." required>
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list"></ul>
    </main>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
    },
    {
      path: "styles.css",
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.app {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  width: 90%;
  max-width: 500px;
  overflow: hidden;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

header h1 {
  font-size: 2rem;
}

main {
  padding: 1.5rem;
}

#todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
}

#todo-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

#todo-input:focus {
  border-color: #667eea;
}

#todo-form button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

#todo-form button:hover {
  background: #5568d3;
}

#todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  gap: 10px;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: #999;
}

.todo-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-item span {
  flex: 1;
  font-size: 1rem;
}

.todo-item button {
  padding: 6px 12px;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
}

.todo-item button:hover {
  background: #ff6b7a;
}`,
    },
    {
      path: "app.js",
      content: `const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
    li.innerHTML = \`
      <input type="checkbox" \${todo.completed ? 'checked' : ''}>
      <span>\${todo.text}</span>
      <button>Delete</button>
    \`;
    
    li.querySelector('input').addEventListener('change', () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });
    
    li.querySelector('button').addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });
    
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    input.value = '';
  }
});

renderTodos();`,
    },
  ],
};

export function getTemplate(name: string): ProjectFile[] {
  const templateFn = templates[name.toLowerCase()];
  return templateFn ? templateFn() : templates.vanillaHTML();
}

export function listTemplates(): string[] {
  return Object.keys(templates);
}

export default { getTemplate, listTemplates };
