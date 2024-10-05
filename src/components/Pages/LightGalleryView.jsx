import React from "react";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import { useMediaQuery } from "@mui/material";

export default function LightGalleryView(props) {
	console.log(props.images);
	const isMobile = useMediaQuery("(max-width:900px)");
	return (
		<LightGallery plugins={[lgZoom]} mode="lg-fade">
			{Array.from(props.images).map((image, index) => {
				return (
					<a key={index} className="gallery-item" data-src={image}>
						<img
							style={{ height: isMobile ? "150px" : "300px" }}
							loading="lazy"
							className="img-responsive"
							src={image}
						/>
					</a>
				);
			})}
		</LightGallery>
	);
}
