import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from '@/lib/utils';

interface SidebarProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title, children, className }) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside className={cn("w-full md:w-64 lg:w-72 h-full border-r border-border bg-card p-4 space-y-4 hidden md:block", className)}>
      {title && (
        <>
          <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
          <Separator className="my-3" />
        </>
      )}
      <ScrollArea className="h-[calc(100vh-10rem)]"> {/* Adjust height based on surrounding layout */}
        <div className="space-y-6 pr-3">
          {children}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;