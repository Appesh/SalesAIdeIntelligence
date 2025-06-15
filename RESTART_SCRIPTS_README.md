# 🚀 SalesAIde Development Server Restart Scripts

This directory contains multiple scripts to safely restart the development server by killing any existing services and starting fresh.

## 📋 Available Scripts

### 1. **Node.js Script (Recommended - Cross-platform)**
```bash
# Using npm script (recommended)
npm run restart

# Or directly
node restart-dev.js
```

### 2. **Bash Script (macOS/Linux)**
```bash
./restart-dev.sh
```

### 3. **Batch Script (Windows)**
```cmd
restart-dev.bat
```

## 🔧 What These Scripts Do

1. **🔍 Check for existing services** on port 5000
2. **💀 Kill any processes** using port 5000
3. **🧹 Clean up Node.js processes** related to the project
4. **🗑️ Clear cache** and temporary files
5. **📦 Install dependencies** if node_modules is missing
6. **⏱️ Wait for system** to stabilize
7. **🚀 Start the development server** fresh

## 🎯 When to Use

Use these scripts when you encounter:

- ✅ **Port already in use** errors
- ✅ **Server won't start** properly
- ✅ **Hot reloading stopped** working
- ✅ **Weird caching issues**
- ✅ **After switching branches**
- ✅ **After installing new dependencies**

## 🖥️ Platform-Specific Instructions

### **macOS/Linux Users**
```bash
# Make script executable (first time only)
chmod +x restart-dev.sh

# Run the script
./restart-dev.sh

# Or use npm
npm run restart
```

### **Windows Users**
```cmd
# Double-click the file or run in Command Prompt
restart-dev.bat

# Or use npm
npm run restart
```

### **Cross-Platform (Node.js)**
```bash
# Works on all platforms
npm run restart

# Or directly
node restart-dev.js
```

## 🔧 Troubleshooting

### **Permission Denied (macOS/Linux)**
```bash
chmod +x restart-dev.sh
chmod +x restart-dev.js
```

### **Script Not Found**
Make sure you're in the project root directory where the scripts are located.

### **Port Still in Use**
If port 5000 is still in use after running the script, manually find and kill the process:

**macOS/Linux:**
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>
```

**Windows:**
```cmd
# Find process using port 5000
netstat -aon | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /F /PID <PID>
```

### **Node.js Not Found**
Make sure Node.js is installed and available in your PATH:
```bash
node --version
npm --version
```

## 🎨 Script Features

- **🌈 Colored output** for better readability
- **🔍 Detailed logging** of each step
- **⚡ Fast execution** with parallel operations
- **🛡️ Error handling** for edge cases
- **🔄 Auto-dependency** installation
- **🧹 Cache cleanup** for fresh starts

## 📝 Example Output

```
🚀 SalesAIde Development Server Restart Script
==============================================

[INFO] Checking for existing services on port 5000...
[WARNING] Found process using port 5000. Killing PID 12345...
[SUCCESS] Successfully killed processes on port 5000
[INFO] Killing any remaining Node.js processes for this project...
[SUCCESS] Cleaned up existing Node.js processes
[INFO] Clearing potential cache and lock issues...
[SUCCESS] Cache cleanup completed
[INFO] Waiting for system to stabilize...
[INFO] Starting development server...

🎯 Starting SalesAIde development server on http://localhost:5000
📝 Press Ctrl+C to stop the server
🔄 The server will auto-reload when you make changes
```

## 🚨 Important Notes

- **Always run from project root** directory
- **Scripts will kill ALL Node.js processes** on Windows (be careful if running other Node apps)
- **Backup important work** before running if you have unsaved changes
- **Scripts require appropriate permissions** to kill processes

## 🔗 Quick Commands Reference

| Command | Platform | Description |
|---------|----------|-------------|
| `npm run restart` | All | Recommended cross-platform method |
| `./restart-dev.sh` | macOS/Linux | Bash script with detailed output |
| `restart-dev.bat` | Windows | Batch script for Windows users |
| `node restart-dev.js` | All | Direct Node.js execution |

---

**💡 Tip:** Add `npm run restart` to your development workflow for a quick and clean server restart!
