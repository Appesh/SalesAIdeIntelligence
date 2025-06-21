import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AIService, getAIConfigSummary } from '@/lib/ai';

export function AITestPage() {
  const [aiService] = useState(() => AIService.getInstance());
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [configSummary, setConfigSummary] = useState<any>(null);
  const [testMessage, setTestMessage] = useState('Hello, I want to boost my sales');
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load configuration summary
    setConfigSummary(getAIConfigSummary());
    
    // Initialize AI service and check health
    initializeAI();
  }, []);

  const initializeAI = async () => {
    try {
      setIsLoading(true);
      await aiService.initialize();
      const health = await aiService.getHealthStatus();
      setHealthStatus(health);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const testChatResponse = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const testContext = {
        previousMessages: [],
        userInfo: { businessType: 'retail' },
        sessionContext: { qualificationStage: 'initial' as const }
      };
      
      const response = await aiService.generateChatResponse(testMessage, testContext);
      setTestResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'unhealthy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Hybrid AI System Test</h1>
        <p className="text-muted-foreground mt-2">
          Test and monitor the AI system configuration and responses
        </p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">❌ Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {configSummary ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Available Providers:</h4>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(configSummary.availableProviders).map(([provider, available]) => (
                    <Badge 
                      key={provider} 
                      variant={available ? "default" : "secondary"}
                      className={available ? "bg-green-500" : ""}
                    >
                      {provider}: {available ? "✅" : "❌"}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">AI Configuration:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(configSummary.config, null, 2)}
                </pre>
              </div>

              {configSummary.validation.warnings.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-yellow-600">Warnings:</h4>
                  <ul className="list-disc list-inside text-sm text-yellow-600">
                    {configSummary.validation.warnings.map((warning: string, index: number) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p>Loading configuration...</p>
          )}
        </CardContent>
      </Card>

      {/* Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Health Status
            {healthStatus && (
              <Badge className={getStatusColor(healthStatus.status)}>
                {healthStatus.status}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {healthStatus ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Provider Status:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(healthStatus.providers).map(([provider, status]: [string, any]) => (
                    <div key={provider} className="border rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{provider}</span>
                        <Badge variant={status.available ? "default" : "secondary"}>
                          {status.available ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Model: {status.model}</p>
                        <p>Features: {status.features?.join(', ') || 'None'}</p>
                        {status.error && <p className="text-red-500">Error: {status.error}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Last checked: {new Date(healthStatus.lastCheck).toLocaleString()}
              </p>
            </div>
          ) : (
            <p>Loading health status...</p>
          )}
          
          <Button 
            onClick={initializeAI} 
            disabled={isLoading}
            className="mt-4"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Status'}
          </Button>
        </CardContent>
      </Card>

      {/* Chat Response Test */}
      <Card>
        <CardHeader>
          <CardTitle>Test Chat Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Test Message:</label>
            <Textarea
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              placeholder="Enter a test message..."
              rows={3}
            />
          </div>
          
          <Button 
            onClick={testChatResponse} 
            disabled={isLoading || !testMessage.trim()}
          >
            {isLoading ? 'Generating Response...' : 'Test Response'}
          </Button>
          
          {testResponse && (
            <div>
              <h4 className="font-semibold mb-2">Response:</h4>
              <div className="border rounded p-4 bg-gray-50">
                <div className="mb-3">
                  <p className="font-medium">Content:</p>
                  <p className="text-sm">{testResponse.content}</p>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">Type: <Badge variant="outline">{testResponse.type}</Badge></p>
                </div>
                
                {testResponse.options && (
                  <div className="mb-3">
                    <p className="font-medium">Options:</p>
                    <div className="flex gap-2 flex-wrap mt-1">
                      {testResponse.options.map((option: string, index: number) => (
                        <Badge key={index} variant="secondary">{option}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {testResponse.metadata && (
                  <div>
                    <p className="font-medium">Metadata:</p>
                    <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                      {JSON.stringify(testResponse.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
