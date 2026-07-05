
"use client";

import { Component } from "react";
import type { ReactNode } from "react";

interface State {
  hasError: boolean;
}

export class SilentBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}