import { Item } from "@/types/types";

const getInventoryList = async () => {
  const res = await fetch(
    "https://mocki.io/v1/d11f375b-014a-4a04-bd6b-beaaca65c988"
  );
  return res.json();
};

async function page() {
  const inventoryList = (await getInventoryList()) as Array<Item>;

  return (
    <div>
      <h1>Inventory</h1>
      {inventoryList.map((item) => {
        // eslint-disable-next-line react/jsx-key
        return <h1>{item.title}</h1>;
      })}
    </div>
  );
}

export default page;
