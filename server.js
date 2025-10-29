// ────────────────────────────────────────────────
// 🎮 MODDING TOOL - BLUE/PURPLE GLOW GUI
// ────────────────────────────────────────────────
const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Main route - serve the ultimate GUI
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎮 Ultimate Modding Tool</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #00a8ff;
            --primary-glow: #0097e6;
            --secondary: #111;
            --accent: #8c7ae6;
            --text: #e6f7ff;
            --step-highlight: #00ff88;
            --warning: #ff9f43;
            --error: #ff6b6b;
            --success: #00ff88;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: 
                radial-gradient(circle at 20% 80%, rgba(0,168,255,0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(140,122,230,0.1) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a1a 0%, #1a1a2a 50%, #0f0f1f 100%);
            color: var(--text);
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        /* Animated background particles */
        .particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }

        .particle {
            position: absolute;
            background: var(--primary);
            border-radius: 50%;
            opacity: 0.3;
            animation: float 15s infinite linear;
        }

        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 1.5rem;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .header {
            text-align: center;
            margin-bottom: 1.5rem;
            position: relative;
        }

        .title {
            font-size: 3rem;
            font-weight: 900;
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--primary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(0,168,255,0.3);
            margin-bottom: 0.5rem;
            animation: titleGlow 3s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
            0% { text-shadow: 0 0 20px rgba(0,168,255,0.3); }
            100% { text-shadow: 0 0 40px rgba(0,151,230,0.6), 0 0 60px rgba(140,122,230,0.3); }
        }

        .subtitle {
            font-size: 1.1rem;
            color: var(--text);
            opacity: 0.8;
            font-weight: 300;
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 1.5rem;
            flex: 1;
            min-height: 70vh;
        }

        .left-panel {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .stats, .controls {
            background: rgba(17,17,34,0.9);
            border: 1px solid rgba(0,168,255,0.3);
            border-radius: 15px;
            padding: 1.2rem;
            backdrop-filter: blur(10px);
            animation: slideInLeft 0.8s ease-out;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        @keyframes slideInLeft {
            from { transform: translateX(-50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        .section-title {
            font-size: 1.3rem;
            color: var(--primary);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
        }

        .stat-card {
            background: linear-gradient(135deg, rgba(0,168,255,0.1) 0%, rgba(140,122,230,0.05) 100%);
            border: 1px solid rgba(0,168,255,0.2);
            border-radius: 10px;
            padding: 0.8rem;
            text-align: center;
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-3px);
            border-color: var(--primary);
            box-shadow: 0 8px 15px rgba(0,168,255,0.2);
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0.3rem 0;
        }

        .stat-label {
            font-size: 0.8rem;
            opacity: 0.8;
        }

        .button-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.8rem;
        }

        .action-btn {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%);
            border: none;
            border-radius: 10px;
            padding: 1rem 1.5rem;
            font-size: 1rem;
            font-weight: 700;
            color: #111;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            position: relative;
            overflow: hidden;
        }

        .action-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: 0.5s;
        }

        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,168,255,0.4);
        }

        .action-btn:hover::before {
            left: 100%;
        }

        .action-btn.secondary {
            background: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
        }

        .action-btn.danger {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
        }

        .log-container {
            background: rgba(10,10,25,0.95);
            border: 1px solid rgba(0,168,255,0.3);
            border-radius: 15px;
            padding: 1.2rem;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.85rem;
            backdrop-filter: blur(10px);
            animation: slideInRight 0.8s ease-out;
            min-height: 500px;
            max-height: 70vh;
        }

        @keyframes slideInRight {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        .log-entry {
            margin-bottom: 0.5rem;
            padding: 0.5rem;
            border-radius: 5px;
            animation: logSlide 0.3s ease-out;
            line-height: 1.4;
        }

        @keyframes logSlide {
            from { transform: translateX(-10px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        .log-info { background: rgba(0,168,255,0.1); border-left: 3px solid var(--primary); }
        .log-warning { background: rgba(255,159,67,0.1); border-left: 3px solid var(--warning); }
        .log-error { background: rgba(255,107,107,0.1); border-left: 3px solid var(--error); }
        .log-success { background: rgba(0,255,136,0.1); border-left: 3px solid var(--success); }
        .log-step { 
            background: rgba(0,255,136,0.15); 
            border-left: 3px solid var(--step-highlight);
            font-weight: bold;
            color: var(--step-highlight);
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }
        .log-substep { 
            background: rgba(0,168,255,0.08); 
            border-left: 3px solid var(--accent);
            margin-left: 1rem;
            padding: 0.3rem 0.5rem;
            font-size: 0.8rem;
        }

        .step-group {
            margin-bottom: 1rem;
            border: 1px solid rgba(0,168,255,0.2);
            border-radius: 8px;
            overflow: hidden;
        }

        .step-header {
            background: rgba(0,255,136,0.2);
            padding: 0.8rem;
            font-weight: bold;
            color: var(--step-highlight);
            border-bottom: 1px solid rgba(0,168,255,0.2);
        }

        .step-content {
            background: rgba(0,168,255,0.05);
            padding: 0.5rem;
        }

        .footer {
            text-align: center;
            margin-top: 1rem;
            padding: 1rem;
            font-size: 0.8rem;
            opacity: 0.7;
            border-top: 1px solid rgba(0,168,255,0.2);
        }

        /* Responsive Design - Both Portrait & Landscape */
        @media (max-width: 1200px) {
            .main-content {
                grid-template-columns: 1fr;
                grid-template-rows: auto 1fr;
                gap: 1rem;
            }
            
            .left-panel {
                flex-direction: row;
                gap: 1rem;
            }
            
            .stats, .controls {
                flex: 1;
            }
            
            .button-grid {
                grid-template-columns: 1fr 1fr;
            }
            
            .log-container {
                min-height: 400px;
                max-height: 50vh;
            }
        }

        @media (max-width: 768px) {
            .title {
                font-size: 2rem;
            }
            
            .left-panel {
                flex-direction: column;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .button-grid {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 1rem;
            }
            
            .log-container {
                min-height: 300px;
                max-height: 40vh;
            }
        }

        @media (max-height: 600px) and (orientation: landscape) {
            .container {
                padding: 0.5rem;
            }
            
            .header {
                margin-bottom: 1rem;
            }
            
            .title {
                font-size: 2rem;
            }
            
            .main-content {
                min-height: 80vh;
            }
            
            .log-container {
                min-height: 250px;
                max-height: 55vh;
            }
        }

        /* Scrollbar styling */
        .log-container::-webkit-scrollbar {
            width: 8px;
        }

        .log-container::-webkit-scrollbar-track {
            background: rgba(0,168,255,0.1);
            border-radius: 4px;
        }

        .log-container::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 4px;
        }

        .log-container::-webkit-scrollbar-thumb:hover {
            background: var(--accent);
        }
    </style>
</head>
<body>
    <div class="particles" id="particles"></div>
    
    <div class="container">
        <header class="header">
            <h1 class="title">🎮 ULTIMATE MODDING TOOL</h1>
            <p class="subtitle">Professional Game Modification Suite • v2.5.1</p>
        </header>
        
        <div class="main-content">
            <div class="left-panel">
                <div class="stats">
                    <h2 class="section-title">📊 SYSTEM STATUS</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-label">MODS PROCESSED</div>
                            <div class="stat-value">1,247</div>
                            <div class="stat-label">Today: 42</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">ACTIVE USERS</div>
                            <div class="stat-value">893</div>
                            <div class="stat-label">+12 this hour</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">SUCCESS RATE</div>
                            <div class="stat-value">98.7%</div>
                            <div class="stat-label">Last 24 hours</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">AVG PROCESS TIME</div>
                            <div class="stat-value">3.2s</div>
                            <div class="stat-label">Per mod</div>
                        </div>
                    </div>
                </div>
                
                <div class="controls">
                    <h2 class="section-title">🎮 QUICK ACTIONS</h2>
                    <div class="button-grid">
                        <button class="action-btn" onclick="runCommand('modskin')">
                            <span>🎨</span> RUN MODSKIN
                        </button>
                        <button class="action-btn" onclick="runCommand('zipobb')">
                            <span>🗜️</span> COMPRESS OBB
                        </button>
                        <button class="action-btn secondary" onclick="runCommand('backup')">
                            <span>💾</span> CREATE BACKUP
                        </button>
                        <button class="action-btn secondary" onclick="clearLogs()">
                            <span>🧹</span> CLEAR LOGS
                        </button>
                        <button class="action-btn danger" onclick="runCommand('emergency')">
                            <span>🚨</span> EMERGENCY STOP
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="log-container" id="logContainer">
                <div class="log-entry log-info">🔸 System initialized successfully</div>
                <div class="log-entry log-info">🔸 All modules loaded and ready</div>
                <div class="log-entry log-success">✅ Security checks passed</div>
                <div class="log-entry log-info">🔸 Waiting for user command...</div>
            </div>
        </div>
        
        <footer class="footer">
            © 2025 Ultimate Modding Tool • Professional Edition • Build #2812
        </footer>
    </div>

    <script>
        // Create animated particles
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 25;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 5 + 2;
                const posX = Math.random() * 100;
                const delay = Math.random() * 15;
                const duration = 15 + Math.random() * 10;
                
                particle.style.width = \`\${size}px\`;
                particle.style.height = \`\${size}px\`;
                particle.style.left = \`\${posX}%\`;
                particle.style.animationDelay = \`\${delay}s\`;
                particle.style.animationDuration = \`\${duration}s\`;
                
                container.appendChild(particle);
            }
        }
        
        // Log management
        const logContainer = document.getElementById('logContainer');
        let currentStepGroup = null;
        
        function appendLog(message, type = 'info') {
            const logEntry = document.createElement('div');
            logEntry.className = \`log-entry log-\${type}\`;
            logEntry.innerHTML = message;
            
            if (currentStepGroup && (type === 'substep' || type === 'info')) {
                currentStepGroup.appendChild(logEntry);
            } else {
                logContainer.appendChild(logEntry);
            }
            
            logContainer.scrollTop = logContainer.scrollHeight;
        }
        
        function clearLogs() {
            logContainer.innerHTML = '<div class="log-entry log-info">🔸 Logs cleared successfully</div>';
            currentStepGroup = null;
        }
        
        // Process modskin logs with step highlighting
        function processModskinLogs(text) {
            const lines = text.split('\\n');
            
            lines.forEach(line => {
                if (!line.trim()) return;
                
                // Detect step lines (like "Step 1:", "Step 2:", etc.)
                const stepMatch = line.match(/Step\\s+(\\d+):\\s*(.*)/i);
                const substepMatch = line.match(/^\\s*[→•-]\\s*(.*)/);
                const successMatch = line.match(/SUCCESS|completed|finished|done/i);
                const errorMatch = line.match(/ERROR|failed|error/i);
                const warningMatch = line.match(/WARNING|warning/i);
                
                if (stepMatch) {
                    // Close previous step group
                    currentStepGroup = null;
                    
                    // Create new step group
                    const stepGroup = document.createElement('div');
                    stepGroup.className = 'step-group';
                    
                    const stepHeader = document.createElement('div');
                    stepHeader.className = 'step-header';
                    stepHeader.innerHTML = \`📝 Step \${stepMatch[1]}: \${stepMatch[2]}\`;
                    
                    const stepContent = document.createElement('div');
                    stepContent.className = 'step-content';
                    
                    stepGroup.appendChild(stepHeader);
                    stepGroup.appendChild(stepContent);
                    logContainer.appendChild(stepGroup);
                    
                    currentStepGroup = stepContent;
                } else if (substepMatch && currentStepGroup) {
                    appendLog(\`→ \${substepMatch[1]}\`, 'substep');
                } else if (successMatch) {
                    appendLog(\`✅ \${line}\`, 'success');
                } else if (errorMatch) {
                    appendLog(\`❌ \${line}\`, 'error');
                } else if (warningMatch) {
                    appendLog(\`⚠️ \${line}\`, 'warning');
                } else if (currentStepGroup) {
                    appendLog(line, 'info');
                } else {
                    appendLog(line, 'info');
                }
            });
        }
        
        // Real command execution
        function runCommand(cmd) {
            // Clear previous step groups
            currentStepGroup = null;
            
            if (cmd === 'modskin') {
                appendLog(\`<b>🚀 Starting MODSKIN Engine...</b>\`, 'info');
                appendLog(\`🔧 Running: python ~/SKIN/gojo.py modskin\`, 'info');
            } else {
                appendLog(\`<b>🚀 Starting \${cmd.toUpperCase()} command...</b>\`, 'info');
            }
            
            fetch(\`/run/\${cmd}\`)
                .then(response => {
                    if (!response.ok) throw new Error('Network error');
                    return response.body.getReader();
                })
                .then(reader => {
                    const decoder = new TextDecoder();
                    
                    function readChunk() {
                        reader.read().then(({done, value}) => {
                            if (done) return;
                            
                            const text = decoder.decode(value);
                            
                            if (cmd === 'modskin') {
                                processModskinLogs(text);
                            } else {
                                const lines = text.split('\\n');
                                lines.forEach(line => {
                                    if (line.trim()) {
                                        let type = 'info';
                                        if (line.includes('ERROR') || line.includes('error')) type = 'error';
                                        if (line.includes('SUCCESS') || line.includes('success')) type = 'success';
                                        if (line.includes('WARNING') || line.includes('warning')) type = 'warning';
                                        
                                        appendLog(line, type);
                                    }
                                });
                            }
                            
                            readChunk();
                        }).catch(error => {
                            appendLog(\`❌ Error reading stream: \${error}\`, 'error');
                        });
                    }
                    
                    readChunk();
                })
                .catch(error => {
                    appendLog(\`❌ Command execution failed: \${error}\`, 'error');
                });
        }
        
        // Simulated modskin steps for demo
        function simulateModskinSteps() {
            const steps = [
                {
                    step: "1: Initializing ModSkin Engine",
                    substeps: [
                        "Loading configuration files...",
                        "Checking dependencies...",
                        "Initializing texture processor...",
                        "SUCCESS: Engine initialized"
                    ]
                },
                {
                    step: "2: Analyzing Game Assets",
                    substeps: [
                        "Scanning game directory...",
                        "Found 247 texture files",
                        "Analyzing file formats...",
                        "SUCCESS: Asset analysis complete"
                    ]
                },
                {
                    step: "3: Processing Textures",
                    substeps: [
                        "Converting PNG to DDS...",
                        "Optimizing texture sizes...",
                        "Applying compression...",
                        "SUCCESS: Textures processed"
                    ]
                },
                {
                    step: "4: Finalizing Mod Package",
                    substeps: [
                        "Creating backup...",
                        "Generating manifest...",
                        "Compressing package...",
                        "SUCCESS: Mod package created"
                    ]
                }
            ];
            
            let delay = 1000;
            
            steps.forEach((stepObj, index) => {
                setTimeout(() => {
                    // Create step group
                    const stepGroup = document.createElement('div');
                    stepGroup.className = 'step-group';
                    
                    const stepHeader = document.createElement('div');
                    stepHeader.className = 'step-header';
                    stepHeader.innerHTML = \`📝 Step \${stepObj.step}\`;
                    
                    const stepContent = document.createElement('div');
                    stepContent.className = 'step-content';
                    
                    stepGroup.appendChild(stepHeader);
                    stepGroup.appendChild(stepContent);
                    logContainer.appendChild(stepGroup);
                    
                    currentStepGroup = stepContent;
                    
                    // Add substeps
                    stepObj.substeps.forEach((substep, subIndex) => {
                        setTimeout(() => {
                            const type = substep.includes('SUCCESS') ? 'success' : 'info';
                            const prefix = substep.includes('SUCCESS') ? '✅ ' : '→ ';
                            appendLog(\`\${prefix}\${substep}\`, type);
                        }, delay + (subIndex * 800));
                    });
                    
                    delay += stepObj.substeps.length * 800 + 1000;
                }, delay);
            });
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            
            // Add some initial activity to logs
            setTimeout(() => {
                appendLog('🔸 System monitoring activated', 'info');
                appendLog('✅ All systems operational', 'success');
            }, 1000);
        });
    </script>
</body>
</html>
  `);
});

// Command endpoints
app.get("/run/:cmd", (req, res) => {
  const cmd = req.params.cmd;
  let command = "";
  
  if (cmd === "modskin") command = "python ~/SKIN/gojo.py modskin";
  else if (cmd === "zipobb") command = "python ~/SKIN/z3.py zipobb";
  else if (cmd === "backup") command = "echo 'Backup simulation completed'";
  else if (cmd === "emergency") command = "echo 'Emergency stop activated'";
  else {
    res.write("❌ Unknown command\n");
    return res.end();
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Transfer-Encoding': 'chunked'
  });

  const proc = spawn(command, { shell: true });

  proc.stdout.on("data", (data) => {
    res.write(data.toString());
  });
  
  proc.stderr.on("data", (data) => {
    res.write("⚠️ " + data.toString());
  });
  
  proc.on("close", (code) => {
    res.write(`\n✅ Process exited with code ${code}`);
    res.end();
  });
  
  proc.on("error", (error) => {
    res.write(`❌ Process error: ${error.message}`);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`🚀 Ultimate Modding GUI running on http://localhost:${port}`);
  console.log(`🎯 Optimized for both portrait and landscape viewing`);
  console.log(`🎨 Blue/Purple color theme activated`);
});
