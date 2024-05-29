import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full bottom-0  border-t-2 border-gray-100 justify-around ">
      <p className="text-sm text-yellow-200 mb-2">MOVIE DB</p>
      <p className="text-sm text-yellow-200">
        &copy; {new Date().getFullYear()}
      </p>

      <a
        href="https://drive.google.com/file/d/1qM0jUpu64v8GAepRqdq9Pfdi2Ozv6SXp/view?usp=drivesdk"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm mb-2 text-yellow-200 underline"
      >
        Prathamesh Jadhav
      </a>
    </footer>
  );
};

export default Footer;
