import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useHttpClient } from "../components/http-hook";
import { CircularProgress } from "@chakra-ui/react";

const containerStyle = {
  display: "flex",
  width: "100%",
  height: "100%",
};

const Map = (props) => {
  const { isLoading, setIsLoading } = useHttpClient();

  const containerStyle = {
    width: "auto",
    height: "250px",
  };

  const center = {
    lat: props.coordinates[0].latitude,
    lng: props.coordinates[0].longitude,
  };

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchToken();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-row justify-center items-center w-full h-96 ">
          <CircularProgress isIndeterminate />
        </div>
      ) : (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: props.coordinates[0].latitude,
              lng: props.coordinates[0].longitude,
            }}
            zoom={18}
          >
            <MarkerF
              visible={true}
              position={{
                lat: props.coordinates[0].latitude,
                lng: props.coordinates[0].longitude,
              }}
            />
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
};

export default Map;
