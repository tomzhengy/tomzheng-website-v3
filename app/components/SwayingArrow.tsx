import React from 'react';

interface SwayingArrowProps {
  className?: string;
}

const SwayingArrow: React.FC<SwayingArrowProps> = ({ className = '' }) => {
  return (
    <span className={`swaying-arrow-container inline-block ${className}`}>
      <style jsx>{`
        @keyframes sway {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-3px);
          }
          50% {
            transform: translateX(0);
          }
          75% {
            transform: translateX(2px);
          }
          100% {
            transform: translateX(0);
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
          font-size: 0.9em;
          animation: sway 1.5s ease-in-out infinite;
          position: absolute;
          left: 7px;
          top: -15;
          line-height: 1;
        }
      `}</style>
      <span className="swaying-arrow">←</span>
    </span>
  );
};

export default SwayingArrow; 