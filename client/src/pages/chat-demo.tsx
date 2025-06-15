import { useState } from 'react';
import { SimpleChatContainer } from '@/components/chat/SimpleChatContainer';

export default function ChatDemo() {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Enhanced Chat Container Demo
          </h1>
          <p className="text-gray-600 mt-1">
            Experience the improved chat interface with modern design and enhanced UX
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Modern Chat Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our enhanced chat container features glassmorphism design, smooth animations, 
            responsive layout, and improved accessibility for the best user experience.
          </p>
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {showFeatures ? 'Hide' : 'Show'} Features
          </button>
        </div>

        {/* Features Grid */}
        {showFeatures && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Glassmorphism Design</h3>
              <p className="text-gray-600">Modern glass-like effects with backdrop blur and transparency</p>
            </div>

            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsive Layout</h3>
              <p className="text-gray-600">Adapts perfectly to all screen sizes and devices</p>
            </div>

            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smooth Animations</h3>
              <p className="text-gray-600">Fluid transitions and micro-interactions for better UX</p>
            </div>

            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">♿</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">Full keyboard navigation and screen reader support</p>
            </div>

            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Behavior</h3>
              <p className="text-gray-600">Auto-hide on scroll and intelligent positioning</p>
            </div>

            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
              <p className="text-gray-600">Optimized animations and efficient rendering</p>
            </div>
          </div>
        )}

        {/* Demo Instructions */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Try the Chat!</h3>
          <p className="text-gray-700 mb-6">
            Click the chat button in the bottom-right corner to experience the enhanced interface.
            Try scrolling, using keyboard navigation (ESC to close), and testing on different screen sizes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="bg-white/60 px-3 py-1 rounded-full">💬 Click to open</span>
            <span className="bg-white/60 px-3 py-1 rounded-full">⌨️ ESC to close</span>
            <span className="bg-white/60 px-3 py-1 rounded-full">📱 Mobile responsive</span>
            <span className="bg-white/60 px-3 py-1 rounded-full">🔄 Auto-hide on scroll</span>
          </div>
        </div>

        {/* Spacer for scroll testing */}
        <div className="h-96 flex items-center justify-center text-gray-400">
          <p>Scroll down to test the auto-hide feature...</p>
        </div>
        <div className="h-96 flex items-center justify-center text-gray-400">
          <p>Keep scrolling...</p>
        </div>
        <div className="h-96 flex items-center justify-center text-gray-400">
          <p>Scroll back up to see the chat button reappear!</p>
        </div>
      </div>

      {/* Enhanced Chat Container */}
      <SimpleChatContainer />
    </div>
  );
}
