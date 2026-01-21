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
  }
}
