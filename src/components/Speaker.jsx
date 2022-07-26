import twitter from "../media/twitter.svg";
import github from "../media/github.svg";
import setTrack from "../helpers/setTrack";
import paperScrap from "../media/paper-scrap-4.png";

export default function Speaker({ speaker, onClick }) {
  return (
    <button className="Speaker" onClick={() => onClick(speaker, true)}>
      <div className="speaker-img">
        <img src={speaker.img_url} alt={`${speaker.name}'s portrait`} />
        <span
          className="track"
          style={{
            backgroundColor: setTrack(speaker.track).bg,
            color: setTrack(speaker.track).color
          }}
        >
          {speaker.track}
        </span>
      </div>
      <div className="contact">
        <img src={paperScrap} alt="" className="bg" />
        <h3>{speaker.name}</h3>
        <p>
          {speaker.position} @ <span>{speaker.company}</span>
        </p>
        <div className="socials">
          {speaker.twitter && (
            <a href={speaker.twitter}>
              <img src={twitter} alt="twitter icon" />
              <span className="sr-only">twitter</span>
            </a>
          )}
          {speaker.github && (
            <a href={speaker.github}>
              <img src={github} alt="guthub icon" />
              <span className="sr-only">github</span>
            </a>
          )}
        </div>
      </div>
    </button>
  );
}
