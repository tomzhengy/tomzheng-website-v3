import React from 'react';

interface SwayingArrowProps {
  className?: string;
}

const SwayingArrow: React.FC<SwayingArrowProps> = ({ className = '' }) => {
  return (
    <span className={`swaying-arrow-container inline-block ${className}`}>
      <style jsx>{`
        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
        }
         
        .swaying-arrow-container {
          position: relative;
          display: inline-block;
          width: 0;
          height: 0;
          overflow: visible;
        }
        
        .swaying-arrow {
          display: inline-block;
          font-size: 1em;
          animation: sway 1.2s ease-in-out infinite;
          position: absolute;
          left: 5px;
          top: -17px;
          line-height: 1;
        }
      `}</style>
      <span className="swaying-arrow">←</span>
    </span>
  );
};

export default SwayingArrow;