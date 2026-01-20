import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import WelcomeScreen from "@/components/WelcomeScreen";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const createNewConversation = () => {
    setActiveConversationId(null);
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    let conversationId = activeConversationId;

    if (!conversationId) {
      // Create new conversation
      conversationId = crypto.randomUUID();
      const newConversation: Conversation = {
        id: conversationId,
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        messages: [userMessage],
      };
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(conversationId);
    } else {
      // Add to existing conversation
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? { ...c, messages: [...c.messages, userMessage] }
            : c
        )
      );
    }

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Olá! Sou o Agent First, o assistente da sua nova startup. 

Você está construindo algo incrível com o conceito "Agent First" - um ecossistema onde agentes inteligentes resolvem problemas reais para pessoas e empresas.

Alguns caminhos para construir essa startup:

1. **Definir os primeiros agentes** - Quais problemas específicos você quer resolver primeiro?
2. **Arquitetura do ecossistema** - Como os agentes vão se comunicar e colaborar?
3. **Modelo de negócio** - Freemium, enterprise, marketplace de agentes?
4. **MVP** - Começar com 1-2 agentes muito bem feitos

Como posso ajudar você a avançar?`,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? { ...c, messages: [...c.messages, assistantMessage] }
            : c
        )
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        conversations={conversations.map((c) => ({ id: c.id, title: c.title }))}
        activeId={activeConversationId ?? undefined}
        onSelect={setActiveConversationId}
        onNew={createNewConversation}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center justify-center px-4">
          <h1 className="text-lg font-semibold">Agent First</h1>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="pb-32">
              {activeConversation.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && (
                <div className="py-6 bg-muted/30">
                  <div className="max-w-3xl mx-auto px-4 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">
                      A
                    </div>
                    <div className="flex items-center gap-1 pt-2">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="absolute bottom-0 left-0 md:left-64 right-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-4">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
