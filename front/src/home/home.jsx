import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Slider from "react-slick";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExhibitionItem from "../components/work/exhibitionitem";
import WorkItem from "../components/work/workitem";
import { getCurExhibitList, getWorks } from "../API";

const homecarousel = [
    "../asset/carousel_1.png",
    "../asset/carousel_2.png",
    "../asset/carousel_3.png",
    "../asset/carousel_4.png",
    "../asset/carousel_5.png",
];

const setting = {
    dots: true,
    dotsClass: "slidedots",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

// const customsetting = {
//     dots: true,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     slidesToScroll: 1,
// }

const exhibitionNow = [
    {
        url: "../../asset/pic1.png",
    },
    {
        url: "../../asset/pic2.png",
    },
    {
        url: "../../asset/pic3.png",
    },
];

const worksthisweek = [
    {
        url: "../../asset/work1.jpg",
    },
    {
        url: "../../asset/work3.jpg",
    },
    {
        url: "../../asset/work5.jpg",
    },
    {
        url: "../../asset/work2.jpg",
    },
    {
        url: "../../asset/work6.jpg",
    },
    {
        url: "../../asset/work8.jpg",
    }
]

export default function Home() {

    const navigate = useNavigate();
    const { setPathName } = useContext(AppContext);
    const [exhibitionnow, setExhibitNow] = useState([]);
    const [worksnow, setWorksNow] = useState([]);


    const exhibitresult = async () => { return await getCurExhibitList() };
    const worksresult = async () => { return await getWorks() };
    useEffect(() => {
        exhibitresult().then((value) => {
            const homeresult = value && value.length > 3 ? value.slice(undefined, 3) : value;
            setExhibitNow(homeresult);
        });
        worksresult().then((value) => {
            const homeresult = value && value.length > 6 ? value.slice(undefined, 6) : value;
            setWorksNow(homeresult);
        })
    }, []);

    return (
        <div>
            <div style={{ transform: "translateX(2.5%)" }} className="container">
                <Slider {...setting}>
                    <div><img src={homecarousel[0]} /></div>
                    <div><img src={homecarousel[1]} /></div>
                    <div><img src={homecarousel[2]} /></div>
                    <div><img src={homecarousel[3]} /></div>
                    <div><img src={homecarousel[4]} /></div>
                </Slider>
            </div>
            <div style={{ margin: "40px 80px", }}>
                <div className="nowadays">진행 중인 전시회</div>
                <div onClick={() => { navigate("/exhibit"); localStorage.setItem("currenttab", "전시회"); setPathName(window.location.pathname); window.scrollTo(0, 0) }} className="nowdetails">더보기 &gt;</div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", }}>
                    {Object.values(exhibitionnow).map((value) => { return <ExhibitionItem width="330px" height="480px" exhibition={value} /> })}
                </div>
            </div>
            <div style={{ margin: "80px", }}>
                <div className="nowadays">금주의 작품</div>
                <div onClick={() => { navigate("/work"); localStorage.setItem("currenttab", "작품"); setPathName(window.location.pathname); window.scrollTo(0, 0) }} className="nowdetails">더보기 &gt;</div>
                <div style={{ display: "flex", justifyContent: "center" }}>

                    <div style={{ width: "1000px", }}>
                        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", }}>
                            {Object.values(worksnow).map((value) => { return <WorkItem width="300px" height="300px" work={value} /> })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}