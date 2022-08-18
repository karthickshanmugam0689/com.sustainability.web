import type ISharedDependenciesBuilder from './ISharedDependenciesBuilder';
import { getSharedDependencyBlock } from './getSharedDependencyBlock';

type SharedDependenciesBuilderOptions = {
  /** Styled components is not explicit in the package.json; if true, adds it into the share block */
  usesStyledComponents: boolean;
};

export class SharedDependenciesBuilder {
  /**
   * This whitelist contains which libraries we know should be singletons if we include
   * them as part of our shared dependencies group.
   */
  private readonly SINGLETON_WHITELIST = ['react', 'react-dom', 'react-router-dom', 'styled-components'];

  /** List of dependencies, as they appear in the package.json */
  private _dependencies: { [key: string]: string };

  /** Expression to filter out dependencies names */
  private _exclude: RegExp | null;

  /** Set of additional options */
  private _options: SharedDependenciesBuilderOptions;

  /**
   * Creates a new instance of Shared Dependencies.
   * @param params.dependencies List of dependencies, as they appear in the package.json.
   * @param params.exclude String which will be converted into a RegExp, to filter out dependencies names.
   * @param params.options Set of additional options.
   */
  public constructor({
    dependencies,
    exclude,
    options,
  }: {
    dependencies: { [key: string]: string };
    exclude?: string;
    options?: SharedDependenciesBuilderOptions;
  }) {
    this._dependencies = dependencies;
    this._exclude = exclude ? new RegExp(exclude) : null;
    this._options = options ?? {
      usesStyledComponents: true,
    };
  }

  /**
   * Builds the shared dependencies block.
   * @returns A group of shared dependencies.
   */
  public build(): Record<string, ISharedDependenciesBuilder> {
    // Goes through every entry and creates a new shared dependency block
    const sharedDependencies: Record<string, ISharedDependenciesBuilder> = Object.entries(this._dependencies).reduce(
      (accum, entry) => {
        const [name, version] = entry;

        // Filter out excluded name
        if (this._exclude && name.match(this._exclude)) {
          return accum;
        }

        // Add it into the list
        accum = {
          ...accum,
          ...getSharedDependencyBlock({
            dependencyName: name,
            singleton: this.isSingleton(name),
            version,
          }),
        };
        return accum;
      },
      {}
    );

    // Adds into the shared dependencies the styled components
    if (this._options.usesStyledComponents) {
      // TODO: Actually, we should use styled-components defined in package.json
      // as it is right now, we depend on the babel plugin for it
      sharedDependencies['styled-components'] = {
        singleton: true,
        strictVersion: true,
        requiredVersion: '5.3.0',
      } as ISharedDependenciesBuilder;
    }

    return sharedDependencies;
  }

  /**
   * Checks that the library name is in our singleton list.
   * @param name Library name.
   * @returns Whether should be a singleton or not.
   */
  private isSingleton(name: string): boolean {
    return this.SINGLETON_WHITELIST.includes(name);
  }
}
