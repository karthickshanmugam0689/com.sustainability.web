import { useEffect, useMemo, useRef } from 'react';

import { dynamicImport } from '../../helpers';
import type { IGenericMicroFrontend } from './IGenericMicrofrontend';

const remoteEntries: Record<string, (el: Element | null) => () => void> = {};

export const GenericMicroFrontend = (props: IGenericMicroFrontend): JSX.Element => {
  const { applicationName } = props;

  const ref = useRef(null);

  useEffect(() => {
    let cleanUp: () => void;

    const mountMfe = async () => {
      if (!remoteEntries[applicationName]) {
        const { mount } = await dynamicImport(applicationName);
        console.log('hiii');
        remoteEntries[applicationName] = mount;
      }

      cleanUp = remoteEntries[applicationName](ref.current);
    };

    mountMfe();

    return () => {
      // Execute the cleanup aka unmounting
      if (typeof cleanUp === 'function') {
        cleanUp();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} id={`${applicationName}-container`} />;
};
