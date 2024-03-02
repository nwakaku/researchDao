import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/home";
import Publications from "./pages/publications";
import Profile from "./pages/profile";
import Reviews from "./pages/under-review";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/profile":
        title = "";
        metaDescription = "";
        break;
      case "/publication":
        title = "";
        metaDescription = "";
        break;
      case "/review":
        title = "";
        metaDescription = "";
        break;
     
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/publication" element={<Publications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/review" element={<Reviews />} />
     
    </Routes>
  );
}
export default App;
