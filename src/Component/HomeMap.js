import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { GOOGLE_API_KEY } from "../Configration/configration";
import { saveService } from "../action/userServiceConstant";
import { useDispatch } from "react-redux";

const InfoWindowEx = (props) => {
  const infoWindowRef = React.createRef();
  const contentElement = document.createElement(`div`);
  useEffect(() => {
    ReactDOM.render(React.Children.only(props.children), contentElement);
    infoWindowRef.current.infowindow.setContent(contentElement);
  }, [props.children]);
  return <InfoWindow ref={infoWindowRef} {...props} />;
};

export const HomeMap = (props) => {
  const [Info, setInfo] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });

  const onMarkerClick = (props, marker, e, data) => {
    console.log(data);
    setInfo({
      selectedPlace: data,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  const onClose = (props) => {
    if (Info.showingInfoWindow) {
      setInfo({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  const defaultMapOptions = {
    fullscreenControl: false,
  };
  const dispatch = useDispatch();

  const saveProvider = (id, status) => {
    dispatch(saveService({ id: id, status: status }));
  };

  const ref = useRef();

  useEffect(() => {
    ref?.current?.addEventListener("click", () => console.log("click"));
  }, []);

  return (
    <>
      <Map
        google={props.google}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        className={"map"}
        zoom={14}
        initialCenter={{
          lat: props?.serviceList[0]?.location?.coordinates[1]
            ? props?.serviceList[0]?.location?.coordinates[1]
            : 0,

          lng: props?.serviceList[0]?.location?.coordinates[0]
            ? props?.serviceList[0]?.location?.coordinates[0]
            : 0,
        }}
        center={{
          lat:
            props?.center?.lat !== 0
              ? props?.center?.lat
              : props?.serviceList[0]?.location?.coordinates[1]
              ? props?.serviceList[0]?.location?.coordinates[1]
              : 0,

          lng:
            props?.center?.lng !== 0
              ? props?.center?.lng
              : props?.serviceList[0]?.location?.coordinates[0]
              ? props?.serviceList[0]?.location?.coordinates[0]
              : 0,
        }}
        fullscreenControl={false}
        zoomControl={false}
        mapTypeControl={false}
        scaleControl={false}
        streetViewControl={false}
        panControl={false}
        rotateControl={false}
      >
        {props?.serviceList?.map((data) => {
          return (
            data?.location?.coordinates[1] && (
              <Marker
                key={`${data?._id}`}
                title={data.address}
                name={data.service_name}
                position={{
                  lat: data?.location?.coordinates[1],
                  lng: data?.location?.coordinates[0],
                }}
                onClick={(props, marker, e) =>
                  onMarkerClick(props, marker, e, data)
                }
              />
            )
          );
        })}
        <InfoWindowEx
          marker={Info.activeMarker}
          visible={Info.showingInfoWindow}
          onClose={onClose}
        >
          <div className="map-tooltip">
            <h6 className="map_title">{Info?.selectedPlace?.service_name}</h6>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="d-flex align-items-center">
                  <div class="p_image_shape me-2 me-sm-2 p_image_shape_map">
                    <img src={Info?.selectedPlace?.user_profile_picture} />
                  </div>
                  <p className="map_name m-0 p-0">
                    {Info?.selectedPlace?.user_id?.name}
                  </p>
                </div>
                <div className="d-flex align-items-center mt-1">
                  <div class="me-2 me-sm-2 ms-1">
                    <img
                      src="images/mapDiscovery.svg"
                      style={{ width: "18px" }}
                    />
                  </div>
                  <p className="map_des m-0 p-0">
                    Approx. - {Info?.selectedPlace?.miles_distance} Mile
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div class="p_image_shape me-2 me-sm-2 p_image_map_icon d-flex align-items-center justify-content-center">
                  <img src="images/shareIcon.svg" />
                </div>
                <button
                  class="p_image_shape me-2 me-sm-2 p_image_map_icon d-flex align-items-center justify-content-center"
                  // ref={ref}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(Info);
                    if (Info?.selectedPlace?.is_save) {
                      saveProvider(Info?.selectedPlace?._id, false);
                    } else {
                      saveProvider(Info?.selectedPlace?._id, true);
                    }
                    setInfo({...Info, selectedPlace : {...Info?.selectedPlace, is_save : !Info?.selectedPlace?.is_save}})
                  }}
                >
                  <img
                    src={
                      Info?.selectedPlace?.is_save
                        ? "images/save.svg"
                        : "images/saveIcon.svg"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        </InfoWindowEx>
        {/* <InfoWindow
          marker={Info.activeMarker}
          visible={Info.showingInfoWindow}
          onClose={onClose}
        >
          <div className="map-tooltip">
            <h6 className="map_title">{Info?.selectedPlace?.service_name}</h6>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="d-flex align-items-center">
                  <div class="p_image_shape me-2 me-sm-2 p_image_shape_map">
                    <img src={Info?.selectedPlace?.user_profile_picture} />
                  </div>
                  <p className="map_name m-0 p-0">
                    {Info?.selectedPlace?.user_id?.name}
                  </p>
                </div>
                <div className="d-flex align-items-center mt-1">
                  <div class="me-2 me-sm-2 ms-1">
                    <img
                      src="images/mapDiscovery.svg"
                      style={{ width: "18px" }}
                    />
                  </div>
                  <p className="map_des m-0 p-0">
                    Approx. - {Info?.selectedPlace?.miles_distance} Mile
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div class="p_image_shape me-2 me-sm-2 p_image_map_icon d-flex align-items-center justify-content-center">
                  <img src="images/shareIcon.svg" />
                </div>
                <button
                  class="p_image_shape me-2 me-sm-2 p_image_map_icon d-flex align-items-center justify-content-center"
                  // ref={ref}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(Info);
                    if (Info?.is_save) {
                      saveProvider(Info?.selectedPlace?._id, false);
                    } else {
                      saveProvider(Info?.selectedPlace?._id, true);
                    }
                  }}
                >
                  <img
                    src={
                      Info?.selectedPlace.is_save
                        ? "images/save.svg"
                        : "images/saveIcon.svg"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        </InfoWindow> */}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(HomeMap);
