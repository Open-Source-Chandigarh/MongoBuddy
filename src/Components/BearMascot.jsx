import Lottie from 'lottie-react';
import interactiveBearAnimation from '../assets/interactive-bear.json';

const BearMascot = ({ size = 120, className = '', loop = false, autoplay = true, speed = 0.4 }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={interactiveBearAnimation}
        loop={loop}
       autoplay={autoplay}
        speed={speed}
        style={{ width: size, height: size }}
        className="bear-mascot"
      />
    </div>
  );
};

export default BearMascot;
