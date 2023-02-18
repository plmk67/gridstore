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

const Map = (apiKey) => {
  const { sendRequest, isLoading, setIsLoading } = useHttpClient();

  console.log(apiKey);
  const containerStyle = {
    width: "auto",
    height: "250px",
  };

  const center = {
    lat: 45.495196,
    lng: -73.58022,
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
              lat: 45.495196,
              lng: -73.58022,
            }}
            zoom={15}
          >
            <MarkerF
              visible={true}
              position={{
                lat: 45.495196,
                lng: -73.58022,
              }}
            />

            {/* <InfoWindowF
              position={{
                lat: 45.495196,
                lng: -73.58022,
              }}
            >
              <div className="flex flex-col justify-center items-center w-40 h-10">
                <div>Shipping address</div>
                <div>Montreal, Canada</div>
              </div>
            </InfoWindowF> */}
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
};

export default Map;
