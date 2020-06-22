import { useState, useEffect } from 'react'

const useCountdown = duration => {
  const [countdown, setCountdown] = useState(duration)
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(cd => {
        if (cd > 0) {
          return cd - 1
        }
        return 0
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return countdown
}

export default useCountdown
