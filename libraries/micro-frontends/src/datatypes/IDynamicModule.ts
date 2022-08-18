export interface IDynamicModule<T> {
  /**
   * We use this method to mount the Micro Frontends.
   * It requires an `element` which the mfe will use to "mount" its own HTML.
   * And a series of options defined in `IMountOptions`.
   * It is generic, so you will need to use mount<T> to cast the proper inputState.
   * @example
   * mount<IWebAppInput>(reactRef, { inputState, observable })
   */
  mount: (el: Element | null) => () => void;
}
