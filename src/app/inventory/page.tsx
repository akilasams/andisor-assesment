import Head from "next/head";
import {
  Item,
  PrimaryVariant,
  PrimaryVariantData,
  RowData,
  SecondaryVariant,
  SecondaryVariantData,
} from "@/types/types";
import MainTable from "../components/MainTable";

const getInventoryList = async () => {
  const res = await fetch(
    "https://mocki.io/v1/d11f375b-014a-4a04-bd6b-beaaca65c988"
  );
  return res.json();
};

const extractSecondaryVariantData = (
  variants: Array<SecondaryVariant>
): Array<SecondaryVariantData> => {
  const mappedItems = variants.map((variant) => {
    return {
      title: variant.name,
      price: variant.price,
      inventory: variant.inventory,
      discountPercentage: variant.discountPercentage,
    };
  });
  return mappedItems;
};

const extractPrimaryVariantData = (
  variants: Array<PrimaryVariant>
): Array<PrimaryVariantData> => {
  const mappedItems = variants.map((variant) => {
    return {
      title: variant.name,
      price: variant.price,
      inventory: variant.inventory,
      discountPercentage: variant.discountPercentage,
      secondary_variants: extractSecondaryVariantData(
        variant.secondary_variants
      ),
    };
  });
  return mappedItems;
};

const extractDataToBeDisplayed = (items: Array<Item>): Array<RowData> => {
  const mappedItems = items.map((item) => {
    const itemDataObj: RowData = {
      id: item.id,
      title: item.title,
      price: item.price,
      discountPercentage: item.discountPercentage,
      inventory: item.inventory,
      primary_variants: extractPrimaryVariantData(item.primary_variants),
    };
    return itemDataObj;
  });
  return mappedItems;
};

async function Inventory() {
  const inventoryList = (await getInventoryList()) as Array<Item>;
  const mappedData = extractDataToBeDisplayed(inventoryList);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Head>
        <title>
          <h1>Inventory</h1>
        </title>
      </Head>
      <h1 style={{ fontSize: "30" }}>INVENTORY</h1>
      <MainTable itemData={mappedData} />
    </div>
  );
}

export default Inventory;
