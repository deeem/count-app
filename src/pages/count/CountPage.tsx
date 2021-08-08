import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Team } from './Team'
import { Controls } from './Controls'
import { Counter } from './Counter'
import { CounterEdit } from './CounterEdit'
import { Room, TeamMate, User } from 'app.types'
import { db } from '../../firebase'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useContext } from 'react'
import { UserContex } from 'userContext'

export const CountPage = () => {
  const [counter, setCounter] = useState<number | null>(null)
  const [editMode, setEditMode] = useState(false)
  const user = useContext(UserContex)

  const { room: roomId } = useParams<{ room: string }>()
  const roomRef = db.collection('rooms').doc(roomId)
  const [roomData, loading] = useDocument<Room>(roomRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
  const room = roomData?.data()

  counter === null && room?.counter && setCounter(room.counter)

  if (room?.owner.uid !== user.uid && room?.team && !inTeam(user, room.team)) {
    roomRef.update({ team: [...room.team, { ...user, status: 'active' }] })
  }

  const onCounterEdit = (newCounter: number) => {
    setCounter(newCounter)
    db.collection('rooms').doc(roomId).update({ counter: newCounter })

    editMode && setEditMode(false)
  }

  if (loading || !room?.team) return null

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
      <Team team={room.team} />
      <Controls editMode={editMode} setEditMode={setEditMode} />
    </>
  )
}

const inTeam = (user: User, team: TeamMate[]) => {
  return team.some((item) => item.uid === user.uid)
}
