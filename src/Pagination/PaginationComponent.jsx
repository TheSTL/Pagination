import React from "react";
import { Pagination, Header } from "semantic-ui-react";

export default function PaginationComponent({ total, change, getData }) {
  return (
    <div className="Pagination">
      <Header as="h1">Vendor Machine</Header>
      {getData()}
      <Pagination
        defaultActivePage={1}
        totalPages={total}
        onPageChange={change}
      />
    </div>
  );
}
