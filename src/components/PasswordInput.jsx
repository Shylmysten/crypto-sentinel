import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({ value, onChange, id = 'password', label = 'Password' }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-green-400 text-sm mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={passwordVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 bg-black border border-green-500 text-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
        />
        <button
          type="button"
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-black hover:text-gray-800 transition"
        >
          {passwordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
