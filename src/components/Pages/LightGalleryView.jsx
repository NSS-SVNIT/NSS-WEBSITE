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
          <a
            key={index}
            // data-lg-size="1406-1390"
            className="gallery-item"
            data-src={image}
            // style={{ width: "40px" }}
            // data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
          >
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
