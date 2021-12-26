// react & next
import { useEffect, useState } from "react";
import Head from "next/head";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import _ from "lodash";
// components
import KurdCard from "../components/KurdCard";

//api
import { getAllNames, getAllTags, getKurds } from "./api/api";

// antd
import {
  Alert,
  AutoComplete,
  Button,
  Card,
  Input,
  Statistic,
  Pagination,
} from "antd";

// styles
import styles from "../styles/Home.module.css";
import Loading from "../components/Loading";
import Search from "antd/lib/input/Search";
import Dropdown from "../components/Dropdown";
import { Avatar } from "antd";
import PaginationKurds from "../components/PaginationKurds";

export default function Home() {
  const [theKurds, setTheKurds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [kurdsPerPage] = useState(20);
  const options = {
    size: 200,
    minSize: 40,
    gutter: 8,
    provideProps: true,
    numCols: 8,
    fringeWidth: 400,
    yRadius: 130,
    xRadius: 220,
    cornerRadius: 50,
    showGuides: false,
    compact: true,
    gravitation: 5,
  };

  const indexOfLastKurd = currentPage * kurdsPerPage;
  const indexOfFirstKurd = indexOfLastKurd - kurdsPerPage;
  const currentKurds = theKurds.slice(indexOfFirstKurd, indexOfLastKurd);

  useEffect(() => {
    getKurds().then((kurds) => {
      setTheKurds(kurds);
    });
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
      <section className={styles.hero}>
        <h1 className={styles.title}>Awesome Kurds</h1>
        <p className={styles.slogan}>Meet {theKurds.length} amazing Kurds.</p>
        <div className={styles.CTA}>
        <BubbleUI options={options} className="myBubbleUI">
          {_.shuffle(theKurds).map((person)=>{
            return (
              <Avatar className="child" src={person.image} key={`person-${person.name}`} />
            )
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
        <div className={styles.dealer}>
          {(activeTag === "" || activeTag === "All") && searchTerm === ""
            ? currentKurds
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
                .map((person) => <KurdCard key={person.name} person={person} />)
            : theKurds
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
        <PaginationKurds
          theKurds={theKurds}
          kurdsPerPage={kurdsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </main>

      <footer className={styles.footer}>
        <a href="https://devs.krd" target="_blank" rel="noreferrer">
          Powered by Devs.Krd
        </a>
      </footer>
    </div>
  );
}
