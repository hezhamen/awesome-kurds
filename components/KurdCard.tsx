import Image from 'next/image';

import { Card, Tag } from "antd";
import {
  BehanceOutlined,
  FacebookOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  LinkOutlined,
} from "@ant-design/icons";

import styles from "../styles/Home.module.css";
import { KurdWithTopics } from "../kurds";
import { getPhoto } from "../utilities";

const { Meta } = Card;

export default function KurdCard({ kurd }: { kurd: KurdWithTopics }) {
  return (
    <Card
      className={styles.card}
      cover={<Image className={styles.avatar} width="150" src={getPhoto(kurd)} alt={kurd.name} />}
      actions={[
        <a key="social" target="_blank" href={kurd.link} rel="noreferrer">
          {kurd.link.includes("twitter") ? (
            <TwitterOutlined key="twitter" />
          ) : kurd.link.includes("behance") ? (
            <BehanceOutlined key="behance" />
          ) : kurd.link.includes("facebook") ? (
            <FacebookOutlined key="facebook" />
          ) : kurd.link.includes("github") ? (
            <GithubOutlined key="github" />
          ) : kurd.link.includes("linkedin") ? (
            <LinkedinOutlined key="linkedin" />
          ) : (
            <LinkOutlined key="link" />
          )}
        </a>,
      ]}
    >
      <Meta title={kurd.name} />

      {kurd.topics.map((t, i) => (
        <Meta key={i} description={t} />
      ))}

      {kurd.tags.length > 0 && (
        <div className={styles.tags}>
          {kurd.tags.map((t, i) => (
            <Tag key={i} color="blue">
              {t}
            </Tag>
          ))}
        </div>
      )}
    </Card>
  );
}
