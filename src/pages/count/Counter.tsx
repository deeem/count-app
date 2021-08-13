import { useParams } from 'react-router-dom'
import { Button } from 'components'
import { db } from '../../firebase'

type Props = {
  value: number
  isEditable: boolean
}

export const Counter: React.FC<Props> = ({ value, isEditable }) => {
  const { room: roomId } = useParams<{ room: string }>()
  const roomRef = db.collection('rooms').doc(roomId)

  const increment = () => {
    roomRef.update({ counter: value + 1 })
  }

  const decrement = () => {
    if (value === 0) return
    roomRef.update({ counter: value - 1 })
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      {isEditable && (
        <Button
          variant="outline"
          color="red"
          onClick={decrement}
          disabled={value === 0}
        >
          -
        </Button>
      )}
      <span className="text-lg font-bold">{value}</span>
      {isEditable && (
        <Button variant="outline" color="blue" onClick={increment}>
          +
        </Button>
      )}
    </div>
  )
}
