export type TaskOpenArgs<
  USE_TASK extends () => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    open: (..._args: any[]) => void;
  },
> = Parameters<ReturnType<USE_TASK>["open"]>;
