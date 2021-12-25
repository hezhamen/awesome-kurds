// react & next
import { useEffect, useState } from "react";
import Head from "next/head";

// components
import KurdCard from "../components/KurdCard";

//api
import { getAllTags, getKurds } from "./api/api";

// antd
import { Card, Input, Statistic } from "antd";

// styles
import styles from "../styles/Home.module.css";
import Loading from "../components/Loading";
import Search from "antd/lib/input/Search";
import Dropdown from "../components/Dropdown";

export default function Home() {
  const [theKurds, setTheKurds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    getKurds().then((kurds) => setTheKurds(kurds));
  }, []);

  if (theKurds.length === 0) {
    return <Loading />;
  }

  console.log(
    theKurds.filter(
      (kurd) => kurd.tags.includes(activeTag) || activeTag === "All"
    )
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Kurds</title>
        <meta
          name="description"
          content="A list of cool kurds working in the IT industry to follow and meet! The list is in alphabetical order. Feel free to send a PR and add your name!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Awesome Kurds</h1>
        <p className={styles.slogan}>Meet the great.</p>
      </header>
      <main className={styles.main}>
        <div className={styles.info}>
          <div className={styles.search}>
            <Dropdown
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              getAllTags={getAllTags}
              theKurds={theKurds}
            />
            <Search
              placeholder="Search by name..."
              allowClear
              enterButton="Search"
              size="large"
              onSearch={(e) => setSearchTerm(e)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Card>
            <Statistic
              title="Total People"
              value={theKurds.length}
              suffix="Kurds"
            />
          </Card>
        </div>
        <div className={styles.dealer}>
          {theKurds
            .filter(
              (kurd) =>
                kurd.tags
                  .toString()
                  .toLowerCase()
                  .includes(activeTag.toLowerCase()) || activeTag === "All"
            )
            .filter((kurd) =>
              kurd.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((person) => (
              <KurdCard key={person.name} person={person} />
            ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://devs.krd" target="_blank" rel="noreferrer">
          Powered by Devs.Krd
        </a>
      </footer>
    </div>
  );
}
