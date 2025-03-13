
import React from 'react';
import { Globe } from 'lucide-react';

interface BrowserHeaderProps {
  pageName: string;
}

const BrowserHeader: React.FC<BrowserHeaderProps> = ({ pageName }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Browser Header */}
      <div className="bg-gray-800 p-2 flex items-center space-x-2 rounded-t-lg">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      {/* URL Bar */}
      <div className="bg-gray-100 p-2 rounded-md flex items-center mx-2 my-1">
        <Globe className="w-4 h-4 mr-2 text-gray-500" />
        <div className="text-gray-800 text-sm font-medium truncate">
          memoryiit.com/{pageName || 'sua-memoria'}
        </div>
      </div>
    </div>
  );
};

export default BrowserHeader;
