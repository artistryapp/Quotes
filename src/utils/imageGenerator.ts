import html2canvas from 'html2canvas';

const gradients = [
  "linear-gradient(225deg, #FF6B6B, #6B5BFF)",
  "linear-gradient(225deg, #9B87F5, #33C3F0)",
  "linear-gradient(225deg, #1EAEDB, #8B5CF6)",
  "linear-gradient(225deg, #6E59A5, #D946EF)",
  "linear-gradient(225deg, #0EA5E9, #7E69AB)",
  "linear-gradient(225deg, #F97316, #9B87F5)",
];

export const generateQuoteImage = async (elementId: string, gradientIndex: number): Promise<string | null> => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error(`Element with ID ${elementId} not found`);
      return null;
    }
    
    // Create a temporary container for the quote with proper styling
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '1080px';
    container.style.height = '1080px';
    container.style.overflow = 'hidden';
    container.style.zIndex = '-9999';
    container.style.opacity = '1';
    container.style.background = gradients[gradientIndex % gradients.length];
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    
    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.style.position = 'relative';
    contentContainer.style.width = '80%';
    contentContainer.style.zIndex = '1';
    contentContainer.style.textAlign = 'center';
    contentContainer.style.padding = '2rem';
    
    // Add quote icon
    const quoteIcon = document.createElement('div');
    quoteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="white"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>';
    quoteIcon.style.marginBottom = '2rem';
    quoteIcon.style.display = 'flex';
    quoteIcon.style.justifyContent = 'center';
    
    // Add quote text
    const quoteText = element.querySelector('.text-center.mb-8');
    if (quoteText) {
      const textContent = document.createElement('div');
      const mainQuote = quoteText.querySelector('p:first-child');
      const author = quoteText.querySelector('p:last-child');
      
      if (mainQuote) {
        const quoteP = document.createElement('p');
        quoteP.textContent = mainQuote.textContent?.replace(/[""]/g, '') || '';
        quoteP.style.color = '#FFFFFF';
        quoteP.style.fontSize = '2.5rem';
        quoteP.style.fontWeight = '700';
        quoteP.style.marginBottom = '1.5rem';
        quoteP.style.lineHeight = '1.4';
        quoteP.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
        textContent.appendChild(quoteP);
      }
      
      if (author) {
        const authorP = document.createElement('p');
        authorP.textContent = author.textContent || '';
        authorP.style.color = 'rgba(255, 255, 255, 0.8)';
        authorP.style.fontSize = '1.5rem';
        authorP.style.textShadow = '0 1px 2px rgba(0,0,0,0.1)';
        textContent.appendChild(authorP);
      }
      
      contentContainer.appendChild(quoteIcon);
      contentContainer.appendChild(textContent);
    }
    
    // Assemble all elements
    container.appendChild(contentContainer);
    
    // Add to document temporarily
    document.body.appendChild(container);
    
    // Capture the image
    const canvas = await html2canvas(container, {
      width: 1080,
      height: 1080,
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    
    // Clean up
    document.body.removeChild(container);
    
    // Convert to high-quality JPEG
    return canvas.toDataURL('image/jpeg', 1.0);
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};

export const downloadImage = (dataUrl: string, filename = 'quote-image-square.jpg') => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
