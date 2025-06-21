import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ChatService } from '@/lib/chatService';

export function QuickAITest() {
  const [message, setMessage] = useState('Hello, I want to boost my sales');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testChat = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const chatService = ChatService.getInstance();
      
      const context = {
        previousMessages: [],
        userInfo: { businessType: 'retail' },
        sessionContext: { qualificationStage: 'initial' as const }
      };

      console.log('Testing with message:', message);
      console.log('Context:', context);

      const result = await chatService.generateResponse(message, context);
      
      console.log('Result:', result);
      setResponse(result);
      
    } catch (err) {
      console.error('Test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Quick AI Chat Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Test Message:</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a test message..."
              rows={3}
            />
          </div>
          
          <Button 
            onClick={testChat} 
            disabled={isLoading || !message.trim()}
            className="w-full"
          >
            {isLoading ? 'Testing...' : 'Test AI Response'}
          </Button>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 font-medium">Error:</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {response && (
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="font-medium mb-2">Response:</p>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Content:</span>
                  <p className="text-sm bg-white p-2 rounded border">{response.content}</p>
                </div>
                
                <div>
                  <span className="font-medium">Type:</span>
                  <span className="ml-2 text-sm">{response.type}</span>
                </div>
                
                {response.options && (
                  <div>
                    <span className="font-medium">Options:</span>
                    <ul className="list-disc list-inside text-sm ml-4">
                      {response.options.map((option: string, index: number) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <details className="mt-4">
                  <summary className="font-medium cursor-pointer">Full Response Object</summary>
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
