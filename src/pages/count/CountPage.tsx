import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Team } from './Team'
import { Controls } from './Controls'
import { Counter } from './Counter'
import { CounterEdit } from './CounterEdit'
import { Room } from 'app.types'
import { db } from '../../firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'

export const CountPage = () => {
  const [counter, setCounter] = useState<number | null>(null)
  const [editMode, setEditMode] = useState(false)

  const { room: roomId } = useParams<{ room: string }>()
  const roomRef = db.collection('rooms').doc(roomId)
  const [room, loading] = useDocumentData<Room, '', ''>(roomRef)

  counter === null && room?.counter && setCounter(room.counter)

  const onCounterEdit = (newCounter: number) => {
    setCounter(newCounter)
    db.collection('rooms').doc(roomId).update({ counter: newCounter })

    editMode && setEditMode(false)
  }

  if (loading) return null

  return (
    <>
      <div className="mt-12 mb-8">
        <h3 className="mb-4 text-lg font-semibold tracking-widest text-center uppercase">
          Score
        </h3>

        {editMode ? (
          <CounterEdit counter={Number(counter)} onChange={onCounterEdit} />
        ) : (
          <Counter counter={Number(counter)} onChange={onCounterEdit} />
        )}
      </div>
      <Team />
      <Controls editMode={editMode} setEditMode={setEditMode} />
    </>
  )
}
