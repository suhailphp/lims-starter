import { type ReactNode } from "react";
import { useDropdown } from "../../hooks/useDropdown";

const INTERNAL_ID = "dd";

export type DropdownMenuProps = {
  trigger: ReactNode;
  triggerClassName: string;
  menuClassName?: string;
  align?: "right" | "left";
  ariaLabel?: string;
  children: ReactNode;
  /** Extra classes on the outer wrapper (e.g. header-item) */
  className?: string;
  /**
   * When true (default), choosing a link or button inside the panel closes the menu.
   * Set false for panels with in-menu tab toggles (e.g. All / Unread).
   */
  closeOnMenuInteract?: boolean;
};

export function DropdownMenu({
  trigger,
  triggerClassName,
  menuClassName,
  align = "right",
  ariaLabel = "Dropdown",
  children,
  className = "",
  closeOnMenuInteract = true,
}: DropdownMenuProps) {
  const { toggle, isOpen, containerRef, close } = useDropdown();
  const alignClass = align === "right" ? "right-0" : "left-0";
  const defaultMenuClass = `absolute ${alignClass} top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-9`;

  const open = isOpen(INTERNAL_ID);

  return (
    <div
      ref={containerRef}
      className={["relative", "inline-flex", className].filter(Boolean).join(" ")}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggle(INTERNAL_ID);
        }}
        className={triggerClassName}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        {trigger}
      </button>
      {open && (
        <div
          className={menuClassName ?? defaultMenuClass}
          role="menu"
          aria-orientation="vertical"
          onClick={(e) => {
            if (!closeOnMenuInteract) return;
            const t = e.target as HTMLElement;
            const interactive = t.closest("a[href], button");
            if (!interactive) return;
            queueMicrotask(() => close());
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
