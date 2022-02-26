import Head from "next/head";
import Header from "../components/Header";
import CardContainer from "../components/CardContainer";
import { useEffect, useRef, useState } from "react";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { removeDuplicateRides, sortRides } from "../utils";
import axios from "axios";
import FilterButton from "../components/FilterButton";
import ClearIcon from "@mui/icons-material/Clear";

export default function Home() {
  const [currentTab, setCurrentTab] = useState([]);
  const [active, setActive] = useState("nearest");
  const [isFilterToggled, setIsFilterToggled] = useState(false);
  const [isStateToggled, setIsStateToggled] = useState(false);
  const [isCityToggled, setIsCityToggled] = useState(false);
  const [ridesData, setRidesData] = useState([]);
  const [userData, setUserData] = useState({});
  const [filter, setFilter] = useState({ state: null, city: null });
  const [isFetching, setIsFetching] = useState(true);

  // Refs for state and city dropdown
  const scrollStateUp = useRef(null);
  const scrollCityUp = useRef(null);

  // Gets data from api
  const getData = () => {
    axios
      .get("/api/user_data")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        alert("Error fetching data, please click the button to refresh");
        location.reload();
      });
    axios
      .get("/api/rides_data")
      .then((res) => {
        setRidesData(res.data);
        setIsFetching(false);
      })
      .catch((err) => {
        alert("Error fetching data, please click the button to refresh");
        location.reload();
      });
  };

  const handleClick = (current) => {
    setActive(current);
    setCurrentTab(
      sortRides(current, current === "nearest" ? removeDuplicateRides(ridesData) : ridesData, userData.station_code)
    );

    // scrolls to top on tab change
    window.scrollTo(0, 0);

    //resets filter on tab change
    setFilter({});
  };

  const toggleFilterBox = () => {
    setIsFilterToggled(!isFilterToggled);
    setIsCityToggled(false);
    setIsStateToggled(false);
    scrollCityUp.current.scrollTop = 0;
    scrollStateUp.current.scrollTop = 0;
  };
  const toggledState = () => {
    setIsStateToggled(!isStateToggled);
    scrollStateUp.current.scrollTop = 0;
    setIsCityToggled(false);
  };
  const toggledCity = () => {
    setIsCityToggled(!isCityToggled);
    scrollCityUp.current.scrollTop = 0;
    setIsStateToggled(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    ridesData && userData && setCurrentTab(sortRides(active, ridesData, userData.station_code));
  }, [ridesData, userData]);

  // scrolls to top on filter change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  return (
    <div>
      <Head>
        <title>Edvora Test</title>
        <meta name="description" content="Created by Michael Adewole" />
        <meta name="theme-color" content="#101010" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header starts here */}
      <Header name={userData.name} profilePic={userData.url} isFetching={isFetching} />

      {/* Main starts here */}
      {/* sm:top-[5.55rem] top-[5.05rem]  */}
      <main className="px-4" unselectable="on">
        <div className="container mx-auto ">
          <div className="flex items-center bg-[#292929] justify-between py-3 sm:py-6 top-0 sticky z-30 ">
            {/* Tabs start here */}

            {/* Tab header */}
            <ul className="text-sm text-center sm:text-[18px] text-[#7c7a7c] font-[inter] flex items-center gap-x-2 sm:gap-x-6 select-none">
              <li
                onClick={() => handleClick("nearest")}
                className={
                  active === "nearest"
                    ? "text-white font-[600] border-b-2 cursor-pointer transition-all ease-linear"
                    : "transition-all ease-linear cursor-pointer"
                }
              >
                Nearest rides
              </li>
              <li
                onClick={() => handleClick("upcoming")}
                className={
                  active === "upcoming"
                    ? "text-white font-[600] border-b-2 cursor-pointer transition-all ease-linear "
                    : "cursor-pointer transition-all ease-linear"
                }
              >
                Upcoming rides{" "}
                {`${!isFetching ? `(${sortRides("upcoming", ridesData, userData.station_code).length})` : ""}`}
              </li>
              <li
                onClick={() => handleClick("past")}
                className={
                  active === "past"
                    ? "text-white font-[600] border-b-2 cursor-pointer transition-all ease-linear"
                    : "cursor-pointer transition-all ease-linear"
                }
              >
                Past rides {`${!isFetching ? `(${sortRides("past", ridesData, userData.station_code).length})` : ""}`}
              </li>
            </ul>
            <div className="select-none relative">
              {/* Toogle filter modal */}

              <button className="sm:space-x-2 flex items-center relative z-50" onClick={toggleFilterBox}>
                <FilterButton />
                <span className="hidden sm:inline-flex cursor-pointer">Filter</span>
              </button>
              {/* Overlay for filter modal*/}

              <div
                onClick={toggleFilterBox}
                className={`${isFilterToggled && "fixed top-0 left-0 w-full h-full  z-40"}`}
              ></div>
              {/* Filter modal */}

              <div className={`${!isFilterToggled && "opacity-0"} transition-opacity relative z-50`}>
                <div className="absolute right-0 -bottom-[10.3rem] bg-[#101010] w-[13rem] h-[10rem] shadow-xl rounded-xl z-20 p-4 flex flex-col justify-between  ">
                  <h3 className="text-[#979797]">Filters</h3>
                  <hr className="bg-[#979797] border-none h-[1px] my-1.5" />
                  <button
                    className="flex items-center justify-between w-full bg-[#292929] px-2 py-1 focus:ring-4 ring-[#3b3b3b] rounded-lg cursor-pointer relative"
                    onClick={toggledState}
                  >
                    State <ArrowDropDownSharpIcon />
                    {/* Drop down for state filter */}
                    <div
                      className={`${
                        !isStateToggled && "hidden"
                      } absolute w-full left-0 top-[calc(100%+10px)] bg-[#292929] z-40 rounded-lg shadow-xl`}
                    >
                      <ul ref={scrollStateUp} className="text-left px-2 overflow-y-auto max-h-56">
                        <li
                          onClick={() => setFilter({ ...filter, state: null })}
                          className="text-right py-0.5 text-black"
                        >
                          <ClearIcon />
                        </li>
                        {[...new Set(ridesData.map((ride) => ride.state))].sort().map((state) => (
                          <li
                            key={state}
                            className="truncate py-1 hover:text-gray-400 text-sm"
                            onClick={() => setFilter({ state })}
                          >
                            {state}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                  <button
                    className="flex items-center justify-between w-full bg-[#292929] px-2 py-1 rounded-lg cursor-pointer focus:ring-4 ring-[#3b3b3b] relative"
                    onClick={toggledCity}
                  >
                    City
                    <ArrowDropDownSharpIcon />
                    {/* Drop down for city filter */}
                    <div
                      className={`${
                        !isCityToggled && "hidden"
                      } absolute w-full left-0 top-[calc(100%+10px)] bg-[#292929] z-40 rounded-lg shadow-xl`}
                    >
                      <ul ref={scrollCityUp} className="text-left px-2 overflow-y-auto max-h-56">
                        <li
                          onClick={() => setFilter({ ...filter, city: null })}
                          className="text-right py-0.5 text-black"
                        >
                          <ClearIcon />
                        </li>
                        {!filter.state
                          ? [...new Set(ridesData.map((ride) => ride.city))].sort().map((city) => (
                              <li
                                key={city}
                                className="truncate py-1 hover:text-gray-400 text-sm"
                                onClick={() => setFilter({ ...filter, city })}
                              >
                                {city}
                              </li>
                            ))
                          : [
                              ...new Set(
                                ridesData.filter((ride) => ride.state === filter.state).map((ride) => ride.city)
                              ),
                            ]
                              .sort()
                              .map((city) => (
                                <li
                                  key={city}
                                  className="truncate py-1 hover:text-gray-400 text-sm"
                                  onClick={() => setFilter({ ...filter, city })}
                                >
                                  {city}
                                </li>
                              ))}
                      </ul>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CardContainer
            currentTab={currentTab}
            isFetching={isFetching}
            stationCode={userData.station_code}
            filter={filter}
          />
        </div>
      </main>
    </div>
  );
}
