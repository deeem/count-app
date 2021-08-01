import { Button } from 'components'

type Props = {
  counter: number
  setCounter: (counter: number) => void
}

export const Counter: React.FC<Props> = ({ counter, setCounter }) => {
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
