import { React, useEffect, useState } from "react";
import "./myprofile.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { mainstate, mypagestate, popupstate } from "../../../StateManagement.jsx";
import Payment from "../../payment/Payment";
import { uploadimage, getFollowing, getFollowers, getUserPoints } from "../../../API";



export default function MyProfile() {

  const localdata = JSON.parse(localStorage.getItem("userdata"));
  const logintoken = localStorage.getItem("token");
  const [url, setUrl] = useState(localdata.image);
  const setnewprofileimage = mypagestate((state) => state.setnewprofileimage);
  const navigate = useNavigate();


  const setting = {
    overlay: {
      position: "fixed",
      backgroundColor: "#00000040",
    },
    content: {
      position: "absolute",
      border: "0",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      alignItems: "center"
    }
  };

  const myeditmode = mypagestate((state) => state.myeditmode);
  const paymentPopup = popupstate((state) => state.paymentPopup);
  const setPaymentPopup = popupstate((state) => state.setPaymentPopup);
  const following = async () => { return await getFollowing(logintoken); };
  const follower = async () => { return await getFollowers(logintoken); };
  const point = async () => {return await getUserPoints(logintoken);};
  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [points, setPoints] = useState(0);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (file === null) return
    const imageurl = await uploadimage(file);
    if (imageurl != "") {
      setUrl(imageurl);
      setnewprofileimage(imageurl);
    }
    else {
      alert("이미지를 등록할 수 없습니다.");
    }
  }

  useEffect(() => {
    following().then((value) => setFollowings(value.length));
    follower().then((value) => setFollowers(value.length));
    point().then((value) => setPoints(value))
  }, []);

  return (
    <div className="myprofilearea">
      <div className="left">
        <img style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius:"70%", overflow:"hidden" }} src={url} />
        <label style={{ display: myeditmode ? "flex" : "none" }} className="myprofileimage" for="profileurl">프로필 사진 수정</label>
        <input type="file" id="profileurl" accept="image/*" onChange={(e) => { upload(e); e.target.value = ""; }} style={{ display: "none" }} />
      </div>
      <div className="right">
        <div className="nickname"><b>{localdata.nickname}</b> 님</div>
        <div style={{ display: "flex", flexDirection: "row", }}>
          <div className="follower">팔로워 {followers}</div>
          <div className="following">팔로잉 {followings}</div>
        </div>
        <div id="myPoint">
          <div>
            <img width={30} src="../../asset/point.png"></img>
            <span>{points} POINT</span>
          </div>
          <button onClick={() => { setPaymentPopup(true) }}>충전</button>
          <Modal isOpen={paymentPopup} onRequestClose={() => { setPaymentPopup(false); }} style={setting}><Payment /></Modal>
        </div>
      </div>
    </div>
  );
}