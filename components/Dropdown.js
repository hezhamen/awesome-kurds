import { Select } from "antd";
import React from "react";

function Dropdown({ theKurds, setActiveTag, getAllTags }) {
  const { Option } = Select;

  function onChange(value) {
    setActiveTag(value);
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
      >
        <Option value="All" key="All">
          All
        </Option>
        {getAllTags(theKurds).map((tag) => (
          <Option key={tag} value={tag}>
            {tag}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default Dropdown;
