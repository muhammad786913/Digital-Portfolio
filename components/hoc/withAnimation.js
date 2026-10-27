'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Higher Order Component: withAnimation
 * Enhances any section or component with GSAP scroll-triggered entrance choreography.
 * Handles automatic cleanup, intersection observation, and custom easing.
 */
export function withAnimation(WrappedComponent, defaultAnimationConfig = {}) {
  const ComponentWithAnimation = function (props) {
    const containerRef = useRef(null);

    useEffect(() => {
      // Register ScrollTrigger inside client environment
      if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      const el = containerRef.current;
      if (!el) return;

      const {
        yOffset = 40,
        opacity = 0,
        duration = 1,
        stagger = 0.12,
        delay = 0,
        ease = 'power3.out',
        triggerOnce = true
      } = { ...defaultAnimationConfig, ...props.animationConfig };

      const childrenToAnimate = el.querySelectorAll('.gsap-reveal');
      const targets = childrenToAnimate.length > 0 ? childrenToAnimate : el;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          targets,
          {
            opacity: opacity,
            y: yOffset,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: duration,
            stagger: stagger,
            delay: delay,
            ease: ease,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: triggerOnce ? 'play none none none' : 'play reverse play reverse'
            }
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }, [props.animationConfig]);

    return (
      <div ref={containerRef} className={props.containerClassName || ''}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  ComponentWithAnimation.displayName = `WithAnimation(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAnimation;
}

export default withAnimation;
