import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import BeforeLogin from "./BeforeLogin";
import SplashScreen from "./SplashScreen";
import "./assets/style/main.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/home/Dashboard";
import Test from "./pages/test";
import { routes } from "./route";
import { TeamsubFunction } from "./services/apiCallings";
import { deCryptData } from "./shared/secret";
import LayoutAviator from "./GamePage/Layout";
import PlayGame from "./GamePage/PlayGame";
function App() {
  const isAuthenticated = deCryptData(localStorage.getItem("user_id"));
  useQuery(["team_count"], () => isAuthenticated && TeamsubFunction(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsOpenSplash(false);
  //   }, 1000);
  // }, []);

  // if (isOpenSplash)
  //   return (
  //     <Layout header={false} footer={false}>
  //       <SplashScreen />
  //     </Layout>
  //   );
  //   function addTimeToCurrentIST() {
  //     // Get the current time in IST (Indian Standard Time)
  //     const currentIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  //     let currentTime = new Date(currentIST);

  //     // Add 1 hour, 14 minutes, and 19 seconds
  //     currentTime.setHours(currentTime.getHours() + 1);
  //     currentTime.setMinutes(currentTime.getMinutes() + 14);
  //     currentTime.setSeconds(currentTime.getSeconds() + 19);

  //     // Format the updated time
  //     const updatedTime = currentTime.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });

  //     return updatedTime;
  // }

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     console.log(addTimeToCurrentIST());
  //   },1000)
  // },[])

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/test" element={<Test />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/before-login" element={<BeforeLogin />}></Route>
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route
        path="/playgame"
        element={<LayoutAviator component={<PlayGame />} />}
      />

      {isAuthenticated ? (
        routes?.map((route, index) => {
          return (
            <Route key={index} path={route?.path} element={route?.element} />
          );
        })
      ) : (
        <Route path="/" element={<Login />}></Route>
      )}

      <Route path="/splash" element={<SplashScreen />}></Route>
    </Routes>
  );
}

export default App;
