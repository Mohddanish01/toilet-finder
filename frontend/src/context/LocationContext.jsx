import {
  createContext,
  useContext,
  useState
} from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {

  const [selectedLocation, setSelectedLocation] =
    useState(null);

  return (

    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation
      }}
    >

      {children}

    </LocationContext.Provider>

  );
}

export function useLocation() {

  return useContext(LocationContext);

}