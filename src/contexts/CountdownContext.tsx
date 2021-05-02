import React from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  finishCountdown: () => void;
}

interface CountdownProviderProps {
  children: React.ReactNode;
}

export const CountdownContext = React.createContext({} as CountdownContextData);

const CountDownProvider: React.FC = ({ children }: CountdownProviderProps) => {
  let countdownTimeout: NodeJS.Timeout;

  const { startNewChallenge } = React.useContext(ChallengesContext);

  const [time, setTime] = React.useState(0.05 * 60);
  const [isActive, setIsActive] = React.useState(false);
  const [hasFinished, setHasFinished] = React.useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function finishCountdown() {
    setIsActive(false);
    clearTimeout(countdownTimeout);
    setTime(0.05 * 60);
    setHasFinished(false);
  }

  React.useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        isActive,
        hasFinished,
        minutes,
        seconds,
        startCountdown,
        finishCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};

export default CountDownProvider;
