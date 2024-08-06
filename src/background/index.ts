const notify = (message: string) => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'img/logo-48.png', // 确保有该图标文件
    title: 'tomato提醒',
    message: message,
    priority: 2,
  })
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'notification') {
    notify(request.message)
    console.log('收到消息', request)
  }
})
