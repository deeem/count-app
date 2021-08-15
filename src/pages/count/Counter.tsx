import { Button } from 'components'
import { useRoom } from './useRoom'

export const Counter = () => {
  const { roomRef, room, isUserActive, isUserOwner } = useRoom()

  const counter = Number(room?.counter)
  const canChange = isUserActive || isUserOwner

  const increment = () => {
    roomRef.update({ counter: counter + 1 })
  }

  const decrement = () => {
    if (counter === 0) return
    roomRef.update({ counter: counter - 1 })
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      {canChange && (
        <Button
          variant="outline"
          color="red"
          onClick={decrement}
          disabled={counter === 0}
        >
          -
        </Button>
      )}
      <span className="text-lg font-bold">{counter}</span>
      {canChange && (
        <Button variant="outline" color="blue" onClick={increment}>
          +
        </Button>
      )}
    </div>
  )
}
