interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
  id,
}) => {
  return (
    <input
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      type={type}
      className="w-full p-4 text-lg border-2 bg-black border-neutral-800 rounded-md
            outline-none text-white focus:border-sky-500 focus:border-2 transition 
            disabled:border-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
};

export default Input;
