import React from "react";
import { Layout } from "antd";
import { Typography } from "antd";

function Footer() {
  const { Footer } = Layout;
  const { Link } = Typography;

  return (
    <>
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

export default Footer;
