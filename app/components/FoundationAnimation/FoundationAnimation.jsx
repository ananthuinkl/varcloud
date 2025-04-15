// app/components/FoundationAnimation/FoundationAnimation.jsx
import React from 'react';
import styles from './FoundationAnimation.module.css'; // Import CSS Modules

const FoundationAnimation = () => {
  // Helper to generate multiple connector spans
  const renderConnectors = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <span key={i} data-connector="true"></span>
    ));
  };

  // Helper function for staggered delays
  const getDelay = (index, total = 16) => `${(index % total) * 0.15}s`;

  // Target Coordinates (Pre-calculated and rounded)
  const coords = {
    topLeg1: { x: 386, y: 97 }, topLeg2: { x: 410, y: 97 }, topLeg3: { x: 434, y: 97 },
    topLeg4: { x: 458, y: 97 }, topLeg5: { x: 482, y: 97 }, topLeg6: { x: 506, y: 97 },
    bottomLeg1: { x: 386, y: 167 }, bottomLeg2: { x: 410, y: 167 }, bottomLeg3: { x: 434, y: 167 },
    bottomLeg4: { x: 458, y: 167 }, bottomLeg5: { x: 482, y: 167 }, bottomLeg6: { x: 506, y: 167 },
    leftLeg1: { x: 346, y: 122 }, leftLeg2: { x: 346, y: 142 },
    rightLeg1: { x: 546, y: 122 }, rightLeg2: { x: 546, y: 142 }
  };

  return (
    <section className={styles.foundation_root}>
      <div className={styles.foundation_main}>
        <div
          className={`${styles.stack} ${styles.foundation_illustration}`}
          style={{
            '--stack-flex': 'initial',
            '--stack-direction': 'column',
            '--stack-align': 'center',
            '--stack-justify': 'center',
            '--stack-padding': '0px',
            '--stack-gap': '0px',
          }}
        >
          {/* --- SVG FOR LINES --- */}
          <svg
            fill="none"
            height="264"
            viewBox="0 0 891 264"
            width="891"
            data-lines="true"
            aria-label="Circuit lines with animated pulses flowing towards a central CPU component labeled 'Powered By'."
            overflow="visible"
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: '100%', height: 'auto' }}
          >
            {/* --- Gradient Definitions (Unchanged) --- */}
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="static-grad-0" x1="412.5" x2="412.5" y1="0" y2="96"> <stop offset="0" stopColor="var(--geist-foreground)" stopOpacity="0"/><stop offset="1" stopColor="var(--geist-foreground)" stopOpacity="0.1"/></linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="static-grad-1" x1="436.5" x2="436.5" y1="0" y2="96"> <stop offset="0" stopColor="var(--geist-foreground)" stopOpacity="0"/><stop offset="1" stopColor="var(--geist-foreground)" stopOpacity="0.1"/></linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="static-grad-2" x1="554" x2="484" y1="20" y2="96"> <stop offset="0" stopColor="var(--geist-foreground)" stopOpacity="0"/><stop offset="1" stopColor="var(--geist-foreground)" stopOpacity="0.1"/></linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="blue-pulse-1"><stop offset="0%" stopColor="var(--gradient-blue-start)" stopOpacity="0" /><stop offset="20%" stopColor="var(--gradient-blue-start)" stopOpacity="1" /><stop offset="80%" stopColor="var(--gradient-blue-end)" stopOpacity="1" /><stop offset="100%" stopColor="var(--gradient-blue-end)" stopOpacity="0" /></linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="blue-pulse-2"><stop offset="0%" stopColor="var(--gradient-blue-start)" stopOpacity="0" /><stop offset="20%" stopColor="var(--gradient-blue-start)" stopOpacity="1" /><stop offset="80%" stopColor="var(--gradient-blue-end)" stopOpacity="1" /><stop offset="100%" stopColor="var(--gradient-blue-end)" stopOpacity="0" /></linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="pink-pulse-1"><stop offset="0%" stopColor="var(--gradient-pink-start)" stopOpacity="0" /><stop offset="15%" stopColor="var(--gradient-pink-start)" stopOpacity="1" /><stop offset="70%" stopColor="var(--gradient-pink-mid)" stopOpacity="1" /><stop offset="100%" stopColor="var(--gradient-pink-end)" stopOpacity="0" /></linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="pink-pulse-2"><stop offset="0%" stopColor="var(--gradient-pink-start)" stopOpacity="0" /><stop offset="15%" stopColor="var(--gradient-pink-start)" stopOpacity="1" /><stop offset="70%" stopColor="var(--gradient-pink-mid)" stopOpacity="1" /><stop offset="100%" stopColor="var(--gradient-pink-end)" stopOpacity="0" /></linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="orange-pulse-1"><stop offset="0%" stopColor="var(--gradient-orange-start)" stopOpacity="0" /><stop offset="20%" stopColor="var(--gradient-orange-start)" stopOpacity="1" /><stop offset="80%" stopColor="var(--gradient-orange-end)" stopOpacity="1" /><stop offset="100%" stopColor="var(--gradient-orange-end)" stopOpacity="0" /></linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="orange-pulse-2"><stop offset="0%" stopColor="var(--gradient-orange-start)" stopOpacity="0" /><stop offset="20%" stopColor="var(--gradient-orange-start)" stopOpacity="1" /><stop offset="80%" stopColor="var(--gradient-orange-end)" stopOpacity="1" /><stop offset="100%" stopColor="var(--gradient-orange-end)" stopOpacity="0" /></linearGradient>
            </defs>

            {/* --- Lines with Pulses (Unchanged) --- */}
            {/* Group 1 -> Top Leg 1 */}
            <g><path d={`M310 64 L ${coords.topLeg1.x} 64 L ${coords.topLeg1.x} ${coords.topLeg1.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M310 64 L ${coords.topLeg1.x} 64 L ${coords.topLeg1.x} ${coords.topLeg1.y}`} stroke="url(#blue-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(0) }}></path></g>
            {/* Group 2 -> Left Leg 2 */}
            <g><path d={`M69 174 L 69 ${coords.leftLeg2.y} L ${coords.leftLeg2.x} ${coords.leftLeg2.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none" ></path><path d={`M69 174 L 69 ${coords.leftLeg2.y} L ${coords.leftLeg2.x} ${coords.leftLeg2.y}`} stroke="url(#blue-pulse-1)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(1) }}></path></g>
            {/* Group 3 -> Top Leg 2 */}
            <g><path d={`M412 0 L ${coords.topLeg2.x} ${coords.topLeg2.y}`} stroke="url(#static-grad-0)" fill="none"></path><path d={`M412 0 L ${coords.topLeg2.x} ${coords.topLeg2.y}`} stroke="url(#pink-pulse-1)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(2) }}></path></g>
            {/* Group 4 -> Bottom Leg 2 */}
            <g><path d={`M412 263.5 L ${coords.bottomLeg2.x} ${coords.bottomLeg2.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M412 263.5 L ${coords.bottomLeg2.x} ${coords.bottomLeg2.y}`} stroke="url(#pink-pulse-1)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(3) }}></path></g>
            {/* Group 5 -> Top Leg 3 */}
            <g><path d={`M436 0 L ${coords.topLeg3.x} ${coords.topLeg3.y}`} stroke="url(#static-grad-1)" fill="none"></path><path d={`M436 0 L ${coords.topLeg3.x} ${coords.topLeg3.y}`} stroke="url(#orange-pulse-1)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(4) }}></path></g>
            {/* Group 6 -> Bottom Leg 3 */}
            <g><path d={`M436 214 L ${coords.bottomLeg3.x} ${coords.bottomLeg3.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M436 214 L ${coords.bottomLeg3.x} ${coords.bottomLeg3.y}`} stroke="url(#orange-pulse-1)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(5) }}></path></g>
            {/* Group 7 -> Top Leg 4 */}
            <g><path d={`M460 64 L ${coords.topLeg4.x} ${coords.topLeg4.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M460 64 L ${coords.topLeg4.x} ${coords.topLeg4.y}`} stroke="url(#blue-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(6) }}></path></g>
            {/* Group 8 -> Bottom Leg 4 */}
            <g><path d={`M460 239 L ${coords.bottomLeg4.x} ${coords.bottomLeg4.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M460 239 L ${coords.bottomLeg4.x} ${coords.bottomLeg4.y}`} stroke="url(#blue-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(7) }}></path></g>
            {/* Group 9 -> Top Leg 5 */}
            <g><path d={`M554 20 L 488 20 C 485.791 20 484 21.7909 484 24 L ${coords.topLeg5.x} ${coords.topLeg5.y}`} stroke="url(#static-grad-2)" fill="none"></path><path d={`M554 20 L 488 20 C 485.791 20 484 21.7909 484 24 L ${coords.topLeg5.x} ${coords.topLeg5.y}`} stroke="url(#pink-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(8) }}></path></g>
            {/* Group 10 -> Bottom Leg 5 */}
            <g><path d={`M560 214 L 488 214 C 485.791 214 484 212.209 484 210 L ${coords.bottomLeg5.x} ${coords.bottomLeg5.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M560 214 L 488 214 C 485.791 214 484 212.209 484 210 L ${coords.bottomLeg5.x} ${coords.bottomLeg5.y}`} stroke="url(#pink-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(9) }}></path></g>
            {/* Group 11 -> Bottom Leg 6 */}
            <g><path d={`M560 197 L 512 197 C 509.791 197 508 195.209 508 193 L ${coords.bottomLeg6.x} ${coords.bottomLeg6.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M560 197 L 512 197 C 509.791 197 508 195.209 508 193 L ${coords.bottomLeg6.x} ${coords.bottomLeg6.y}`} stroke="url(#orange-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(10) }}></path></g>
            {/* Group 12 -> Right Leg 1 */}
            <g><path d={`M826 264 L 826 ${coords.rightLeg1.y} L ${coords.rightLeg1.x} ${coords.rightLeg1.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M826 264 L 826 ${coords.rightLeg1.y} L ${coords.rightLeg1.x} ${coords.rightLeg1.y}`} stroke="url(#orange-pulse-1)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(11) }}></path></g>
            {/* Group 13 -> Left Leg 1 */}
            <g><path d={`M1 264 L 1 ${coords.leftLeg1.y} L ${coords.leftLeg1.x} ${coords.leftLeg1.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M1 264 L 1 ${coords.leftLeg1.y} L ${coords.leftLeg1.x} ${coords.leftLeg1.y}`} stroke="url(#blue-pulse-1)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(12) }}></path></g>
            {/* Group 14 -> Right Leg 2 */}
            <g><path d={`M484 264 L 484 244 C 484 241.791 485.791 240 488 240 L 633 240 C 635.209 240 637 238.209 637 236 L 637 ${coords.rightLeg2.y} L ${coords.rightLeg2.x} ${coords.rightLeg2.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M484 264 L 484 244 C 484 241.791 485.791 240 488 240 L 633 240 C 635.209 240 637 238.209 637 236 L 637 ${coords.rightLeg2.y} L ${coords.rightLeg2.x} ${coords.rightLeg2.y}`} stroke="url(#pink-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(13) }}></path></g>
            {/* Group 15 -> Bottom Leg 1 */}
            <g><path d={`M73 264 L 73 202 C 73 199.791 74.7909 198 77 198 L 384 198 C 386.209 198 388 196.209 388 194 L ${coords.bottomLeg1.x} ${coords.bottomLeg1.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M73 264 L 73 202 C 73 199.791 74.7909 198 77 198 L 384 198 C 386.209 198 388 196.209 388 194 L ${coords.bottomLeg1.x} ${coords.bottomLeg1.y}`} stroke="url(#blue-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(14) }}></path></g>
            {/* Group 16 -> Top Leg 6 */}
            <g><path d={`M890 264 L 890 88 C 890 85.7909 888.209 84 886 84 L 512 84 C 509.791 84 508 85.7909 508 88 L ${coords.topLeg6.x} ${coords.topLeg6.y}`} stroke="var(--geist-foreground)" strokeOpacity="0.1" fill="none"></path><path d={`M890 264 L 890 88 C 890 85.7909 888.209 84 886 84 L 512 84 C 509.791 84 508 85.7909 508 88 L ${coords.topLeg6.x} ${coords.topLeg6.y}`} stroke="url(#orange-pulse-2)" strokeWidth="2" pathLength="1" strokeLinecap="round" fill="none" className={styles.animatedPulse} style={{ animationDelay: getDelay(15) }}></path></g>

            {/* --- Circles at line ends (Unchanged) --- */}
             <circle cx="310" cy="64" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="310" cy="64" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="69" cy="174" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="69" cy="174" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="412" cy="0" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="412" cy="0" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="412" cy="263.5" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="412" cy="263.5" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="436" cy="0" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="436" cy="0" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="436" cy="214" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="436" cy="214" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="460" cy="64" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="460" cy="64" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="460" cy="239" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="460" cy="239" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="554" cy="20" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="554" cy="20" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="560" cy="214" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="560" cy="214" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="560" cy="197" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="560" cy="197" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="826" cy="264" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="826" cy="264" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="1" cy="264" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="1" cy="264" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="484" cy="264" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="484" cy="264" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="73" cy="264" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="73" cy="264" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
             <circle cx="890" cy="264" fill="var(--geist-background)" r="4" opacity="1"></circle><circle cx="890" cy="264" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>

          </svg>

          {/* --- CPU ELEMENT (Unchanged) --- */}
          <div
            className={`${styles.stack} ${styles.foundation_cpu}`}
            style={{
              '--stack-flex': 'initial',
              '--stack-direction': 'column',
              '--stack-align': 'center',
              '--stack-justify': 'center',
              '--stack-padding': '0px',
              '--stack-gap': '0px',
            }}
            aria-hidden="true"
          >
            <div data-cpu-shine="true"></div>
            <div data-connectors="true" data-side="left">{renderConnectors(2)}</div>
            <div data-connectors="true" data-side="top">{renderConnectors(6)}</div>
            <span data-text="true">VAR Cloud</span>
            <div data-connectors="true" data-side="bottom">{renderConnectors(6)}</div>
            <div data-connectors="true" data-side="right">{renderConnectors(2)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundationAnimation;