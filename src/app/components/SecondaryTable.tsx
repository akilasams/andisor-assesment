"use client";

import React from "react";

import SecondaryLevelRow from "./SecondaryLevelRow";
import { PrimaryVariantData } from "@/types/types";

function SecondaryTable(props: { itemData: PrimaryVariantData[] }) {
  const { itemData } = props;
  return (
    <>
      {itemData.map((item) => {
        return <SecondaryLevelRow key={item.title} item={item} />;
      })}
    </>
  );
}

export default SecondaryTable;
