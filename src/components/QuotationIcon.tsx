
import React from "react";
import { Quote } from "lucide-react";

const QuotationIcon: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`${className} relative`}>
      <Quote size={48} fill="currentColor" strokeWidth={0} />
    </div>
  );
};

export default QuotationIcon;
