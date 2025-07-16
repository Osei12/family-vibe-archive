import { useEffect, useState } from "react";

interface CounterStatProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  targetValue: number;
  duration?: number;
}

const CounterStat = ({ icon: Icon, label, targetValue, duration = 2000 }: CounterStatProps) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCurrentValue(Math.floor(targetValue * easeOutQuart));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration]);

  return (
    <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl mb-4">
        <Icon className="h-6 w-6 text-rose-600" />
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2 font-mono">
        {currentValue.toLocaleString()}
      </div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
};

export default CounterStat;