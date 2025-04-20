export interface Quote {
  quoteText: string;
  quoteAuthor: string;
  senderName: string;
  senderLink: string;
  quoteLink: string;
}

// We need to use a CORS proxy because the Forismatic API doesn't support CORS
const CORS_PROXY = "https://api.allorigins.win/get?url=";
const API_URL = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

export const fetchQuote = async (cacheBuster = ""): Promise<Quote> => {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const url = `${CORS_PROXY}${encodeURIComponent(API_URL)}&_=${timestamp}${cacheBuster}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // The CORS proxy returns the data in a 'contents' field
    // and it's a string that needs to be parsed
    if (data.contents) {
      const quote = JSON.parse(data.contents);
      return {
        quoteText: quote.quoteText,
        quoteAuthor: quote.quoteAuthor || "Unknown",
        senderName: quote.senderName || "",
        senderLink: quote.senderLink || "",
        quoteLink: quote.quoteLink || ""
      };
    }
    
    throw new Error("Invalid response format from API");
  } catch (error) {
    console.error("Error fetching quote:", error);
    // Fallback quotes for when the API fails
    const fallbackQuotes = [
      {
        quoteText: "The best way to predict the future is to create it.",
        quoteAuthor: "Peter Drucker"
      },
      {
        quoteText: "Innovation distinguishes between a leader and a follower.",
        quoteAuthor: "Steve Jobs"
      },
      {
        quoteText: "The only way to do great work is to love what you do.",
        quoteAuthor: "Steve Jobs"
      }
    ];
    
    // Pick a random fallback quote
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    
    return {
      quoteText: randomQuote.quoteText,
      quoteAuthor: randomQuote.quoteAuthor,
      senderName: "",
      senderLink: "",
      quoteLink: ""
    };
  }
};
