import dayjs from 'dayjs';

export const showDate = (pastDate: string) => {
  if (!pastDate) {
    return '';
  }
  const today = dayjs();

  const diff = today.diff(dayjs(pastDate));
  const dur = dayjs.duration(diff);

  const years = Math.abs(dur.years());
  const months = Math.abs(dur.months());
  const days = Math.abs(dur.days());
  const hours = Math.abs(dur.hours());
  const minutes = Math.abs(dur.minutes());

  // console.log('🎉 showDate 디버그 로그');
  // console.log('today', today.$d);
  // console.log('target', dayjs(pastDate).$d);
  // console.log('years', years);
  // console.log('months', months);
  // console.log('days', days);
  // console.log('hours', hours);
  // console.log('minutes', minutes);

  if (days >= 4 || months >= 1 || years >= 1) {
    return dayjs(pastDate).format('YYYY년 M월 D일');
  } else if (days >= 1) {
    return `${days}일 전`;
  } else if (hours < 24 && hours >= 1) {
    return `${hours}시간 전`;
  } else if (minutes < 60 && minutes >= 1) {
    return `${minutes}분 전`;
  } else {
    return `1분 전`;
  }
};
