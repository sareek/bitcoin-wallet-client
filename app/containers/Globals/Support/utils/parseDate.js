import moment from 'moment';

const parseDate = (date) => {
  return moment(date).format("YYYY-MM-DD")
};

export default parseDate;
