import React from "react";

const style = {
    backgroundColor: "#ffffff",
    width: 300,
    height: "auto", // 높이를 자동으로 조절하도록 변경
    display: "flex",
    // flexDirection: "column", // 알림 목록을 세로로 표시
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 20px #777777",
    padding: "10px", // 약간의 패딩 추가
    marginBottom: "10px", // 각 알림 사이에 여백 추가
};

export function UptoDate() {
    // userdata가 null일 경우를 대비해 기본값 설정
    const userdata = JSON.parse(localStorage.getItem("userdata") || '{}');
    // notifies가 undefined일 경우를 대비해 기본값 설정
    const notifies = userdata.notifies || [];
    // console.log(notifies);

    return (
        <>
        {/* <div>테스트</div> */}
        {/* <div style={style}> */}
            {notifies.length === 0 ? <div style={style}>최근 알림이 없습니다.</div> 
            : notifies.map((notify) => (
                // Notice 컴포넌트에 알림 객체의 실제 필드명을 사용
                <Notice content={notify.content} />
            ))}
        {/* </div> */}
        </>
    );
}

function Notice(props) { // props를 알림 객체의 실제 필드명에 맞게 변경
    const titleStyle = {
        color: "#000000",
        fontSize: 16,
        fontWeight: 400,
    };

    const detailStyle = {
        color: "#000000",
        fontSize: 12,
        fontWeight: 400,
    };

    return (
        <div style={style}>
            <div style={{
                backgroundColor: "#967E76",
                borderRadius: "5px",
                height: "10px",
                width: "10px",
                position: "relative",
            }}/>
            <div style={{ position: "relative", left: "40px", top: "-20px" }}>
                <div style={titleStyle}>{ props.title }</div>
            </div>
            <div style={{ position: "relative", left: "100px", top: "-20px"}}>
                <div style={detailStyle}>{ props.type }</div>
            </div>
            <div style={{ position: "relative", left: "-30px", top: "20px" }}>
                <div style={detailStyle}>{ props.details }</div>
            </div>
        </div>
    );
}

export default UptoDate;
