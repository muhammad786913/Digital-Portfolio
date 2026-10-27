'use client';

import React, { useRef, useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

/**
 * Higher Order Component: withCardHover
 * Injects realistic 3D perspective mouse-tilt and an interactive radial glow spotlight.
 */
export function withCardHover(WrappedComponent) {
  const ComponentWithCardHover = function (props) {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [tiltStyle, setTiltStyle] = useState({});
    const { playSound } = usePortfolio();

    const handleMouseMove = (e) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      const rotateY = ((xPercent - 50) / 50) * 8; // Max 8 deg rotation
      const rotateX = -((yPercent - 50) / 50) * 8;

      setMousePos({ x: xPercent, y: yPercent });
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out'
      });
    };

    const handleMouseEnter = () => {
      playSound('hover');
    };

    const handleMouseLeave = () => {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.4s ease-out'
      });
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="relative group transition-all duration-300 will-change-transform"
      >
        {/* Dynamic mouse spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(240, 166, 188, 0.18), transparent 70%)`
          }}
        />
        <WrappedComponent {...props} />
      </div>
    );
  };

  ComponentWithCardHover.displayName = `WithCardHover(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithCardHover;
}

export default withCardHover;
