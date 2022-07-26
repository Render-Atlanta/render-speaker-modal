import "./styles.css";
import { useState } from "react";
import SpeakerList from "./components/SpeakerList";
import Modal from "./components/Modal";
import useData from "./hooks/useData";

export default function App() {
  const [modal, setModal] = useState({
    isOpen: false,
    isSpeaker: false,
    data: {}
  });
  const { data } = useData();

  function onModalOpen(data = {}, isSpeaker = false) {
    setModal({
      isOpen: !modal.isOpen,
      data: data,
      isSpeaker: isSpeaker
    });
  }

  return (
    <>
      <button
        onClick={() => {
          onModalOpen(data);
        }}
      >
        open generic modal
      </button>
      {modal.isOpen && (
        <Modal
          isSpeaker={modal.isSpeaker}
          data={modal.data}
          onClick={() => {
            setModal(false);
          }}
        />
      )}
      <section className="Speaker-Component">
        <div className="speakers-header">
          <h2>
            <span>Taking</span>
            <br />
            the stage
          </h2>
          <p>
            Come and hear from some of the best teams and minds in the industry.
            We’re boosting your career and your craft with talks on tech, web3,
            leadership, inclusion, accessibility, and more.
          </p>
        </div>
        <SpeakerList onSpeakerClick={onModalOpen} />
      </section>
    </>
  );
}
