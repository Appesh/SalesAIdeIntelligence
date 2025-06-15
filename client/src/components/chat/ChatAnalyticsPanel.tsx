import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChatAnalyticsService } from '@/lib/chatAnalytics';
import { ChatApiService } from '@/lib/chatApiService';
import { BarChart3, Users, MessageSquare, TrendingUp, X, RefreshCw } from 'lucide-react';

interface ChatAnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatAnalyticsPanel({ isOpen, onClose }: ChatAnalyticsPanelProps) {
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const analyticsService = ChatAnalyticsService.getInstance();
  const apiService = ChatApiService.getInstance();

  useEffect(() => {
    if (isOpen) {
      refreshAnalytics();
    }
  }, [isOpen]);

  const refreshAnalytics = async () => {
    setIsLoading(true);
    try {
      // Get data from backend API
      const dashboardResponse = await apiService.getDashboardSummary();

      if (dashboardResponse.success) {
        setSummary(dashboardResponse.summary);
        setAnalytics(dashboardResponse.summary.recentSessions || []);
      } else {
        // Fallback to local analytics
        const allAnalytics = analyticsService.getAllAnalytics();
        const conversionRate = analyticsService.getConversionRate();
        const avgDuration = analyticsService.getAverageSessionDuration();
        const topIntents = analyticsService.getTopIntents();

        setAnalytics(allAnalytics);
        setSummary({
          totalSessions: allAnalytics.length,
          conversionRate: (conversionRate * 100).toFixed(1),
          avgDuration: (avgDuration / 1000).toFixed(1),
          topIntents: topIntents.slice(0, 5)
        });
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Fallback to local analytics on error
      const allAnalytics = analyticsService.getAllAnalytics();
      setAnalytics(allAnalytics);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Chat Analytics Dashboard
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{summary.totalSessions || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{summary.conversionRate || 0}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Avg Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{summary.avgDuration || 0}s</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Lead Captures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {analytics.filter(a => a.leadCaptured).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Intents */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Top User Intents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {summary.topIntents?.map((intent: any, index: number) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {intent.intent}: {intent.count}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Sessions</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshAnalytics}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Loading...' : 'Refresh'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.slice(-10).reverse().map((session, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={session.leadCaptured ? "default" : "secondary"}>
                          {session.leadCaptured ? "Converted" : "Browsing"}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Stage: {session.qualificationStage}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(session.startTime).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Messages:</span>
                        <span className="ml-1 font-medium">{session.messageCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-1 font-medium">
                          {session.duration ? `${(session.duration / 1000).toFixed(0)}s` : 'Active'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">User:</span>
                        <span className="ml-1 font-medium">
                          {session.userInfo?.name || 'Anonymous'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Company:</span>
                        <span className="ml-1 font-medium">
                          {session.userInfo?.company || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {session.intents.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-600">Intents: </span>
                        {session.intents.map((intent: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs mr-1">
                            {intent}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
