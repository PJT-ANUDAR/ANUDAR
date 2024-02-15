import { useEffect, useState } from 'react'
import Exhibit from '../components/exhibit/Exhibit';
import ToolTip from '../components/exhibit/ToolTip';
import './ExhibitPage.css'

export default function ExhibitRegistPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(<div className="profileImg"></div>);
  const [poster, setPoster] = useState();

  let [curY, curM] = [0, 0];

  const curDate = new Date();
  curY = curDate.getFullYear();
  curM = String(curDate.getMonth()+1);
  
  const [exhibitY, setExhibitY] = useState(curY);
  const [exhibitM, setExhibitM] = useState(curM);
  const [exhibitEndD, setExhibitEndD] = useState(getEndDate(exhibitY, exhibitM));
  const [isEnd, setIsEnd] = useState(true);

  const [docentDate, setDocentDate] = useState(1);
  const [docentHour, setDocentHour] = useState(10);
  const [docentMinute, setDocentMinute] = useState("00");

  const [lastSat, setLastSat] = useState();
  const [ampm, setAmpm] = useState("am");

  const [fileName, setFileName] = useState();

  
  function getEndDate(year, month) {
    return(new Date(year, month, 0).getDate())
  }

  function getLastSat() {
    setExhibitEndD(new Date(exhibitY, exhibitM, 0).getDate())
    var lastDay = new Date(exhibitY, exhibitM-1, exhibitEndD).getDay() + 1
    if (lastDay < 7) {
      setLastSat(exhibitEndD - lastDay)
    } else {
      setLastSat(exhibitEndD)
    }
  }

  useEffect(()=>{
    setExhibitEndD(new Date(exhibitY, exhibitM, 0).getDate())
    var lastDay = new Date(exhibitY, exhibitM-1, exhibitEndD).getDay() + 1
    if (lastDay < 7) {
      setLastSat(exhibitEndD - lastDay)
    } else {
      setLastSat(exhibitEndD)
    }
  })

  const upload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setFileName(file.name)

    return new Promise((resolve) => {
        reader.onload = () => {
            // *수정* 취소 눌렀을 때 오류
            setPreview(<img style={{width:270, height:360, objectFit: "cover"}} src={(reader.result || null)} />)
            setPoster(reader.result || null);
            resolve();
        };
    });
  }

  function checkInput(event, inputType) {
    if (inputType === "exhibitY") {
        const y = event.target.value
        if (y.length == 4 && y < curY) { alert('입력할 수 없는 년도입니다.'); setExhibitY(curY); getLastSat() }
        else { setExhibitY(y.slice(0, 4)); getLastSat() }
    } else if (inputType === "exhibitM") {
        const m = event.target.value
        console.log(m)
        if (m > 12 || m < 0 || (exhibitY === curY && m < curM && m.length)) { alert('입력할 수 없는 달 입니다.'); setExhibitM(curM); getLastSat() }
        else { setExhibitM(m.slice(0, 2)); getLastSat() }
    } else if (inputType === "docentDate") {
        const d = event.target.value
        if (d > exhibitEndD) { console.log('gg') }
        else { setDocentDate(d.slice(0, 2)) }
    } else if (inputType === "docentHour") {
        const h = event.target.value
        if ((h.slice(0, 2) > 12 || h.slice(0, 2) < 1)) { alert("1 ~ 12 사이의 숫자를 입력해주세요."); setDocentHour(10) }
        else { setDocentHour(h.slice(0, 2)) }
    } else if (inputType === "docentMinute") {
        const m = event.target.value
        if ((m.slice(0, 2) > 59 || m.slice(0, 2) < 0)) { alert("0 ~ 59 사이의 숫자를 입력해주세요."); setDocentMinute(0) }
        else { setDocentMinute(m.slice(0, 2)) }
    }
  }


  return (
    <div className="exhibitRegist">

      <input onChange={(event)=>{
        const n = event.target.value
        console.log(Number(n))
      }}
      />

      <div style={{textAlign:"left", fontSize:"28px", fontWeight:"900", color:"#967E76"}}>전시회 등록하기</div>
      {/* <div style={{fontSize:"18px", marginTop:"10px"}}>온라인으로 나의 작품을 선보일 수 있는 기회!</div>
      <div style={{fontSize:"18px"}}>도슨트와 함께 더욱 풍성한 전시회를 꾸며보세요</div> */}
      <hr style={{width:"100%", border:"1px solid #EEE3CB", margin:"20px 0"}}/>
      <div className="registColumn">
        {/* 대표 이미지 */}
        <div className="registPoster">
          <div className="registTitle">대표 이미지</div>
          <div className="registDescription">전시회 목록에서 보여질 이미지입니다.</div>
          {/* *수정* : artist = username */}
          <Exhibit exhibitType={3} exhibit={{"title":(title?title:"전시회 이름"), "artist":"작가명(API)", "start":`${exhibitY}-${String(exhibitM).padStart(2, '0')}-01`, "end":`${exhibitY}-${String(exhibitM).padStart(2, '0')}-${String(exhibitEndD).padStart(2,'0')}`, "image":preview}}/>
        </div>
        {/* 전시회 정보 */}
        <div className="registInfo">
          <div className="registTitle">전시회 정보</div>
          <div className="registDescription"><span>*</span>는 필수 입력사항입니다.</div>

          {/* 전시회 이름 */}
          <div className="registInput">
            <div className="item1"><span>*</span> 전시회 이름</div>
            <input id="exhibitTitle" placeholder="최대 글자수 20자" maxLength="20" onChange={(event)=>{setTitle(event.target.value)}}/>
          </div>

          {/* 전시회 설명 */}
          <div className="registInput" style={{marginBottom:"2px"}}>
            <div className="item1"><span>*</span> 전시회 설명</div>
            <textarea id="exhibitDescription" placeholder="최대 글자수 255자" maxLength="255" onChange={(event)=>{setDescription(event.target.value)}}/>
          </div>
          <div style={{textAlign:'right', fontSize:"12px", marginBottom:"5px"}}>{description.length}/255</div>

          {/* 전시회 기간 */}
          <div className="registInput">
            <div className="item1"><span>*</span> 전시회 기간</div>
            <div className="item2">
              {/* 시작일 */}
              <div className="periodSetting" style={{marginBottom:"5px"}}>
                <span>시작일</span>
                <input type="number" value={exhibitY} onChange={ event => checkInput(event, "exhibitY") } style={{width:"35px"}} /><span>/</span>
                <input type="number" value={exhibitM} onChange={ event => checkInput(event, "exhibitM") } /><span>/ 1</span> 
              </div>
              {/* 종료일 */}
              <div className="periodSetting">
                종료일 {exhibitY.length === 4?exhibitY:curY} / {exhibitM?exhibitM:curM} / {exhibitEndD}
                <input type="checkbox" onClick={()=>{ setIsEnd(!isEnd) }}/>
                <label for="endCheck" style={{fontSize:"14px"}}>종료일 후 전시</label>
                <ToolTip size={17} img="tooltip.png" ariaLabel="전시 기간 종료 후 전시 여부를 체크해주세요"/>
              </div>
            </div>
          </div>


          <div className="registInput">
            <div className="item1"><span>*</span> 도슨트 일정</div>
            <div className="item2">
              <div className="docentSetting">
                <div>{`${exhibitY.length === 4?exhibitY:curY} / ${exhibitM?exhibitM:curM} / `}</div>
                <input type="number" value={docentDate} onChange={ event => checkInput(event, "docentDate") } />
                <select value={ampm} style={{marginLeft:"15px"}} onChange={ event => setAmpm(event.target.value) }>
                  <option value={"am"}>오전</option>
                  <option value={"pm"}>오후</option>
                </select>
                <input type="number" value={docentHour} onChange={ event => checkInput(event, "docentHour") } /><span>:</span>
                <input type="number" value={docentMinute} onChange={ event => checkInput(event, "docentMinute") } />
                {/* <div>{ampm==="am"?docentHour:docentHour+12}</div>
                  <div>{docentHour}</div> */}
                {/* </div> */}
              </div>
              <div className="docentSetting">
                <span className="registGuide">경매일({(exhibitY&&exhibitM)?lastSat:""}일) 이전으로 설정해주세요.</span>
                <ToolTip size={17} img="tooltip.png" ariaLabel="경매는 매월 마지막주 토요일에 진행됩니다"/>
              </div>
            </div>
          </div>


          <div className="registInput" style={{marginBottom:"2px"}}>
            <div className="item1"><span>*</span> 대표 이미지</div>
            <div className="item3" style={{display:"flex", flexDirection:"column"}}>
              <div style={{display:"flex"}}>
                <span>{fileName}{fileName?<img src='../asset/delete_button.png' onClick={()=>{setPreview(<div className="profileImg"></div>); setFileName()}}></img>:""}</span>
                <label className="uploadBtn" for="poster">선택</label>
                <input type="file" id="poster" accept="image/*" onChange={event => upload(event)} style={{ display: "none" }}/>
              </div>
              <div className="registGuide">권장이미지 375px * 500px 이상</div>
            </div>
          </div>

          {/* 캐러셀 작품 선택 최소 1개 - 최대 10개 */}
        </div>
      </div>
    </div>
  )
}