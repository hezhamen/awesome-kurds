import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  getKurds();

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
        <div>
          <button
            className={`${styles.tagSelector} + ${styles.activeSelector}`}
          >
            All
          </button>
          <button className={styles.tagSelector}>ReactJs</button>
          <button className={styles.tagSelector}>VueJs</button>
          <button className={styles.tagSelector}>AngularJs</button>
        </div>
        <div className={styles.dealer}>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
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
