"use client";

import React, { useState } from "react";

type TopBarProps = {
  onSearch: (query: string) => void;
  search: string;
  isLoading: boolean;
};

export function TopBar({ onSearch, search, isLoading }: TopBarProps) {
  const [localValue, setLocalValue] = useState(search);

  // Debounce input
  React.useEffect(() => setLocalValue(search), [search]);

  return (
    <header className="w-full border-b border-border bg-surface px-6 py-4 flex items-center justify-between">
      <div className="flex-1 flex items-center">
        <input
          className="w-full max-w-lg px-3 py-2 rounded border border-accent bg-background text-secondary focus:outline-accent transition placeholder:text-secondary/40"
          type="text"
          placeholder="Search notes..."
          value={localValue}
          onChange={(e) => {
            setLocalValue(e.target.value);
            onSearch(e.target.value);
          }}
          disabled={isLoading}
        />
      </div>
      <div className="pl-6 text-accent font-semibold tracking-wide text-lg">
        Notes App
      </div>
    </header>
  );
}
