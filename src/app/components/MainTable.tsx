"use client";

import { RowData } from "@/types/types";
import React from "react";

import TopLevelRow from "./TopLevelRow";

function MainTable(props: { itemData: Array<RowData> }) {
  const { itemData } = props;

  return (
    <table>
      <tr>
        <th></th>
        <th>Price</th>
        <th>Discount</th>
        <th>Inventory</th>
        <th>Colors</th>
        <th>Sizes</th>
      </tr>
      {itemData.map((item) => {
        return <TopLevelRow key={item.id} item={item} />;
      })}
    </table>
  );
}

export default MainTable;
