import React from "react";
import Layout from "../Layout/Layout";
import DeveloperCard from "./DeveloperCard";
import { Typography } from "@mui/material";

function Developers() {
  const developers = [
    {
      id: 1,
      name: "Aditi Tapariya",
      github: "https://github.com/adititapariya",
      mail: "tapariyaaditi23@gmail.com",
      linkedin: "https://www.linkedin.com/in/aditi-tapariya/",
    },
    {
      id: 2,
      name: "Harshit Pathak",
      github: "https://github.com/Story27",
      mail: "Pathakharshit281@gmail.com",
      linkedin: "https://www.linkedin.com/in/harshit-pathak-4ba6aa22a/",
    },
    {
      id: 3,
      name: "Jinhal Maheshwari",
      github: "https://github.com/Jinhal01",
      mail: "jinhalmaheshwari1256@gmail.com",
      linkedin: "linkedin.com/in/jinhal-maheshwari-71a217212/",
    },
    {
      id: 4,
      name: "Param Shah",
      github: "https://github.com/paramshah1903",
      mail: "shahparam1903@gmail.com",
      linkedin: "https://www.linkedin.com/in/param-shah-716322227/",
    },
    {
      id: 5,
      name: "Pragnesh Barik",
      github: "https://github.com/pragneshbarik",
      mail: "barikpragnesh@gmail.com",
      linkedin: "https://www.linkedin.com/in/pragnesh-barik",
    },
    {
      id: 6,
      name: "Shreeya Dave",
      github: "https://github.com/shreeyadave",
      mail: "shreeyadave776@gmail.com",
      linkedin: "https://www.linkedin.com/in/shreeya-dave-444166232/",
    },
  ];

  const designers = [
    {
      id: 1,
      name: "Keval Kanpariya",
      github: "https://github.com/keval-kanp-1011",
      mail: "kevalkanpariya5051@gmail.com",
      linkedin: "http://linkedin.com/in/kevalkanpariya",
    },
    {
      id: 2,
      name: "Namrata Rathod",
      github: "https://github.com/Namarata28",
      mail: "namrata.rathod028@gmail.com",
      linkedin: "www.linkedin.com/in/nr28",
    },
  ];

  const row1 = developers.slice(0, 3);
  const row2 = developers.slice(3);
  const row1Designers = designers.slice(0, 2);

  return (
    <div>
      <Layout>
        <Typography variant="h1" align="center">
          Developers
        </Typography>
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
                insta={developer.insta}
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
                insta={developer.insta}
              />
            ))}
          </div>
        </div>
        <Typography variant="h1" align="center">
          Designers
        </Typography>
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
              portfolio={designer.portfolio}
              email={designer.email}
              behance={designer.behance}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export default Developers;
