import { createContext } from "react";

export const LoaderContext = createContext({
  appReady: false,
  setAppReady: (ready: boolean) => {},
});
