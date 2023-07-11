import Link from "next/link";

function Navbar() {
  return (
    <div
      style={{
        height: 50,
        background: "#0EB2FF",
        display: "flex",
        justifyContent: "space-evenly",
        color: "white",
        alignItems: "center",
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/inventory">Inventory</Link>
      <Link href="/collections">Colections</Link>
      <Link href="/analytics">Analytics</Link>
    </div>
  );
}

export default Navbar;
