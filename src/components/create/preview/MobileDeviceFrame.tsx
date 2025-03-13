
import React from 'react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  previewWidth: string;
  previewHeight: string;
}

const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  previewWidth,
  previewHeight
}) => {
  return (
    <div 
      className="relative rounded-[30px] sm:rounded-[40px] overflow-hidden bg-gray-900 border-4 sm:border-8 border-gray-800 shadow-2xl mx-auto" 
      style={{ 
        width: previewWidth, 
        height: previewHeight,
        maxWidth: "100%"
      }}
    >
      {/* Device notch */}
      <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-black z-20 flex justify-center items-center">
        <div className="w-24 sm:w-40 h-3 sm:h-5 bg-black rounded-b-xl"></div>
      </div>
      
      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        {children}
      </div>
      
      {/* Home button/indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-600 rounded-full"></div>
    </div>
  );
};

export default MobileDeviceFrame;
