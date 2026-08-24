"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; onError: () => void };
type State = { hasError: boolean };

/**
 * Three.js/WebGL context-creation and shader-compile failures throw during
 * render, which a DOM error handler can't catch — only a React error
 * boundary can. Falls back silently; StudioFallback stays visible behind it.
 */
export class StudioErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
