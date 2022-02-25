import moment from "moment";
export const getDistanceToNearestStop = (stationStops, stationCode) => {
  return Math.min(...stationStops.map((station) => Math.abs(stationCode - station)));
};

export const formatDate = (date) => {
  return moment(getTimeInMilliseconds(date)).format("Do MMM YYYY HH:mm");
};

export const formatStationPath = (stationPath) => {
  return `[${stationPath.join(", ")}]`;
};

export const getTimeInMilliseconds = (date) => {
  date = date.split(" ");
  let day = date[0].split("/")[1];
  let month = date[0].split("/")[0];
  let year = date[0].split("/")[2];
  let hour = (() => {
    if (date[2] == "AM" && date[1].split(":")[0] == "12") {
      return 0;
    }
    return date[2] == "AM" ? date[1].split(":")[0] : parseInt(date[1].split(":")[0]) + 12;
  })();
  let minute = date[1].split(":")[1];

  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute)).getTime();
};

export const sortRides = (type, rides, stationCode) => {
  let data = [...rides];
  let date = new Date().getTime();
  switch (type) {
    case "nearest":
      data.sort((a, b) => {
        return (
          getDistanceToNearestStop(a.station_path, stationCode) - getDistanceToNearestStop(b.station_path, stationCode)
        );
      });
      return data;
    case "upcoming":
      return data
        .filter((ride) => getTimeInMilliseconds(ride.date) > date)
        .sort((a, b) => getTimeInMilliseconds(a.date) - getTimeInMilliseconds(b.date));
    case "past":
      return data
        .filter((ride) => getTimeInMilliseconds(ride.date) < date)
        .sort((b, a) => getTimeInMilliseconds(a.date) - getTimeInMilliseconds(b.date));
  }
};

export const applyFilter = (data, state, city) => {
  switch (true) {
    case Boolean(state) && Boolean(city):
      return data.filter((ride) => ride.state == state && ride.city == city);
    case Boolean(state) && !Boolean(city):
      return data.filter((ride) => ride.state === state);
    case !Boolean(state) && Boolean(city):
      return data.filter((ride) => ride.city === city);
    default:
      return data;
  }
};
