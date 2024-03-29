import { motion } from "framer-motion";
import Image from "next/image";

const Card = ({ rideId, origin, stationPath, date, distance, map_url, state, city, skeleton }) => {
  return skeleton ? (
    <div className="bg-[#171717] rounded-lg px-4 gap-x-10 gap-y-2 sm:px-6 py-3 sm:py-5  sm:flex sm:flex-row  relative">
      <div className="mx-auto w-[330px] h-[150px] bg-[#292929] rounded-lg animate-pulse"></div>
      <ul className="flex-1 gap-2 flex flex-col justify-between pt-3 ">
        <li className="h-4 bg-[#292929] w-28 animate-pulse rounded-sm"></li>
        <li className="h-4 bg-[#292929] w-40 animate-pulse rounded-sm"></li>
        <li className="h-4 bg-[#292929] w-60 animate-pulse rounded-sm"></li>
        <li className="h-4 bg-[#292929] w-48 animate-pulse rounded-sm"></li>
        <li className="h-4 bg-[#292929] w-28 animate-pulse rounded-sm"></li>
        <li className="lg:absolute lg:mt-0 mt-1 right-4 top-4 flex items-center gap-x-5">
          <span className="h-4 bg-[#292929] w-28 animate-pulse rounded-sm"></span>
          <span className="h-4 bg-[#292929] w-28 animate-pulse rounded-sm"></span>
        </li>
      </ul>
    </div>
  ) : (
    <div className="bg-[#171717] rounded-lg px-4 gap-x-10 gap-y-2 sm:px-6 py-3 sm:py-5  sm:flex sm:flex-row  relative">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0.7,
          },
          visible: {
            opacity: 1,
            transition: { delay: 0.1},
          },
        }}
        className="sm:flex-none h-[155px] sm:h-[unset]  w-full sm:w-[200px] md:w-[300px] flex items-center relative"
      >
        <Image className="rounded-lg object-cover w-full relative" src={map_url} layout="fill" priority/>
      </motion.div>
      <ul className="grow flex flex-col justify-between pt-3 sm:py-0 sm:text-[18px]">
        <li>
          <span className="text-[#c0bdc0]">Ride Id : </span>
          {rideId}
        </li>
        <li>
          <span className="text-[#c0bdc0]">Origin Station : </span>
          {origin}
        </li>
        <li>
          <span className="text-[#c0bdc0]"> station_path : </span>
          {stationPath}
        </li>
        <li>
          <span className="text-[#c0bdc0]">Date : </span>
          {date}
        </li>
        <li>
          <span className="text-[#c0bdc0]">Distance : </span>
          {distance}
        </li>
        <li className="lg:absolute lg:mt-0 mt-1 text-sm font-[400] right-4 top-4 flex flex-wrap items-center sm:gap-x-5 gap-2">
          <span className="bg-black rounded-full  px-2">{city}</span>
          <span className="bg-black rounded-full  px-2">{state}</span>
        </li>
      </ul>
    </div>
  );
};

export default Card;
