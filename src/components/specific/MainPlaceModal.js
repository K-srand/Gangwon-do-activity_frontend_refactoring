import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../../assets/styles/MainPlaceModal.css'; 
import axios from "axios";

function MainPlaceModal({ closeModal }) {
    const mapContainer = useRef(null);
    const [locations, setLocations] = useState([]);
    const [mapInitialized, setMapInitialized] = useState(false);

    useEffect(() => {
        // 추천 10개 액티비티 호출
        axios.get('http://localhost:4040/api/v1/getjson/getplace')
          .then(response => {
            console.log('Fetched Data:', response.data);
            setLocations(response.data);
            const fetchedItems = response.data.map(place => ({
              id: place.placeNo,
              img: place.firstImage,
              title: place.placeTitle,
            }));
    
          })
          .catch(error => console.error('Error fetching locations:', error));
      }, []);

    useEffect(() => {
        const loadNaverMapScript = async () => {
          if (!window.naver) {
            try {
              const response = await axios.get('http://localhost:4040/api/v1/getmap');
              const script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = response.data;
              script.onload = () => setMapInitialized(true);
              document.head.appendChild(script);
            } catch (error) {
              console.error('Error fetching map script:', error);
            }
          } else {
            setMapInitialized(true);
          }
        };
    
        loadNaverMapScript();
    }, []);

    const initializeMap = useCallback(() => {
        if (locations.length > 0 && window.naver && mapInitialized) {
          const { naver } = window;
    
          const initialLocation = new naver.maps.LatLng(37.8304115, 128.2260705);
          const options = {
            center: initialLocation,
            zoom: 8,
          };
          const map = new naver.maps.Map(mapContainer.current, options);
    
          locations.forEach(location => {
            const markerPosition = new naver.maps.LatLng(location.mapy, location.mapx);
            const marker = new naver.maps.Marker({
              position: markerPosition,
              map,
              title: location.placeTitle
            });
    
            // 플레이스 타이틀 호출
            naver.maps.Event.addListener(marker, 'click', () => {
              axios.post('http://localhost:4040/api/v1/getjson/getplacetitle', {
                placeTitle: location.placeTitle,
                placeMapx: location.mapx,
                placeMapy: location.mapy
              })
                .then(response => {
                  console.log(response.data);
                })
                .catch(error => {
                  console.error('There was an error!', error);
                });
            });
          });
    
          // 강원도 행정구역 데이터 레이어 호출
          axios.get('http://localhost:4040/resources/json/gangwondo.json')
            .then(response => {
              const geojson = response.data;
              map.data.addGeoJson(geojson);
              map.data.setStyle({
                fillColor: '#FFAF00',
                fillOpacity: 0.4,
                strokeColor: '#FFAF00',
                strokeWeight: 2
              });
            })
            .catch(error => console.error('Error fetching GeoJSON:', error));
        }
      }, [locations, mapInitialized]);
      
    useEffect(() => {
    if (mapInitialized) {
        initializeMap();
    }
    }, [mapInitialized, initializeMap]);

    return (
        <div className="placemodal">
            <div className="place-modal-content">
                <h2>플레이스 모달창</h2>
            
                <div className="place-modal-actions">
                    <button onClick={closeModal}>X</button>
                </div>

                <div className="place-modal-map-containers">
                    <div ref={mapContainer} className="place-modal-map"></div>
                </div>
            </div>
        </div>
    );
}

export default MainPlaceModal;
