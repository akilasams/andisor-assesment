"use client";

import React, { useEffect, useState } from "react";
import { PrimaryVariantData, RowData } from "@/types/types";
import ColorDataCell from "./ColorData";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import SecondaryTable from "./SecondaryTable";
import EditableCell from "./EditableCell";
interface Variants {
  primaryVariants: Array<string>;
  secondaryVariants: Array<string>;
}

export const sizesMap = new Map([
  ["Small", "S"],
  ["Medium", "M"],
  ["Large", "L"],
  ["Extra Large", "XL"],
]);

const getVariants = (
  primaryVariantsArray: Array<PrimaryVariantData>
): Variants => {
  const primaryVariants: Array<string> = [];
  const secondaryVariantsSet: Set<string> = new Set();

  primaryVariantsArray.forEach((primaryVariant) => {
    primaryVariants.push(primaryVariant.title.toLowerCase());
    primaryVariant.secondary_variants.forEach((secondaryVariant) => {
      const mappedSize = sizesMap.get(secondaryVariant.title);
      if (mappedSize) secondaryVariantsSet.add(mappedSize);
    });
  });

  return {
    primaryVariants,
    secondaryVariants: Array.from(secondaryVariantsSet),
  };
};

function TopLevelRow(props: { item: RowData }) {
  const { item } = props;
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price.toString());
  const [discount, setDiscount] = useState(item.discountPercentage.toString());
  const [stock, setStock] = useState(item.inventory);
  const [colors, setColors] = useState<Array<string>>();
  const [sizes, setSizes] = useState<Array<string>>();

  const storedItem = JSON.parse(
    window?.localStorage.getItem(`item-l1-${item.id}`) || "{}"
  ) as RowData;

  const handleChange = () => {
    const rowItem = {
      id: item.id,
      title: item.title,
      price,
      discountPercentage: discount,
      inventory: stock,
      primary_variants: item.primary_variants,
    };
    window.localStorage.setItem(`item-l1-${item.id}`, JSON.stringify(rowItem));
  };

  useEffect(() => {
    handleChange();
  }, [price, discount, stock]);

  useEffect(() => {
    const { primaryVariants, secondaryVariants } = getVariants(
      item.primary_variants!
    );
    setColors(primaryVariants);
    setSizes(secondaryVariants);
  }, []);

  return (
    <>
      <tr key={item.id}>
        <td className="item__title">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {title}
        </td>
        <EditableCell
          text={storedItem.price?.toString() || price}
          setValueInObject={setPrice}
          type="currency"
        />
        <EditableCell
          text={storedItem.discountPercentage?.toString() || discount}
          setValueInObject={setDiscount}
          type="percentage"
        />
        <EditableCell
          text={storedItem.inventory?.toString() || stock}
          setValueInObject={setStock}
        />
        {colors && <ColorDataCell colorData={colors} />}
        {sizes && <td className="item__data">{sizes.join(",")}</td>}
      </tr>
      {open && <SecondaryTable itemData={item.primary_variants!} />}
    </>
  );
}

export default TopLevelRow;
