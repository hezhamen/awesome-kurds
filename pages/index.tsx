// react & next
import { useEffect, useState } from "react";
import Head from "next/head";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import _ from "lodash";
// components
import KurdCard from "../components/KurdCard";

// antd
import { Button, Col, Layout, Row, Space } from "antd";
import { Typography } from "antd";

// styles
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

  const { Header, Footer, Content } = Layout;
  const { Title, Text, Link } = Typography;

  return (
    <>
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
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title>Awesome Kurds</Title>
          <Text type="secondary">
            Meet {awesomeKurds.kurds.length} amazing Kurds.
          </Text>

          <BubbleUI options={options} className="myBubbleUI">
            {_.shuffle(awesomeKurds.kurds).map((k, i) => {
              return <Avatar key={i} src={getPhoto(k)} className="child" />;
            })}
          </BubbleUI>
          <Row gutter={16}>
            <Col span={12}>
              <Link
                href="https://github.com/DevelopersTree/awesome-kurds"
                rel="noreferrer"
              >
                <Button type="primary" size="large">
                  Join the list
                </Button>
              </Link>
            </Col>

            <Col span={12}>
              <Link
                href="https://github.com/AramRafeq/awesome-kurds"
                rel="noreferrer"
              >
                <Button type="default" size="large">
                  Contribute
                </Button>
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>

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
            <Space wrap>
              <Search
                placeholder="Search..."
                allowClear
                enterButton="Search"
                size="large"
                onSearch={(e) => setSearchTerm(e)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Dropdown setActiveTag={setActiveTag} tags={awesomeKurds.tags} />
            </Space>
          </Row>
        </Header>
        <Row gutter={16}>
          {awesomeKurds
            .searchForKurd(searchTerm)
            .filter((k) =>
              activeTag && activeTag != "All"
                ? k.tags.includes(activeTag)
                : true
            )
            .map((k, i) => (
              <Col key={k.name} xs={24} sm={12} lg={8} xl={6}>
                <KurdCard key={i} kurd={k} />
              </Col>
            ))}
        </Row>
      </Layout>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Powered by{" "}
        <Link href="https://devs.krd" target="_blank" rel="noreferrer">
          devs.krd
        </Link>
        .
      </Footer>
    </>
  );
}
