import { ref } from 'vue'

export const useStopWatch = () => {
  const time = ref(0)

  let timeBegan: Date | null = null
  let timeStopped: Date | null = null
  let stoppedDuration = 0
  let started: number | null = null
  let running = false
  function start() {
    if (running) return

    if (timeBegan === null) {
      reset()
      timeBegan = new Date()
    }

    if (timeStopped !== null) {
      stoppedDuration += new Date().getTime() - timeStopped.getTime()
    }

    started = setInterval(clockRunning, 10)
    running = true
  }

  function stop() {
    running = false
    timeStopped = new Date()
    clearInterval(started as number)
  }

  function reset() {
    running = false
    clearInterval(started as number)
    stoppedDuration = 0
    timeBegan = null
    timeStopped = null
    time.value = 0
  }

  function clockRunning() {
    const timeElapsed = new Date().getTime() - (timeBegan as Date).getTime() - stoppedDuration

    time.value = Math.floor(timeElapsed / 1000)
  }

  return {
    time,
    start,
    stop,
    reset
  }
}
