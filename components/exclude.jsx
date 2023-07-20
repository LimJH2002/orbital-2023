import { useState } from "react";

export default function Exclude(props) {
  const [exclude, setExclude] = useState(false);

  return (
    <div>
      <button
        className="text-indigo-600 hover:text-indigo-900 pr-8"
        onClick={() => setExclude(prev => !prev)}
      >
        {exclude ? "Include" : "Exclude"}
      </button>
    </div>
  );
}
