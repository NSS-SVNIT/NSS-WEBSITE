import React, { memo, Suspense, lazy } from "react";
import "./App.css";
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
import Loader from "./components/UI/Loader";
import { Fab } from "@mui/material";
import ScrollTop from "./components/Layout/ScrollTop";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
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
const MemoizedHome = memo(Home);

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
					<Router>
						<Routes>
							<Route path="/about" element={<MemoizedAbout />} />
							<Route
								path="/gallery"
								element={<MemoizedGallery />}
							/>
							<Route path="/admin" element={<MemoizedAdmin />} />
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
							/>
							<Route
								exact
								path="/team"
								element={<MemoizedTeam />}
							/>
							<Route
								path="/team/:year"
								element={<MemoizedTeamBatchPage />}
							/>
							<Route
								path="/contact"
								element={<MemoizedContact />}
							/>
							<Route
								path="/events/:id"
								element={<MemoizedPost />}
							/>
							<Route path="/" element={<MemoizedHome />} />
						</Routes>
					</Router>
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
							}}>
							<ArrowUpwardIcon />
						</Fab>
					</ScrollTop>
				</Suspense>
			)}
		</>
	);
}

export default App;
