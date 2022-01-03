import { KurdWithTopics } from "../kurds";
import { getPhoto } from "../utils";

interface CardProps {
  kurd: KurdWithTopics;
  contributor: boolean;
}

export default function Card({ kurd, contributor }: CardProps) {
  return (
    <a className="card" href={kurd.link} target="_blank" rel="noreferrer">
      <img src={getPhoto(kurd)} alt={kurd.name} />
      <h1>{kurd.name}</h1>
      <p>{kurd.topics.join(", ")}</p>
      <div>
        {contributor && <span className="c">Contributor</span>}

        {kurd.tags.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </a>
  );
}
