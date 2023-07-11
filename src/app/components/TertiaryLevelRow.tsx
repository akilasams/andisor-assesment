"use client";

import React, { useEffect, useState } from "react";
import { SecondaryVariantData } from "@/types/types";
import EditableCell from "./EditableCell";

function TertiaryLevelRow(props: { item: SecondaryVariantData }) {
  const { item } = props;
  const [price, setPrice] = useState(item.price.toString());
  const [discount, setDiscount] = useState(item.discountPercentage.toString());
  const [stock, setStock] = useState(item.inventory.toString());

  let storedItem: SecondaryVariantData = {
    title: "",
    price: 0,
    discountPercentage: 0,
    inventory: 0,
  };
  if (typeof window !== "undefined") {
    storedItem = JSON.parse(
      window?.sessionStorage.getItem(`item-l3-${item.title}`) || "{}"
    ) as SecondaryVariantData;
  }

  const handleChange = () => {
    const primaryVaraint: SecondaryVariantData = {
      title: item.title,
      price: +price,
      discountPercentage: +discount,
      inventory: +stock,
    };
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        `item-l3-${item.title}`,
        JSON.stringify(primaryVaraint)
      );
    }
  };

  useEffect(() => {
    handleChange();
  }, [price, discount, stock]);

  return (
    <>
      <tr key={item.title} className="row__secondary">
        <td className="item__title__tertiary">{item.title}</td>
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
        <td className="item__data"></td>
      </tr>
    </>
  );
}

export default TertiaryLevelRow;
