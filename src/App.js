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
function App() {
  const isAuthenticated = localStorage.getItem("user_id");
  useQuery(["team_count"], () => TeamsubFunction(), {
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

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/test" element={<Test />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/before-login" element={<BeforeLogin />}></Route>
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      <Route path="dashboard" element={<Dashboard />} />
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
