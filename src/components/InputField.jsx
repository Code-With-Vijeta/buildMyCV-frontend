export default function InputField({ label, value, onChange, multiline }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          className="border rounded p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="border rounded p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      )}
    </div>
  );
}
