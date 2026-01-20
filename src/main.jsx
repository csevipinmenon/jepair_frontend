import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Visit from "./components/Visit/Visit.jsx";
import About from "./components/About/About.jsx";
import Enquiry from "./components/Enquiry/Enquiry.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";
import Login from "./components/Login/Login.jsx";
import Book from "./components/Book/Books.jsx";
import BookProcess from "./components/BookingState/BookProcess.jsx";
import Faq from "./components/Faq/Faq.jsx";
import "react-toastify/ReactToastify.css";
import Success from "./components/payment/Success.jsx";
import Cancel from "./components/payment/Cancel.jsx";
import AdminChat from "./components/admindashboard/AdminChat.jsx";
import UserChat from "./components/chat/UserChat.jsx";
import UpdateStatus from "./components/admindashboard/UpdateStatus.jsx";
import AllUsers from "./components/admindashboard/GetAllUsers.jsx";
import TermCondition from "./components/termAndCondition/TermCondition.jsx";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy.jsx";
import Team from "./components/ourteam/Team.jsx";
import LoginSignup from "./components/loginsingup.jsx/LoginSingup.jsx";
import WorkerDashboard from "./components/workerDasboard/WorkerDashboard.jsx";
import NotFound from "./components/notfound/NotFound.jsx";
import Admindashboard from "./components/admindashboard/Admindashboard.jsx";
import GetAllWorkers from "./components/admindashboard/GetAllWorkers.jsx";
import GetAllOrders from "./components/admindashboard/GetAllOrders.jsx";
import AssignOrderToWorker from "./components/admindashboard/AssignOrderToWorker.jsx";
import Unauthorized from "./components/routes/Unauthorized.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import WorkerRoute from "./components/routes/WorkreRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="visit" element={<Visit />} />
      <Route path="about" element={<About />} />
      <Route path="enquiry" element={<Enquiry />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="login" element={<Login />} />
      <Route path="yourbook" element={<Book />} />
      <Route path="bookprocess" element={<BookProcess />} />
      <Route path="faq" element={<Faq />} />
      <Route path="chat" element={<UserChat />} />
      <Route path="success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />
      <Route path="termcondition" element={<TermCondition />} />
      <Route path="privacypolicy" element={<PrivacyPolicy />} />
      <Route path="ourteam" element={<Team />} />

      <Route path="loginsingup" element={<LoginSignup />} />

      {/* Worker Protected Routes */}
      <Route element={<WorkerRoute />}>
        <Route path="worker-dashboard" element={<WorkerDashboard />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route path="admin" element={<Admindashboard />} />
        <Route path="/adminallworkers" element={<GetAllWorkers />} />
        <Route path="adminchat" element={<AdminChat />} />
        <Route path="adminupdatestatus" element={<UpdateStatus />} />
        <Route path="adminallusers" element={<AllUsers />} />
        <Route path="adminallorders" element={<GetAllOrders />} />
        <Route
          path="adminassignordertoworker"
          element={<AssignOrderToWorker />}
        />
      </Route>

      
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-ojdbbmqkesns8ecq.us.auth0.com"
      clientId="fWAeVCTky8qDvp3cBoj7meS6c7BCeo9H"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </Auth0Provider>
  </StrictMode>
);
