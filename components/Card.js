import Image from "next/image";

const Card = () => {
  return (
    <div className="bg-[#171717] rounded-lg px-4 gap-x-10 gap-y-2 sm:px-6 py-3 sm:py-5 flex-col flex sm:flex-row ">
      <div className="flex-none">
        <Image className="rounded-lg object-cover" src="/images/map.jpg" width={330} height={150} />
      </div>
      <ul className="flex-1 flex flex-col justify-between sm:text-[18px]">
        <li>
          <span className="text-[#c0bdc0]">Ride Id: </span>002
        </li>
        <li>
          <span className="text-[#c0bdc0]">Origin Station: </span>20
        </li>
        <li>
          <span className="text-[#c0bdc0]"> station_path: </span>[13,34,53,64,56,56]
        </li>
        <li>
          <span className="text-[#c0bdc0]">Date: </span>15th Feb 2022 16:33
        </li>
        <li>
          <span className="text-[#c0bdc0]">Distance: </span>1
        </li>
      </ul>
    </div>
  );
};

export default Card;
