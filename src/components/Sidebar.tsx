import { useState } from "react";
import { Menu, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { predefinedChats } from "@/data/predefinedChats";

interface SidebarProps {
  activeId?: string;
  onPredefinedSelect: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ activeId, onPredefinedSelect, isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Toggle button - always visible */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50"
        onClick={onToggle}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header spacer for toggle button */}
        <div className="h-14" />

        {/* Predefined Menus */}
        <div className="flex-1 px-2">
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
                    onToggle();
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

        {/* Logo Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">AgentFirst</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
