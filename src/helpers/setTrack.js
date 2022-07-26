export default function setTrack(speakerTrack) {
  switch (speakerTrack) {
    case "Design/CSS":
      return { bg: "#f8705f", color: "#2A0903" };
    case "Leadership & Entrepenurship":
      return { bg: "#fecc1b", color: "#352b06" };
    case "Product & Project Management":
      return { bg: "#030777", color: "#b8c1ff" };
    case "Web/Mobile":
      return { bg: "#02b5a8", color: "#092c29" };
    default:
      return { bg: "#ff7fdf", color: "#2b0e24" };
  }
}
