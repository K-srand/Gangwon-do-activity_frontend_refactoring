import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/styles/MyPage.css';
import leftArrow from '../../assets/images/MainLeftArrow.png';
import rightArrow from '../../assets/images/MainRightArrow.png';
import deleteIcon from '../../assets/images/delete-icon.png';
import rank1 from '../../assets/images/Rank1.png';
import rank2 from '../../assets/images/Rank2.png';
import rank3 from '../../assets/images/Rank3.png';
import rank4 from '../../assets/images/Rank4.png';
import rank5 from '../../assets/images/Rank5.png';
import defaultImage from '../../assets/images/Icon_No_Image.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import Car from '../../assets/images/Car.png';
import Modal from './Modal'

const PaginatedList = ({ title, fetchUrl, renderItem, itemsPerPage }) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${fetchUrl}?page=${page-1}&size=${itemsPerPage}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      console.log("Fetched data:", response.data.content);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > totalPages) {
      setCurrentPage(1); // 마지막 페이지에서 오른쪽 버튼을 누르면 첫 페이지로 이동
    } else if (newPage < 1) {
      setCurrentPage(totalPages); // 첫 번째 페이지에서 왼쪽 버튼을 누르면 마지막 페이지로 이동
    } else {
      setCurrentPage(newPage); // 그 외에는 해당 페이지로 이동
    }
  };

  return (
    <div className="paginated-list">
      <h2>{title}</h2>
      <div className="carousel-container">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="carousel-button left"
        >
          <img src={leftArrow} alt="Previous" />
        </button>
        <div className="list-container">
          {data.map(renderItem)}
        </div>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="carousel-button right"
        >
          <img src={rightArrow} alt="Next" />
        </button>
      </div>
      <div className="pagination-controls">
        <span>{currentPage} / {totalPages}</span>
      </div>
    </div>
  );
};

const PaginatedList2 = ({ title, fetchUrl, renderItem, itemsPerPage }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [courseSet, setCourseSets] = useState([]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${fetchUrl}?page=${page-1}&size=${itemsPerPage}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const content = response.data.content;
      const sets = [];
      for (let i = 0; i < content.length; i += 4) {
        sets.push(content.slice(i, i + 4));
      }
      setCourseSets(sets);
      setTotalPages(sets.length);
      console.log("Fetched sets:", sets);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > totalPages) {
      setCurrentPage(1); // 마지막 페이지에서 오른쪽 버튼을 누르면 첫 페이지로 이동
    } else if (newPage < 1) {
      setCurrentPage(totalPages); // 첫 번째 페이지에서 왼쪽 버튼을 누르면 마지막 페이지로 이동
    } else {
      setCurrentPage(newPage); // 그 외에는 해당 페이지로 이동
    }
  };

  return (
    <div className="paginated-list">
      <h2>{title}</h2>
      <div className="carousel-container">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="carousel-button left"
        >
          <img src={leftArrow} alt="Previous" />
        </button>
        <div className="list-container">
          {courseSet && courseSet.length > 0 ? (
            <div className="course-set">
              {renderItem(courseSet[currentPage - 1])}
            </div>
          ) : (
            <p>로딩 중이거나 코스가 없습니다.</p>
          )}
        </div>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="carousel-button right"
        >
          <img src={rightArrow} alt="Next" />
        </button>
      </div>
      <div className="pagination-controls">
        <span>{currentPage} / {totalPages}</span>
      </div>
    </div>
  );
};

const PaginatedList3 = ({ title, fetchUrl, renderItem, itemsPerPage }) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${fetchUrl}?page=${page-1}&size=${itemsPerPage}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      console.log("Fetched data:", response.data.content);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > totalPages) {
      setCurrentPage(1); // 마지막 페이지에서 오른쪽 버튼을 누르면 첫 페이지로 이동
    } else if (newPage < 1) {
      setCurrentPage(totalPages); // 첫 번째 페이지에서 왼쪽 버튼을 누르면 마지막 페이지로 이동
    } else {
      setCurrentPage(newPage); // 그 외에는 해당 페이지로 이동
    }
  };

  return (
    <div className="paginated-list">
      <h2>{title}</h2>
      <div className="carousel-container3">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="carousel-button left"
        >
          <img src={leftArrow} alt="Previous" />
        </button>
        <div className="list-container3">
          {data.map(renderItem)}
        </div>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="carousel-button right"
        >
          <img src={rightArrow} alt="Next" />
        </button>
      </div>
      <div className="pagination-controls">
        <span>{currentPage} / {totalPages}</span>
      </div>
    </div>
  );
};



const MyPage = () => {
  const [userExp, setUserExp] = useState("");
  const [rankImg, setRankImg] = useState("");
  const [rankName, setRankName] = useState("");
  const [userNick, setUserNick] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [durations, setDurations] = useState([]);
  const lineRefs = useRef([]);
  const pathData = useRef([]);
  const [selectedCourses, setSelectedCourses] = useState([]); // 선택된 코스 정보
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleDelete = async (placeNo) => {
    try {
      const response = await axios.delete(`http://localhost:4040/api/v1/mypage/delete/${placeNo}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.code === 'SU' && response.data.message === 'Success.') {
        alert("내가 찜한 플레이스가 삭제되었습니다");
      }

      // 삭제 후 데이터 갱신
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const renderMyPostItem = (item) => (
    <div className="post-item-mypage" key={item.boardNo}>
      <Link to={`/BoardDetail/${item.boardNo}?page=0`}>
        <p>{item.boardTitle}</p>
      </Link>
    </div>
  );
  
  const renderFavoriteItem = (item) => (
    <div className="mypage-carousel-item" key={item.placeNo}>
      <img src={item.firstImage || defaultImage} alt={item.placeTitle} />
      <p>{item.placeTitle}</p>
      <button 
        className="delete-button"
        onClick={() => handleDelete(item.placeNo)}
      >
        <img src={deleteIcon} alt="Delete" />
      </button>
    </div>
  );

  const renderMyCourseItem = (items) => (
    <div className="mypage-course-options">
      {items.map((course, index) => (
        <div key={index} className="mypage-course-item">
          <img src={course.firstImage2 || defaultImage} alt={course.placeTitle} className="course-image" />
          <div>{course.placeTitle}</div>
          {/* {index < items.length - 1 && durations[index] && (
            <div className="duration"><img src={Car} alt="Car" />{durations[index]}</div>
          )} */}
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const initMap = () => {
      const { naver } = window;
      const initialLocation = new naver.maps.LatLng(37.5665, 126.9780);
      const options = {
        center: initialLocation,
        zoom: 5,
      };
      const map = new naver.maps.Map(mapContainer.current, options);
      mapRef.current = map;
    };

    axios.get('http://localhost:4040/api/v1/getmap')
      .then(response => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = response.data;
        script.onload = initMap;
        document.head.appendChild(script);
      })
      .catch(error => console.error('Error fetching map script:', error));
  }, []);

  // 선택된 코스에 대해 마커를 표시하고 경로를 그리는 로직
  useEffect(() => {
    if (selectedCourses.length > 1) {
      calculateDurations(selectedCourses).then(() => {
        drawPath(selectedCourses); // 경로 그리기
      });
    }
  }, [selectedCourses]);

  const calculateDurations = (courses) => {
    const durationPromises = [];
    const updatedPathData = [];

    for (let i = 0; i < courses.length - 1; i++) {
      const start = courses[i];
      const end = courses[i + 1];

      durationPromises.push(
        axios.post('http://localhost:4040/api/v1/getdrive', {
          startLat: start.mapy,
          startLng: start.mapx,
          endLat: end.mapy,
          endLng: end.mapx
        }).then(response => {
          const data = response.data;
          if (data.route && data.route.traoptimal && data.route.traoptimal[0]) {
            updatedPathData.push(data.route.traoptimal[0].path);
            const duration = data.route.traoptimal[0].summary.duration;
            return formatDuration(duration);
          }
          return 'N/A';
        })
      );
    }

    return Promise.all(durationPromises).then(durations => {
      setDurations(durations);
      pathData.current = updatedPathData;
    }).catch(error => console.error('Error fetching durations:', error));
  };

  const formatDuration = (milliseconds) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
  };

  const handleCourseSelect = (courses) => {
    setSelectedCourses(courses); // 선택된 코스의 상태 업데이트
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    clearMap(); // 모달이 닫힐 때 지도 초기화
  };

  const clearMap = () => {
    // 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = []; // 마커 배열 초기화
  
    // 경로 제거
    lineRefs.current.forEach(line => line.setMap(null));
    lineRefs.current = []; // 경로 배열 초기화
  };

  const drawPath = (courses) => {
    const { naver } = window;
    const coordinates = courses.map(course => new naver.maps.LatLng(course.mapy, course.mapx));

    // 기존 라인과 마커를 모두 제거
    if (lineRefs.current.length > 0) {
      lineRefs.current.forEach(line => line.setMap(null));
      lineRefs.current = [];
    }
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 경로를 그리고 마커를 추가
    pathData.current.forEach(path => {
      const pathCoordinates = path.map(point => new naver.maps.LatLng(point[1], point[0]));
      const polyline = new naver.maps.Polyline({
        map: mapRef.current,
        path: pathCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 4
      });
      lineRefs.current.push(polyline);
    });

    coordinates.forEach((coord, index) => {
      const marker = new naver.maps.Marker({
        position: coord,
        map: mapRef.current,
        title: `Location ${index + 1}`
      });
      markersRef.current.push(marker);
    });

    // 지도의 경계 설정
    const bounds = coordinates.reduce((bounds, coord) => bounds.extend(coord), new naver.maps.LatLngBounds());
    mapRef.current.fitBounds(bounds);
  };

  useEffect(() => {
  if (isModalOpen && selectedCourses.length > 0) {
    // 네이버 지도 객체가 로드되었는지 확인
    if (!window.naver || !mapContainer.current) return; // naver 또는 mapContainer가 정의되지 않으면 초기화를 실행하지 않음

    const initMap = () => {
      const initialLocation = new window.naver.maps.LatLng(37.5665, 126.9780);
      const options = {
        center: initialLocation,
        zoom: 3,
      };
      // 지도 초기화
      if (mapContainer.current) {
        mapRef.current = new window.naver.maps.Map(mapContainer.current, options);
        drawPath(selectedCourses); // 선택된 코스의 경로 그리기
      }
    };

    // 지도 스크립트가 이미 로드된 경우 바로 지도 초기화
    if (window.naver && mapContainer.current) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID&submodules=geocoder'; 
      script.onload = initMap;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }
}, [isModalOpen, selectedCourses]);

  const getRank = async () => {
    try {
      const response = await axios.get(`http://localhost:4040/api/v1/mypage/exp`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const expUser = response.data.userExp; 
      setUserExp(expUser); 
      setUserNick(response.data.userNick); 

      if(expUser < 10){
        setRankImg(rank1);
        setRankName("응애감자");
      }else if(expUser < 50){
        setRankImg(rank2);
        setRankName("청년감자");
      }else if(expUser < 100){
        setRankImg(rank3);
        setRankName("겉멋감자");
      }else if(expUser < 150){
        setRankImg(rank4);
        setRankName("파티감자");
      }else {
        setRankImg(rank5);
        setRankName("왕감자");
      }
      
    } catch (error) {
      console.error('Error :', error);
    }
  };

  useEffect(() => {
    getRank();
  }, []);

  const modify = () => {
    navigate('/modify');
  };

  const withdraw = () => {
    navigate('/withdraw');
  };

  return (
    <div className="mypage">
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={rankImg} alt="Profile" className="profile-image" />
        </div>
        <div className="profile-info">
          <div className='profile-nickname'>{userNick}</div>
          <div className="profile-rank">등급 : {rankName}</div>
          <div className="profile-name">경험치 : {userExp}</div>
        </div>

        <div className='mypage-info-function'>
        <button className='mypage-info-modify' onClick={modify}>회원 정보 수정</button>
        <button className='mypage-info-withdraw' onClick={withdraw}>회원 탈퇴</button>
      </div>
      </div>

      <PaginatedList 
        title="내가 쓴 글"
        fetchUrl="http://localhost:4040/api/v1/mypage/getmyboardlist"
        renderItem={renderMyPostItem}
        itemsPerPage={5}
      />
      <PaginatedList3 
        title="내가 찜한 곳"
        fetchUrl="http://localhost:4040/api/v1/mypage/getmyfavoritelist"
        renderItem={renderFavoriteItem}
        itemsPerPage={4}
      />

      <PaginatedList2
        title="나만의 코스"
        fetchUrl="http://localhost:4040/api/v1/mypage/mycourse"
        renderItem={(courses) => {
          return (
            <div onClick={() => handleCourseSelect(courses)}>
              {renderMyCourseItem(courses)}
            </div>
          );
        }}
        itemsPerPage={1}
      />
    
      {/* 지도 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="map-container">
          <div ref={mapContainer} className="map"></div> {/* 지도를 여기에 표시 */}
        </div>
        <div className="route-duration">
          {selectedCourses.length > 0 && (
            <ul>
              {selectedCourses.map((course, index) => (
                <React.Fragment key={index}>
                  <li className="course-item">
                    <span className="course-index">{index + 1}</span> 
                    <span className="course-title">{course.placeTitle}</span>
                  </li>
                  {/* 마지막 코스가 아니라면 시간 표시 */}
                  {index < selectedCourses.length - 1 && (
                    <li className="course-duration">
                      <img src={Car} alt="Car" className="car-icon" />
                      <span>{durations[index] ? durations[index] : ''}</span>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
      </Modal>

      <Footer className="footer"/>
    </div> 

  );


};

export default MyPage;
