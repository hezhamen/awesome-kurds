import { Select } from "antd";
import styles from "../styles/Home.module.css";

export default function Dropdown({
  tags,
  setActiveTag,
}: {
  tags: string[];
  setActiveTag: any;
}) {
  const { Option } = Select;

  function onChange(v: any) {
    setActiveTag(v);
  }

  return (
    <div>
      <Select
        showSearch
        placeholder="Select a tag..."
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue="All"
        size="large"
        className={styles.tagSelector}
      >
        <Option value="All">All</Option>
        {tags.map((t, i) => (
          <Option key={i} value={t}>
            {t}
          </Option>
        ))}
      </Select>
    </div>
  );
}
