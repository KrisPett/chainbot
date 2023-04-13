export declare global {
  interface Window {
    ethereum: Metamask;
  }
}

interface Metamask {
  isMetaMask: boolean;
  chainId: string;
  selectedAddress: string;
  enable(): Promise<unknown>;
  sendAsync(request: { method: string; params?: unknown[] }, callback: (error: Error | null, response: unknown) => void): void;
  send(request: { method: string; params?: unknown[] }, callback: (error: Error | null, response: unknown) => void): void;
  networkVersion: string;
  request(request: { method: string; params?: unknown[] }): Promise<unknown>;
  on(event: string, callback: (result: unknown) => void): void;
  isConnected(): boolean;
}
