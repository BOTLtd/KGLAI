import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Murakaza neza kuri KGL AI! Mubaze ikintu icyo ari cyo cyose.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate response (Replace with AI API later)
    setTimeout(() => {
      setMessages([...newMessages, { text: "Ndabizi! Ndacyakora...🔄", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <Card>
        <CardContent className="h-96 overflow-y-auto space-y-4 p-4">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "bot" ? "text-left" : "text-right"}>
              <span className={`px-3 py-2 rounded-lg inline-block ${msg.sender === "bot" ? "bg-gray-200" : "bg-blue-500 text-white"}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex mt-4 gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Andika hano..." />
        <Button onClick={handleSend} className="flex items-center gap-1">
          Ohereza <Send size={16} />
        </Button>
      </div>
    </div>
  );
}

// GitHub Deployment Files
// package.json
export const packageJson = {
  "name": "kgl-ai",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^4.0.0",
    "gh-pages": "^5.0.0"
  },
  "homepage": "https://your-username.github.io/kgl-ai"
};

// vite.config.js
export const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/kgl-ai/'
});`;

// GitHub Actions Deployment Workflow
export const githubWorkflow = `name: Deploy React to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install Dependencies
        run: npm install
      - name: Build Project
        run: npm run build
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: dist`;
