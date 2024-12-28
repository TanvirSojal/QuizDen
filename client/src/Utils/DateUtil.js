const DateUtil = {
  getFormattedDateTime: (date) => {
    if (!date){
      return "-";
    }

    const dateTime = new Date(date);
    return dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
  },
};

export default DateUtil;
