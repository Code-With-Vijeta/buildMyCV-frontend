export default function SectionCard({ children }) {
  return (
    <div className="border p-3 rounded shadow-sm hover:shadow-md transition bg-gray-50">
      {children}
    </div>
  );
}
