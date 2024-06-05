import React, { useEffect, useState } from "react";

import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";

import "./index.scss";

interface CountdownTimerProps {
  originalMinute: number;
  onFinish: () => void;
}

type ClockOperate = "waiting" | "running" | "stop";

/**
 * CountdownTimer component
 * @param originalMinute - The initial time in minutes
 */
const CountdownTimer = ({ originalMinute, onFinish }: CountdownTimerProps) => {
  // State variables
  const [clock, setClock] = useState(originalMinute * 60); // Clock time in seconds
  const [clockOperate, setClockOperate] = useState<ClockOperate>("waiting"); // Clock operation status

  useEffect(() => {
    setClock(originalMinute * 60);
    console.log("originalMinute", originalMinute);
  }, [originalMinute]);

  const onReset = () => {
    setClock(originalMinute * 60);
    setClockOperate("waiting");
  };

  /**
   * Handler for the start/pause button click
   */
  const onClickBtnStart = () => {
    if (clockOperate === "running") {
      setClockOperate("waiting");
    } else {
      setClockOperate("running");
    }
  };

  /**
   * Format the clock time to HH:MM format
   * @param clock - The clock time in seconds
   * @returns The formatted time string
   */
  const clockFormat = (clock: number) => {
    const minute = Math.floor(clock / 60);
    const second = clock % 60;
    return `${minute.toString().padStart(2, "0")}:${second
      .toString()
      .padStart(2, "0")}`;
  };

  // Update the clock time every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (clockOperate === "running" && clock > 0) {
        console.log("running", clock);
        const currentClock = clock - 1;
        setClock(currentClock);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clock, clockOperate]);

  // Check if the clock has reached zero
  useEffect(() => {
    if (clock <= 0) {
      setClockOperate("stop");
      console.log("stop", clock);
      onFinish();
    }
  }, [clock, onFinish]);

  return (
    <div className="countdown">
      <span>{clockFormat(clock)}</span>
      <div className="clock-operate">
        <Button
          className="clock-operate-btn"
          type="primary"
          onClick={() => onClickBtnStart()}
        >
          {clockOperate === "running" ? "暂停" : "开始"}
        </Button>
        <Button
          className="clock-operate-btn"
          shape="circle"
          icon={<ReloadOutlined />}
          size="large"
          onClick={onReset}
        />
        <Button
          className="clock-operate-btn"
          shape="circle"
          icon={<SettingOutlined />}
          size="large"
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
