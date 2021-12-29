import { KurdsWithTopics } from "../kurds";

export default function Intro({ kurds }: { kurds: KurdsWithTopics }) {
  return (
    <div className="intro">
      <div>
        <h1>
          <a href="https://github.com/DevelopersTree/awesome-kurds">
            Awesome Kurds
          </a>
        </h1>
        <h3>Meet {kurds.length}+ Awesome Kurds.</h3>
      </div>
      <div className="scroll-down"></div>
    </div>
  );
}
