export default function SummaryItem({
    label,
    value,
  }: {
    label: string;
    value: number;
  }) {
    return (
      <div className="px-6 py-5 border-r border-black last:border-r-0">
        <p className="text-xs tracking-widest text-gray-500">
          {label}
        </p>
  
        <p className="text-3xl font-semibold mt-2">
          {value}
        </p>
      </div>
    );
  }