import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
function TrendingService() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  const bookProcessFunction = () => {
    if (isAuthenticated) {
      navigate("/bookprocess");
    } else {
      loginWithRedirect();
    }
  };
  return (
    <div className="text-center dark:bg-[#343a46]  mb-32 dark:mb-0 py-5">
      <h3 className="font-bold text-4xl text-[#3a76cb]">Trending Services</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16 mt-16 px-4 sm:px-10 lg:px-20">
      
        {[
          { img: "ac-repair.png", label: "Ac Repair" },
          { img: "sofa.png", label: "Sofa Repair" },
          { img: "plumber.png", label: "Plumber " },
          { img: "maid services.jpg", label: "Maid" },
          { img: "packers-movers.png", label: "Packers" },
          { img: "fridge.png", label: "Refrigerator" },
          { img: "house-cleaning.png", label: "Cleaning" },
          { img: "female-massage.jpg", label: "Massage" },
        ].map((service, idx) => (
          <div
            key={idx}
            className="bg-white  w-40 h-40 mx-auto rounded-full shadow-2xl hover:shadow-blue-400 flex flex-col justify-center items-center overflow-hidden"
          >
            <Link
              onClick={bookProcessFunction}
              className="flex flex-col items-center"
            >
              <img
                src={service.img}
                alt={service.label}
                className="rounded-full h-[100px] w-[100px]  object-cover"
              />
              <span className="font-semibold text-sm mt-2   text-center">
                {service.label}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingService;
