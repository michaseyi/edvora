import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CardContainer from "../components/CardContainer";
import { useEffect, useState } from "react";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";

export default function Home() {
  const [number, setNumber] = useState(4);
  const [active, setActive] = useState("nearest");
  const [isFilterToggled, setIsFilterToggled] = useState(false);
  const [isStateToggled, setIsStateToggled] = useState(false);
  const [isCityToggled, setIsCityToggled] = useState(false);
  const [filters, setfilters] = useState({});

  const handleClick = (number, current) => {
    setNumber(number);
    setActive(current);
  };

  const toggleFilterBox = () => {
    setIsFilterToggled(!isFilterToggled);
    setIsCityToggled(false);
    setIsStateToggled(false);
  };
  const toggledState = () => {
    setIsStateToggled(!isStateToggled);
    setIsCityToggled(false);
  };
  const toggledCity = () => {
    setIsCityToggled(!isCityToggled);
    setIsStateToggled(false);
  };

  return (
    <div>
      <Head>
        <title>Edvora Test</title>
        <meta name="description" content="Created by Michael Adewole" />
        <meta name="theme-color" content="#101010" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header starts here */}
      <Header name="Dhruv Singh" profilePic="/images/profile.jpg" />

      {/* Main starts here */}
      <main className="px-4 md:px-0">
        <div className="container mx-auto ">
          <div className="flex items-center bg-[#292929] justify-between py-3 sm:py-6 sticky top-[4.8rem] z-30 ">
            <ul className="text-sm text-center sm:text-[18px] text-[#7c7a7c] font-[inter] flex items-center gap-x-2 sm:gap-x-6 select-none">
              <li
                onClick={() => handleClick(2, "nearest")}
                className={active === "nearest" ? "text-white font-[600] border-b-2 cursor-pointer " : "cursor-pointer"}
              >
                Nearest rides
              </li>
              <li
                onClick={() => handleClick(1, "upcoming")}
                className={active === "upcoming" ? "text-white font-[600] border-b-2 cursor-pointer" : "cursor-pointer"}
              >
                Upcoming rides (4)
              </li>
              <li
                onClick={() => handleClick(3, "past")}
                className={active === "past" ? "text-white font-[600] border-b-2 cursor-pointer" : "cursor-pointer"}
              >
                Past rides (2)
              </li>
            </ul>
            <div className="select-none relative">
              {/* Toogle filter modal */}
              <button className="sm:space-x-2 flex items-center" onClick={toggleFilterBox}>
                <FilterListOutlinedIcon className="cursor-pointer" />
                <span className="hidden sm:inline-flex cursor-pointer">Filters</span>
              </button>

              {/* Filter modal */}
              <div className={`${isFilterToggled ? "block" : "hidden"}`}>
                <div className="absolute right-0 -bottom-[10.3rem] bg-[#101010] w-[11rem] h-[10rem] shadow-xl rounded-xl z-20 p-4 flex flex-col justify-between ">
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
                      } absolute w-full left-0 top-[calc(100%+7px)] bg-[#292929] z-40 rounded-lg shadow-xl`}
                    >
                      <ul className="text-left px-2">
                        <li>state a</li>
                        <li>state b</li>
                        <li>state c</li>
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
                      } absolute w-full left-0 top-[calc(100%+7px)] bg-[#292929] z-40 rounded-lg shadow-xl`}
                    >
                      <ul className="text-left px-2">
                        <li>city a</li>
                        <li>city b</li>
                        <li>city c</li>
                      </ul>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CardContainer number={number} />
        </div>
      </main>
    </div>
  );
}
