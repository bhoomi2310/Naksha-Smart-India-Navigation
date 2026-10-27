import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
          <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black">Something went wrong</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              The page encountered an unexpected rendering error. Please reload to restore your view.
            </p>
            <Button
              onClick={this.handleReset}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl px-6 py-2.5 text-xs shadow-md shadow-orange-600/30"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
