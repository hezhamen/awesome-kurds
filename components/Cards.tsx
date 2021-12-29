import { useState, useEffect, useMemo, useRef } from "react";
import { AwesomeKurds } from "../kurds";
import Card from "./Card";

export default function Cards({
  awesomeKurds,
}: {
  awesomeKurds: AwesomeKurds;
}) {
  const [tagQuery, setTagQuery] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredKurds = useMemo(
    () =>
      awesomeKurds
        .searchForKurd(searchQuery)
        .filter(k => tagQuery == "all" || k.tags.includes(tagQuery)),
    [tagQuery, searchQuery]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/" && searchRef.current) {
        searchRef.current.focus();
      }
    };

    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, []);

  return (
    <>
      <div className="search">
        <select onChange={e => setTagQuery(e.target.value)}>
          <option key="all" value="all" selected>
            All tags
          </option>
          {awesomeKurds.tags.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search by name..."
          title="CTRL + /"
          onKeyUp={e => setSearchQuery((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="cards">
        {filteredKurds.length != 0 ? (
          filteredKurds.map((k, i) => <Card key={i} kurd={k} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}
