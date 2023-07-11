"use client";

import React from "react";
import { SecondaryVariantData } from "@/types/types";
import TertiaryLevelRow from "./TertiaryLevelRow";

function TertiaryTable(props: { itemData: SecondaryVariantData[] }) {
  const { itemData } = props;
  return (
    <>
      {itemData.map((item) => {
        return <TertiaryLevelRow key={item.title} item={item} />;
      })}
    </>
  );
}

export default TertiaryTable;
