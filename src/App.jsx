import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Fab } from "@mui/material";
import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ScrollTop from "./components/Layout/ScrollTop";
import Loader from "./components/UI/Loader";
import AuthGuard from "./components/Pages/Team/AuthGuard";

// Lazy load all route components for code splitting
const Home = React.lazy(() => import("./components/Pages/Home"));
const About = React.lazy(() => import("./components/Pages/About"));
const Admin = React.lazy(() => import("./components/Pages/Admin/Admin"));
const Articles = React.lazy(() => import("./components/Pages/Articles/Articles"));
const NewArticle = React.lazy(() => import("./components/Pages/Articles/newarticle"));
const Contact = React.lazy(() => import("./components/Pages/Contact"));
const Developers = React.lazy(() => import("./components/Pages/Developers"));
const Events = React.lazy(() => import("./components/Pages/Events"));
const Gallery = React.lazy(() => import("./components/Pages/Gallery"));
const NewPost = React.lazy(() => import("./components/Pages/NewPost"));
const Post = React.lazy(() => import("./components/Pages/Post"));
const CommitteeDetail = React.lazy(() => import("./components/Pages/CommitteeDetail"));
const AdminLogin = React.lazy(() => import("./components/Pages/Team/AdminLogin"));
const AdminPage = React.lazy(() => import("./components/Pages/Team/AdminPage"));
const Team = React.lazy(() => import("./components/Pages/Team/Team"));
const TeamBatchPage = React.lazy(() => import("./components/Pages/Team/TeamBatchPage"));
const VolunteerPage = React.lazy(() => import("./components/Pages/Team/VolunteerPage"));
const TechnicalCommittee = React.lazy(() => import("./components/Pages/Committees/TechnicalCommittee"));
const SportsCommittee = React.lazy(() => import("./components/Pages/Committees/SportsCommittee"));
const SocialCommittee = React.lazy(() => import("./components/Pages/Committees/SocialCommittee"));
const FinanceCommittee = React.lazy(() => import("./components/Pages/Committees/FinanceCommittee"));
const DocumentationCommittee = React.lazy(() => import("./components/Pages/Committees/DocumentationCommittee"));
const CreativeCommittee = React.lazy(() => import("./components/Pages/Committees/CreativeCommittee"));
const CulturalCommittee = React.lazy(() => import("./components/Pages/Committees/CulturalCommittee"));

// Fallback loader component for lazy routes
const PageFallback = () => <Loader />;

function App() {
	return (
		<Suspense fallback={<PageFallback />}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/Developers" element={<Developers />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="/newarticle" element={<NewArticle />} />
					<Route path="/newpost" element={<NewPost />} />
					<Route path="/events" element={<Events />} />
					<Route exact path="/team" element={<Team />} />
					<Route path="/team/:year" element={<TeamBatchPage />} />
					<Route path="/team/volunteer" element={<VolunteerPage />} />
					<Route path="/admin-login" element={<AdminLogin />} />
					<Route
						path="/team/admin"
						element={
							<AuthGuard>
								<AdminPage />
							</AuthGuard>
						}
					/>
					<Route path="/contact" element={<Contact />} />
					<Route path="/events/:id" element={<Post />} />
					<Route path="/committee/:slug" element={<CommitteeDetail />} />
					<Route path="/committee/technical" element={<TechnicalCommittee />} />
					<Route path="/committee/sports" element={<SportsCommittee />} />
					<Route path="/committee/social" element={<SocialCommittee />} />
					<Route path="/committee/finance" element={<FinanceCommittee />} />
					<Route path="/committee/documentation" element={<DocumentationCommittee />} />
					<Route path="/committee/creative" element={<CreativeCommittee />} />
					<Route path="/committee/cultural" element={<CulturalCommittee />} />
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
					}}
				>
					<ArrowUpwardIcon />
				</Fab>
			</ScrollTop>
		</Suspense>
	);
}

export default App;
