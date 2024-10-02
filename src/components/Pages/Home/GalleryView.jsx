import React, { useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { motion, useAnimation } from "framer-motion";
import Home_1 from "../../../assets/Home_1.webp";
import Home_2 from "../../../assets/Home_2.webp";
import Home_3 from "../../../assets/Home_3.webp";
import Home_4 from "../../../assets/Home_4.webp";
import Home_5 from "../../../assets/Home_5.webp";
import Home_6 from "../../../assets/Home_6.webp";
import Home_7 from "../../../assets/Home_7.webp";
import Home_8 from "../../../assets/Home_8.webp";
import Home_9 from "../../../assets/Home_9.webp";
import Home_10 from "../../../assets/Home_10.webp";
import Home_11 from "../../../assets/Home_11.webp";
import Home_12 from "../../../assets/Home_12.webp";
import Home_13 from "../../../assets/Home_13.webp";
import { useMediaQuery } from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
	return {
		style: {
			width: `${size * cols}px`,
			height: `${size * rows}px`,
			objectFit: "cover", // You can adjust this property based on your requirements
		},
		src: image,
	};
}

const GalleryView = React.memo(() => {
  const controls = useAnimation();
  const isMobile = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          }
		  else{
            controls.start("hidden")
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    const container = document.querySelector("#gallery-container");
    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect()
  }, [controls]);


	return (
		<div id="gallery-container">
			<ImageList
				sx={{
					width: "500",
					background: "transparent",
					overflow: "hidden",
				}}
				variant="quilted"
				cols={isMobile ? 2 : 4}
				rowHeight={121}>
				{itemData.map((item, index) => (
					<ImageListItem
						key={item.img}
						cols={item.cols || 1}
						rows={item.rows || 1}>
						<motion.div
							initial="hidden"
							animate={controls}
							variants={{
								visible: { opacity: 1, y: 0 },
								hidden: { opacity: 0,y : (index+1)*50},
							}}
							transition={{
								duration: 2,
								type: "spring",
							}}>
							<img
								src={item.img}
								alt={item.title}
								loading="lazy"
								style={
									srcset(item.img, 121, item.rows, item.cols)
										.style
								}
							/>
						</motion.div>
					</ImageListItem>
				))}
			</ImageList>
		</div>
	);
});

const itemData = [
	{
		img: Home_1,
		title: "Group Photo",
		rows: 1,
		cols: 2,
	},
	{
		img: Home_3,
		title: "DSP",
		rows: 2,
		cols: 1,
	},
	{
		img: Home_4,
		title: "Flag",
		rows: 2,
		cols: 1,
	},
	{
		img: Home_5,
		title: "Lucky",
		rows: 2,
		cols: 1,
	},
	{
		img: Home_13,
		title: "Group Flag",
		rows: 2,
		cols: 1,
	},
	{
		img: Home_2,
		title: "Aditi & Anjali",
		rows: 1,
		cols: 2,
	},
	{
		img: Home_6,
		title: "Kalash Yatra",
		rows: 1,
		cols: 2,
	},
	{
		img: Home_7,
		title: "BMS",
		rows: 3,
		cols: 2,
	},
	{
		img: Home_8,
		title: "Fern",
		rows: 2,
		cols: 2,
	},
	{
		img: Home_9,
		title: "Tree Planting",
		rows: 2,
		cols: 1,
	},
	{
		img: Home_10,
		title: "Orphanage",
		rows: 1,
		cols: 1,
	},
	{
		img: Home_11,
		title: "Blind Fold",
		rows: 1,
		cols: 2,
	},
	{
		img: Home_12,
		title: "Camp Sitting",
		rows: 1,
		cols: 3,
	},
];

export default React.memo(GalleryView);
