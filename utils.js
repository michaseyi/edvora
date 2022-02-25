import moment from "moment";
export const getDistanceToNearestStop = (stationStops, stationCode) => {
  return Math.min(...stationStops.map((station) => Math.abs(stationCode - station)));
};

// changes date in format like "02/20/2022 09:28 PM" to eg "15th Dec 2021 19:16"
export const formatDate = (date) => {
  return moment(getTimeInMilliseconds(date)).format("Do MMM YYYY HH:mm");
};

// converts station path array to string
export const formatStationPath = (stationPath) => {
  return `[${stationPath.join(", ")}]`;
};

// converts time in  eg "02/20/2022 09:28 PM" to something like 16126237238
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

// sort rides based on the tabs eg. nearest, upcoming and past
export const sortRides = (type, rides, stationCode) => {
  let data = [...rides];
  let date = new Date().getTime();
  switch (type) {
    case "nearest":
      // removes duplicate rides sorting by nearest
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

// filters input date based on the filters
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

// removes duplicate rides
export const removeDuplicateRides = (data) => {
  let checkedIds = [];
  let duplicateFree = [];

  data.forEach((current) => {
    if (!checkedIds.includes(current.id)) {
      checkedIds.push(current.id);
      duplicateFree.push(current);
    }
    return duplicateFree;
  });
  // return data.filter((ride) => {
  //   let returnValue = false;
  //   if (!checkedIds.includes(ride.id)) {
  //     checkedIds.push(ride.id);
  //     returnValue = true;
  //   }
  //   return returnValue;
  // });
};
