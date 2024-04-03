import { createContext, useContext, useState } from "react";
const UrlContext = createContext();

export function TrackUrlGlobaly({ children }) {
  const [prevUrl, setprevUrl] = useState("INICIAL");
  return (
    <UrlContext.Provider value={[prevUrl, setprevUrl]}>
      {children}
    </UrlContext.Provider>
  );
}

export function useTrackUrlGlobaly() {
  return useContext(UrlContext);
}
