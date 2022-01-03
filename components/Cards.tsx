import { useState, useEffect, useMemo, useRef } from "react";
import { AwesomeKurds } from "../kurds";
import Card from "./Card";

interface CardsProps {
  awesomeKurds: AwesomeKurds;
  isContributor: (link: string) => boolean;
}

export default function Cards({ awesomeKurds, isContributor }: CardsProps) {
  const [topicQuery, setTopicQuery] = useState("all");
  const [tagQuery, setTagQuery] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredKurds = useMemo(
    () =>
      awesomeKurds
        .searchForKurd(debouncedSearchQuery)
        .filter(k => topicQuery == "all" || k.topics.includes(topicQuery))
        .filter(k => tagQuery == "all" || k.tags.includes(tagQuery)),
    [topicQuery, tagQuery, debouncedSearchQuery]
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

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchQuery(searchQuery), 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  return (
    <>
      <div className="search">
        <select onChange={e => setTopicQuery(e.target.value)}>
          <option key="all" value="all" selected>
            All topics
          </option>
          {awesomeKurds.topics.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>
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
          filteredKurds.map((k, i) => (
            <Card key={i} kurd={k} contributor={isContributor(k.link)} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}
