import { Button } from 'components'
import { useState } from 'react'

export const Counter = () => {
  const [counter, setCounter] = useState(0)

  const increment = () => {
    setCounter(counter + 1)
  }

  const decrement = () => {
    if (counter === 0) return
    setCounter(counter - 1)
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        variant="outline"
        color="red"
        onClick={decrement}
        disabled={counter === 0}
      >
        -
      </Button>
      <span className="text-lg font-bold">{counter}</span>
      <Button variant="outline" color="blue" onClick={increment}>
        +
      </Button>
    </div>
  )
}
