import React from "react";
import "./DeveloperCard.css";
import { GitHub, Email, LinkedIn } from "@mui/icons-material";

function DeveloperCard(props) {
	return (
		<div className="card">
			<div className="card-info">
				<div className="card-avatar">
					<img
						src={props.imageLink}
						alt={`${props.name}'s avatar`}
						className="avatar-image"
					/>
					<div className="spacer"></div>
					<div className="card-title">{props.name}</div>
				</div>
			</div>
			<ul className="card-social">
				<li className="card-social__item">
					<a
						href={props.github}
						target="_blank"
						rel="noopener noreferrer"
						className="social-link github"
					>
						<GitHub fontSize="large" />
					</a>
				</li>
				<li className="card-social__item">
					<a
						href={`mailto:${props.mail}`}
						target="_blank"
						rel="noopener noreferrer"
						className="social-link email"
					>
						<Email fontSize="large" />
					</a>
				</li>
				<li className="card-social__item">
					<a
						href={props.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="social-link linkedin"
					>
						<LinkedIn fontSize="large"/>
					</a>
				</li>
			</ul>
		</div>
	);
}

export default DeveloperCard;