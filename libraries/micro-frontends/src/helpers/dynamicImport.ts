import type { IDynamicModule } from './../datatypes/IDynamicModule';

declare global {
  interface Window {
    [key: string]: {
      init: (scopes: unknown) => Promise<unknown>;
      get: (component: string) => Promise<unknown>;
    };
    __remotes__: Record<string, string>;
  }

  const __webpack_share_scopes__: {
    default: string;
  };
  const __webpack_init_sharing__: (scope: string) => unknown;
}

export async function dynamicImport<T>(path: string): Promise<IDynamicModule<T>> {
  // Based from https://github.com/webpack/webpack/issues/11033#issuecomment-834559345
  // eslint-disable-next-line no-restricted-globals
  const remote = Object.entries(window.__remotes__).find(([key]) => path.startsWith(key));

  console.log(remote);
  if (!remote) {
    throw new Error(`URL not configured for remote ${path}`);
  }

  const [remoteName, remoteUrl] = remote;

  if (!remoteName) {
    throw new Error(`URL not configured for remote '${path}'.`);
  }
  if (!remoteUrl) {
    throw new Error(`URL misconfigured for remote '${path}'`);
  }

  await __webpack_init_sharing__('default');

  await new Promise<void>((resolve, reject) => {
    // eslint-disable-next-line no-restricted-globals
    const element = document.createElement('script');

    element.src = remoteUrl + '/remoteEntry.js';
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      element.parentElement?.removeChild(element);
      resolve();
    };

    element.onerror = err => {
      element.parentElement?.removeChild(element);
      reject(err);
    };

    // eslint-disable-next-line no-restricted-globals
    document.head.appendChild(element);
  });

  // eslint-disable-next-line no-restricted-globals
  const container = window[remoteName];
  await container.init(__webpack_share_scopes__.default);

  const component = `./${path}`;
  const factory = (await container.get(component)) as () => IDynamicModule<T>;

  return factory();
}
