function SeverityBadge({severity}: {severity: string;}) {
  const styles: Record<string, string> = {
    CRITICAL:
      "bg-red-50 text-red-600 border-red-100",
    MAJOR:
      "bg-orange-50 text-orange-600 border-orange-100",
    MINOR:
      "bg-yellow-50 text-yellow-600 border-yellow-100",
    INFO:
      "bg-blue-50 text-blue-600 border-blue-100",
  };

  const dotStyles: Record<string, string> = {
    CRITICAL: "bg-red-500",
    MAJOR: "bg-orange-500",
    MINOR: "bg-yellow-500",
    INFO: "bg-blue-500",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-2.5
        py-1
        rounded-md
        border
        text-[10px]
        font-bold
        tracking-wide
        ${styles[severity] ?? "bg-gray-50 text-gray-500 border-gray-100"}
      `}
    >
      <span
        className={`
          w-1.5
          h-1.5
          rounded-full
          ${dotStyles[severity] ?? "bg-gray-400"}
        `}
      />

      {severity}
    </span>
  );
}

function SummaryItem({label,value,color}: {label: string;value: number;color: string}) {
  return (
    <div
      className="
        relative
        bg-white
        px-5
        py-5
        border-r
        border-gray-100
        last:border-r-0
      "
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${color}`}
        />

        <p className="text-[11px] font-semibold tracking-[0.12em] text-gray-400">
          {label}
        </p>
      </div>

      <p className="text-3xl font-bold text-[#12395B] mt-2">
        {value}
      </p>
    </div>
  );
}


export {SummaryItem, SeverityBadge};