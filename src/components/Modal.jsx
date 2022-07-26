import { useEffect, useRef } from "react";
import twitter from "../media/twitter.svg";
import github from "../media/github.svg";
import setTrack from "../helpers/setTrack";
import paper_tear from "../media/paper-tear-black.png";

export default function Modal({ isSpeaker = false, data = {}, onClick }) {
  // Lines 15 – 61 all in service of Accessibility/ keyboard-friendly modal
  const ref = useRef();
  const activeElement = document.activeElement;
  let activeIndex = -1;
  let focusableElements = [];

  function handleTab(event) {
    let total = focusableElements.length;
    if (!event.shiftkey) {
      activeIndex + 1 === total ? (activeIndex = 0) : (activeIndex += 1);
      focusableElements[activeIndex].focus();
      return event.preventDefault();
    }
    if (event.shiftkey) {
      activeIndex - 1 < 0 ? (activeIndex = total - 1) : (activeIndex -= 1);
      focusableElements[activeIndex].focus();
      return event.preventDefault();
    }
  }

  function handleEscape(event) {
    if (event.key === "Escape") onClick();
  }
  // map of keyboard listeners
  const keyListenersMap = new Map([
    [9, handleTab],
    [27, handleEscape]
  ]);

  function handleKeydown(event) {
    const listener = keyListenersMap.get(event.keyCode);
    return listener && listener(event);
  }

  useEffect(() => {
    if (ref.current) {
      // Select all focusable elements within ref
      focusableElements = ref.current.querySelectorAll("a, button");
    }
  }, [ref]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      activeElement.focus();
    };
  }, []);

  return (
    <div className="modal-bg" onClick={onClick}>
      <article
        className={`Modal ${isSpeaker ? "speaker-modal" : ""}`}
        ref={ref}
      >
        {isSpeaker ? (
          <>
            {/*---------- Speaker Modal ----------*/}
            <aside>
              <div className="speaker-img">
                <img src={data.img_url} alt={`${data.name}'s portrait`} />
              </div>
              <p style={{ borderColor: setTrack(data.track).bg }}>
                {data.track}
              </p>
              <div className="socials">
                {data.twitter && (
                  <a href={data.twitter}>
                    <img src={twitter} alt="twitter icon" />
                    <span className="sr-only">twitter</span>
                  </a>
                )}
                {data.github && (
                  <a href={data.github}>
                    <img src={github} alt="guthub icon" />
                    <span className="sr-only">github</span>
                  </a>
                )}
              </div>
            </aside>
            <main>
              <h2>{data.name}</h2>
              <p className="subhead">
                {data.position} @ <span>{data.company}</span>
              </p>
              <p>{data.bio}</p>
            </main>
          </>
        ) : (
          <main className="generic">
            {/*---------- Generic Modal ----------*/}
            <div>
              <h2>{data.header}</h2>
              <p>{data.text}</p>
              <a href={data.button_url} className="btn">
                {data.button_txt}
              </a>
            </div>
            <div className="speaker-img">
              <img src={data.img_url} alt="" />
            </div>
          </main>
        )}
        {/*---------- Close button and tear effects ----------*/}
        <button className="close" onClick={onClick}>
          &#10005;
        </button>
        <span
          className=" tear tear-bottom"
          style={{ backgroundImage: `url(${paper_tear})` }}
        ></span>
      </article>
    </div>
  );
}
