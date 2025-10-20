import React from 'react';
import { motion } from 'framer-motion';
import DJ3 from "../assets/images/DJ3.jpg"
import DJ5 from "../assets/images/DJ5.jpg"
import DJ1 from "../assets/images/DJ1.jpg"
import DJ2 from "../assets/images/DJ2.jpg"
import SearchBar from './SearchBar';
import BannerSearch from './BannerSearch';


const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-96">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <motion.img
            src={DJ3}
            animate={{y:[50,100,50]}}
            transition={{duration:5, repeat: Infinity, ease:"easeInOut"}}
            className="max-w-sm rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-gray-400 shadow-2xl"
          />
          <motion.img
            src={DJ2}
            animate={{x:[100,150,100]}}
            transition={{duration:5, delay:2, repeat: Infinity, ease:"easeInOut"}}
            className="max-w-sm rounded-tl-[40px] rounded-tr-[15px] rounded-br-[40px] border-l-4 border-r-4 border-b-1 border-purple-400 shadow-2xl"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-5xl font-bold leading-tight">
            <span className="text-gray-800">Powering</span>{" "}
            <motion.span
              animate={{ color: ["#6D28D9", "#3B82F6", "#6D28D9"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              NextHire
            </motion.span>{" "}
            <span className="text-gray-800">Careers</span>
          </h2>

          <motion.h2
            animate={{ x: [0, 20, 0], color: ["#3B82F6", "#6D28D9", "#3B82F6"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl font-semibold mt-3"
          >
            Built for Ambition. Designed for Talent.
          </motion.h2>

          <p className="py-6 text-gray-700 leading-relaxed">
            Your gateway to meaningful work and limitless potential.
            <br />
            Smart matches. Real opportunities. Future-focused hiring.
          </p>

          <div className="pb-10">
  <BannerSearch />
</div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
