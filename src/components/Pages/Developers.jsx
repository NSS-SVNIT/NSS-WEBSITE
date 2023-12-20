import React from "react";
import Layout from "../Layout/Layout";
import DeveloperCard from "./DeveloperCard";
import { Typography } from "@mui/material";
import param from "./param.jpg";
import aditi from "./aditi.jpg";
import jinhal from "./jinhal.jpg";
import shreeya from "./shreeya.jpg";
import pragnesh from "./pragnesh.jpg";
import keval from "./keval.jpg";
import namrata from "./namrata.jpg";
import "./underline.css";

function Developers() {
  const developers = [
    {
      id: 1,
      name: "Aditi Tapariya",
      github: "https://github.com/adititapariya",
      mail: "mailto:tapariyaaditi23@gmail.com",
      linkedin: "https://www.linkedin.com/in/aditi-tapariya/",
      imageLink:
        "https://drive.google.com/uc?id=1vhZEqCdA2wfaX5i3gyXsA_acal_gyygh&export=download",
    },
    {
      id: 2,
      name: "Harshit Pathak",
      github: "https://github.com/Story27",
      mail: "mailto:pathakharshit281@gmail.com",
      linkedin: "https://www.linkedin.com/in/harshit-pathak-4ba6aa22a/",
      imageLink:
        "https://drive.google.com/uc?id=1emfchxV1KCWoBRjdfr4Di8XQ1RuTo5qj&export=download",
    },
    {
      id: 3,
      name: "Jinhal Maheshwari",
      github: "https://github.com/Jinhal01",
      mail: "mailto:jinhalmaheshwari1256@gmail.com",
      linkedin: "linkedin.com/in/jinhal-maheshwari-71a217212/",
      imageLink:
        "https://drive.google.com/uc?id=1vxZ22s3sxcEEA10i7JbTOvj7FoONuy4T&export=download",
    },
    {
      id: 4,
      name: "Param Shah",
      github: "https://github.com/paramshah1903",
      mail: "mailto:shahparam1903@gmail.com",
      linkedin: "https://www.linkedin.com/in/param-shah-716322227/",
      imageLink:
        "https://drive.google.com/uc?id=1wKDtiasOBSOdFZLGE7hGmqtHpFM7gvlC&export=download",
    },
    {
      id: 5,
      name: "Pragnesh Barik",
      github: "https://github.com/pragneshbarik",
      mail: "mailto:barikpragnesh@gmail.com",
      linkedin: "https://www.linkedin.com/in/pragnesh-barik",
      imageLink:
        "https://drive.google.com/uc?id=1wNOKNO2AfRA9RcIR-HHUc5MLXfc92NbN&export=download",
    },
    {
      id: 6,
      name: "Shreeya Dave",
      github: "https://github.com/shreeyadave",
      mail: "mailto:shreeyadave776@gmail.com",
      linkedin: "https://www.linkedin.com/in/shreeya-dave-444166232/",
      imageLink:
        "https://drive.google.com/uc?id=1vWa6nLxSAzsuW-J_KjlJ8e24UZXRDnAy&export=download",
    },
  ];

  const designers = [
    {
      id: 1,
      name: "Keval Kanpariya",
      github: "https://github.com/keval-kanp-1011",
      mail: "mailto:kevalkanpariya5051@gmail.com",
      linkedin: "http://linkedin.com/in/kevalkanpariya",
      imageLink:
        "https://drive.google.com/uc?id=1vsDgSNwydos4hWLN3JFhD_K0F4GvWdPX&export=download",
    },
    {
      id: 2,
      name: "Namrata Rathod",
      github: "https://github.com/Namarata28",
      mail: "mailto:namrata.rathod028@gmail.com",
      linkedin: "www.linkedin.com/in/nr28",
      imageLink:
        "https://drive.google.com/uc?id=1wD9UFDsY73yXhf81NhmLj4TON9EmUsUu&export=download",
    },
  ];

  const row1 = developers.slice(0, 3);
  const row2 = developers.slice(3);
  const row1Designers = designers.slice(0, 2);

  return (
    <div>
      <Layout>
        <div className="heading">
          <Typography variant="h1" align="center">
            Developers
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px", // Adjust the gap according to your design
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "56px", // Adjust the gap according to your design
              margin: "30px",
            }}
          >
            {row1.map((developer) => (
              <DeveloperCard
                key={developer.id}
                name={developer.name}
                github={developer.github}
                mail={developer.mail}
                linkedin={developer.linkedin}
                work="Web Developer"
                imageLink={developer.imageLink} // Use the correct prop name
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: "56px", // Adjust the gap according to your design
              margin: "30px",
              marginTop: "0px",
              marginBottom: "50px",
            }}
          >
            {row2.map((developer) => (
              <DeveloperCard
                key={developer.id}
                name={developer.name}
                github={developer.github}
                mail={developer.mail}
                linkedin={developer.linkedin}
                work="Designer"
                // insta={developer.insta}
                imageLink={developer.imageLink} // Use the correct prop name
              />
            ))}
          </div>
        </div>
        <div className="heading">
          <Typography variant="h1" align="center">
            Designers
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "46px", // Adjust the gap according to your design
            margin: "50px",
          }}
        >
          {row1Designers.map((designer) => (
            <DeveloperCard
              key={designer.id}
              name={designer.name}
              github={designer.github}
              mail={designer.mail}
              linkedin={designer.linkedin}
              // insta={designer.insta}
              imageLink={designer.imageLink} // Use the correct prop name
            />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export default Developers;
