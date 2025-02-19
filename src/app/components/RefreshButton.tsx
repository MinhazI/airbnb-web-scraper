import { useEffect, useState } from "react";

interface props {
  callback: () => Promise<void>;
}

const RefreshButton = ({ callback }: props) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [timeSessionStorage, setTimeSessionStorage] = useState<string | null>(
    null
  );
  const compare = 30 * 60000;
  const [countdown, setCountdown] = useState<number>(30 * 60000);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  useEffect(() => {
    const storedTime = window.sessionStorage.getItem("refresh");

    if (storedTime) {
      setTimeSessionStorage(storedTime);
      const dif = new Date().getTime() - Number(storedTime);
      const remainingTime = compare - dif;

      if (remainingTime > 0) {
        setCountdown(remainingTime);
        setButtonDisable(true);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1000);
      }, 1000);
    } else {
      setButtonDisable(false);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (timeSessionStorage) {
      const dif = new Date().getTime() - new Date(timeSessionStorage).getTime();

      if (dif > compare) {
        setButtonDisable(false);
      }
    }
  }, [timeSessionStorage]);

  const onClick = () => {
    if (timeSessionStorage) {
      const dif = new Date().getTime() - Number(timeSessionStorage);

      if (dif > compare) {
        setRefreshing(true);
        window.sessionStorage.setItem(
          "refresh",
          new Date().getTime().toString()
        );
        callback();
      } else {
        setButtonDisable(true);
      }
    } else {
      window.sessionStorage.setItem("refresh", new Date().getTime().toString());
      setButtonDisable(true);
      setRefreshing(true);
      callback();
    }
    setRefreshing(false);
  };

  return (
    <button
      className={`bg-slate-950 dark:bg-gray-800 dark:outline-slate-300 dark:outline text-white py-2 px-4 rounded absolute top-4 right-4 ${
        buttonDisable ? "disabled:opacity-50" : "hover:bg-slate-700"
      }`}
      onClick={() => onClick()}
      disabled={buttonDisable}
    >
      {buttonDisable &&
        `Refresh available in ${Math.floor(countdown / 60000)}m ${Math.floor(
          (countdown % 60000) / 1000
        )}s`}
      {!buttonDisable && (refreshing ? "Refreshing..." : "Refresh")}
    </button>
  );
};

export default RefreshButton;
