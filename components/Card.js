import Image from "next/image";

const Card = ({ rideId, origin, stationPath, date, distance, map_url, state, city }) => {
  return (
    <div className="bg-[#171717] rounded-lg px-4 gap-x-10 gap-y-2 sm:px-6 py-3 sm:py-5  sm:flex sm:flex-row  relative">
      <div className="flex items-center justify-center">
        <Image className="rounded-lg object-cover" src={map_url} width={330} height={150} />
      </div>
      <ul className="flex-1 flex flex-col justify-between pt-3 sm:py-0 sm:text-[18px]">
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
        <li className="lg:absolute lg:mt-0 mt-1 text-sm font-[400] right-4 top-4 flex items-center gap-x-5">
          <span className="bg-black rounded-full  px-2">{state}</span>
          <span className="bg-black rounded-full  px-2">{city}</span>
        </li>
      </ul>
    </div>
  );
};

export default Card;
