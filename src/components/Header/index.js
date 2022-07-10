import React from "react";
import "./style.scss";

import { useDispatch } from "react-redux";
import { toggle } from "../../reducers/modalSlice";

function Header({ title }) {
  const dispatch = useDispatch();
  const toggleStatistics = () => dispatch(toggle());

  return (
    <header className="header">
      <div className="title">{title}</div>
      <div className="buttons">
        <svg
          onClick={toggleStatistics}
          id="statistics_svg"
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
        >
          <path d="M16.0142 4.9978C14.9092 4.9978 14.0142 5.8928 14.0142 6.9978V14.9978C14.0142 16.1028 14.9092 16.9978 16.0142 16.9978H18.0142C19.1192 16.9978 20.0142 16.1028 20.0142 14.9978V6.9978C20.0142 5.8928 19.1192 4.9978 18.0142 4.9978H16.0142ZM9.01416 0.997803C7.90916 0.997803 7.01416 1.8928 7.01416 2.9978V14.9978C7.01416 16.1028 7.90916 16.9978 9.01416 16.9978H11.0142C12.1192 16.9978 13.0142 16.1028 13.0142 14.9978V2.9978C13.0142 1.8928 12.1192 0.997803 11.0142 0.997803H9.01416ZM2.01416 8.9978C0.90916 8.9978 0.0141602 9.8928 0.0141602 10.9978V14.9978C0.0141602 16.1028 0.90916 16.9978 2.01416 16.9978H4.01416C5.11916 16.9978 6.01416 16.1028 6.01416 14.9978V10.9978C6.01416 9.8928 5.11916 8.9978 4.01416 8.9978H2.01416Z"></path>
        </svg>
      </div>
    </header>
  );
}

export default Header;
