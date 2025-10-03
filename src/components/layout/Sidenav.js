// import { useState } from "react";
import { Menu, Button, Modal } from "antd";
import { NavLink, useLocation } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
import logo from "../../assets/images/app-logo-qtnr1.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const page = pathname.replace("/", "");

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const ReportElement = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Capa_1"
      enable-background="new 0 0 512 512"
      height="20"
      viewBox="0 0 512 512"
      width="20"
    >
      <g>
        <path d="m386.073 295.25h-151.106c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h151.106c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5zm0 113h-151.106c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h151.106c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5zm0-30h-151.106c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h151.106c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5zm0-113h-151.106c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h151.106c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5zm50.29 26.965c4.143 0 7.5-3.358 7.5-7.5v-153.983c-.03-1.52-.529-3.715-2.196-5.303l-123.232-123.232c-1.247-1.121-2.825-2.197-5.304-2.197h-207.494c-20.678 0-37.5 16.822-37.5 37.5v437c0 20.678 16.822 37.5 37.5 37.5h300.727c20.678 0 37.5-16.822 37.5-37.5v-154.785c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v154.785c0 12.407-10.094 22.5-22.5 22.5h-300.727c-12.406 0-22.5-10.093-22.5-22.5v-437c0-12.407 10.094-22.5 22.5-22.5h199.994v30h-173.661c-9.649 0-17.5 7.851-17.5 17.5v36.5c0 9.649 7.851 17.5 17.5 17.5h147.656c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-147.656c-1.379 0-2.5-1.122-2.5-2.5v-36.5c0-1.378 1.121-2.5 2.5-2.5h173.661v40.732c0 20.678 16.822 37.5 37.5 37.5h85.732v146.483c0 4.142 3.358 7.5 7.5 7.5zm-93.232-168.983c-12.406 0-22.5-10.093-22.5-22.5v-75.126l97.626 97.625h-75.126zm-160.164 255.018h-54c-7.995 0-14.5 6.505-14.5 14.5v54c0 7.995 6.505 14.5 14.5 14.5h54c7.995 0 14.5-6.505 14.5-14.5v-54c0-7.995-6.505-14.5-14.5-14.5zm-.5 68h-53v-53h53zm15-279.5c0-7.995-6.505-14.5-14.5-14.5h-54c-7.995 0-14.5 6.505-14.5 14.5v54c0 7.995 6.505 14.5 14.5 14.5h54c7.995 0 14.5-6.505 14.5-14.5zm-15 53.5h-53v-53h53zm203.606-68h-151.106c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h151.106c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5zm0 30h-151.106c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h151.106c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5zm-188.606 97.5c0-7.995-6.505-14.5-14.5-14.5h-54c-7.995 0-14.5 6.505-14.5 14.5v54c0 7.995 6.505 14.5 14.5 14.5h54c7.995 0 14.5-6.505 14.5-14.5zm-15 53.5h-53v-53h53z" />
      </g>
    </svg>,
  ];
  const PostReport = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Слой_1"
      enable-background="new 0 0 512 512"
      height="20"
      viewBox="0 0 512 512"
      width="20"
    >
      <g fill="rgb(0,0,0)">
        <path d="m358.979 389.341v-373.178c0-8.926-7.236-16.163-16.163-16.163h-289.879c-8.927 0-16.163 7.236-16.163 16.163v373.178c0 8.927 7.237 16.163 16.163 16.163h289.879c8.927 0 16.163-7.236 16.163-16.163zm-32.326-16.163h-257.553v-340.851h257.553z" />
        <path d="m459.063 97.807h-58.385c-8.927 0-16.163 7.237-16.163 16.163s7.237 16.163 16.163 16.163h42.222v349.54h-264.303v-46.921c0-8.927-7.237-16.163-16.163-16.163s-16.163 7.236-16.163 16.163v63.084c0 8.927 7.237 16.163 16.163 16.163h296.629c8.927 0 16.163-7.237 16.163-16.163v-381.866c0-8.927-7.236-16.163-16.163-16.163z" />
        <path d="m131.681 126.133h123.164c8.927 0 16.163-7.237 16.163-16.163s-7.236-16.163-16.163-16.163h-123.164c-8.927 0-16.163 7.237-16.163 16.163s7.237 16.163 16.163 16.163z" />
        <path d="m131.681 199.148h123.164c8.927 0 16.163-7.237 16.163-16.163s-7.236-16.163-16.163-16.163h-123.164c-8.927 0-16.163 7.237-16.163 16.163s7.237 16.163 16.163 16.163z" />
        <path d="m131.681 272.163h123.164c8.927 0 16.163-7.236 16.163-16.163s-7.236-16.163-16.163-16.163h-123.164c-8.927 0-16.163 7.237-16.163 16.163 0 8.927 7.237 16.163 16.163 16.163z" />
      </g>
    </svg>,
  ];
  const Hobbies = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      enable-background="new 0 0 66 66"
      height="20"
      viewBox="0 0 66 66"
      width="20"
    >
      <g>
        <g>
          <path d="m5.5 39.4c-1.6 0-2.9-1.2-2.9-2.6 0-1.5 1.2-2.6 2.9-2.6s2.9 1.1 2.9 2.6-1.2 2.6-2.9 2.6zm0-3.2c-.5 0-.9.3-.9.6s.4.6.9.6.9-.3.9-.6-.4-.6-.9-.6z" />
        </g>
        <g>
          <path d="m34.5 44c-5.1 0-9.3-4.2-9.3-9.3v-3.5c0-.6.4-1 1-1s1 .4 1 1v3.5c0 4 3.3 7.3 7.3 7.3s7.3-3.3 7.3-7.3l-.1-4.6c0-.6.4-1 1-1 .5 0 1 .4 1 1l.1 4.6c0 5.1-4.2 9.3-9.3 9.3z" />
        </g>
        <g>
          <g>
            <path d="m46.1 65h-23.3c-3 0-5.3-2.3-5.3-5.3v-1.4c0-2.2.7-4.4 2.1-6.2s3.4-3 5.5-3.6h.2c1.2 0 2.3-.6 3-1.6.4-.6.6-1.3.6-1.9v-3.2c0-.6.4-1 1-1s1 .4 1 1v3.2c0 1.1-.4 2.2-1 3.1-1 1.5-2.7 2.4-4.5 2.4-1.6.4-3.1 1.4-4.3 2.8-1.1 1.5-1.7 3.2-1.7 5v1.4c0 1.9 1.4 3.3 3.3 3.3h23.3c1.9 0 3.3-1.4 3.3-3.3v-1.4c0-1.8-.6-3.5-1.7-5-1-1.4-2.5-2.3-4.2-2.8-1.8 0-3.3-.9-4.5-2.4-.6-.9-1-2-1-3.1v-3.2c0-.6.4-1 1-1s1 .4 1 1v3.2c0 .7.2 1.4.6 1.9.5.7 1.5 1.6 3 1.6h.2c2.2.6 4.1 1.8 5.5 3.6s2.1 4 2.1 6.2v1.4c.1 3-2.2 5.3-5.2 5.3z" />
          </g>
        </g>
        <g>
          <path d="m30.1 33.2c-1.4 0-2.9-.3-4.4-1.1-.3-.2-.5-.5-.5-.9 0-5.1 4.2-9.3 9.3-9.3s9.3 4.2 9.3 9.3c0 .3-.1.6-.4.8s-.5.3-.8.2l-5.2-1.2c-.1 0-.7.3-1.1.5-1.4.7-3.7 1.7-6.2 1.7zm-2.9-2.6c3.2 1.5 6.2 0 8.2-.9.9-.4 1.6-.7 2.1-.7h.1l4 .9c-.6-3.4-3.6-6-7.2-6-3.7 0-6.9 3-7.2 6.7z" />
        </g>
        <g>
          <path d="m34.5 51.6c-.9 0-1.9-.3-2.7-.9l-3.3-2.4c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l3.3 2.4c.9.7 2.2.7 3.1 0l3.3-2.4c.4-.3 1.1-.2 1.4.2s.2 1.1-.2 1.4l-3.3 2.4c-.8.6-1.8.9-2.8.9z" />
        </g>
        <g>
          <path d="m34.5 16.8c-.2 0-.4-.1-.6-.2-.2-.2-.4-.5-.4-.8v-11.1c0-.5.3-.9.8-1l11-2.7c.3-.1.6 0 .9.2.2.2.4.5.4.8v11c0 .5-.3.9-.8 1l-11 2.8c-.1 0-.2 0-.3 0zm1-11.3v9l9-2.3v-8.9z" />
        </g>
        <g>
          <path d="m34.5 16.8c-.1 0-.2 0-.2 0l-11-2.8c-.4-.1-.8-.5-.8-1v-11c0-.3.1-.6.4-.8.2-.2.5-.2.8-.2l11 2.7c.4.1.8.5.8 1v11.1c0 .3-.1.6-.4.8-.2.1-.4.2-.6.2zm-10-4.6 9 2.3v-9l-9-2.2z" />
        </g>
        <g>
          <path d="m7.4 37.3c-.6 0-1-.4-1-1v-8c0-.4.3-.8.7-1l7.9-2.4c.3-.1.6 0 .9.2s.4.5.4.8v8c0 .6-.4 1-1 1s-1-.4-1-1v-6.7l-5.9 1.8v7.3c0 .6-.4 1-1 1z" />
        </g>
        <g>
          <path d="m13.4 37.1c-1.6 0-2.9-1.2-2.9-2.6 0-1.5 1.2-2.6 2.9-2.6 1.6 0 2.9 1.2 2.9 2.6 0 1.5-1.2 2.6-2.9 2.6zm0-3.2c-.5 0-.9.3-.9.6s.4.6.9.6.9-.3.9-.6-.4-.6-.9-.6z" />
        </g>
        <g>
          <path d="m62.3 38.4h-10.8c-.6 0-1-.4-1-1v-10.4c0-.6.4-1 1-1h10.8c.6 0 1 .4 1 1v10.4c0 .6-.4 1-1 1zm-9.8-2h8.8v-8.4h-8.8z" />
        </g>
        <g>
          <path d="m55.1 35.3c-.2 0-.4 0-.5-.1-.3-.2-.5-.5-.5-.9v-4.3c0-.4.2-.7.5-.9s.7-.2 1 0l4.2 2.2c.3.2.5.5.5.9s-.2.7-.6.9l-4.2 2.1c-.1.1-.2.1-.4.1zm1-3.6v1l1-.5z" />
        </g>
        <g>
          <path d="m9.8 24.4c-.1 0-.2 0-.3 0-.5-.2-.8-.7-.7-1.2 1.5-5.4 4.9-10.2 9.6-13.4.5-.3 1.1-.2 1.4.2.3.5.2 1.1-.2 1.4-4.3 3-7.4 7.4-8.8 12.4-.2.3-.6.6-1 .6z" />
        </g>
        <g>
          <path d="m21.6 52.4c-.2 0-.3 0-.5-.1-4.8-2.5-8.8-6.7-11-11.7-.2-.5 0-1.1.5-1.3s1.1 0 1.3.5c2.1 4.6 5.7 8.4 10.2 10.7.5.3.7.9.4 1.3-.2.4-.5.6-.9.6z" />
        </g>
        <g>
          <path d="m46 51.5c-.3 0-.7-.2-.8-.5-.3-.5-.2-1.1.3-1.4 3.5-2.2 6.3-5.4 8.1-9 .2-.5.8-.7 1.3-.4.5.2.7.8.4 1.3-2 3.9-5.1 7.4-8.9 9.8 0 .1-.2.2-.4.2z" />
        </g>
        <g>
          <path d="m56.1 23.9c-.4 0-.8-.3-1-.7-1.1-3.5-3.1-6.8-5.8-9.4-.4-.4-.4-1 0-1.4s1-.4 1.4 0c2.8 2.8 5 6.4 6.2 10.2.2.5-.1 1.1-.6 1.3 0 0-.1 0-.2 0z" />
        </g>
        <g>
          <g>
            <path d="m24.6 65c-.6 0-1-.4-1-1v-5.9c0-.6.4-1 1-1s1 .4 1 1v5.9c0 .6-.4 1-1 1z" />
          </g>
          <g>
            <path d="m44.4 65c-.6 0-1-.4-1-1v-5.9c0-.6.4-1 1-1s1 .4 1 1v5.9c0 .6-.4 1-1 1z" />
          </g>
        </g>
      </g>
    </svg>,
  ];
  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const users = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M16 14C17.1046 14 18 14.8954 18 16V17C18 17.5523 17.5523 18 17 18H7C6.44772 18 6 17.5523 6 17V16C6 14.8954 6.89543 14 8 14H16Z"
        fill={color}
      />
      <path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        fill={color}
      />
      <path
        d="M20 14C21.1046 14 22 14.8954 22 16V17C22 17.5523 21.5523 18 21 18H19C18.4477 18 18 17.5523 18 17V16C18 14.8954 18.8954 14 20 14Z"
        fill={color}
      />
      <path
        d="M17 8C17 9.65685 18.3431 11 20 11C21.6569 11 23 9.65685 23 8C23 6.34315 21.6569 5 20 5C18.3431 5 17 6.34315 17 8Z"
        fill={color}
      />
      <path
        d="M4 14C5.10457 14 6 14.8954 6 16V17C6 17.5523 5.55228 18 5 18H3C2.44772 18 2 17.5523 2 17V16C2 14.8954 2.89543 14 4 14Z"
        fill={color}
      />
      <path
        d="M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z"
        fill={color}
      />
    </svg>,
  ];

  const university = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 2C3.44772 2 3 2.44772 3 3V17C3 17.5523 3.44772 18 4 18H8V14H12V18H16C16.5523 18 17 17.5523 17 17V3C17 2.44772 16.5523 2 16 2H4Z"
        fill={color}
      />
      <rect x="5" y="4" width="2" height="2" fill={color} />
      <rect x="8" y="4" width="2" height="2" fill={color} />
      <rect x="11" y="4" width="2" height="2" fill={color} />
      <rect x="14" y="4" width="2" height="2" fill={color} />
      <rect x="5" y="7" width="2" height="2" fill={color} />
      <rect x="8" y="7" width="2" height="2" fill={color} />
      <rect x="11" y="7" width="2" height="2" fill={color} />
      <rect x="14" y="7" width="2" height="2" fill={color} />
      <rect x="5" y="10" width="2" height="2" fill={color} />
      <rect x="8" y="10" width="2" height="2" fill={color} />
      <rect x="11" y="10" width="2" height="2" fill={color} />
      <rect x="14" y="10" width="2" height="2" fill={color} />
      <rect x="5" y="13" width="2" height="2" fill={color} />
      <rect x="8" y="13" width="2" height="2" fill={color} />
      <rect x="11" y="13" width="2" height="2" fill={color} />
      <rect x="14" y="13" width="2" height="2" fill={color} />
    </svg>,
  ];

  const offer = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M10 2C9.44772 2 9 2.44772 9 3V17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17V3C11 2.44772 10.5523 2 10 2Z"
        fill={color}
      />
      <path
        d="M2 9C2 8.44772 2.44772 8 3 8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H3C2.44772 10 2 9.55228 2 9Z"
        fill={color}
      />
    </svg>,
  ];

  const subscription = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <rect
        x="2"
        y="2"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke="#A0AEC0" /* Grey color */
        strokeWidth="2"
      />
      <path
        d="M4 9H16M4 13H16"
        stroke="#A0AEC0" /* Grey color */
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ];

  const setting = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 50 50"
    >
      <path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const rtl = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const contactUs = [
    <svg
      width="20"
      height="20"
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 84.04"
    >
      <title>call-message</title>
      <path d="M34.11,3h83a5.8,5.8,0,0,1,5.79,5.79V70.27a5.76,5.76,0,0,1-1,3.25,2.32,2.32,0,0,1-.55.82,2.2,2.2,0,0,1-.54.38,5.78,5.78,0,0,1-3.7,1.35H68a15.44,15.44,0,0,0,.42-4.45h47.22L84.8,39.23,74.62,47.91h0a2.22,2.22,0,0,1-2.84,0L61.1,39.23h0l-9.69,9.71A12.4,12.4,0,0,0,47,47.07L57.64,36.41,37.91,20.32a14,14,0,0,0-.68-3.42l-.79-3.49L73.15,43.34,115.26,7.46H35.11L34.11,3ZM17.46,31a61.46,61.46,0,0,0,4.73,14.91A51.89,51.89,0,0,0,32.61,60.48a1.47,1.47,0,0,0,1.17.45,5.31,5.31,0,0,0,2-.67,17.91,17.91,0,0,0,2.1-1.36c3.14-2.18,7-4.89,10.29-1.85.08.07.12.14.2.2L58.84,68.78a1.13,1.13,0,0,1,.1.13,6.09,6.09,0,0,1,.79,5.77,14.31,14.31,0,0,1-3.94,5.76,13.76,13.76,0,0,1-7.94,3.46,29.8,29.8,0,0,1-8.28-.4,27.16,27.16,0,0,1-11.31-4.73,54.16,54.16,0,0,1-9.86-9.43l-.24-.29c-1.52-1.8-3.16-3.73-4.69-5.88A78.72,78.72,0,0,1,1,34.34C-.72,25.59-.37,16.85,3.33,9.62c2-4,5.06-7.2,9-8.69,3.44-1.32,7.51-1.34,12.13.63a1.67,1.67,0,0,1,1,1.24l3.73,16.58a4.57,4.57,0,0,1-.82,4.88,9.43,9.43,0,0,1-4.29,2.5c-.56.24-1.21.45-1.9.67-2.27.74-4.86,1.61-4.73,3.65v0Zm70.72,5.33,30.26,31.73V10.58L88.18,36.36Z" />
    </svg>,
  ];

  const faqIcon = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V12C21 12.5523 20.5523 13 20 13H16V16C16 17.1046 15.1046 18 14 18H10C8.89543 18 8 17.1046 8 16V13H4C3.44772 13 3 12.5523 3 12V3ZM19 12V3H5V12H19ZM14 16C14 16.5523 13.5523 17 13 17H11C10.4477 17 10 16.5523 10 16V14C10 13.4477 10.4477 13 11 13H13C13.5523 13 14 13.4477 14 14V16Z"
        fill="#A0AEC0" /* Grey color */
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20C11.4477 20 11 20.4477 11 21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20Z"
        fill="#A0AEC0" /* Grey color */
      />
    </svg>,
  ];

  const logout = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12H5"
        stroke="#A0AEC0" /* Grey color */
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5L19 12L12 19"
        stroke="#A0AEC0" /* Grey color */
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ];

  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      content: "You will be logged out of your account.",
      onOk() {
        localStorage.clear();
        history.push("/login");
      },
      onCancel() {
        console.log("Logout canceled");
      },
    });
  };

  return (
    <>
      <div className="">
        <img
          style={{
            height: "60px",
            "margin-left": "74px",
          }}
          src={logo}
          alt=""
        />
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/users">
            <span
              className="icon"
              style={{
                background: page === "users" ? color : "",
              }}
            >
              {users}
            </span>
            <span className="label">Users</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <NavLink to="/university">
            <span
              className="icon"
              style={{
                background: page === "university" ? color : "",
              }}
            >
              {university}
            </span>
            <span className="label">University</span>
          </NavLink>
        </Menu.Item> */}
        {/* <Menu.Item key="2">
          <NavLink to="/offer">
            <span
              className="icon"
              style={{
                background: page === "offer" ? color : "",
              }}
            >
              {offer}
            </span>
            <span className="label">Offers</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="2">
          <NavLink to="/plan">
            <span
              className={`icon ${
                page === "plan" || page === "plan/add" ? "activate" : ""
              }`}
              style={{
                background: page === "plan" || page === "plan/add" ? color : "",
              }}
            >
              {subscription}
            </span>
            <span className="label">Plan</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/event">
            <span
              className="icon"
              style={{
                background: page === "event" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Event</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/event-category">
            <span
              className="icon"
              style={{
                background: page === "event-category" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Event Category</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <NavLink to="/post">
            <span
              className="icon"
              style={{
                background: page === "post" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Post</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="2">
          <NavLink to="/contact-us">
            <span
              className="icon"
              style={{
                background: page === "contact-us" ? color : "",
              }}
            >
              {contactUs}
            </span>
            <span className="label">Contact Us</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <NavLink to="/feedbacks">
            <span
              className="icon"
              style={{
                background: page === "feedbacks" ? color : "",
              }}
            >
              {contactUs}
            </span>
            <span className="label">Feedbacks</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="2">
          <NavLink to="/chat-report">
            <span
              className="icon"
              style={{
                background: page === "chat-report" ? color : "",
              }}
            >
              {PostReport}
            </span>
            <span className="label">Chat Report</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/chat-block">
            <span
              className="icon"
              style={{
                background: page === "chat-block" ? color : "",
              }}
            >
              {PostReport}
            </span>
            <span className="label">Chat Block</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/faq">
            <span
              className="icon"
              style={{
                background: page === "faq" ? color : "",
              }}
            >
              {faqIcon}
            </span>
            <span className="label">FAQ</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="3">
          <NavLink to="/blog-category">
            <span
              className="icon"
              style={{
                background: page === "blogs" ? color : "",
              }}
            >
              {faqIcon}
            </span>
            <span className="label">Blog category</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/blogs">
            <span
              className="icon"
              style={{
                background: page === "blogs" ? color : "",
              }}
            >
              {faqIcon}
            </span>
            <span className="label">Blogs</span>
          </NavLink>
        </Menu.Item> */}
        {/* <Menu.Item key="4">
          <NavLink to="/report-element">
            <span
              className="icon"
              style={{
                background: page === "report-element" ? color : "",
              }}
            >
              {ReportElement}
            </span>
            <span className="label">Report Element</span>
          </NavLink>
        </Menu.Item> */}
        {/* <Menu.Item key="4">
          <NavLink to="/languages">
            <span
              className="icon"
              style={{
                background: page === "languages" ? color : "",
              }}
            >
              {ReportElement}
            </span>
            <span className="label">Languages</span>
          </NavLink>
        </Menu.Item>
         <Menu.Item key="4">
          <NavLink to="/food-preference">
            <span
              className="icon"
              style={{
                background: page === "food-preference" ? color : "",
              }}
            >
              {ReportElement}
            </span>
            <span className="label">Food Preference</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="4">
          <NavLink to="/hobbies">
            <span
              className="icon"
              style={{
                background: page === "hobbies" ? color : "",
              }}
            >
              {Hobbies}
            </span>
            <span className="label">Hobbies</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/setting">
            <span
              className="icon"
              style={{
                background: page === "setting" ? color : "",
              }}
            >
              {setting}
            </span>
            <span className="label">Settings</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <NavLink to="/send-mail">
            <span
              className="icon"
              style={{
                background: page === "send-mail" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Send Mail</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="7">
          <Button
            style={{ border: "none" }}
            className="btn_logout"
            onClick={handleLogout}
          >
            <span className="icon">{logout}</span>
            <span className="label">Logout</span>
          </Button>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
