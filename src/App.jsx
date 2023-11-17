import "./App.css";
import GalleryView from "./components/Pages/Home/GalleryView";
import Events from "./components/Pages/Events";
import Gallery from "./components/Pages/Gallery";
import Home from "./components/Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./components/Pages/Post";
import NewPost from "./components/Pages/NewPost";
import Admin from "./components/Pages/Admin/Admin";
import Team from "./components/Pages/Team/Team";
import TeamBatchPage from "./components/Pages/Team/TeamBatchPage";
import Contact from "./components/Pages/Contact";
import About from "./components/Pages/About";
import Developers from "./components/Pages/Developers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/events" element={<Events />} />
        <Route exact path="/team" element={<Team />} />
        <Route path="/team/:year" element={<TeamBatchPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events/:id" element={<Post />} />
        <Route path="/" element={<Home />} />
        <Route path="/developers" element={<Developers />} />
      </Routes>
    </Router>
  );
}

export default App;
