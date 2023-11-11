import "./App.css";
import GalleryView from "./components/Pages/Home/GalleryView";
import Events from "./components/Pages/Events";
import Gallery from "./components/Pages/Gallery";
import Home from "./components/Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./components/Pages/Post";
import NewPost from "./components/Pages/NewPost";
import Admin from "./components/Pages/Admin/Admin";
import Alumni from "./components/Pages/Alumni/Alumni";
import AlumniBatchPage from "./components/Pages/Alumni/AlumniBatchPage";
import Contact from './components/Pages/Contact'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/events" element={<Events />} />
        <Route exact path="/alumni" element={<Alumni />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/alumni/:year" element={<AlumniBatchPage />} />
        <Route path="/events/:id" element={<Post />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
