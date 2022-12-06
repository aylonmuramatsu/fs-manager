import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { Toaster } from "react-hot-toast";
import Loader from "@components/Loader";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster position="bottom-right" reverseOrder={false} />
      <Loader />
    </BrowserRouter>
  );
}

export default App;
