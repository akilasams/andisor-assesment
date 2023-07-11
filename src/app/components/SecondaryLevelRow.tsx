"use client";

import React, { useEffect, useState } from "react";
import { PrimaryVariantData } from "@/types/types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import TertiaryTable from "./TertiaryTable";
import EditableCell from "./EditableCell";

export const sizesMap = new Map([
  ["Small", "S"],
  ["Medium", "M"],
  ["Large", "L"],
  ["Extra Large", "XL"],
]);

const getSecondaryVariant = (variant: PrimaryVariantData): Array<string> => {
  const secondaryVariantsSet: Set<string> = new Set();
  variant.secondary_variants.forEach((secondaryVariant) => {
    const mappedSize = sizesMap.get(secondaryVariant.title);
    if (mappedSize) secondaryVariantsSet.add(mappedSize);
  });

  return Array.from(secondaryVariantsSet);
};

function SecondaryLevelRow(props: { item: PrimaryVariantData }) {
  const { item } = props;
  const [price, setPrice] = useState(item.price.toString());
  const [discount, setDiscount] = useState(item.discountPercentage.toString());
  const [stock, setStock] = useState(item.inventory.toString());
  const [open, setOpen] = useState(false);

  let storedItem: PrimaryVariantData = {
    title: "",
    price: 0,
    discountPercentage: 0,
    inventory: 0,
    secondary_variants: [],
  };
  if (typeof window !== "undefined") {
    storedItem = JSON.parse(
      window?.localStorage.getItem(`item-l2-${item.title}`) || "{}"
    ) as PrimaryVariantData;
  }

  const handleChange = () => {
    const primaryVaraint: PrimaryVariantData = {
      title: item.title,
      price: +price,
      discountPercentage: +discount,
      inventory: +stock,
      secondary_variants: item.secondary_variants,
    };
    if (typeof window !== "undefined") {
      window.localStorage?.setItem(
        `item-l2-${item.title}`,
        JSON.stringify(primaryVaraint)
      );
    }
  };

  useEffect(() => {
    handleChange();
  }, [price, discount, stock]);

  const secondaryVariants = getSecondaryVariant(item);

  return (
    <>
      <tr key={item.title} className="row__secondary">
        <td className="item__title__secondary">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {item.title}
        </td>
        <EditableCell
          text={storedItem.price?.toString() || price}
          type="currency"
          setValueInObject={setPrice}
        />
        <EditableCell
          text={storedItem.discountPercentage?.toString() || discount}
          type="percentage"
          setValueInObject={setDiscount}
        />
        <EditableCell
          text={storedItem.inventory?.toString() || stock}
          setValueInObject={setStock}
        />
        <td className="item__data"></td>
        <td className="item__data">{secondaryVariants.join(",")}</td>
      </tr>
      {open && <TertiaryTable itemData={item.secondary_variants} />}
    </>
  );
}

export default SecondaryLevelRow;
