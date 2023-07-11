import React, { useEffect, useRef } from "react";
import "./style.scss";

import { toggle } from "../../reducers/modalSlice";
import { useDispatch } from "react-redux";

function Modal(props) {
  const { width, minHeight, title, closeModal } = props;

  const ref = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [width]);

  const handleClickOutside = (event) => {
    if (ref.current) {
      //console.log(ref.current.contains(event.target));
    }
    // closeModal(false)
  };

  const handleClick = () => {
    ref.current.classList.add("move-out");
  }

  const handleAnimationEnd = (event) => {
    console.log("handle animation end")
    if(event.animationName === 'moveOut'){
      ref.current.classList.remove("move-out");
      dispatch(toggle());
    }
  }

  return (
    <div
      className="modal"
      style={{
        width,
        minHeight,
      }}
      onAnimationEnd={handleAnimationEnd}
      ref={ref}
    >
      <div className="modal_header">
        <h1>{title}</h1>
        <div>
          <svg
            onClick={() => handleClick()}
            id="statistic_modal_close"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            width="20"
          >
            <path
              fill="var(--color-tone-3)"
              d="m12,0c-6.62736,0 -12,5.3724 -12,12c0,6.62763 5.37264,12 12,12c6.62763,0 12,-5.37237 12,-12c0,-6.6276 -5.37237,-12 -12,-12zm-3.6,7.2c0.30698,0 0.62819,0.1032 0.86255,0.33723l2.73745,2.73717l2.73717,-2.73717c0.2352,-0.23403 0.55563,-0.33723 0.86283,-0.33723c0.3072,0 0.62763,0.1032 0.86283,0.33723c0.468,0.46917 0.468,1.25637 0,1.72554l-2.73723,2.73723l2.73723,2.73723c0.468,0.46917 0.468,1.25637 0,1.72554c-0.46923,0.468 -1.25643,0.468 -1.72565,0l-2.73717,-2.73717l-2.73745,2.73717c-0.46856,0.468 -1.25637,0.468 -1.7251,0c-0.46861,-0.46917 -0.46861,-1.25637 0,-1.72554l2.73695,-2.73723l-2.73695,-2.73723c-0.46861,-0.46917 -0.46861,-1.25637 0,-1.72554c0.23447,-0.23403 0.55546,-0.33723 0.86255,-0.33723z"
            ></path>
          </svg>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Modal;
