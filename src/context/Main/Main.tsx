import { createContext, type FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import type { IMainContext } from './Main.d';

export const MainContext = createContext<undefined | IMainContext>(undefined);

export const MainProvider: FunctionComponent = ({ children }) => {
  const [watchVideoNode, setWatchVideoNode] = useState<IMainContext['watchVideoNode']>();
  const [videoNode, setVideoNode] = useState<IMainContext['videoNode']>();
  const [metadata, setMetadata] = useState<IMainContext['metadata']>();

  return (
    <MainContext.Provider value={{ watchVideoNode, setWatchVideoNode, videoNode, setVideoNode, metadata, setMetadata }}>
      {children}
    </MainContext.Provider>
  )
}