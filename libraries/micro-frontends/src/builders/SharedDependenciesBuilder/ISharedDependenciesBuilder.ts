export default interface ISharedDependencyBlock {
  /** The shared module will be placed under this name in the share scope */
  shareKey?: string;

  /** Share scope with this name will be used */
  shareScope?: string;

  /** Whether only a single version of the shared module is allowed */
  singleton?: boolean;

  /** This hint allows webpack to reject the shared module if version is not valid */
  strictVersion: boolean;

  /** The required version of the shared module */
  requiredVersion: string;

  /** The option to load the shared module eagerly */
  eager?: boolean;
}
