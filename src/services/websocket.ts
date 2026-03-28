import { WS_EVENTS } from '@/utils/constants';

type EventHandler = (data: unknown) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private listeners: Map<string, Set<EventHandler>> = new Map();
  private isConnected = false;

  constructor() {
    this.url = process.env.NEXT_PUBLIC_WS_URL || '';
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected && this.ws) {
        resolve();
        return;
      }

      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          this.isConnected = true;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const { type, data } = JSON.parse(event.data);
            this.emit(type, data);
          } catch (error) {
            console.error('[WS Parse Error]', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[WS Error]', error);
          reject(error);
        };

        this.ws.onclose = () => {
          this.isConnected = false;
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.isConnected = false;
    }
  }

  on(event: string, handler: EventHandler): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(handler);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(handler);
    };
  }

  private emit(event: string, data: unknown): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  send(event: string, data: unknown): void {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify({ type: event, data }));
    }
  }
}

export const wsService = new WebSocketService();
