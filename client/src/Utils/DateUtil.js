const DateUtil = {
  getFormatedDateTime: (date) => {
    const dateTime = date.split("T");
    let time = "";
    if (dateTime.length > 0) {
      time += dateTime[0];
    }
    if (dateTime.length > 1) {
      const clock = dateTime[1].split(".");
      if (clock.length > 0) {
        time += " at " + clock[0];
      }
    }
    return time;
  },
};

export default DateUtil;
