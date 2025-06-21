import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { SimpleChatContainer } from "@/components/chat/SimpleChatContainer";
import Home from "@/pages/home";
import Solutions from "@/pages/solutions";
import HowItWorks from "@/pages/how-it-works";
import WhyChooseUs from "@/pages/why-choose-us";
import ContactUs from "@/pages/contact-us";
import ChatTest from "@/pages/chat-test";
import ChatDemo from "@/pages/chat-demo";
import ChatSimpleTest from "@/pages/chat-simple-test";
import ParallaxTest from "@/pages/parallax-test";
import { AITestPage } from "@/pages/AITestPage";
import { QuickAITest } from "@/pages/QuickAITest";
import ChatTestWithLogs from "@/pages/ChatTestWithLogs";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/why-choose-us" component={WhyChooseUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/chat-test" component={ChatTest} />
      <Route path="/chat-demo" component={ChatDemo} />
      <Route path="/chat-simple-test" component={ChatSimpleTest} />
      <Route path="/parallax-test" component={ParallaxTest} />
      <Route path="/ai-test" component={AITestPage} />
      <Route path="/quick-ai-test" component={QuickAITest} />
      <Route path="/chat-test-logs" component={ChatTestWithLogs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <SimpleChatContainer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
