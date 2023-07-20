export default function Exclude(props) {
  return (
    <div>
      <button
        className="text-indigo-600 hover:text-indigo-900 pr-8"
        onClick={() => props.setExclude(prev => !prev)}
      >
        {props.exclude ? "Include" : "Exclude"}
      </button>
    </div>
  );
}
