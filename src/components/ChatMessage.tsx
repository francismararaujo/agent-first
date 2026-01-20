import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className={cn("py-6", role === "user" ? "bg-background" : "bg-muted/30")}>
      <div className="max-w-3xl mx-auto px-4 flex gap-4">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
            role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-emerald-500 text-white"
          )}
        >
          {role === "user" ? "V" : "A"}
        </div>
        <div className="flex-1 space-y-2 pt-1">
          <p className="text-sm font-semibold">
            {role === "user" ? "Você" : "Agent First"}
          </p>
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
