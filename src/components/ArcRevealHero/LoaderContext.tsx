"use client";

import * as React from "react";

export interface LoaderRevealState {
  isRevealed: boolean;
}

export const LoaderRevealContext = React.createContext<LoaderRevealState>({
  isRevealed: true,
});

export function useLoaderReveal(): boolean {
  return React.useContext(LoaderRevealContext).isRevealed;
}