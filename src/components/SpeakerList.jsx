import { useState } from "react";
import useSpeakers from "../hooks/useSpeakers";
import Speaker from "./Speaker";

export default function SpeakerList({ onSpeakerClick }) {
  const [param, setParam] = useState(12);
  const { data, isLoading } = useSpeakers(param);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="spkr-grid">
        {data.records.map((speaker) => {
          return (
            <Speaker
              key={speaker.id}
              speaker={speaker.fields}
              onClick={onSpeakerClick}
            />
          );
        })}
      </div>
      {param && (
        <button
          className="btn"
          onClick={() => {
            setParam("");
          }}
        >
          Show All
        </button>
      )}
    </>
  );
}
