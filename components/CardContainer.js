import React, { useEffect, useState } from "react";
import { applyFilter, formatDate, formatStationPath, getDistanceToNearestStop } from "../utils";
import Card from "./Card";

const CardContainer = ({ currentTab, isFetching, stationCode, filter }) => {
  const [filtered, setFilteres] = useState([]);

  useEffect(() => {});
  return (
    <div className="mb-4 mt-0 flex flex-col gap-y-4 min-w-full">
      {applyFilter(currentTab, filter.state, filter.city).map((ride, index) => (
        <Card
          key={index}
          rideId={ride.id}
          origin={ride.origin_station_code}
          stationPath={formatStationPath(ride.station_path)}
          date={formatDate(ride.date)}
          distance={getDistanceToNearestStop(ride.station_path, stationCode)}
          map_url={ride.map_url}
          state={ride.state}
          city={ride.city}
        />
      ))}
    </div>
  );
};

export default CardContainer;
