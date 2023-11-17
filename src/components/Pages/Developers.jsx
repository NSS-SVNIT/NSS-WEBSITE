import React from "react";
import Layout from "../Layout/Layout";
import DeveloperCard from "./DeveloperCard";
import { Typography } from "@mui/material";

function Developers() {
  const developers = [
    {
      id: 1,
      name: "Developer 1",
      github: "https://github.com/dev1",
      mail: "dev1@example.com",
      insta: "https://www.instagram.com/dev1/",
    },
    {
      id: 2,
      name: "Developer 2",
      github: "https://github.com/dev2",
      mail: "dev2@example.com",
      insta: "https://www.instagram.com/dev2/",
    },
    {
      id: 3,
      name: "Developer 3",
      github: "https://github.com/dev3",
      mail: "dev3@example.com",
      insta: "https://www.instagram.com/dev3/",
    },
    {
      id: 4,
      name: "Developer 4",
      github: "https://github.com/dev4",
      mail: "dev4@example.com",
      insta: "https://www.instagram.com/dev4/",
    },
    {
      id: 5,
      name: "Developer 5",
      github: "https://github.com/dev5",
      mail: "dev5@example.com",
      insta: "https://www.instagram.com/dev5/",
    },
    {
      id: 6,
      name: "Developer 6",
      github: "https://github.com/dev6",
      mail: "dev6@example.com",
      insta: "https://www.instagram.com/dev6/",
    },
  ];

  const designers = [
    {
      id: 1,
      name: "Designer 1",
      portfolio: "https://portfolio1.com",
      email: "designer1@example.com",
      behance: "https://www.behance.net/designer1",
    },
    {
      id: 2,
      name: "Designer 2",
      portfolio: "https://portfolio2.com",
      email: "designer2@example.com",
      behance: "https://www.behance.net/designer2",
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
