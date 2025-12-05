// src/components/documentation/SidebarWidget.tsx
import React from "react";

interface SidebarWidgetProps {
  title?: string;
  icon?: React.ReactNode;
  /** Extra classes for the outer card if needed */
  className?: string;
  children: React.ReactNode;
}

export function SidebarWidget({
  title,
  icon,
  className = "",
  children,
}: SidebarWidgetProps) {
  return (
    <section
      className={
        "rounded-lg border border-border bg-card p-4 sm:p-5 shadow-sm " +
        className
      }
    >
      {(title || icon) && (
        <div className="mb-3 sm:mb-4 flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 shrink-0">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              {title}
            </h3>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
