import { React, useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./auction.css";
import "../components/myinfo/myhistory/myhistory.css";
import WorkItem from "../components/work/workitem";
import ModalPopup from "../components/modal/modalpopup";
import { auctionlist, getLikeWorks } from "../API";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { mainstate } from "../StateManagement";

const sample = <div style={{ height: "150px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    <input type="text" placeholder="아이디" />
    <input type="password" placeholder="비밀번호" />
</div>;

const auctionworksetting = {
    className: "slickwork",
    infinite: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <img src="../asset/prev_arrow.png" />,
    nextArrow: <img src="../asset/next_arrow.png" />,
}

export default function Auction() {
    const isLogin = mainstate((state) => state.isLogin)

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [auctionitem, setAuctionItem] = useState([]);
    const [popupopen, setPopupOpen] = useState(false);
    const { modalsetting, pathName } = useContext(AppContext);

    const logintoken = mainstate((state) => state.logintoken);

    const okfunction = () => {
        if (localStorage.getItem("token")) {
            navigate("/auction/now");
        }
        else {
            alert("로그인 후 이용해주세요");
        }
    };

    const likeitems = async () => { return await getLikeWorks(logintoken); };
    const auctionitems = async () => { return await auctionlist(); }
    useEffect(() => {
        likeitems().then(value => { setList(value); console.log(value); }).catch(() => {  });
        auctionitems().then(value => { setAuctionItem(value); console.log(value); });
    }, [pathName])

    return (
        <div>
            <Modal isOpen={popupopen} style={modalsetting} onRequestClose={() => { setPopupOpen(false); }}>
                <ModalPopup
                    title="이달의 경매 입장하기"
                    detail="진행 중인 경매로 이동하시겠습니까?"
                    height={200}
                    content={<div style={{ height: "30px" }}>{ }</div>}
                    okfunction={() => { okfunction(); }}
                    cancelfunction={() => { setPopupOpen(false); }}
                    okbutton={true} okbuttonlabel="확인"
                    cancelbutton={true} cancelbuttonlabel="취소" />
            </Modal>
            <img onClick={() => { if(!isLogin){alert('로그인 후 이용해주세요.'); return}; setPopupOpen(true); }} style={{ cursor: "pointer" }} src="../asset/auction_entrance.png" />
            <div style={{ position: "relative", textAlign: "end", color: "#848484", }}>클릭하면 경매장으로 이동합니다.</div>
            <div className="auctionworkarea">
                {list ?
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Slider {...auctionworksetting}>
                            {Object.values(list).map((value) => {
                                return <div>
                                    <div style={{ width: "400px", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <WorkItem width="300px" height="300px" work={value} />
                                    </div>
                                </div>;
                            }
                            )}
                        </Slider>
                    </div>
                    : <div style={{ width: "400px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>{logintoken != "" ? "찜한 작품이 없습니다" : "로그인 후 조회 가능합니다"}</div>}
            </div>
            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "60px" }}>
                <div className="dataarea">
                    {Object.values(auctionitem).map((value) => { return <WorkItem width="250px" height="250px" work={value} /> })}
                </div>
            </div>
        </div>
    );
}