"use client";

const ColorDot = (props: { color: string }) => {
  return (
    <div
      style={{
        height: "16px",
        width: "16px",
        backgroundColor: `${props.color.toLowerCase()}`,
        borderRadius: "50%",
        display: "inline-block",
        marginRight: "2px",
      }}
    ></div>
  );
};

export default function ColorDataCell(props: { colorData: Array<string> }) {
  const { colorData } = props;

  return (
    <td className="item__data">
      {colorData.map((color) => {
        return <ColorDot key={color} color={color} />;
      })}
    </td>
  );
}
