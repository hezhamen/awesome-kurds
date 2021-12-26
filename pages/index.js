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
  Col,
  Input,
  Layout,
  Row,
  Space,
  Statistic,
} from "antd";

// styles
import styles from "../styles/Home.module.css";
import Loading from "../components/Loading";
import Search from "antd/lib/input/Search";
import Dropdown from "../components/Dropdown";
import { Avatar } from "antd";

export default function Home() {
  const [theKurds, setTheKurds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("");
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

  useEffect(() => {
    getKurds().then((kurds) => setTheKurds(kurds));
  }, []);

  if (theKurds.length === 0) {
    return <Loading />;
  }

  const { Header, Footer, Sider, Content } = Layout;

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
            {_.shuffle(theKurds).map((person) => {
              return (
                <Avatar
                  className="child"
                  src={person.image}
                  key={`person-${person.name}`}
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
          <a href="https://github.com/AramRafeq/awesome-kurds" rel="noreferrer">
            <Button type="default" size="large">
              Contribute
            </Button>
          </a>
        </div>
      </section>
      <Layout
        style={{
          background: "#fff",
        }}
      >
        <Header
          style={{
            lineHeight: "1.5",
            background: "#fff",
            marginBottom: "1rem",
          }}
        >
          <Row justify="center">
            <Space wrap="true">
              <Search
                placeholder="Search by name..."
                allowClear
                enterButton="Search"
                size="large"
                onSearch={(e) => setSearchTerm(e)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Dropdown
                activeTag={activeTag}
                setActiveTag={setActiveTag}
                getAllTags={getAllTags}
                theKurds={theKurds}
              />
            </Space>
          </Row>
        </Header>
        <Row gutter={16}>
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
              <Col key={person.name} xs={24} sm={12} lg={8} xl={6}>
                <KurdCard key={person.name} person={person} />
              </Col>
            ))}
        </Row>
      </Layout>

      <footer className={styles.footer}>
        <a href="https://devs.krd" target="_blank" rel="noreferrer">
          Powered by Devs.Krd
        </a>
      </footer>
    </div>
  );
}
