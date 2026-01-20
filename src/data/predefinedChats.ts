import { Info, Bot, GraduationCap, DollarSign } from "lucide-react";

export interface PredefinedChat {
  id: string;
  title: string;
  icon: typeof Info;
  initialMessage: string;
}

export const predefinedChats: PredefinedChat[] = [
  {
    id: "sobre",
    title: "Sobre",
    icon: Info,
    initialMessage: `# Bem-vindo à Agent First! 🚀

Somos uma startup inovadora focada em um **ecossistema de agentes inteligentes** que resolvem problemas reais do dia a dia.

## Nossa Missão
Acreditamos que o futuro é **Agent First** - onde agentes de IA trabalham lado a lado com humanos para automatizar tarefas, tomar decisões mais inteligentes e liberar seu tempo para o que realmente importa.

## O que fazemos?
- 🤖 **Desenvolvemos agentes especializados** para diferentes necessidades
- 🏢 **Atendemos pessoas e empresas** de todos os tamanhos
- 🔗 **Integramos com as principais plataformas** do mercado
- 📚 **Educamos sobre o futuro da IA** e agentes inteligentes

## Nossa Visão
Criar um mundo onde cada pessoa e empresa tenha acesso a um exército de agentes trabalhando 24/7 para resolver seus problemas.

---

**Tem alguma pergunta sobre a Agent First?** Fique à vontade para perguntar qualquer coisa sobre nossa empresa, história, valores ou tecnologia!`,
  },
  {
    id: "agents",
    title: "Agents",
    icon: Bot,
    initialMessage: `# Nossos Agentes 🤖

Na Agent First, desenvolvemos agentes inteligentes para duas categorias principais:

---

## 👤 Agents Pessoais (Personal)
Agentes criados para facilitar sua vida pessoal:
- **Agent Finance** - Gerencia suas finanças pessoais
- **Agent Health** - Acompanha sua saúde e bem-estar
- **Agent Productivity** - Organiza sua rotina e tarefas

---

## 🏢 Agents Empresariais (Business)
Agentes desenvolvidos para otimizar operações empresariais:

### 📦 Agent Stock
*Especialista em Estoque*
- Controle automático de inventário
- Previsão de demanda
- Alertas de reposição inteligentes
- Relatórios em tempo real

### 🔗 Agent Integration
*Mestre das Integrações*
- Conexão com **iFood**, **99Food**, **Shopee**
- Sincronização de pedidos
- Unificação de canais de venda
- Automação de processos multicanal

### 📊 Agent Analytics
*Cientista de Dados*
- Dashboards personalizados
- Insights de negócio
- Previsões de tendências

### 💬 Agent Support
*Atendimento Inteligente*
- Suporte ao cliente 24/7
- Respostas automatizadas
- Escalação inteligente

---

**Quer saber mais sobre algum agente específico?** Pergunte-me sobre funcionalidades, integrações ou casos de uso!`,
  },
  {
    id: "aprenda",
    title: "Aprenda",
    icon: GraduationCap,
    initialMessage: `# Centro de Aprendizado Agent First 📚

Olá! Sou o **Agente Professor**, especializado em ensinar tudo sobre a Agent First e o mundo dos agentes inteligentes.

---

## 🎓 O que você pode aprender aqui?

### Cursos Disponíveis

**1. Fundamentos Agent First** ⭐ Iniciante
- O que são agentes inteligentes?
- Como a IA está transformando negócios
- Conceitos básicos de automação

**2. Implementando Agentes no seu Negócio** 📈 Intermediário
- Como escolher os agentes certos
- Integração com sistemas existentes
- Melhores práticas de implementação

**3. Maximizando ROI com Agentes** 💰 Avançado
- Métricas e KPIs importantes
- Otimização de processos
- Escalando operações com IA

**4. Workshop: Agent Integration** 🔧 Prático
- Integrando com iFood, Shopee e mais
- Configurações avançadas
- Troubleshooting comum

---

## 📖 Recursos Gratuitos
- E-books sobre automação
- Webinars semanais
- Comunidade de usuários
- Suporte técnico dedicado

---

**Por onde gostaria de começar?** Posso te ajudar a escolher o melhor caminho de aprendizado para seus objetivos!`,
  },
  {
    id: "precos",
    title: "Preços",
    icon: DollarSign,
    initialMessage: `# Planos e Preços 💎

Olá! Sou o **Agente Comercial**, especializado em ajudar você a encontrar o plano perfeito para suas necessidades.

---

## 🆓 Plano Starter (Gratuito)
*Perfeito para conhecer a plataforma*
- 1 Agente pessoal básico
- 100 interações/mês
- Suporte por email
- Acesso à comunidade

---

## ⭐ Plano Pro - R$ 97/mês
*Ideal para profissionais e pequenos negócios*
- 3 Agentes à escolha
- 1.000 interações/mês
- Agent Stock básico
- Suporte prioritário
- Integrações básicas

---

## 🚀 Plano Business - R$ 297/mês
*Para empresas em crescimento*
- 10 Agentes ilimitados
- Interações ilimitadas
- Agent Integration completo
- Todas as integrações (iFood, Shopee, etc)
- Suporte 24/7
- Dashboard analytics

---

## 🏢 Plano Enterprise - Sob consulta
*Soluções personalizadas*
- Agentes customizados
- SLA garantido
- Gerente de conta dedicado
- Treinamento da equipe
- API completa
- White-label disponível

---

## 💡 Perguntas Frequentes

**Posso trocar de plano?** Sim, a qualquer momento!

**Tem desconto anual?** 20% de desconto pagando anualmente.

**Qual plano é ideal para mim?** Me conte sobre seu negócio e te ajudo a escolher!

---

**Tem alguma dúvida sobre os planos?** Pergunte-me qualquer coisa sobre preços, funcionalidades ou condições especiais!`,
  },
];
