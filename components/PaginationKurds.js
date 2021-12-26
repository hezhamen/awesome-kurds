import React from "react";
import { Pagination } from "antd";

function PaginationKurds({ theKurds, setCurrentPage, kurdsPerPage }) {
  return (
    <>
      <Pagination
        defaultCurrent={1}
        total={theKurds.length}
        onChange={(page) => setCurrentPage(page)}
        pageSize={kurdsPerPage}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </>
  );
}

export default PaginationKurds;
