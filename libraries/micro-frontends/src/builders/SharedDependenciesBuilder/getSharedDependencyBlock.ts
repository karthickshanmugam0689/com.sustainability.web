import type ISharedDependenciesBuilder from './ISharedDependenciesBuilder';

/**
 * Gets a shared dependency block.
 * @param param.dependencyName Name of the library.
 * @param param.singleton Whether is a singleton or not.
 * @param param.version Required version.
 * @returns The shared dependency block.
 */
export function getSharedDependencyBlock({
  dependencyName,
  singleton = false,
  version,
}: {
  dependencyName: string;
  singleton: boolean;
  version: string;
}): { [key: string]: ISharedDependenciesBuilder } {
  const dependencyBlock: ISharedDependenciesBuilder = {
    strictVersion: true,
    requiredVersion: version,
  };

  if (singleton) {
    dependencyBlock.singleton = true;
  }

  return { [dependencyName]: dependencyBlock };
}
