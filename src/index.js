import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import theme from "./utils/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { SocketProvider } from "./shared/socket/SocketContext";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
            <Toaster
              toastOptions={{

                className: "",
                style: {
                  border: `1px solid red`,
                  color: "#63BA0E",
                  fontSize: "15px",
                  marginTop: "100px",
                  borderRadius: "50px",
                  // background: "#63BA0E",
                },
              }}
              autoClose={1000}
              limit={1}
            />
          </BrowserRouter>
        </ThemeProvider>
      </SocketProvider>
    </QueryClientProvider>
  </Provider>
);
reportWebVitals();
