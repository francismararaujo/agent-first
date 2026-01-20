import { Sparkles } from "lucide-react";

const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-semibold text-foreground mb-2">
        Como posso ajudar você hoje?
      </h1>
      <p className="text-muted-foreground text-center max-w-md">
        Sou o Agent First, seu assistente inteligente. Pergunte qualquer coisa sobre negócios, tecnologia, produtividade e muito mais.
      </p>
    </div>
  );
};

export default WelcomeScreen;
