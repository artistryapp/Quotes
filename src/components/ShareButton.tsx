import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateQuoteImage, downloadImage } from "@/utils/imageGenerator";
import { toast } from "@/components/ui/sonner";

interface ShareButtonProps {
  isLoading: boolean;
  gradientIndex: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ isLoading, gradientIndex }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleShare = async () => {
    setIsGenerating(true);
    const toastId = toast.loading("Generating image...");
    
    try {
      const imageDataUrl = await generateQuoteImage("quote-card", gradientIndex);
      
      if (!imageDataUrl) {
        toast.error("Failed to generate image", { id: toastId });
        setIsGenerating(false);
        return;
      }
      
      // Download the image
      downloadImage(imageDataUrl);
      
      // Update the existing toast instead of creating a new one
      toast.success("Instagram-ready square image downloaded!", { id: toastId });
    } catch (error) {
      console.error("Error sharing quote:", error);
      toast.error("Something went wrong while generating the image", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-300"
      onClick={handleShare}
      disabled={isLoading || isGenerating}
    >
      {isGenerating ? "Generating..." : "Share"}
    </Button>
  );
};

export default ShareButton;
