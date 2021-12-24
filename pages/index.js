import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getKurds } from "./api/api";

export default function Home() {
  const [theKurds, setTheKurds] = useState([]);

  useEffect(() => {
    getKurds().then((kurds) => setTheKurds(kurds));
  }, []);

  if (theKurds.length === 0) {
    return <div>loading</div>;
  }

  console.log(theKurds);

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
        {/* <div>
          <button
            className={`${styles.tagSelector} + ${styles.activeSelector}`}
          >
            All
          </button>
          <button className={styles.tagSelector}>ReactJs</button>
          <button className={styles.tagSelector}>VueJs</button>
          <button className={styles.tagSelector}>AngularJs</button>
        </div> */}
        <div className={styles.dealer}>
          {theKurds.map((person) => (
            <div className={styles.card}>
              <img src={person.image} width={100} />
              <h1>{person.name}</h1>
              {person.titles.map((title) => (
                <p>{title}</p>
              ))}
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://devs.krd" target="_blank" rel="noopener noreferrer">
          Powered by <span className={styles.logo}>Devs.Krd</span>
        </a>
      </footer>
    </div>
  );
}
