import React, { useState, useEffect } from "react";
import elite1 from "../../assets/models/elite-1.png";
import elite2 from "../../assets/models/elite-2.jpg";
import Card from "../ListingCard/Card";
import FilterDrawer from "../FilterDrawer";
import listingService from "@/services/listingService";
import { useRouter } from "next/router";
import { getIconID, isJson } from "@/helpers/helper";
import CardSkeleton from "../CardSkeleton";

function ListingList({ record_type, filters, locationFilter = null, radiusFilter = null }) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filterServiceType, setFilterServiceType] = useState(null);
  const [filterRadius, setFilterRadius] = useState(null);
  const [filterCategory, setFilterCategory] = useState(record_type);
  const [filterService, setFilterService] = useState(null);
  const [filterLocation, setFilterLocation] = useState(null);
  const [filterCity, setFilterCity] = useState(null);
  const [filterBrough, setFilterBrough] = useState(null);
  const [filterBroughLocation, setFilterBroughLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [items, setItems] = useState([]);
  const [eliteItems, setEliteItems] = useState([]);
  const [primeItems, setPrimeItems] = useState([]);
  const [premiumItems, setPremiumItems] = useState([]);
  const [standardItems, setStandardItems] = useState([]);
  const [exclusiveItems, setExclusiveItems] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  // State to track the number of items to display
  const [eliteItemsLimit, setEliteItemsLimit] = useState(6);
  const [primeItemsLimit, setPrimeItemsLimit] = useState(6);
  const [premiumItemsLimit, setPremiumItemsLimit] = useState(6);
  const [exclusiveItemsLimit, setExclusiveItemsLimit] = useState(6);
  const [standardItemsLimit, setStandardItemsLimit] = useState(6);
  const [itemsLimit, setItemsLimit] = useState(6);
  const [skeletonCount, setSkeletonCount] = useState(1)

  const unsetFilter = (type) => {
    let filters = {};
    if (type && type === 'Service Type') {
      setFilterServiceType(null);
    }
    if (type && type === 'Radius') {
      setFilterRadius(null);
    }
    if (type && type === 'Service') {
      setFilterService(null);
    }
    if (type && type === 'Location') {
      setFilterLocation(null);
    }
    if (type && type == 'Category') {
      setFilterCategory(null);
    }
    if (type && type == 'City') {
      setFilterCity(null);
    }
    if (type && type == 'Brough') {
      setFilterBrough(null);
    }
    if (type && type == 'Brough Location') {
      setFilterBroughLocation(null);
    }
    if (filterServiceType && type !== 'Service Type') {
      filters.service_type = filterServiceType;
    }
    if (filterServiceType && type !== 'Category') {
      filters.category = filterCategory;
    }
    if (filterRadius && type !== 'Radius') {
      filters.radius = filterRadius;
      filters.userLocation = !isJson(userLocation) ? JSON.stringify(userLocation) : userLocation;
    }
    if (filterService && type !== 'Service') {
      filters.service = filterService;
    }
    if (filterLocation && type !== 'Location') {
      filters.location = filterLocation;
    }
    if (filterCity && type !== 'City') {
      filters.city = filterCity;
    }
    if (filterBrough && type !== 'Brough') {
      filters.brough = filterBrough;
    }
    if (filterBroughLocation && type !== 'Brough Location') {
      filters.brough_location = filterBroughLocation;
    }
    let uri = '';

    fetchListings(filters);
  };

  const handleFilters = (type, value) => {
    if (!isJson(userLocation)) {
      setUserLocation(JSON.stringify(userLocation))
    }
    let filters = {};
    if (type && type === 'Service Type') {
      setFilterServiceType(value);
      filters.service_type = value;
    } else {
      if (filterServiceType) {
        filters.service_type = filterServiceType;
      }
    }
    if (type && type === 'Radius') {
      setFilterRadius(value);
      filters.radius = value;
      filters.userLocation = !isJson(userLocation) ? JSON.stringify(userLocation) : userLocation;

    } else {
      if (filterRadius) {
        filters.radius = filterRadius;
        filters.userLocation = !isJson(userLocation) ? JSON.stringify(userLocation) : userLocation;

      }
    }
    if (type && type === 'Service') {
      setFilterService(value);
      filters.service = value;
    } else {
      if (filterService) {
        filters.service = filterService;
      }
    }
    if (type && type === 'Category') {
      setFilterCategory(value);
      filters.category = value;
    } else {
      if (filterCategory) {
        filters.category = filterCategory;
      }
    }
    if (type && type === 'Location') {
      setFilterLocation(value);
      filters.location = value;
    } else {
      if (filterLocation) {
        filters.location = filterLocation;
      }
    }
    if (type && type === 'City') {
      setFilterCity(value);
      setFilterBrough(null);
      setFilterBroughLocation(null);
      filters.city = value;
    } else {
      if (filterCity) {
        filters.city = filterCity;
      }
    }

    if (type && type === 'Brough') {
      setFilterBrough(value);
      filters.brough = value;
    } else {
      if (filterBrough && type && type !== 'City') {
        filters.brough = filterBrough;
      }
    }

    if (type && type === 'Brough Location') {
      setFilterBroughLocation(value);
      filters.brough_location = value;
    } else {
      if (filterBroughLocation && type && type !== 'City') {
        filters.brough_location = filterBroughLocation;
      }
    }

    redirection();
    fetchListings(filters);
  };

  const applyAll = () => {
    setOpen(false);
  };

  const redirection = () => {

  }

  const clearAll = () => {
    fetchListings(); // Fetch data without any filters
    setFilterServiceType(null);
    setFilterService(null);
    setFilterRadius(null);
    setFilterLocation(null);
    setFilterCategory(null);
    setFilterCity(null);
    setFilterBrough(null);
    setFilterBroughLocation(null);
  };

  const fetchListings = async (filter = {}) => {
    
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 5000));

      const category = record_type;
      let filterCriteria = { status: 'Active', category, ...filter }; // Merge existing filter with category and status
      let data = await listingService.list(filterCriteria);
      if (data) {
        setItems(data.data);
        setTotalItems(data.data?.length);
      }
      if (filterServiceType || filterBroughLocation || filterBrough || filterCity || filterLocation || filterRadius || filterService) {

      } else {
        // Fetching different subscription types
        const subscriptionTypes = ['ELITE', 'PRIME', 'PREMIUM', 'EXCLUSIVE', 'STANDARD'];
        for (const type of subscriptionTypes) {
          const subscriptionFilter = { ...filterCriteria, subscription_type: type };
          data = await listingService.list(subscriptionFilter);
          if (data) {
            if (type === 'ELITE') setEliteItems(data.data);
            if (type === 'PRIME') setPrimeItems(data.data);
            if (type === 'PREMIUM') setPremiumItems(data.data);
            if (type === 'EXCLUSIVE') setExclusiveItems(data.data);
            if (type === 'STANDARD') setStandardItems(data.data);

          }

        }
      }

    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation)); // Parse and set saved location
    } else {
      if (locationFilter || radiusFilter) {
        getLocation();
      }

      // Request location if not available in localStorage

    }

    let filters = {};


    fetchListings(filters); // Initial fetch


    const updateSkeletonCount = () => {
      if (window.innerWidth >= 1024) {
        setSkeletonCount(4); // 4 skeletons for desktop
      } else {
        setSkeletonCount(1); // 1 skeleton for mobile
      }
    };

    // Initial check
    updateSkeletonCount();

    // Update skeleton count on window resize
    window.addEventListener('resize', updateSkeletonCount);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSkeletonCount);
    };

  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(userLocation);
          localStorage.setItem('userLocation', JSON.stringify(userLocation)); // Save location to localStorage
        },
        (err) => {
          console.log('Failed to get location: ' + err.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  // Handle the "Show More" functionality
  const handleShowMore = (type) => {
    if (type === 'ITEMS') {
      setItemsLimit(itemsLimit + 6);
    } else if (type === 'ELITE') {
      setEliteItemsLimit(eliteItemsLimit + 6);
    } else if (type === 'PRIME') {
      setPrimeItemsLimit(primeItemsLimit + 6);
    } else if (type === 'PREMIUM') {
      setPremiumItemsLimit(premiumItemsLimit + 6);
    } else if (type === 'EXCLUSIVE') {
      setExclusiveItemsLimit(exclusiveItemsLimit + 6);
    } else if (type === 'STANDARD') {
      setStandardItemsLimit(standardItemsLimit + 6);
    }
  };
  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div className="py-[16px] px-[24px] md:pb-[56px] md:pt-0 md:px-[64px] flex flex-col gap-[30px] md:gap-[32px]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <button
                className="btn sec-outline-2-btn py-3 px-6 flex items-center gap-3 !bg-[#F9FAFB]"
                onClick={showDrawer}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 7H3.5C3.22386 7 3 6.77614 3 6.5V5.5C3 5.22386 3.22386 5 3.5 5H20.5C20.7761 5 21 5.22386 21 5.5V6.5C21 6.77614 20.7761 7 20.5 7ZM18 12.5V11.5C18 11.2239 17.7761 11 17.5 11H6.5C6.22386 11 6 11.2239 6 11.5V12.5C6 12.7761 6.22386 13 6.5 13H17.5C17.7761 13 18 12.7761 18 12.5ZM15 17.5V18.5C15 18.7761 14.7761 19 14.5 19H9.5C9.22386 19 9 18.7761 9 18.5V17.5C9 17.2239 9.22386 17 9.5 17H14.5C14.7761 17 15 17.2239 15 17.5Z"
                    fill="#618B8A"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_51_1254"
                      x1="20.5424"
                      y1="12"
                      x2="3"
                      y2="12"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#B07B59" />
                      <stop offset="1" stopColor="#C2A891" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="fs-16-400-lato txt-color-red">Filters</div>
              </button>
              <button className="btn sec-outline-2-btn py-3 px-6 flex items-center gap-3 !bg-[#F9FAFB]">
                <svg width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 7H3.5C3.22386 7 3 6.77614 3 6.5V5.5C3 5.22386 3.22386 5 3.5 5H20.5C20.7761 5 21 5.22386 21 5.5V6.5C21 6.77614 20.7761 7 20.5 7ZM18 12.5V11.5C18 11.2239 17.7761 11 17.5 11H6.5C6.22386 11 6 11.2239 6 11.5V12.5C6 12.7761 6.22386 13 6.5 13H17.5C17.7761 13 18 12.7761 18 12.5ZM15 17.5V18.5C15 18.7761 14.7761 19 14.5 19H9.5C9.22386 19 9 18.7761 9 18.5V17.5C9 17.2239 9.22386 17 9.5 17H14.5C14.7761 17 15 17.2239 15 17.5Z"
                    fill="#618B8A"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_51_1254"
                      x1="20.5424"
                      y1="12"
                      x2="3"
                      y2="12"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#B07B59" />
                      <stop offset="1" stopColor="#C2A891" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="fs-16-400-lato txt-color-red">Sort</div>
              </button>
            </div>
            <div className="flex items-end md:items-center justify-between">
              <div className="w-100 flex flex-wrap md:flex md:wrap md:w-max-content">
                {filterService && filterService != 'All' && (
                  <button className="btn primary-bg-btn ml-1 mb-1  py-2 px-3 flex items-center gap-2 !bg-[#F9FAFB]">
                    <div className="fs-16-400-lato text-white">{filterService}</div>
                    <span onClick={() => unsetFilter('Service')}>
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3995 14.773L14.0459 15.1266C13.8507 15.3218 13.5341 15.3218 13.3388 15.1266L9.27298 11.0607L5.20708 15.1265C5.01186 15.3218 4.69527 15.3218 4.5 15.1265L4.14645 14.773C3.95118 14.5777 3.95118 14.2612 4.14645 14.0659L8.21233 10L4.14645 5.93413C3.95118 5.73891 3.95118 5.42232 4.14645 5.22706L4.5 4.8735C4.69526 4.67824 5.01186 4.67824 5.20708 4.8735L9.27298 8.93938L13.3388 4.8735C13.5341 4.67824 13.8507 4.67824 14.0459 4.8735L14.3995 5.22705C14.5948 5.42231 14.5948 5.73891 14.3995 5.93413L10.3336 10L14.3995 14.0659C14.5948 14.2612 14.5948 14.5777 14.3995 14.773Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                )}

                {filterRadius && (
                  <button className="btn primary-bg-btn  mb-1  ml-1 py-2 px-3 flex items-center gap-2 !bg-[#F9FAFB]">
                    <div className="fs-16-400-lato text-white">{filterRadius}KM</div>
                    <span onClick={() => unsetFilter('Radius')}>
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3995 14.773L14.0459 15.1266C13.8507 15.3218 13.5341 15.3218 13.3388 15.1266L9.27298 11.0607L5.20708 15.1265C5.01186 15.3218 4.69527 15.3218 4.5 15.1265L4.14645 14.773C3.95118 14.5777 3.95118 14.2612 4.14645 14.0659L8.21233 10L4.14645 5.93413C3.95118 5.73891 3.95118 5.42232 4.14645 5.22706L4.5 4.8735C4.69526 4.67824 5.01186 4.67824 5.20708 4.8735L9.27298 8.93938L13.3388 4.8735C13.5341 4.67824 13.8507 4.67824 14.0459 4.8735L14.3995 5.22705C14.5948 5.42231 14.5948 5.73891 14.3995 5.93413L10.3336 10L14.3995 14.0659C14.5948 14.2612 14.5948 14.5777 14.3995 14.773Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                )}
                {filterLocation && filterLocation != 'All' && (
                  <button className="btn primary-bg-btn  mb-1  ml-1 py-2 px-3 flex items-center gap-2 !bg-[#F9FAFB]">
                    <div className="fs-16-400-lato text-white">{filterLocation}</div>
                    <span onClick={() => unsetFilter('Location')}>
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3995 14.773L14.0459 15.1266C13.8507 15.3218 13.5341 15.3218 13.3388 15.1266L9.27298 11.0607L5.20708 15.1265C5.01186 15.3218 4.69527 15.3218 4.5 15.1265L4.14645 14.773C3.95118 14.5777 3.95118 14.2612 4.14645 14.0659L8.21233 10L4.14645 5.93413C3.95118 5.73891 3.95118 5.42232 4.14645 5.22706L4.5 4.8735C4.69526 4.67824 5.01186 4.67824 5.20708 4.8735L9.27298 8.93938L13.3388 4.8735C13.5341 4.67824 13.8507 4.67824 14.0459 4.8735L14.3995 5.22705C14.5948 5.42231 14.5948 5.73891 14.3995 5.93413L10.3336 10L14.3995 14.0659C14.5948 14.2612 14.5948 14.5777 14.3995 14.773Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                )}
                {filterCity && filterCity != 'All' && (
                  <button className="btn primary-bg-btn  mb-1  ml-1 py-2 px-3 flex items-center gap-2 !bg-[#F9FAFB]">
                    <div className="fs-16-400-lato text-white">{filterCity}</div>
                    <span onClick={() => unsetFilter('City')}>
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3995 14.773L14.0459 15.1266C13.8507 15.3218 13.5341 15.3218 13.3388 15.1266L9.27298 11.0607L5.20708 15.1265C5.01186 15.3218 4.69527 15.3218 4.5 15.1265L4.14645 14.773C3.95118 14.5777 3.95118 14.2612 4.14645 14.0659L8.21233 10L4.14645 5.93413C3.95118 5.73891 3.95118 5.42232 4.14645 5.22706L4.5 4.8735C4.69526 4.67824 5.01186 4.67824 5.20708 4.8735L9.27298 8.93938L13.3388 4.8735C13.5341 4.67824 13.8507 4.67824 14.0459 4.8735L14.3995 5.22705C14.5948 5.42231 14.5948 5.73891 14.3995 5.93413L10.3336 10L14.3995 14.0659C14.5948 14.2612 14.5948 14.5777 14.3995 14.773Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                )}
                {filterBrough && filterBrough != 'All' && (
                  <button className="btn primary-bg-btn  mb-1  ml-1 py-2 px-3 flex items-center gap-2 !bg-[#F9FAFB]">
                    <div className="fs-16-400-lato text-white">{filterBrough}</div>
                    <span onClick={() => unsetFilter('Brough')}>
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3995 14.773L14.0459 15.1266C13.8507 15.3218 13.5341 15.3218 13.3388 15.1266L9.27298 11.0607L5.20708 15.1265C5.01186 15.3218 4.69527 15.3218 4.5 15.1265L4.14645 14.773C3.95118 14.5777 3.95118 14.2612 4.14645 14.0659L8.21233 10L4.14645 5.93413C3.95118 5.73891 3.95118 5.42232 4.14645 5.22706L4.5 4.8735C4.69526 4.67824 5.01186 4.67824 5.20708 4.8735L9.27298 8.93938L13.3388 4.8735C13.5341 4.67824 13.8507 4.67824 14.0459 4.8735L14.3995 5.22705C14.5948 5.42231 14.5948 5.73891 14.3995 5.93413L10.3336 10L14.3995 14.0659C14.5948 14.2612 14.5948 14.5777 14.3995 14.773Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                )}
                {filterBroughLocation && filterBroughLocation != 'All' && (
                  <button className="btn primary-bg-btn  mb-1   ml-1 py-2 px-3 flex items-center gap-2 !bg-[#F9FAFB]">
                    <div className="fs-16-400-lato text-white">{filterBroughLocation}</div>
                    <span onClick={() => unsetFilter('Brough Location')}>
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3995 14.773L14.0459 15.1266C13.8507 15.3218 13.5341 15.3218 13.3388 15.1266L9.27298 11.0607L5.20708 15.1265C5.01186 15.3218 4.69527 15.3218 4.5 15.1265L4.14645 14.773C3.95118 14.5777 3.95118 14.2612 4.14645 14.0659L8.21233 10L4.14645 5.93413C3.95118 5.73891 3.95118 5.42232 4.14645 5.22706L4.5 4.8735C4.69526 4.67824 5.01186 4.67824 5.20708 4.8735L9.27298 8.93938L13.3388 4.8735C13.5341 4.67824 13.8507 4.67824 14.0459 4.8735L14.3995 5.22705C14.5948 5.42231 14.5948 5.73891 14.3995 5.93413L10.3336 10L14.3995 14.0659C14.5948 14.2612 14.5948 14.5777 14.3995 14.773Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                )}
                {filterServiceType && filterServiceType != 'All' && (
                  <button className="btn primary-bg-btn  mb-1  ml-1  py-2 px-3 flex items-center gap-2 !bg-[#F9FAFB]">
                    <div className="fs-16-400-lato text-white">{filterServiceType}</div>
                    <span onClick={() => unsetFilter('Service Type')}>
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3995 14.773L14.0459 15.1266C13.8507 15.3218 13.5341 15.3218 13.3388 15.1266L9.27298 11.0607L5.20708 15.1265C5.01186 15.3218 4.69527 15.3218 4.5 15.1265L4.14645 14.773C3.95118 14.5777 3.95118 14.2612 4.14645 14.0659L8.21233 10L4.14645 5.93413C3.95118 5.73891 3.95118 5.42232 4.14645 5.22706L4.5 4.8735C4.69526 4.67824 5.01186 4.67824 5.20708 4.8735L9.27298 8.93938L13.3388 4.8735C13.5341 4.67824 13.8507 4.67824 14.0459 4.8735L14.3995 5.22705C14.5948 5.42231 14.5948 5.73891 14.3995 5.93413L10.3336 10L14.3995 14.0659C14.5948 14.2612 14.5948 14.5777 14.3995 14.773Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
              {filterServiceType || filterBroughLocation || filterBrough || filterCity || filterLocation || filterRadius || filterCategory || filterService ?
                <div className="fs-14-400-lato txt-color-black float-right ml-2 md:ml-0">Showing {items?.slice(0, itemsLimit)?.length} of {totalItems}</div>
                : <></>}
            </div>
          </div>

          {filterServiceType || filterBroughLocation || filterBrough || filterCity || filterLocation || filterRadius || filterService ? (

            items?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                  {items?.slice(0, itemsLimit)?.map((item, index) => (
                    <Card pic={item?.img} key={index} item={item} topIcon={getIconID(item?.subscription?.title)} />
                  ))}
                </div>
                {itemsLimit < items.length && (
                  <div className="pt-4 flex flex-col items-center gap-3">
                    <div className="fs-16-500-lato txt-color-red ">
                      Continue Exploring Therapists
                    </div>
                    <button
                      onClick={() => handleShowMore('ITEMS')}
                      className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-red w-full md:w-auto"
                    >
                      SHOW MORE
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
                <span className="text-lg fs-16-600-lato txt-color-red font-semibold font-secondary text-brand-primary">
                  No Listing Found.
                </span>
              </div>
            )
          ) : (
            <>

              {/* Elite Therapist */}
              <div className="flex flex-col items-start md:items-center gap-4">
                <div className="fs-48-400-lato txt-color-red">
                  Our Elite Therapists
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                  {[...Array(skeletonCount)].map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                eliteItems?.length > 0 ?
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                      {eliteItems?.slice(0, eliteItemsLimit)?.map((item, index) => (
                        <Card pic={item?.img} key={index} item={item} topIcon={getIconID(item?.subscription?.title)} />
                      ))}
                    </div>

                    {eliteItemsLimit < eliteItems.length && (
                      <div className="pt-4 flex flex-col items-center gap-3">
                        <div className="fs-16-500-lato txt-color-red ">
                          Continue Exploring Elite Therapists
                        </div>
                        <button
                          onClick={() => handleShowMore('ELITE')}
                          className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-red w-full md:w-auto"
                        >
                          SHOW MORE
                        </button>
                      </div>
                    )}
                  </>
                  :
                  <div class="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
                    <span class="text-lg fs-16-600-lato  txt-color-red  font-semibold font-secondary text-brand-primary">
                      No Elite Listing Found.
                    </span>
                  </div>

              )}




              {/* Exclusive Therapist */}
              <div className="flex flex-col items-start md:items-center gap-4">
                <div className="fs-48-400-lato txt-color-red">
                  Our Exclusive Therapists
                </div>
              </div>

              {loading  ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                {[...Array(skeletonCount)].map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>) : (
                exclusiveItems?.length > 0 ?
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                      {exclusiveItems?.slice(0, exclusiveItemsLimit)?.map((item, index) => (
                        <Card pic={item?.img} key={index} item={item} topIcon={getIconID(item?.subscription?.title)} />
                      ))}
                    </div>

                    {exclusiveItemsLimit < exclusiveItems.length && (
                      <div className="pt-4 flex flex-col items-center gap-3">
                        <div className="fs-16-500-lato txt-color-red ">
                          Continue Exploring Exclusive Therapists
                        </div>
                        <button
                          onClick={() => handleShowMore('EXCLUSIVE')}
                          className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-red w-full md:w-auto"
                        >
                          SHOW MORE
                        </button>
                      </div>
                    )}
                  </>
                  :
                  <div class="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
                    <span class="text-lg fs-16-600-lato  txt-color-red  font-semibold font-secondary text-brand-primary">
                      No Exclusive Listing Found.
                    </span>
                  </div>

              )}




              {/* Prime Therapist */}
              <div className="flex flex-col items-start md:items-center gap-4">
                <div className="fs-48-400-lato txt-color-red">
                  Our Prime Therapists
                </div>
              </div>

              {loading? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                  {[...Array(skeletonCount)].map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                primeItems?.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                      {primeItems?.slice(0, primeItemsLimit)?.map((item, index) => (
                        <Card pic={item?.img} key={index} item={item} topIcon={getIconID(item?.subscription?.title)} />
                      ))}
                    </div>

                    {primeItemsLimit < primeItems.length && (
                      <div className="pt-4 flex flex-col items-center gap-3">
                        <div className="fs-16-500-lato txt-color-red">
                          Continue Exploring Prime Therapists
                        </div>
                        <button
                          onClick={() => handleShowMore('PRIME')}
                          className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-red w-full md:w-auto"
                        >
                          SHOW MORE
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
                    <span className="text-lg fs-16-600-lato txt-color-red font-semibold font-secondary text-brand-primary">
                      No Prime Listing Found.
                    </span>
                  </div>
                )
              )}


              {/* Premium Therapist */}

              <div className="flex flex-col items-start md:items-center gap-4">
                <div className="fs-48-400-lato txt-color-red">
                  Our Premium Therapists
                </div>
              </div>

              {loading  ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                  {[...Array(skeletonCount)].map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                </div>
              ) :
                (
                  premiumItems?.length > 0 ?
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                        {premiumItems?.slice(0, premiumItemsLimit)?.map((item, index) => (
                          <Card pic={item?.img} key={index} item={item} topIcon={getIconID(item?.subscription?.title)} />
                        ))}
                      </div>

                      {premiumItemsLimit < premiumItems.length && (
                        <div className="pt-4 flex flex-col items-center gap-3">
                          <div className="fs-16-500-lato txt-color-red ">
                            Continue Exploring Premium Therapists
                          </div>
                          <button
                            onClick={() => handleShowMore('PREMIUM')}
                            className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-red w-full md:w-auto"
                          >
                            SHOW MORE
                          </button>
                        </div>
                      )}
                    </>
                    :
                    <div class="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
                      <span class="text-lg fs-16-600-lato  txt-color-red  font-semibold font-secondary text-brand-primary">
                        No Prime Listing Found.
                      </span>
                    </div>

                )}






              {/* Standard Therapist */}
              <div className="flex flex-col items-start md:items-center gap-4">
                <div className="fs-48-400-lato txt-color-red">
                  Our Standard Therapists
                </div>
              </div>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                  {[...Array(skeletonCount)].map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                standardItems?.length > 0 ?
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
                      {standardItems?.slice(0, standardItemsLimit)?.map((item, index) => (
                        <>

                          <Card pic={item?.img} key={index} item={item} topIcon={getIconID(item?.subscription?.title)} />
                        </>

                      ))}
                    </div>

                    {standardItemsLimit < standardItems.length && (
                      <div className="pt-4 flex flex-col items-center gap-3">
                        <div className="fs-16-500-lato txt-color-red ">
                          Continue Exploring Standard Therapists
                        </div>
                        <button
                          onClick={() => handleShowMore('STANDARD')}
                          className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-red w-full md:w-auto"
                        >
                          SHOW MORE
                        </button>
                      </div>
                    )}
                  </>
                  :
                  <div class="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
                    <span class="text-lg fs-16-600-lato  txt-color-red  font-semibold font-secondary text-brand-primary">
                      No Standard Listing Found.
                    </span>
                  </div>

              )}

            </>
          )}
          {open && (
            <FilterDrawer
              open={open}
              onClose={onClose}
              placement={placement}
              clearAll={clearAll}
              applyAll={applyAll}
              serviceTypeFilter={filterServiceType}
              handleFilters={handleFilters}
              radius={filterRadius}
              location={filterLocation}
              service={filterService}
              filters={filters}
              isSearchPage={false}
              city={filterCity}
              brough={filterBrough}
              broughLocation={filterBroughLocation}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingList;
