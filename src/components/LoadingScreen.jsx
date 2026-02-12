import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <style>
        {`
          .custom-loader {
            width: 40px;
            height: 40px;
            --c: no-repeat linear-gradient(#facc15 0 0); /* ColloQ Yellow Theme */
            background: var(--c), var(--c), var(--c), var(--c);
            background-size: 21px 21px;
            animation: l5 1.5s infinite cubic-bezier(0.3,1,0,1);
          }
          @keyframes l5 {
            0%   {background-position: 0 0, 100% 0, 100% 100%, 0 100%}
            33%  {background-position: 0 0, 100% 0, 100% 100%, 0 100%; width: 60px; height: 60px}
            66%  {background-position: 100% 0, 100% 100%, 0 100%, 0 0; width: 60px; height: 60px}
            100% {background-position: 100% 0, 100% 100%, 0 100%, 0 0}
          }
        `}
      </style>
      <div className="custom-loader"></div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 font-bold tracking-[0.2em] mt-10 uppercase text-[10px]"
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
