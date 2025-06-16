import { ConversationContext, AgentResponse } from './types';

// Enhanced AI Agent Service with context awareness and sophisticated conversation flows
export class ChatService {
  private static instance: ChatService;
  
  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  // Intent detection with confidence scoring
  private detectIntent(message: string, context: ConversationContext): { intent: string; confidence: number } {
    const msg = message.toLowerCase();
    
    // High confidence intents
    if (msg.includes('demo') || msg.includes('demonstration') || msg.includes('show me')) {
      return { intent: 'demo_request', confidence: 0.9 };
    }
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing') || msg.includes('budget')) {
      return { intent: 'pricing_inquiry', confidence: 0.9 };
    }
    
    if (msg.includes('sales') || msg.includes('revenue') || msg.includes('boost') || msg.includes('increase')) {
      return { intent: 'sales_optimization', confidence: 0.8 };
    }
    
    if (msg.includes('inventory') || msg.includes('stock') || msg.includes('warehouse')) {
      return { intent: 'inventory_management', confidence: 0.8 };
    }
    
    if (msg.includes('customer') || msg.includes('analytics') || msg.includes('behavior') || msg.includes('data')) {
      return { intent: 'customer_analytics', confidence: 0.8 };
    }
    
    // Contact information patterns
    if (msg.includes('@') || msg.includes('email') || msg.includes('contact')) {
      return { intent: 'contact_sharing', confidence: 0.7 };
    }
    
    // Business size indicators
    if (msg.includes('small business') || msg.includes('startup') || msg.includes('entrepreneur')) {
      return { intent: 'business_size_small', confidence: 0.7 };
    }
    
    if (msg.includes('enterprise') || msg.includes('corporation') || msg.includes('large company')) {
      return { intent: 'business_size_enterprise', confidence: 0.7 };
    }
    
    // Greeting patterns
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good')) {
      return { intent: 'greeting', confidence: 0.6 };
    }
    
    // Problem/pain point indicators
    if (msg.includes('problem') || msg.includes('challenge') || msg.includes('struggling') || msg.includes('difficult')) {
      return { intent: 'pain_point', confidence: 0.7 };
    }
    
    return { intent: 'general_inquiry', confidence: 0.5 };
  }

  // Business size detection
  private detectBusinessSize(message: string, context: ConversationContext): string | null {
    const msg = message.toLowerCase();
    
    if (msg.includes('small') || msg.includes('startup') || msg.includes('entrepreneur') || 
        msg.includes('1-10') || msg.includes('under 10')) {
      return 'small';
    }
    
    if (msg.includes('medium') || msg.includes('mid-size') || msg.includes('10-100') || 
        msg.includes('50-500')) {
      return 'medium';
    }
    
    if (msg.includes('large') || msg.includes('enterprise') || msg.includes('corporation') || 
        msg.includes('500+') || msg.includes('over 500')) {
      return 'enterprise';
    }
    
    return null;
  }

  // Extract pain points from user messages
  private extractPainPoints(message: string): string[] {
    const msg = message.toLowerCase();
    const painPoints: string[] = [];
    
    if (msg.includes('slow sales') || msg.includes('declining revenue') || msg.includes('low conversion')) {
      painPoints.push('declining_sales');
    }
    
    if (msg.includes('stockout') || msg.includes('out of stock') || msg.includes('inventory shortage')) {
      painPoints.push('stockouts');
    }
    
    if (msg.includes('excess inventory') || msg.includes('overstock') || msg.includes('dead stock')) {
      painPoints.push('excess_inventory');
    }
    
    if (msg.includes('manual process') || msg.includes('time consuming') || msg.includes('inefficient')) {
      painPoints.push('manual_processes');
    }
    
    if (msg.includes('customer insight') || msg.includes('understand customers') || msg.includes('customer behavior')) {
      painPoints.push('customer_insights');
    }
    
    return painPoints;
  }

  // Generate contextual response based on conversation history and intent
  public generateResponse(userMessage: string, context: ConversationContext): AgentResponse {
    const { intent, confidence } = this.detectIntent(userMessage, context);
    const businessSize = this.detectBusinessSize(userMessage, context);
    const painPoints = this.extractPainPoints(userMessage);
    
    // Update context based on detected information
    const contextUpdate: any = {};
    const userInfoUpdate: any = {};
    
    if (businessSize) {
      contextUpdate.businessSize = businessSize;
    }
    
    if (painPoints.length > 0) {
      contextUpdate.painPoints = [...(context.sessionContext?.painPoints || []), ...painPoints];
    }
    
    contextUpdate.currentTopic = intent;
    contextUpdate.userIntent = intent;
    
    // Generate response based on intent and qualification stage
    const currentStage = context.sessionContext?.qualificationStage || 'initial';
    
    return this.generateResponseByIntent(intent, confidence, currentStage, context, {
      contextUpdate,
      userInfoUpdate
    });
  }

  private generateResponseByIntent(
    intent: string, 
    confidence: number, 
    stage: string, 
    context: ConversationContext,
    updates: { contextUpdate: any; userInfoUpdate: any }
  ): AgentResponse {
    
    switch (intent) {
      case 'greeting':
        return this.handleGreeting(context, updates);
      
      case 'sales_optimization':
        return this.handleSalesOptimization(context, updates);
      
      case 'inventory_management':
        return this.handleInventoryManagement(context, updates);
      
      case 'customer_analytics':
        return this.handleCustomerAnalytics(context, updates);
      
      case 'pricing_inquiry':
        return this.handlePricingInquiry(context, updates);
      
      case 'demo_request':
        return this.handleDemoRequest(context, updates);
      
      case 'contact_sharing':
        return this.handleContactSharing(context, updates);
      
      case 'business_size_small':
      case 'business_size_enterprise':
        return this.handleBusinessSizeDiscussion(intent, context, updates);
      
      case 'pain_point':
        return this.handlePainPointDiscussion(context, updates);
      
      default:
        return this.handleGeneralInquiry(context, updates);
    }
  }

  private handleGreeting(context: ConversationContext, updates: any): AgentResponse {
    updates.contextUpdate.qualificationStage = 'needs-assessment';
    
    const userName = context.userInfo?.name;
    const greeting = userName ? `Hello ${userName}!` : "Hello there!";
    
    return {
      content: `${greeting} I'm your Motivio AI assistant, and I'm excited to help you discover how our AI-powered solutions can transform your retail business. I've helped hundreds of retailers achieve an average 40% sales increase!

To give you the most relevant information, could you tell me a bit about your business?`,
      type: 'options',
      options: [
        'Small retail business (1-10 employees)',
        'Medium business (10-100 employees)', 
        'Large enterprise (100+ employees)',
        'Just browsing for now'
      ],
      contextUpdate: updates.contextUpdate
    };
  }

  private handleSalesOptimization(context: ConversationContext, updates: any): AgentResponse {
    updates.contextUpdate.qualificationStage = 'solution-matching';
    
    const businessSize = context.sessionContext?.businessSize;
    let sizeSpecificInfo = '';
    
    if (businessSize === 'small') {
      sizeSpecificInfo = ' For small businesses like yours, we typically see 35-50% sales increases within the first 3 months.';
    } else if (businessSize === 'enterprise') {
      sizeSpecificInfo = ' For enterprise clients, our AI processes millions of data points to uncover revenue opportunities worth millions.';
    }
    
    return {
      content: `Excellent choice! Our Intelligent Sales Boosting solution is our most popular feature.${sizeSpecificInfo}

Here's how we boost your sales:
• **Hidden Revenue Discovery**: Our AI analyzes your sales data to find missed opportunities
• **Automated Strategy Generation**: Get targeted campaigns that actually work
• **Real-time Optimization**: Continuous improvement based on performance data
• **Predictive Insights**: Know what will sell before your competitors do

What's your biggest sales challenge right now?`,
      type: 'options',
      options: [
        'Seasonal sales dips',
        'Low conversion rates', 
        'Competitor pressure',
        'Customer retention',
        'Show me a demo'
      ],
      contextUpdate: updates.contextUpdate
    };
  }

  private handleInventoryManagement(context: ConversationContext, updates: any): AgentResponse {
    updates.contextUpdate.qualificationStage = 'solution-matching';
    
    return {
      content: `Smart focus on inventory! Poor inventory management costs retailers an average of 25% in lost profits. Our AI-powered inventory optimization has helped clients:

• **Reduce stockouts by 90%** - Never lose sales to empty shelves again
• **Cut excess inventory by 30%** - Free up cash flow and storage space  
• **Automate reordering** - AI predicts demand and orders automatically
• **Seasonal planning** - Perfect timing for seasonal inventory

The result? More cash flow, happier customers, and stress-free inventory management.

What's your biggest inventory headache?`,
      type: 'options',
      options: [
        'Frequent stockouts',
        'Too much dead inventory',
        'Manual reordering process',
        'Seasonal demand planning',
        'Calculate my savings'
      ],
      contextUpdate: updates.contextUpdate
    };
  }

  private handleCustomerAnalytics(context: ConversationContext, updates: any): AgentResponse {
    updates.contextUpdate.qualificationStage = 'solution-matching';
    
    return {
      content: `Perfect! Customer insights are the secret weapon of successful retailers. Our Customer Behavior Analysis is like having a crystal ball for your business:

• **200+ Data Points Per Customer** - We see patterns you never knew existed
• **Buying Behavior Prediction** - Know what customers will buy next
• **Personalization Engine** - Tailor experiences for each customer segment
• **Churn Prevention** - Identify at-risk customers before they leave
• **Lifetime Value Optimization** - Focus on your most profitable customers

One client increased their customer lifetime value by 60% in just 6 months!

What customer insights would be most valuable for your business?`,
      type: 'options',
      options: [
        'Predict customer purchases',
        'Prevent customer churn',
        'Increase customer lifetime value',
        'Personalize marketing campaigns',
        'See real examples'
      ],
      contextUpdate: updates.contextUpdate
    };
  }

  private handlePricingInquiry(context: ConversationContext, updates: any): AgentResponse {
    updates.contextUpdate.qualificationStage = 'lead-capture';
    
    const businessSize = context.sessionContext?.businessSize;
    let pricingInfo = '';
    
    if (businessSize === 'small') {
      pricingInfo = 'For small businesses, our plans start at $299/month and typically pay for themselves within 2-3 weeks through increased sales.';
    } else if (businessSize === 'enterprise') {
      pricingInfo = 'For enterprise clients, we offer custom solutions starting at $2,999/month with guaranteed ROI within 30 days.';
    } else {
      pricingInfo = 'Our pricing is designed to deliver immediate ROI, with plans ranging from $299-$2,999/month based on your business size and needs.';
    }
    
    return {
      content: `Great question! ${pricingInfo}

Here's what makes our pricing special:
• **ROI Guarantee**: Most clients see their investment returned within the first month
• **No Setup Fees**: We handle all implementation at no extra cost
• **Flexible Plans**: Scale up or down based on your business needs
• **Free Trial**: 14-day trial with full access to all features

To give you exact pricing for your situation, I'd love to understand your business better. Would you like me to calculate a personalized ROI estimate?`,
      type: 'options',
      options: [
        'Calculate my ROI',
        'See pricing plans',
        'Start free trial',
        'Schedule consultation',
        'More questions first'
      ],
      contextUpdate: updates.contextUpdate
    };
  }

  private handleDemoRequest(context: ConversationContext, updates: any): AgentResponse {
    updates.contextUpdate.qualificationStage = 'demo-scheduling';
    
    return {
      content: `Absolutely! I'd love to show you SalesAIde in action. Our personalized demos are incredibly powerful - you'll see exactly how our AI will boost your specific business.

Here's what you'll get in your 30-minute demo:
• **Live analysis** of your business type and challenges
• **Real projections** of your potential sales increase
• **Custom strategy** tailored to your goals
• **Q&A session** with our retail AI experts

To make this demo as valuable as possible, I'll need a few quick details about your business. Would you prefer to:`,
      type: 'options',
      options: [
        'Schedule demo now',
        'Fill out quick form first',
        'Call me to schedule',
        'Email me demo details',
        'More info about demo'
      ],
      contextUpdate: updates.contextUpdate
    };
  }

  private handleContactSharing(context: ConversationContext, updates: any): AgentResponse {
    updates.contextUpdate.qualificationStage = 'lead-capture';
    
    return {
      content: `Perfect! I'd love to get you connected with the right information and follow-up. 

To ensure you get the most relevant information and priority support, could you share:`,
      type: 'lead-form',
      options: [
        'Share contact info',
        'Schedule call instead',
        'Email me information',
        'Continue chatting first'
      ],
      contextUpdate: updates.contextUpdate
    };
  }

  private handleBusinessSizeDiscussion(intent: string, context: ConversationContext, updates: any): AgentResponse {
    const isSmall = intent === 'business_size_small';
    updates.contextUpdate.businessSize = isSmall ? 'small' : 'enterprise';
    updates.contextUpdate.qualificationStage = 'needs-assessment';
    
    if (isSmall) {
      return {
        content: `Perfect! Small businesses are our specialty. We've helped thousands of small retailers compete with the big players and win.

For small businesses like yours, our AI typically delivers:
• **35-50% sales increase** within 90 days
• **ROI within 2-3 weeks** of implementation  
• **Simple setup** - no technical team needed
• **Affordable pricing** starting at $299/month

What's your biggest challenge as a small retailer?`,
        type: 'options',
        options: [
          'Competing with big retailers',
          'Limited marketing budget',
          'Inventory management',
          'Understanding customers',
          'All of the above!'
        ],
        contextUpdate: updates.contextUpdate
      };
    } else {
      return {
        content: `Excellent! Enterprise clients see incredible results with SalesAIde. Our AI scales to handle millions of transactions and complex business structures.

For enterprise clients, we typically deliver:
• **$1M+ in additional revenue** within 6 months
• **25-40% improvement** in key metrics
• **Enterprise-grade security** and compliance
• **Dedicated support** and custom integrations

What's your primary focus for AI implementation?`,
        type: 'options',
        options: [
          'Revenue optimization',
          'Operational efficiency', 
          'Customer experience',
          'Competitive advantage',
          'All strategic areas'
        ],
        contextUpdate: updates.contextUpdate
      };
    }
  }

  private handlePainPointDiscussion(context: ConversationContext, updates: any): AgentResponse {
    updates.contextUpdate.qualificationStage = 'solution-matching';
    
    const painPoints = context.sessionContext?.painPoints || [];
    let response = "I understand the challenges you're facing. These are exactly the problems SalesAIde was designed to solve! ";
    
    if (painPoints.includes('declining_sales')) {
      response += "For declining sales, our AI identifies exactly why sales are dropping and creates targeted strategies to reverse the trend. ";
    }
    
    if (painPoints.includes('stockouts')) {
      response += "For stockout issues, our predictive inventory system prevents 90% of stockouts by forecasting demand accurately. ";
    }
    
    if (painPoints.includes('manual_processes')) {
      response += "For manual processes, our automation handles everything from reordering to customer segmentation. ";
    }
    
    response += "\nWhich of these solutions would have the biggest impact on your business?";
    
    return {
      content: response,
      type: 'options',
      options: [
        'Sales recovery strategies',
        'Inventory automation',
        'Customer insights',
        'Process automation',
        'Show me everything'
      ],
      contextUpdate: updates.contextUpdate
    };
  }

  private handleGeneralInquiry(context: ConversationContext, updates: any): AgentResponse {
    const stage = context.sessionContext?.qualificationStage || 'initial';
    
    if (stage === 'initial') {
      updates.contextUpdate.qualificationStage = 'needs-assessment';
    }
    
    return {
      content: `That's a great question! SalesAIde is the leading AI platform for retail businesses, helping you boost sales, optimize inventory, and understand customers better.

Here's what makes us special:
• **Proven Results**: Average 40% sales increase for our clients
• **Complete Solution**: Sales, inventory, and customer analytics in one platform
• **Easy Implementation**: Up and running in 24 hours
• **ROI Guarantee**: See results within 30 days or money back

What aspect of your retail business would you most like to improve?`,
      type: 'options',
      options: [
        'Increase sales revenue',
        'Optimize inventory',
        'Understand customers better',
        'Automate processes',
        'See pricing and plans'
      ],
      contextUpdate: updates.contextUpdate
    };
  }
}
