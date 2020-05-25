import moment from 'moment';

const checkEscKey = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatDuration = (duration) => {
  const durationInMinutes = moment.duration(duration, `minutes`);

  return `${durationInMinutes.hours()}h ${durationInMinutes.minutes()}m`;
};

const getSubstring = (string, subtring) => {
  return string.substring(subtring.length);
};

export {checkEscKey, getSubstring, formatDate, formatDuration};
