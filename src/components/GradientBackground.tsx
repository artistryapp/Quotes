
import React from "react";

const gradients = [
  "linear-gradient(225deg, #FF6B6B, #6B5BFF)",
  "linear-gradient(225deg, #9B87F5, #33C3F0)",
  "linear-gradient(225deg, #1EAEDB, #8B5CF6)",
  "linear-gradient(225deg, #6E59A5, #D946EF)",
  "linear-gradient(225deg, #0EA5E9, #7E69AB)",
  "linear-gradient(225deg, #F97316, #9B87F5)",
];

interface GradientBackgroundProps {
  gradientIndex: number;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ gradientIndex }) => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out animate-gradient-shift"
        style={{ background: gradients[gradientIndex % gradients.length] }}
      />
      
      <div className="absolute top-[-35%] left-[-10%] w-[70%] h-[70%] bg-pink-300/20 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow animated-blob" />
      <div className="absolute top-[40%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow animated-blob" />
      <div className="absolute bottom-[-20%] left-[30%] w-[50%] h-[50%] bg-blue-400/20 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow animated-blob" />
      
      <div className="background-blur" />
      <div className="noise-bg" />
    </div>
  );
};

export default GradientBackground;
