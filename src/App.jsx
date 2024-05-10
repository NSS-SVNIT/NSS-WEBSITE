import React, { memo,Suspense,lazy } from "react";
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
import Articles from "./components/Pages/Articles/Articles";
import NewArticle from "./components/Pages/Articles/newarticle";
import CircularWithValueLabel from "./components/UI/CircularWithValueLabel";
import Loader from "./components/UI/Loader";

const LazyHome = lazy(() => import("./components/Pages/Home"));

const MemoizedAbout = memo(About);
const MemoizedGallery = memo(Gallery);
const MemoizedAdmin = memo(Admin);
const MemoizedDevelopers = memo(Developers);
const MemoizedArticles = memo(Articles);
const MemoizedNewarticle = memo(NewArticle);
const MemoizedNewPost = memo(NewPost);
const MemoizedEvents = memo(Events);
const MemoizedTeam = memo(Team);
const MemoizedTeamBatchPage = memo(TeamBatchPage);
const MemoizedContact = memo(Contact);
const MemoizedPost = memo(Post);
const MemoizedHome = memo(LazyHome);

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);
  return (  
    <>
    {loading ? (<Loader />): (
    <Suspense fallback={<div></div>}>
    <Router>
      <Routes>
        <Route path="/about" element={<MemoizedAbout />} />
        <Route path="/gallery" element={<MemoizedGallery />} />
        <Route path="/admin" element={<MemoizedAdmin />} />
        <Route path="/Developers" element={<MemoizedDevelopers />} />
        <Route path="/articles" element={<MemoizedArticles />} />
        <Route path="/newarticle" element={<MemoizedNewarticle />} />
        <Route path="/newpost" element={<MemoizedNewPost />} />
        <Route path="/events" element={<MemoizedEvents />} />
        <Route exact path="/team" element={<MemoizedTeam />} />
        <Route path="/team/:year" element={<MemoizedTeamBatchPage />} />
        <Route path="/contact" element={<MemoizedContact />} />
        <Route path="/events/:id" element={<MemoizedPost />} />
        <Route path="/" element={<MemoizedHome />} /> 
      </Routes>
    </Router>
    </Suspense>
    )}
    </>
  );
}

export default App;
