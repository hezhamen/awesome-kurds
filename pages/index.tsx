// react & next
import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import _ from "lodash";
// components
import KurdCard from "../components/KurdCard";

// antd
import { Layout, Button } from "antd";
import type { Input } from "antd";

// styles
import styles from "../styles/Home.module.css";
import Loading from "../components/Loading";
import Search from "antd/lib/input/Search";
import Dropdown from "../components/Dropdown";
import { Avatar } from "antd";

import { AwesomeKurds } from "../kurds";
import { getPhoto } from "../utilities";
type Props = {
  readme: string;
};

const BUBBLE_UI_OPTIONS = {
  size: 200,
  minSize: 25,
  gutter: 20,
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

export default function Home({ readme }: Props) {
  const [awesomeKurds, setAwesomeKurds] = useState<AwesomeKurds>();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [activeTag, setActiveTag] = useState("");
  const searchInputRef = useRef<Input | null>(null);
  const shuffledAwesomeKurds = useMemo(
    () => (awesomeKurds?.kurds.length > 0 ? _.shuffle(awesomeKurds.kurds) : []),
    [awesomeKurds?.kurds]
  );

  const filteredAwesomeKurds = useMemo(
    () =>
      awesomeKurds
        ?.searchForKurd(debouncedSearchTerm)
        .filter((k) =>
          activeTag && activeTag != "All" ? k.tags.includes(activeTag) : true
        ),
    [activeTag, awesomeKurds, debouncedSearchTerm]
  );

  useEffect(() => {
    setAwesomeKurds(new AwesomeKurds(readme));
  }, [readme]);

  // useEffect(() => {
  //   if (awesomeKurds) {
  //     const shuffledAwesomeKurds = _.shuffle(awesomeKurds?.kurds);
  //     // setShuffledAwesomeKurds(shuffledAwesomeKurds);
  //   }
  // }, [awesomeKurds]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/" && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    };

    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, []);

  useEffect(() => {
    const timeoutHandle = setTimeout(
      () => setDebouncedSearchTerm(searchTerm),
      200
    );

    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [searchTerm]);

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

      <Layout
        style={{
          backgroundColor: "transparent",
          height: "100vh",
        }}
      >
        <Layout.Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className={styles.title}>Awesome Kurds</h1>
          <p className={styles.slogan}>
            Meet {awesomeKurds.kurds.length} awesome Kurds.
          </p>
          <div className={styles.CTA}>
            <BubbleUI options={BUBBLE_UI_OPTIONS} className="myBubbleUI">
              {shuffledAwesomeKurds.map((k, i) => {
                return (
                  <Avatar
                    key={`dev-${i}`}
                    src={getPhoto(k)}
                    className="child"
                  />
                );
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
            <a
              href="https://github.com/AramRafeq/awesome-kurds"
              rel="noreferrer"
            >
              <Button type="default" size="large">
                Contribute
              </Button>
            </a>
          </div>
        </Layout.Content>
      </Layout>

      <main className={styles.main}>
        <div className={styles.search}>
          <Dropdown setActiveTag={setActiveTag} tags={awesomeKurds.tags} />
          <Search
            ref={searchInputRef}
            placeholder="Search..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => setSearchTerm(value)}
            onChange={(e) => setSearchTerm(e.target.value)}
            suffix={
              <kbd>
                <span className="keyboard-child">CTRL</span>
                <span className="keyboard-child">/</span>
              </kbd>
            }
          />
        </div>
        <div className={styles.dealer}>
          {filteredAwesomeKurds.map((k, i) => (
            <KurdCard key={i} kurd={k} />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Powered by</span>
        <a href="https://devs.krd" target="_blank" rel="noreferrer">
          devs.krd
        </a>
        <span>.</span>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/DevelopersTree/awesome-kurds/main/README.md"
  );
  const readme = await res.text();

  if (!readme) {
    return {
      notFound: true,
    };
  }
  return {
    props: { readme },
  };
};
