import { useState } from "react";
import { AwesomeKurds, KurdsWithTopics } from "../kurds";
import Card from "./Card";

export default function Cards({
  awesomeKurds,
}: {
  awesomeKurds: AwesomeKurds;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search by name..."
          // @ts-ignore
          onKeyUp={e => setSearchQuery(e.target.value)}
        />
        {/* <select>
        <option key="all" selected>All</option>
        {awesomeKurds.tags.map((t, i) => (
          <option key={i} value={t}>
            {t}
          </option>
        ))}
      </select> */}
      </div>
      <div className="cards">
        {awesomeKurds.searchForKurd(searchQuery).map((k, i) => (
          <Card key={i} kurd={k} />
        ))}
      </div>
    </>
  );
}
