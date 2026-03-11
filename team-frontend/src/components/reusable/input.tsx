export const Input = ({
  type,
  label,
  placeholder,
  error,
  ...props
}: {
  type: string;
  label: string;
  placeholder?: string;
  error: string;
}) => {
  return (
    <>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className={`w-full h-12 px-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 ${
          error
            ? "border-red-500 bg-red-50/30"
            : "border-gray-200 hover:border-gray-300"
        }`}
      />
    </>
  );
};
