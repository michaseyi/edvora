const FilterButton = () => {
  return (
    <div className="flex flex-col justify-between h-3 w-5 cursor-pointer">
        <div className="bg-white w-full h-[1.5px]"></div>
        <div className="bg-white w-[75%] h-[1.5px]"></div>
        <div className="bg-white w-[35%] h-[1.5px] md:h-[2px]"></div>
    </div>
  )
}

export default FilterButton