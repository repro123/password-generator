import CopyButton from "@/ui/CopyButton";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordOutput({ password, isCopied, onCopy }) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <div className="px-8 py-4 bg-grey-800 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 w-full">
        <input
          className="preset-2 md:preset-1 placeholder:text-grey-700 text-grey-200 w-full"
          type={showPassword ? "text" : "password"}
          readOnly
          placeholder="P4$5W0rD!"
          value={password}
        />
        {password && (
          <button
            type="button"
            className="text-brand-success cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
      <div className="flex gap-2 items-center text-brand-success">
        {isCopied && <span className="preset-4 lg:preset-3">COPIED</span>}
        <CopyButton
          className="text-brand-success cursor-pointer hover:text-white"
          onCopy={() => onCopy(password)}
        />
      </div>
    </div>
  );
}

export default PasswordOutput;
