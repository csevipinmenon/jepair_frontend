import React, { useState } from "react";
import Call from "../Calling/Call";
import TypingEffect from "../typeeffect/TypingEffect";
import Login from "../HomeLogin/Login";
import SearchHome from "../Search/SearchHome";
import TrendingService from "./TrendingService";
import Handyman from "./Handyman";
import Contractor from "./Contractor";
import Popular from "./Popular";
import Beautyspa from "./Beautyspa";
import Cleaningpest from "./Cleaningpest";
import Appliance from "./Appliance";
import Worlwide from "./Worlwide";
import Lastdecscription from "./Lastdecscription";
import Ads from "./Ads";
import ChatPopup from "../chatboat/ChatPopup";
import JepairBot from "../chatboat/JepairBot";

function Home() {
  const [showbot, setShowBot] = useState(false);

  const handleBot = (e) => {
    setShowBot((prev) => !prev);
  };
  return (
    <div className="dark:bg-[#343a46] ">
      
      <TypingEffect />
      <Login />
      <SearchHome />

      <div className="relative  w-full lg:h-[450px]  dh-[700px]  ">
        <img
          src="jepairHome.jpg"
          alt="Image"
          className="w-full h-full  dark:bg-[#343a46] object-cover "
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div>
        <Call />
      </div>

      <button onClick={handleBot}>
        {" "}
        <ChatPopup />
      </button>
      {showbot && <JepairBot />}
      {/* use services parts */}
      <Ads />
      <TrendingService />
      <Handyman />
      <Contractor />
      <Popular />
      <Beautyspa />
      <Cleaningpest />
      <Appliance />
      <Worlwide />
      <Lastdecscription />
    </div>
  );
}

export default Home;
