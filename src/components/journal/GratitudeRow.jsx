import React from "react";
import { TextInput } from "../ui/Input";

export default function GratitudeRow({ index, value, onChange }) {
  return (
    <div className="grat-row">
      <div className="grat-num">{index + 1}</div>
      <TextInput value={value} onChange={(e) => onChange(e.target.value)} placeholder="Today I'm grateful for…" />
    </div>
  );
}
