export {};

declare global {
  interface Window {
    H5PIntegration?: {
      contents?: Record<
        string,
        {
          contentUserData?: {
            dataType: string;
            state?: string;
          };
        }
      >;
    };
    H5P?: {
      externalDispatcher?: {
        on: (eventName: string, handler: (event: unknown) => void) => void;
        off?: (eventName: string, handler: (event: unknown) => void) => void;
      };
    };
  }
}
