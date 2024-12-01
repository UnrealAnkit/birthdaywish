import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { PasswordInput } from './components/PasswordInput';
import { Shield } from 'lucide-react';
import { encryptFile, downloadBlob } from './utils/encryption';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);

  const handleEncrypt = async () => {
    if (!file || !password) return;
    
    try {
      setIsEncrypting(true);
      const encryptedBlob = await encryptFile(file, password);
      await downloadBlob(encryptedBlob, file.name);
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Failed to encrypt file. Please try again.');
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Secure File Encryptor
            </h1>
            <p className="text-gray-600">
              Encrypt your files with a password using AES-256 encryption
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 space-y-8">
            <FileUpload onFileSelect={setFile} />
            
            {file && (
              <div className="text-center text-sm text-gray-600">
                Selected file: {file.name}
              </div>
            )}

            <div className="space-y-4">
              <PasswordInput
                password={password}
                onChange={setPassword}
              />

              <button
                onClick={handleEncrypt}
                disabled={!file || !password || isEncrypting}
                className={`w-full py-2 px-4 rounded-md text-white font-medium
                  ${!file || !password || isEncrypting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors`}
              >
                {isEncrypting ? 'Encrypting...' : 'Encrypt & Download'}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Your files are encrypted locally in your browser.</p>
            <p>No data is sent to any server.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;