import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Fab } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { memo, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ScrollTop from "./components/Layout/ScrollTop";
import About from "./components/Pages/About";
import Admin from "./components/Pages/Admin/Admin";
import Articles from "./components/Pages/Articles/Articles";
import NewArticle from "./components/Pages/Articles/newarticle";
import Contact from "./components/Pages/Contact";
import Developers from "./components/Pages/Developers";
import Events from "./components/Pages/Events";
import Gallery from "./components/Pages/Gallery";
import Home from "./components/Pages/Home";
import NewPost from "./components/Pages/NewPost";
import Post from "./components/Pages/Post";
import CommitteeDetail from "./components/Pages/CommitteeDetail";
import AdminLogin from "./components/Pages/Team/AdminLogin";
import AdminPage from "./components/Pages/Team/AdminPage";
import AuthGuard from "./components/Pages/Team/AuthGuard";
import Team from "./components/Pages/Team/Team";
import TeamBatchPage from "./components/Pages/Team/TeamBatchPage";
import VolunteerPage from "./components/Pages/Team/VolunteerPage";
import Loader from "./components/UI/Loader";
import { CustomDateFnsAdapter } from "./utils/dateFnsAdapter";
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
const MemoizedVolunteerPage = memo(VolunteerPage);
const MemoizedAdminPage = memo(AdminPage);
const MemoizedAdminLogin = memo(AdminLogin);
const MemoizedContact = memo(Contact);
const MemoizedPost = memo(Post);
const MemoizedHome = memo(Home);
const MemoizedCommitteeDetail = memo(CommitteeDetail);

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<div></div>}>
          <LocalizationProvider dateAdapter={CustomDateFnsAdapter}>
            <Router>
              <Routes>
                <Route
                  path="/about"
                  element={<MemoizedAbout />}
                />
                <Route
                  path="/gallery"
                  element={<MemoizedGallery />}
                />
                <Route
                  path="/admin"
                  element={<MemoizedAdmin />}
                />
                <Route
                  path="/Developers"
                  element={<MemoizedDevelopers />}
                />
                <Route
                  path="/articles"
                  element={<MemoizedArticles />}
                />
                <Route
                  path="/newarticle"
                  element={<MemoizedNewarticle />}
                />
                <Route
                  path="/newpost"
                  element={<MemoizedNewPost />}
                />
                <Route
                  path="/events"
                  element={<MemoizedEvents />}
                />{" "}
                <Route
                  exact
                  path="/team"
                  element={<MemoizedTeam />}
                />
                <Route
                  path="/team/:year"
                  element={<MemoizedTeamBatchPage />}
                />{" "}
                <Route
                  path="/team/volunteer"
                  element={<MemoizedVolunteerPage />}
                />{" "}
                <Route
                  path="/admin-login"
                  element={<MemoizedAdminLogin />}
                />
                <Route
                  path="/team/admin"
                  element={
                    <AuthGuard>
                      <MemoizedAdminPage />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/contact"
                  element={<MemoizedContact />}
                />
                <Route
                  path="/events/:id"
                  element={<MemoizedPost />}
                />
                <Route
                  path="/committee/:slug"
                  element={<MemoizedCommitteeDetail />}
                />
                <Route path="/" element={<MemoizedHome />} />
              </Routes>{" "}
            </Router>
          </LocalizationProvider>
          <ScrollTop>
            <Fab
              size="small"
              aria-label="scroll back to top"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              <ArrowUpwardIcon />
            </Fab>
          </ScrollTop>
        </Suspense>
      )}
    </>
  );
}

export default App;
