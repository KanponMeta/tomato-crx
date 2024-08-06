import React, { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import { ReloadOutlined, SettingOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import './index.css'

interface CountdownTimerProps {
  originalMinute: number
  onFinish: () => void
}

type ClockOperate = 'waiting' | 'running' | 'pause'

/**
 * CountdownTimer component
 * @param originalMinute - The initial time in minutes
 */
const CountdownTimer = ({ originalMinute, onFinish }: CountdownTimerProps) => {
  // State variables
  const [futureTime, setFutureTime] = useState(dayjs().add(originalMinute, 'minute'))
  const [clock, setClock] = useState(originalMinute * 60)
  const [clockOperate, setClockOperate] = useState<ClockOperate>('waiting') // Clock operation status

  //#region  无论重置、修改、结束番茄钟都是重设了初始时间
  const resetOriginalTime = (time: number) => {
    setClock(time * 60)
    setClockOperate('waiting')
  }

  useEffect(() => {
    resetOriginalTime(originalMinute)
  }, [originalMinute])

  const onReset = (time: number) => {
    resetOriginalTime(time)
  }
  //#endregion

  /**
   * Handler for the start/pause button click
   */
  const onClickBtnStart = () => {
    if (clockOperate === 'waiting') {
      setClockOperate('running')
      setFutureTime(dayjs().add(originalMinute, 'minute'))
    } else if (clockOperate === 'running') {
      setClockOperate('pause')
    } else if (clockOperate === 'pause') {
      setClockOperate('running')
      setFutureTime(dayjs().add(clock, 'second'))
    }
  }

  /**
   * Format the clock time to HH:MM format
   * @param clock - The clock time in seconds
   * @returns The formatted time string
   */
  const clockFormat = (clock: number) => {
    if (clock <= 0) {
      return '00:00'
    }

    const minute = Math.floor(clock / 60)
    const second = clock % 60
    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
  }

  // Update the clock time every second
  // 为防止当前页面不活跃后，setInterval暂停，使用当前时间与未来预设时间的差值，代替简单的数字-1
  useEffect(() => {
    if (clockOperate !== 'running') return;

    const timer = setInterval(() => {
      console.log('1')
      const duration = futureTime.diff(dayjs(), 'second')
      if (clockOperate === 'running') {
        console.log('duration', duration)
        setClock(duration)
      }

      // 当时间为0是停止
      if (duration <= 0) {
        resetOriginalTime(originalMinute)
        onFinish()
        clearInterval(timer)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [clockOperate, futureTime])

  return (
    <div className="countdown">
      <span>{clockFormat(clock)}</span>
      <div className="clock-operate">
        <Button className="clock-operate-btn" type="primary" onClick={() => onClickBtnStart()}>
          {clockOperate === 'running' ? '暂停' : '开始'}
        </Button>
        <Button
          className="clock-operate-btn"
          shape="circle"
          icon={<ReloadOutlined />}
          size="large"
          onClick={() => onReset(originalMinute)}
        />
        <Button
          className="clock-operate-btn"
          shape="circle"
          icon={<SettingOutlined />}
          size="large"
        />
      </div>
    </div>
  )
}

export default CountdownTimer
