import { useState, useEffect } from 'react'

import { Button } from 'antd'
import CountdownTimer from './components/CountdownTimer/index-v2'

import './Popup.css'

const notify = (message: string) => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: '@/img/logo-128.png',
    title: 'Time to Hydrate',
    message: message,
    priority: 0
  });
}

const config: {
  [key: string]: { title: string; time: number; finishWords: string }
} = {
  work: {
    title: '工作',
    time: 25,
    finishWords: '该休息一段时间了',
  },
  shortBreak: {
    title: '短休',
    time: 1,
    finishWords: '休息结束',
  },
  longBreak: {
    title: '长休',
    time: 10,
    finishWords: '休息结束',
  },
}

export const Popup = () => {
  const [tomato, setTomato] = useState('work')
  const [tomatoTime, setTomatoTime] = useState(config['work'].time)

  useEffect(() => {
    setTomatoTime(config[tomato].time)
  }, [tomato])

  return (
    <main>
      <div className="tomatos">
        <Button className="tomatos-btn" onClick={() => setTomato('work')}>
          {config.work.title}
        </Button>
        <Button className="tomatos-btn" onClick={() => setTomato('shortBreak')}>
          {config.shortBreak.title}
        </Button>
        <Button className="tomatos-btn" onClick={() => setTomato('longBreak')}>
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
