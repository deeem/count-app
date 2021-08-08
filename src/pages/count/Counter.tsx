import { Button } from 'components'

type Props = {
  counter: number
  onChange: (counter: number) => void
}

export const Counter: React.FC<Props> = ({ counter, onChange }) => {
  const increment = () => {
    const count = counter + 1
    onChange(count)
  }

  const decrement = () => {
    if (counter === 0) return

    const count = counter - 1
    onChange(count)
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
