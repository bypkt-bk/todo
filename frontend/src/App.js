import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SignIn from "./components/auth/signin";
import Main from "./components/main/main";
import Register from "./components/auth/register";
import Credit from "./components/credit/credit";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import "./App.css";
function App() {

  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const checkToken = () => {
      if (!cookies.token) return;
      try {
        const decoded = jwtDecode(cookies.token);
        if (decoded.exp < Date.now() / 1000) {
          toast.error("“Session หมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่”");
          window.location.href = "/";

        }
      } catch (err) {
        toast.error("Token ไม่ถูกต้อง");
        window.location.href = "/";
      }
    };
    checkToken();
    const interval = setInterval(checkToken, 10000);
    return () => clearInterval(interval);
  }, [cookies.token]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#4BB543",
              color: "#fff",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/credit" element={<Credit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;