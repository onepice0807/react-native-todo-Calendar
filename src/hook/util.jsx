import dayjs from 'dayjs';

export const getCalendarColumns = (now) => {
  const startDate = dayjs(now).startOf('month'); // 11.1
  //   console.log('startDate', startDate);
  const end = dayjs(now).endOf('month');
  const endDate = dayjs(now).endOf('month').get('date'); // 30  (반복문으로 달력을 채우기 위해)
  //   console.log('endDate', endDate);

  const columns = [];
  for (let i = 0; i < endDate; i++) {
    const date = dayjs(startDate).add(i, 'day'); // 날짜 타입으로 startDate에서 i 더한 날짜를 구함
    columns.push(date);
  }
  //   console.log('columns', columns);

  return filledEmptyColumns(columns, startDate, end);
};

// 비워진 날짜들 채우기
const filledEmptyColumns = (columns, startDate, end) => {
  const filledColumns = columns.slice(0); // 원본 배열 복사

  // -------------------- 첫날 이전 공백 채우기 ----------------------------
  const startDay = dayjs(startDate).get('day'); // 3 (수요일)

  for (let i = 1; i <= startDay; i++) {
    const date = dayjs(startDate).subtract(i, 'day');
    // console.log('date', date);
    filledColumns.unshift(date);
  }

  // ------------------------ 마지막 날 이후 공백 채우기 --------------------------
  const endDay = dayjs(end).get('day'); // 4 (목)

  for (let i = 1; i <= 6 - endDay; i++) {
    const date = dayjs(end).add(i, 'day');
    filledColumns.push(date);
  }

  //   console.log('filledColumns', filledColumns);

  return filledColumns;
};

const dayText = ['일', '월', '화', '수', '목', '금', '토'];
export const getDayText = (day) => {
  return dayText[day];
};

export const getDayColor = (day) => {
  return day === 0 ? '#f991c8' : day === 6 ? '#927dfc' : '#2b2b2b'; // 일요일, 토요일, 평일 색 구분
};
