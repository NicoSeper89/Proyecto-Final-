import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Places({ infoFormProp, setInfoFormProp }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDZ3j5w0ROUGsmr08YCrbXuBRv9pki1jkE",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map infoFormProp={infoFormProp} setInfoFormProp={setInfoFormProp} />;
}

function Map({ infoFormProp, setInfoFormProp }) {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete
          setSelected={setSelected}
          infoFormProp={infoFormProp}
          setInfoFormProp={setInfoFormProp}
        />
      </div>

      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected, infoFormProp, setInfoFormProp }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    setInfoFormProp({ ...infoFormProp, address: results[0].formatted_address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        style={ {width: "100%", height: 40} }
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
