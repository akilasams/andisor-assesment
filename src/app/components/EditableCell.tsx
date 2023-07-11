"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function EditableCell(props: {
  text: string;
  setValueInObject: Function;
  type?: "currency" | "percentage";
}) {
  const [value, setValue] = useState(props.text);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    props.setValueInObject(value);
  }, [value]);

  const handleOnChange = (inputValue: string) => {
    if (editMode) {
      setValue(inputValue);
    }
  };

  const displayValue =
    props.type === "currency"
      ? `$${value}`
      : props.type === "percentage"
      ? `${value}%`
      : value;

  const handleOnEditClick = () => {
    if (editMode) {
      setValue(value);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  return (
    <td className="editable__data">
      <div style={{ display: "flex", padding: "5px" }}>
        {editMode ? (
          <input
            className="text__box"
            type="text"
            onChange={(e) => handleOnChange(e.target.value)}
          ></input>
        ) : (
          displayValue
        )}
        <Button
          className="button"
          onClick={() => handleOnEditClick()}
          startIcon={editMode ? <CheckBoxIcon /> : <EditIcon />}
          size="small"
          color="primary"
        />
      </div>
    </td>
  );
}

export default EditableCell;
