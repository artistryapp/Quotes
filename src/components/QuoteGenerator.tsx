import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { fetchQuote } from "@/api/quoteClient";
import type { Quote } from "@/api/quoteClient";
import ParticlesBackground from "./ParticlesBackground";
import QuotationIcon from "./QuotationIcon";
import LoadingSpinner from "./LoadingSpinner";
import ShareButton from "./ShareButton";
import { RefreshCw } from "lucide-react";

const QuoteGenerator: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gradientIndex, setGradientIndex] = useState<number>(0);

  const loadNewQuote = async () => {
    setIsLoading(true);
    try {
      // Force a new fetch by adding a cache buster timestamp parameter
      const newQuote = await fetchQuote(`&_=${Date.now()}`);
      setQuote(newQuote);
      // Change the gradient by incrementing the index
      setGradientIndex((prevIndex) => (prevIndex + 1) % 6);
    } catch (error) {
      console.error("Error loading quote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthorClick = () => {
    if (quote?.quoteAuthor) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(quote.quoteAuthor)}`, "_blank");
    }
  };

  useEffect(() => {
    loadNewQuote();
  }, []);

  return (
    <>
      <ParticlesBackground gradientIndex={gradientIndex} />
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <div
          id="quote-card"
          className="w-full max-w-2xl aspect-square flex flex-col items-center justify-center animate-fade-in"
        >
          <QuotationIcon className="text-white mb-8" />
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="text-center mb-8 px-6 py-8">
                <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-6 leading-relaxed">
                  {quote?.quoteText}
                </p>
                
                {quote?.quoteAuthor && (
                  <p 
                    onClick={handleAuthorClick}
                    className="text-white/70 text-lg md:text-xl cursor-pointer hover:text-white/90 transition-colors duration-300"
                  >
                    - {quote.quoteAuthor}
                  </p>
                )}
              </div>
            </>
          )}
          
          <div className="flex gap-4 mt-8">
            <Button
              onClick={loadNewQuote}
              disabled={isLoading}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-300"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            
            <ShareButton isLoading={isLoading} gradientIndex={gradientIndex} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteGenerator;
