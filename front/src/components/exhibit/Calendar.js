import { useEffect, useState } from 'react';
import './Calendar.css'

export default function Calendar() {
  const today = new Date();
  // let [year, month, date, day] = [today.getFullYear(), today.getMonth()+1, today.getDate(), today.getDay()];
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()+1);
  const [date, setDate] = useState(today.getDate());
  const [day, setDay] = useState(today.getDay());
  
  // 이전 달의 마지막 날 날짜와 요일 구하기
  var startDay = new Date(year, month, 0);
  var prevDate = startDay.getDate();
  var prevDay = startDay.getDay();

  // 이번 달의 마지막날 날짜와 요일 구하기
  var endDay = new Date(year, month + 1, 0);
  var nextDate = endDay.getDate();
  var nextDay = endDay.getDay();

  // console.log(today)
  // console.log(endDay)

  // console.log(prevDate, prevDay, nextDate, nextDay);

  const [startExhibit, setStartExhibit] = useState();
  const [endExhibit, setEndExhibit] = useState();
  const [period, setPeriod] = useState([]);
  const [dateClass, setDateClass] = useState("");

  function checkDate(day) {
    return(
      `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    )
  }

  let dates = [];

  // if (currentDate >= startDate && currentDate <= endDate) {
  //   newExhibits.push(dummy.exhibits[i])
  // }

  function changeDate() {

  }

  for (let i=1; i<=7; i++) {
    dates.push(<div onClick={async ()=>{
      if(!startExhibit) {
        const newStart = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        setStartExhibit(newStart)
        setDateClass("startExhibit")
      } else {
        if (!endExhibit) {
          const newEnd = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
          if (startExhibit <= newEnd) {
            setEndExhibit(newEnd)
          } else {
            alert('종료일을 시작일 이후로 선택해주세요.')
          }
        } else {
          const newStart = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
          setStartExhibit(newStart)
          setEndExhibit()
        }
      }
    }}>{i}</div>)
  }

  return (
    <div className="calendar">
      <div className="changeMonth">
        <div className="prev" onClick={()=>{
          let newMonth = month - 1;
          if (month === 1) {
            newMonth = 12;
          }
          setMonth(newMonth)
          if (newMonth === 12) {
            setYear(year-1)
          }
        }}>{"<"}</div>
        <span>{year}.{String(month).padStart(2,'0')}</span>
        <div className="next" onClick={()=>{
          const newMonth = month%12 + 1;
          setMonth(newMonth)
          if (newMonth === 1) {
            setYear(year+1)
          }
        }}>{">"}</div>
      </div>
      <hr/>
      <div className="days">
        <div className="day">일</div>
        <div className="day">월</div>
        <div className="day">화</div>
        <div className="day">수</div>
        <div className="day">목</div>
        <div className="day">금</div>
        <div className="day">토</div>
      </div>
      <div className="dates">

        {/* 테스트 !! */}
        {dates}
        {/* <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div> */}

      </div>
      {`시작일:${startExhibit?startExhibit:""} / 종료일:${endExhibit?endExhibit:""}`}

      {/* <div className="days">
        <div className="day">
          <div>일</div>
        </div>
        <div className="day">
          <div>월</div>
        </div>
        <div className="day">
          <div>화</div>
        </div>
        <div className="day">
          <div>수</div>
        </div>
        <div className="day">
          <div>목</div>
        </div>
        <div className="day">
          <div>금</div>
        </div>
        <div className="day">
          <div>토</div>
        </div>
      </div> */}

    </div>
  )
}