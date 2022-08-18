declare global {
  interface Window {
    __remotes__: Record<string, string>;
  }
}

export default global;
