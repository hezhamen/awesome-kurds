import { useState } from "react";
import { AwesomeKurds } from "../kurds";
import Card from "./Card";

export default function Cards({
  awesomeKurds,
}: {
  awesomeKurds: AwesomeKurds;
}) {
  const [tagQuery, setTagQuery] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="search">
        <select onChange={e => setTagQuery(e.target.value)}>
          <option key="all" value="all" selected>
            All
          </option>
          {awesomeKurds.tags.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by name..."
          onKeyUp={e => setSearchQuery((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="cards">
        {awesomeKurds
          .searchForKurd(searchQuery)
          .filter(k => tagQuery == "all" || k.tags.includes(tagQuery))
          .map((k, i) => (
            <Card key={i} kurd={k} />
          ))}
      </div>
    </>
  );
}
