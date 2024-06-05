import { useState, useEffect } from 'react'

import { Button } from "antd";

import './Popup.css'

const notify = (message: string) => {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(message);
    console.log(notification.data);
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification(message);
        console.log(notification.data);
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
};

const config: {
  [key: string]: { title: string; time: number; finishWords: string };
} = {
  work: {
    title: "工作",
    time: 25,
    finishWords: "该休息一段时间了",
  },
  shortBreak: {
    title: "短休",
    time: 5,
    finishWords: "休息结束",
  },
  longBreak: {
    title: "长休",
    time: 10,
    finishWords: "休息结束",
  },
};

export const Popup = () => {
  const [tomato, setTomato] = useState("work");
  const [tomatoTime, setTomatoTime] = useState(config["work"].time);

  useEffect(() => {
    console.log("121", config[tomato]);
    setTomatoTime(config[tomato].time);
  }, [tomato]);


  const add = () => setCount(count + 1)

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCount(result.count || 0)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ count })
    chrome.runtime.sendMessage({ type: 'COUNT', count })
  }, [count])

  return (
    <main>
      <div className="tomatos">
        <Button className="tomatos-btn" onClick={() => setTomato("work")}>
          {config.work.title}
        </Button>
        <Button className="tomatos-btn" onClick={() => setTomato("shortBreak")}>
          {config.shortBreak.title}
        </Button>
        <Button className="tomatos-btn" onClick={() => setTomato("longBreak")}>
          {config.longBreak.title}
        </Button>
      </div>
      <CountdownTimer
        originalMinute={tomatoTime}
        onFinish={() => notify(config[tomato].finishWords)}
      />
    </main>
  )
}

export default Popup
