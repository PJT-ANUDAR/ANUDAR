import './App.css';
import Home from './home/home'
import ExhibitPage from './exhibit/ExhibitPage'
import ExhibitDetailPage from './exhibit/ExhibitDetailPage'
import Exhibit3DPage from './exhibit/Exhibit3DPage'
import ExhibitRegistPage from './exhibit/ExhibitRegistPage'
import DocentPage from './docent/DocentPage'
import WorkPage from './work/WorkPage'
import WorkDetailPage from './work/WorkDetailPage'
import ArtistPage from './artist/ArtistPage'
import ArtistDetailPage from './artist/ArtistDetailPage'
import Auction from './auction/auction'
import Signup from './signup/signup'
import Mypage from './mypage/mypage';
import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navbar/navbar';

export const AppContext = createContext();
export default function App() {

  const [login, setLogin] = useState(false);
  const [notice, setNotice] = useState(true);

  // const [menu, setMenu] = useState("");

  return (
    <>
      <AppContext.Provider value={{ login, setLogin, notice, setNotice }}>
        <NavBar />
        <div style={{ display: "flex", justifyContent: "center" }} className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/exhibit" element={<ExhibitPage />}></Route>
            <Route exact path="/exhibit/:id" element={<ExhibitDetailPage />}></Route>
            {/* 임시 path */}
            <Route exact path="/exhibit/:id/2" element={<Exhibit3DPage />}></Route>
            <Route exact path="/exhibit/regist" element={<ExhibitRegistPage />}></Route>
            <Route exact path="/docent/:id" element={<DocentPage />}></Route>
            <Route exact path="/work" element={<WorkPage />}></Route>
            <Route exact path="/work/:id" element={<WorkDetailPage/>}></Route>
            <Route exact path="/artist" element={<ArtistPage />}></Route>
            <Route exact path="/artist/:id" element={<ArtistDetailPage/>}></Route>
            <Route exact path="/auction" element={<Auction />}></Route>
            <Route exact path="/user/info" element={<Mypage/>}></Route>
            <Route exact path="/user/join" element={<Signup />}></Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </>

  );
}