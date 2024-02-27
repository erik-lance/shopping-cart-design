import React from "react";

interface TimerProps {
  start: Date | null;
  onCheckout: () => void;
}

const Timer: React.FC<TimerProps> = ({ start, onCheckout }) => {
  const [timer, setTimer] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTimer(new Date().getTime() - start.getTime());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [start]);

  return null;
};

export default Timer;
