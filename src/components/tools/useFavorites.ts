"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "dnw:favorite-tools";
const EVENT = "dnw:favorites-changed";
const EMPTY: string[] = [];

// Cache the parsed value so getSnapshot can return a stable reference between
// renders (required by useSyncExternalStore to avoid render loops).
let cacheRaw: string | null = null;
let cacheParsed: string[] = EMPTY;

function parse(raw: string): string[] {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(STORAGE_KEY) ?? "";
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    cacheParsed = raw ? parse(raw) : EMPTY;
  }
  return cacheParsed;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

function write(next: string[]): void {
  const raw = JSON.stringify(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // storage may be unavailable (private mode, quota) — ignore.
  }
  // Prime the cache so the next snapshot is stable, then notify this tab.
  cacheRaw = raw;
  cacheParsed = next;
  window.dispatchEvent(new Event(EVENT));
}

export interface UseFavorites {
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggle: (slug: string) => void;
}

/**
 * Persist favorite tool slugs in localStorage via useSyncExternalStore — the
 * React-recommended way to read from an external store while staying
 * SSR-safe and synced across browser tabs.
 */
export function useFavorites(): UseFavorites {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    write(
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug]
    );
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  return { favorites, isFavorite, toggle };
}
