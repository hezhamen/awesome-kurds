// react & next
import { useEffect, useState } from "react";
import Head from "next/head";

// components
import KurdCard from "../components/KurdCard";

//api
import { getKurds } from "./api/api";

// antd
import { Card, Statistic } from "antd";

// styles
import styles from "../styles/Home.module.css";
import Loading from "../components/Loading";

export default function Home() {
  const [theKurds, setTheKurds] = useState([]);

  useEffect(() => {
    getKurds().then((kurds) => setTheKurds(kurds));
  }, []);

  if (theKurds.length === 0) {
    return <Loading />;
  }

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
          <Card>
            <Statistic
              title="Total People"
              value={theKurds.length}
              suffix="Kurds"
            />
          </Card>
        </div>
        <div className={styles.dealer}>
          {theKurds.map((person) => (
            <KurdCard person={person} />
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
