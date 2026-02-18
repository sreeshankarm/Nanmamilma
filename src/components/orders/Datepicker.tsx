import React from "react";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </label>

      <input
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker()}
        onKeyDown={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm
                   shadow-sm transition
                   focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default DatePicker;
