import { useParams } from 'react-router-dom'
import { Button } from 'components'
import { db } from '../../firebase'

type Props = {
  counter: number
  setCounter: (counter: number) => void
}

export const Counter: React.FC<Props> = ({ counter, setCounter }) => {
  const { room } = useParams<{ room: string }>()

  const increment = () => {
    const count = counter + 1
    setCounter(count)
    db.collection('rooms').doc(room).update({ counter: count })
  }

  const decrement = () => {
    if (counter === 0) return

    const count = counter - 1
    setCounter(count)
    db.collection('rooms').doc(room).update({ counter: count })
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
