import React from "react";

//antd
import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

// styles
import styles from "../styles/Home.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Spin
        indicator={<Loading3QuartersOutlined style={{ fontSize: 24 }} spin />}
      />
    </div>
  );
};

export default Loading;
