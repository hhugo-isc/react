import { useState, useEffect } from "react";

const useCounter = (initialValue, step = 1) => {
  const [conter, setCounter] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevValue) => prevValue + step);
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  return conter;
};

export default useCounter;
