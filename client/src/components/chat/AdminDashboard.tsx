import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatApiService } from '@/lib/chatApiService';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  X, 
  RefreshCw, 
  Mail, 
  Phone, 
  Building,
  Calendar,
  Star
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [leads, setLeads] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiService = ChatApiService.getInstance();

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [leadsResponse, sessionsResponse, analyticsResponse] = await Promise.all([
        apiService.getLeads(),
        apiService.getSessions(20),
        apiService.getAnalytics()
      ]);

      if (leadsResponse.success) setLeads(leadsResponse.leads);
      if (sessionsResponse.success) setSessions(sessionsResponse.sessions);
      if (analyticsResponse.success) setAnalytics(analyticsResponse.analytics);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: number, isConverted: boolean) => {
    try {
      const response = await apiService.updateLead(leadId, { isConverted });
      if (response.success) {
        setLeads(prev => prev.map(lead => 
          lead.id === leadId ? { ...lead, isConverted } : lead
        ));
      }
    } catch (error) {
      console.error('Failed to update lead status:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Motivio Admin Dashboard
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="flex justify-between items-center mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Leads</p>
                      <p className="text-2xl font-bold text-blue-600">{leads.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Converted</p>
                      <p className="text-2xl font-bold text-green-600">
                        {leads.filter(l => l.isConverted).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Sessions</p>
                      <p className="text-2xl font-bold text-purple-600">{sessions.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Score</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {leads.length > 0 
                          ? Math.round(leads.reduce((sum, l) => sum + (l.leadScore || 0), 0) / leads.length)
                          : 0
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button 
              variant="outline" 
              onClick={refreshData}
              disabled={isLoading}
              className="ml-4"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>

          <Tabs defaultValue="leads" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="space-y-4">
              <div className="grid gap-4">
                {leads.map((lead) => (
                  <Card key={lead.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <Badge variant={lead.isConverted ? "default" : "secondary"}>
                            {lead.isConverted ? "Converted" : "Lead"}
                          </Badge>
                          <Badge variant="outline">
                            Score: {lead.leadScore || 0}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span>{lead.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{lead.phone || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <strong>Business:</strong> {lead.businessType} • 
                            <strong> Stage:</strong> {lead.qualificationStage}
                          </p>
                          {lead.interests && lead.interests.length > 0 && (
                            <div className="mt-2">
                              <span className="text-sm text-gray-600">Interests: </span>
                              {lead.interests.map((interest: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs mr-1">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {!lead.isConverted && (
                          <Button
                            size="sm"
                            onClick={() => updateLeadStatus(lead.id, true)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Mark Converted
                          </Button>
                        )}
                        {lead.isConverted && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateLeadStatus(lead.id, false)}
                          >
                            Mark as Lead
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              <div className="grid gap-4">
                {sessions.map((session) => (
                  <Card key={session.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Session {session.id.slice(0, 8)}...</h3>
                      <div className="flex gap-2">
                        <Badge variant={session.isActive ? "default" : "secondary"}>
                          {session.isActive ? "Active" : "Ended"}
                        </Badge>
                        <Badge variant="outline">
                          {session.qualificationStage}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Started:</span>
                        <span className="ml-1">{new Date(session.startedAt).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Business Size:</span>
                        <span className="ml-1">{session.businessSize || 'Unknown'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Topic:</span>
                        <span className="ml-1">{session.currentTopic || 'General'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Intent:</span>
                        <span className="ml-1">{session.userIntent || 'Unknown'}</span>
                      </div>
                    </div>

                    {session.painPoints && session.painPoints.length > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Pain Points: </span>
                        {session.painPoints.map((point: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs mr-1">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4">
                {analytics.map((analytic) => (
                  <Card key={analytic.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Session Analytics</h3>
                      <Badge variant={analytic.leadCaptured ? "default" : "secondary"}>
                        {analytic.leadCaptured ? "Lead Captured" : "No Lead"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Messages:</span>
                        <span className="ml-1 font-medium">{analytic.messageCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">User Messages:</span>
                        <span className="ml-1 font-medium">{analytic.userMessageCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-1 font-medium">
                          {analytic.duration ? `${Math.round(analytic.duration / 1000)}s` : 'Active'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <span className="ml-1 font-medium">
                          {new Date(analytic.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {analytic.intents && analytic.intents.length > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Intents: </span>
                        {analytic.intents.map((intent: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs mr-1">
                            {intent}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
