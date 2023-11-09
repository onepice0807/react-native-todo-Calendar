import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isBetween);

export default function Practicedayjs() {
  const now = dayjs('2023-1108 10:00:00');
  console.log(now);

  console.log('1. set mintue: ', dayjs(now).set('minute', 5));
  console.log('2. set hour: ', dayjs(now).set('hour', 5));
  console.log('3. set date: ', dayjs(now).set('date', 5));

  console.log('4. get hour: ', dayjs(now).get('hour'));
  console.log('5. get year: ', dayjs(now).get('year'));
  console.log('6. get month: ', dayjs(now).get('month')); // 0 ~ 11
  console.log('7. get day: ', dayjs(now).get('day')); // 0 (일요일) ~ 6(토요일)

  console.log('8. add hour: ', dayjs(now).set(10, 'hour')); // add(더할 숫자, 기준)
  console.log('9. add day: ', dayjs(now).subtract(20, 'day'));
  console.log(
    '10. add date, format(출력형식변환): ',
    dayjs(now).subtract(20, 'day').format('YYYY.MM.DD hh:mm:ss')
  );
  console.log('11. startOf: ', dayjs(now).startOf('month'));
  console.log('12. endOf: ', dayjs(now).endOf('month'));

  const date1 = dayjs('2023-10-31 15:00:20');

  const date2 = dayjs('2023-10-31 16:30:15');

  console.log('13. isSame Month :', dayjs(date1).isSame(date2, 'month'));
  console.log('14. isSame date :', dayjs(date1).isSame(date2, 'date'));
  console.log('15. isBefore date :', dayjs(date1).isBefore(date2, 'date'));
  console.log('16. isAfter date :', dayjs(date1).isAfter(date2, 'date'));
  console.log('17. isAfter hour :', dayjs(date1).isAfter(date2, 'hour'));
  //   isSameOrBefore, isSameOrAfter
  console.log(
    '18. isBetween :',
    dayjs('2023-10-31 15:30:01').isBetween(date1, date2)
  );
}
