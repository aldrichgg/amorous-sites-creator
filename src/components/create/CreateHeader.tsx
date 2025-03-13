
import React from 'react';
import { motion } from 'framer-motion';

const CreateHeader = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <motion.div 
        className="bg-gradient-to-r from-memred to-memred-light p-0.5 rounded-full"
        animate={{ 
          boxShadow: ['0 0 5px rgba(255, 0, 0, 0.5)', '0 0 20px rgba(255, 0, 0, 0.8)', '0 0 5px rgba(255, 0, 0, 0.5)'],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="bg-black rounded-full p-2">
          <div className="flex items-center space-x-2 px-4 py-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-memred to-memred-light flex items-center justify-center">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6">
                <defs>
                  <path id="create-heart-a" d="M7.64648437,1.19311523 C8.33056641,5.30135091 6.96142578,7.94555664 3.5390625,9.12573242 C0.116699219,10.3059082 -0.801757813,12.9492188 0.783691406,17.0556641 L3,19.2653809 L12.5229492,9.54785156 C13.5050456,6.41617839 12.8082682,3.82950846 10.4326172,1.7878418 C8.8577474,0.574951172 7.92903646,0.376708984 7.64648437,1.19311523 Z"></path>
                  <path id="create-heart-c" d="M18.6707335,10.0469949 C20.4444204,8.20475335 20.4428931,5.22154308 18.6673208,3.38125356 C16.8917484,1.54096405 14.0134482,1.53938105 12.2359925,3.37771648 L10.9702069,4.68963823 L9.74663024,3.42106257 C7.97421677,1.58443498 5.10087015,1.58474944 3.32883095,3.42176494 C1.55679174,5.25878043 1.55709514,8.23685657 3.32950861,10.0734842 L10.9750473,18 L18.6707335,10.0469949 Z M9.53555048,19.3884699 L1.89036034,11.4623154 C-0.629744037,8.85090825 -0.630172509,4.64518565 1.88938959,2.03323745 C4.37655172,-0.545122756 8.39543397,-0.61732966 10.9687169,1.81730162 C13.5445576,-0.66312694 17.60123,-0.604129239 20.1066156,1.99257419 C22.6292352,4.60713978 22.6313904,8.81686087 20.1115002,11.434147 L12.4427074,19.3824584 C12.1544685,19.6812032 11.7964701,19.8704534 11.4198481,19.9502088 C10.7609371,20.0997637 10.0408904,19.9123813 9.53555048,19.3884699 Z"></path>
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(1 2)">
                  <g transform="translate(8)">
                    <mask id="create-heart-b" fill="#ffffff">
                      <use xlinkHref="#create-heart-a"></use>
                    </mask>
                    <use fill="#D8D8D8" xlinkHref="#create-heart-a"></use>
                    <g fill="#FFFFFF" mask="url(#create-heart-b)">
                      <rect width="24" height="24" transform="translate(-9 -2)"></rect>
                    </g>
                  </g>
                  <mask id="create-heart-d" fill="#ffffff">
                    <use xlinkHref="#create-heart-c"></use>
                  </mask>
                  <use fill="#000000" fillRule="nonzero" xlinkHref="#create-heart-c"></use>
                  <g fill="#FFFFFF" mask="url(#create-heart-d)">
                    <rect width="24" height="24" transform="translate(-1 -2)"></rect>
                  </g>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Loveiit</h1>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs text-green-400">Criar memória</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateHeader;
