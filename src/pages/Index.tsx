import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import WelcomeScreen from "@/components/WelcomeScreen";
import { predefinedChats } from "@/data/predefinedChats";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  isPredefined?: boolean;
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

  const handlePredefinedSelect = (predefinedId: string) => {
    // Check if this predefined chat already exists
    const existingConv = conversations.find((c) => c.id === predefinedId);
    
    if (existingConv) {
      setActiveConversationId(predefinedId);
      return;
    }

    // Get the predefined chat data
    const predefinedChat = predefinedChats.find((c) => c.id === predefinedId);
    if (!predefinedChat) return;

    // Create new conversation with the initial message from the bot
    const initialMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: predefinedChat.initialMessage,
    };

    const newConversation: Conversation = {
      id: predefinedId,
      title: predefinedChat.title,
      messages: [initialMessage],
      isPredefined: true,
    };

    setConversations((prev) => [...prev, newConversation]);
    setActiveConversationId(predefinedId);
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

    // Get context for response based on conversation type
    const currentConv = conversations.find((c) => c.id === conversationId);
    const isPredefined = currentConv?.isPredefined || predefinedChats.some((p) => p.id === conversationId);
    const predefinedType = predefinedChats.find((p) => p.id === conversationId);

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      let responseContent = "";

      if (predefinedType?.id === "sobre") {
        responseContent = getAboutResponse(content);
      } else if (predefinedType?.id === "agents") {
        responseContent = getAgentsResponse(content);
      } else if (predefinedType?.id === "aprenda") {
        responseContent = getLearnResponse(content);
      } else if (predefinedType?.id === "precos") {
        responseContent = getPricingResponse(content);
      } else {
        responseContent = getGeneralResponse(content);
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: responseContent,
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

  // Filter out predefined chats from history
  const historyConversations = conversations.filter((c) => !c.isPredefined);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        conversations={historyConversations.map((c) => ({ id: c.id, title: c.title }))}
        activeId={activeConversationId ?? undefined}
        onSelect={setActiveConversationId}
        onNew={createNewConversation}
        onPredefinedSelect={handlePredefinedSelect}
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
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
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

// Response generators for different contexts
function getAboutResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes("fundador") || q.includes("quem criou") || q.includes("história")) {
    return `## Nossa História 📖

A Agent First nasceu da visão de que o futuro pertence aos agentes inteligentes. Fundada em 2024, nossa missão é democratizar o acesso à IA através de agentes especializados.

**Nossa equipe** é formada por especialistas em IA, engenharia de software e experiência do usuário, todos unidos pela paixão de criar agentes que realmente fazem a diferença.

Alguma outra pergunta sobre nossa história?`;
  }
  
  if (q.includes("contato") || q.includes("falar") || q.includes("email")) {
    return `## Entre em Contato 📧

Adoramos ouvir nossos usuários! Aqui estão as formas de nos contatar:

- **Email:** contato@agentfirst.com
- **Suporte:** suporte@agentfirst.com
- **Comercial:** vendas@agentfirst.com

Também estamos nas redes sociais! O que mais posso ajudar?`;
  }

  return `Ótima pergunta! 🤔

Sobre "${question.slice(0, 50)}..." - posso te contar mais sobre:

- **Nossa missão** e valores
- **Como funcionam** nossos agentes
- **Cases de sucesso** de clientes
- **Nossa tecnologia** por trás dos agentes

O que te interessa mais?`;
}

function getAgentsResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes("stock") || q.includes("estoque")) {
    return `## Agent Stock - Detalhes 📦

O **Agent Stock** é nosso especialista em gestão de estoque inteligente!

### Funcionalidades:
- ✅ Monitoramento em tempo real
- ✅ Alertas de estoque baixo
- ✅ Previsão de demanda com IA
- ✅ Sugestões automáticas de compra
- ✅ Integração com fornecedores
- ✅ Relatórios detalhados

### Integrações:
- ERPs principais do mercado
- E-commerces
- Marketplaces

**Quer ver uma demonstração ou saber sobre preços?**`;
  }
  
  if (q.includes("integration") || q.includes("integração") || q.includes("ifood") || q.includes("shopee")) {
    return `## Agent Integration - Detalhes 🔗

O **Agent Integration** conecta seu negócio a todas as plataformas!

### Plataformas Suportadas:
- 🍕 **iFood** - Gestão completa de pedidos
- 🛵 **99Food** - Sincronização automática
- 🛒 **Shopee** - Gestão de marketplace
- 📦 **Mercado Livre** - Integração completa
- 🛍️ **Magazine Luiza** - Em breve!

### O que ele faz:
- Unifica todos os pedidos em um só lugar
- Atualiza estoque automaticamente
- Sincroniza preços entre plataformas
- Gera relatórios unificados

**Qual plataforma você usa atualmente?**`;
  }

  return `Posso te dar mais detalhes sobre qualquer agente! 🤖

Me diga qual te interessou mais:
- **Agent Stock** - Gestão de estoque
- **Agent Integration** - Integrações
- **Agent Analytics** - Análise de dados
- **Agent Support** - Atendimento ao cliente

Ou se preferir, posso explicar a diferença entre agentes **pessoais** e **empresariais**!`;
}

function getLearnResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes("curso") || q.includes("começar") || q.includes("iniciante")) {
    return `## Recomendação para Iniciantes 🎯

Recomendo começar pelo curso **"Fundamentos Agent First"**!

### O que você vai aprender:
1. O que são agentes de IA
2. Como eles podem ajudar no dia a dia
3. Casos práticos de uso
4. Como configurar seu primeiro agente

### Detalhes:
- ⏱️ **Duração:** 2 horas
- 📱 **Formato:** Vídeo + Material complementar
- 🎓 **Certificado:** Sim!
- 💰 **Preço:** Gratuito

**Quer que eu te inscreva?**`;
  }

  return `Fico feliz em te ajudar a aprender! 📚

Temos conteúdos para todos os níveis:

🌱 **Iniciante** - Fundamentos e conceitos básicos
📈 **Intermediário** - Implementação prática
🚀 **Avançado** - Otimização e escala

Também oferecemos:
- Webinars semanais
- Comunidade no Discord
- Mentoria individual (planos Pro+)

**Por qual nível gostaria de começar?**`;
}

function getPricingResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes("grátis") || q.includes("free") || q.includes("gratuito")) {
    return `## Plano Starter (Gratuito) 🆓

Perfeito para começar!

### Inclui:
- 1 Agente pessoal básico
- 100 interações por mês
- Suporte por email
- Acesso à comunidade
- Materiais educativos

### Limitações:
- Sem agentes empresariais
- Sem integrações avançadas
- Suporte em até 48h

**É uma ótima forma de conhecer a plataforma!** Quer criar sua conta gratuita?`;
  }
  
  if (q.includes("empresa") || q.includes("business") || q.includes("negócio")) {
    return `## Planos Empresariais 🏢

Para empresas, recomendo:

### Plano Business - R$ 297/mês
- 10 Agentes
- Agent Integration completo
- Todas as integrações
- Suporte 24/7

### Plano Enterprise - Sob consulta
- Agentes ilimitados e customizados
- SLA garantido
- Gerente dedicado
- White-label

**Qual o tamanho da sua empresa? Posso recomendar o plano ideal!**`;
  }

  return `Posso te ajudar a escolher o plano perfeito! 💎

Me conta um pouco:
- É para uso **pessoal** ou **empresarial**?
- Quantos **agentes** você precisaria?
- Precisa de **integrações** específicas?

Com essas informações, consigo recomendar o melhor custo-benefício pra você!`;
}

function getGeneralResponse(content: string): string {
  return `Entendi sua pergunta sobre "${content.slice(0, 30)}..."! 🤔

Sou o assistente da **Agent First** e posso te ajudar com:

- 📖 **Sobre** - Conhecer nossa empresa
- 🤖 **Agents** - Explorar nossos agentes
- 📚 **Aprenda** - Cursos e materiais
- 💰 **Preços** - Planos e valores

Use o menu lateral para navegar ou continue conversando aqui!

Como posso te ajudar?`;
}

export default Index;
