import {
  createContext,
  useContext,
  useState
} from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {

  const [selectedLocation, setSelectedLocation] =
  useState(null);

  const [currentLocation, setCurrentLocation] =
    useState(null);

  const [locationEnabled, setLocationEnabled] =
    useState(false);

  return (

    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,

        currentLocation,
        setCurrentLocation,

        locationEnabled,
        setLocationEnabled
      }}
    >

      {children}

    </LocationContext.Provider>

  );
}

export function useLocation() {

  return useContext(LocationContext);

}