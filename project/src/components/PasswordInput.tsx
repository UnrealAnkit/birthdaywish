import React from 'react';
import { Lock } from 'lucide-react';

interface PasswordInputProps {
  password: string;
  onChange: (value: string) => void;
}

export function PasswordInput({ password, onChange }: PasswordInputProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="password"
        value={password}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter encryption password"
        minLength={8}
        required
      />
    </div>
  );
}