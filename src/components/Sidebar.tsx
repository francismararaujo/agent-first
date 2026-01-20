import { useState } from "react";
import { Plus, MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { predefinedChats } from "@/data/predefinedChats";

interface Conversation {
  id: string;
  title: string;
}

interface SidebarProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onPredefinedSelect: (id: string) => void;
}

const Sidebar = ({ conversations, activeId, onSelect, onNew, onPredefinedSelect }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-3">
          <Button
            onClick={() => {
              onNew();
              setIsOpen(false);
            }}
            variant="outline"
            className="w-full justify-start gap-2 bg-sidebar hover:bg-sidebar-accent"
          >
            <Plus className="h-4 w-4" />
            Novo chat
          </Button>
        </div>

        {/* Predefined Menus */}
        <div className="px-2 pb-2">
          <div className="text-xs font-medium text-muted-foreground px-3 py-2">
            Menu Principal
          </div>
          <div className="space-y-1">
            {predefinedChats.map((chat) => {
              const Icon = chat.icon;
              return (
                <button
                  key={chat.id}
                  onClick={() => {
                    onPredefinedSelect(chat.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    "hover:bg-sidebar-accent",
                    activeId === chat.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{chat.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="px-4 py-2">
          <div className="border-t border-sidebar-border" />
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto px-2">
          {conversations.length > 0 && (
            <>
              <div className="text-xs font-medium text-muted-foreground px-3 py-2">
                Histórico
              </div>
              <div className="space-y-1">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => {
                      onSelect(conv.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors",
                      "hover:bg-sidebar-accent",
                      activeId === conv.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      <span className="truncate">{conv.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              U
            </div>
            <span className="text-sm text-sidebar-foreground">Usuário</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
