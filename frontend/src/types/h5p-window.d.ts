export {};

declare global {
  interface Window {
    H5PIntegration?: {
      contents?: Record<
        string,
        {
          // das ist das, was du in deinem Code ausliest:
          contentUserData?: JSON;
        }
      >;
    };
  }
}
