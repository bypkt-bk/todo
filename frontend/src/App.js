import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SignIn from "./components/auth/signin";
import Main from "./components/main/main";
import Register from "./components/auth/register";
import Credit from "./components/credit/credit";
function App() {
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