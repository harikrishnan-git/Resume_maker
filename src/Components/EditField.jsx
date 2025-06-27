import { useState } from "react";

export default function editField({ value, multiline = false }) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isEditing, setIsEditing] = useState(false);
  return (
    <span onClick={() => setIsEditing(true)} className="cursor-pointer">
      {isEditing ? (
        multiline ? (
          <textarea
            type="text"
            value={inputValue}
            autoFocus
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              e.key == "Enter" && setIsEditing(false);
            }}
            onBlur={() => setIsEditing(false)}
            className="border-none w-full outline-0"
          />
        ) : (
          <input
            type="text"
            value={inputValue}
            autoFocus
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              e.key == "Enter" && setIsEditing(false);
            }}
            onBlur={() => setIsEditing(false)}
            className="border-none outline-0"
          />
        )
      ) : (
        <span className="cursor-pointer">{inputValue}</span>
      )}
    </span>
  );
}
