import React from "react";

interface TimerProps {
  start: Date | null;
  onCheckout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Timer: React.FC<TimerProps> = ({ start, onCheckout }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
