// react & next
import { useEffect, useState } from "react";
import Head from "next/head";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import _ from "lodash";
// components
import KurdCard from "../components/KurdCard";

// antd
import { Button } from "antd";

// styles
import styles from "../styles/Home.module.css";
import Loading from "../components/Loading";
import Search from "antd/lib/input/Search";
import Dropdown from "../components/Dropdown";
import { Avatar } from "antd";

//
import { AwesomeKurds } from "../kurds";
import { getPhoto } from "../utilities";

export default function Home() {
  const [awesomeKurds, setAwesomeKurds] = useState<AwesomeKurds>();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const options = {
    size: 200,
    minSize: 25,
    gutter: 8,
    provideProps: true,
    numCols: 8,
    fringeWidth: 200,
    yRadius: 130,
    xRadius: 220,
    cornerRadius: 50,
    showGuides: false,
    compact: false,
    gravitation: 5,
  };

  useEffect(() => {
    (async () => {
      const readme = await (
        await fetch(
          "https://raw.githubusercontent.com/DevelopersTree/awesome-kurds/main/README.md"
        )
      ).text();

      setAwesomeKurds(new AwesomeKurds(readme));
    })();
  }, []);

  if (typeof awesomeKurds === "undefined") {
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
      <section className={styles.hero}>
        <h1 className={styles.title}>Awesome Kurds</h1>
        <p className={styles.slogan}>
          Meet {awesomeKurds.kurds.length} awesome Kurds.
        </p>
        <div className={styles.CTA}>
          <BubbleUI options={options} className="myBubbleUI">
            {_.shuffle(awesomeKurds.kurds).map((k, i) => {
              return <Avatar key={`dev-${i}`} src={getPhoto(k)} className="child" />;
            })}
          </BubbleUI>
          <a
            href="https://github.com/DevelopersTree/awesome-kurds"
            rel="noreferrer"
          >
            <Button type="primary" size="large">
              Join the list
            </Button>
          </a>
          <a href="https://github.com/AramRafeq/awesome-kurds" rel="noreferrer">
            <Button type="default" size="large">
              Contribute
            </Button>
          </a>
        </div>
      </section>
      <main className={styles.main}>
        <div className={styles.search}>
          <Dropdown setActiveTag={setActiveTag} tags={awesomeKurds.tags} />
          <Search
            placeholder="Search..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(e) => setSearchTerm(e)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.dealer}>
          {awesomeKurds
            .searchForKurd(searchTerm)
            .filter((k) =>
              activeTag && activeTag != "All"
                ? k.tags.includes(activeTag)
                : true
            )
            .map((k, i) => (
              <KurdCard key={i} kurd={k} />
            ))}
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by{" "}
        <a href="https://devs.krd" target="_blank" rel="noreferrer">
          devs.krd
        </a>
        .
      </footer>
    </div>
  );
}
