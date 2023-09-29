import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import UserProfile from "./Pages/UserProfile";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/bootstrap.css";
import ForgetPassword from "./Pages/ForgetPassword";
import { useSelector } from "react-redux";
import Home from "./Pages/Home";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndCondition from "./Pages/TermsAndCondition";
import ProviderDetailsPage from "./Pages/ProviderDetailsPage";

import "./assets/css/bootstrap.min.css"
import "./assets/css/custom.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import MyPages from "./Pages/MyPages";
import Booking from "./Pages/Booking";
import SessionBooking from "./Component/SessionBooking";

function App() {
    const authDetails = useSelector((state) => state.auth);
    return (
        <>
            {authDetails !== null && authDetails?.token ? (
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<UserProfile/>}/>
                    <Route path="/my_page" element={<MyPages/>}/>
                    <Route path="/booking" element={<Booking/>}/>
                    <Route path="/book-session" element={<SessionBooking/>}/>
                    <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
                    <Route path="/terms_and_condition" element={<TermsAndCondition/>}/>
                    <Route path="/provider_details/:providerId" element={<ProviderDetailsPage/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot_password" element={<ForgetPassword/>}/>
                    <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
                    <Route path="/terms_and_condition" element={<TermsAndCondition/>}/>
                    <Route path="/provider_details/:providerId" element={<ProviderDetailsPage/>}/>
                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
      {/* <UserProfile /> */}
    </>
  );
}

export default App;
