#!/usr/bin/env node

/**
 * SalesAIde Development Server Restart Script (Node.js)
 * Cross-platform script to safely restart the development server
 */

import { exec, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// Utility functions for colored output
const log = {
    info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
    warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
    title: (msg) => console.log(`${colors.cyan}${msg}${colors.reset}`)
};

// Check if running on Windows
const isWindows = process.platform === 'win32';

// Function to execute shell commands
function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

// Function to kill processes on port 5000
async function killPortProcesses() {
    log.info('Checking for existing services on port 5000...');
    
    try {
        if (isWindows) {
            // Windows: Use netstat and taskkill
            const { stdout } = await execCommand('netstat -aon | findstr :5000');
            if (stdout.trim()) {
                const lines = stdout.trim().split('\n');
                for (const line of lines) {
                    const parts = line.trim().split(/\s+/);
                    const pid = parts[parts.length - 1];
                    if (pid && !isNaN(pid)) {
                        try {
                            await execCommand(`taskkill /F /PID ${pid}`);
                            log.warning(`Killed process with PID ${pid}`);
                        } catch (e) {
                            // Process might already be dead
                        }
                    }
                }
            }
        } else {
            // Unix/Linux/macOS: Use lsof and kill
            try {
                const { stdout } = await execCommand('lsof -ti:5000');
                if (stdout.trim()) {
                    const pids = stdout.trim().split('\n');
                    for (const pid of pids) {
                        if (pid && !isNaN(pid)) {
                            try {
                                await execCommand(`kill -9 ${pid}`);
                                log.warning(`Killed process with PID ${pid}`);
                            } catch (e) {
                                // Process might already be dead
                            }
                        }
                    }
                }
            } catch (e) {
                // No processes found on port 5000
            }
        }
        log.success('Port 5000 is now free');
    } catch (error) {
        log.info('No processes found on port 5000');
    }
}

// Function to kill Node.js processes
async function killNodeProcesses() {
    log.info('Killing any remaining Node.js processes for this project...');
    
    try {
        if (isWindows) {
            // Kill Node.js and tsx processes on Windows
            await execCommand('taskkill /F /IM node.exe').catch(() => {});
            await execCommand('taskkill /F /IM tsx.exe').catch(() => {});
        } else {
            // Kill specific processes on Unix systems
            await execCommand('pkill -f "tsx.*server/index.ts"').catch(() => {});
            await execCommand('pkill -f "node.*server/index.ts"').catch(() => {});
            await execCommand('pkill -f "npm.*run.*dev"').catch(() => {});
        }
        log.success('Cleaned up existing Node.js processes');
    } catch (error) {
        log.info('No additional Node.js processes to clean up');
    }
}

// Function to clear cache
async function clearCache() {
    log.info('Clearing potential cache and lock issues...');
    
    const cacheDir = path.join('node_modules', '.cache');
    if (fs.existsSync(cacheDir)) {
        try {
            fs.rmSync(cacheDir, { recursive: true, force: true });
            log.info('Cleared node_modules cache');
        } catch (error) {
            log.warning('Could not clear cache directory');
        }
    }
    
    log.success('Cache cleanup completed');
}

// Function to check and install dependencies
async function checkDependencies() {
    if (!fs.existsSync('package.json')) {
        log.error('package.json not found! Make sure you\'re in the project root directory.');
        process.exit(1);
    }
    
    if (!fs.existsSync('node_modules')) {
        log.warning('node_modules not found. Installing dependencies...');
        try {
            await execCommand('npm install');
            log.success('Dependencies installed successfully');
        } catch (error) {
            log.error('Failed to install dependencies');
            process.exit(1);
        }
    }
}

// Function to start the development server
function startDevServer() {
    log.info('Starting development server...');
    console.log('');
    log.title('🎯 Starting SalesAIde development server on http://localhost:5000');
    log.title('📝 Press Ctrl+C to stop the server');
    log.title('🔄 The server will auto-reload when you make changes');
    console.log('');
    
    // Spawn the npm run dev process
    const devProcess = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true
    });
    
    // Handle process termination
    process.on('SIGINT', () => {
        log.info('Stopping development server...');
        devProcess.kill('SIGINT');
        process.exit(0);
    });
    
    devProcess.on('close', (code) => {
        log.info('Development server stopped');
        process.exit(code);
    });
}

// Main function
async function main() {
    console.log('');
    log.title('🚀 SalesAIde Development Server Restart Script');
    log.title('==============================================');
    console.log('');
    
    try {
        await killPortProcesses();
        await killNodeProcesses();
        await clearCache();
        await checkDependencies();
        
        // Wait a moment for system to stabilize
        log.info('Waiting for system to stabilize...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        startDevServer();
    } catch (error) {
        log.error(`Failed to restart development server: ${error.message}`);
        process.exit(1);
    }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
