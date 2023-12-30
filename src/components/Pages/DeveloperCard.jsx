import React from "react";
import "./DeveloperCard.css";
import p1Image from "./p1.png";
import param from "./param.jpg";
import aditi from "./aditi.jpg";
import jinhal from "./jinhal.jpg";
import shreeya from "./shreeya.jpgeg";
import pragnesh from "./pragnesh.jpg";
import keval from "./keval.jpg";
import namrata from "./namrata.jpg";

function DeveloperCard(props) {
  console.log(props.imageLink);
  console.log(props.linkedin);
  return (
    <div class="card">
      <div class="card-info">
        <div class="card-avatar">
          <img src={props.imageLink} alt="Avatar" className="avatar-image" />
        </div>
        <div class="card-title">{props.name}</div>
        {/* <div class="card-subtitle">CEO &amp; Co-Founder</div> */}
      </div>
      <ul class="card-social">
        <li class="card-social__item">
          <a href={props.github} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.258.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.033-1.61-4.033-1.61-.545-1.38-1.332-1.745-1.332-1.745-1.09-.743.083-.727.083-.727 1.206.086 1.838 1.24 1.838 1.24 1.07 1.833 2.81 1.305 3.495.997.108-.776.417-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.236-3.22-.124-.303-.54-1.523.12-3.176 0 0 1.007-.323 3.3 1.23.958-.267 1.983-.4 3.002-.405 1.02.005 2.044.138 3.004.405 2.29-1.553 3.297-1.23 3.297-1.23.66 1.653.244 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.805 5.623-5.476 5.92.43.37.81 1.1.81 2.22 0 1.6-.015 2.885-.015 3.28 0 .32.192.692.8.574C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12"
                fill="#000"
              />
            </svg>
          </a>
        </li>
        <li class="card-social__item">
          <a
            href={props.mail}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="mail"
            >
              <path
                fill="#231f20"
                d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
              ></path>
              <path
                fill="#231f20"
                d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
              ></path>
            </svg>
          </a>
        </li>
        <li class="card-social__item">
          <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#0074cc"
            >
              <path d="M19.547 3c.406 0 .75.133 1.031.398.281.266.422.602.422 1.008v15.047c0 .406-.14.766-.422 1.078a1.335 1.335 0 0 1-1.031.469h-15c-.406 0-.766-.156-1.078-.469C3.156 20.22 3 19.86 3 19.453V4.406c0-.406.148-.742.445-1.008C3.742 3.133 4.11 3 4.547 3h15zM8.578 18V9.984H6V18h2.578zM7.36 8.766c.407 0 .743-.133 1.008-.399a1.31 1.31 0 0 0 .399-.96c0-.407-.125-.743-.375-1.009C8.14 6.133 7.813 6 7.406 6c-.406 0-.742.133-1.008.398C6.133 6.664 6 7 6 7.406c0 .375.125.696.375.961.25.266.578.399.984.399zM18 18v-4.688c0-1.156-.273-2.03-.82-2.624-.547-.594-1.258-.891-2.133-.891-.938 0-1.719.437-2.344 1.312V9.984h-2.578V18h2.578v-4.547c0-.312.031-.531.094-.656.25-.625.687-.938 1.312-.938.875 0 1.313.578 1.313 1.735V18H18z"></path>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DeveloperCard;
