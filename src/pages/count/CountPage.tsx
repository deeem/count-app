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
  const [editMode, setEditMode] = useState(false)
  const user = useContext(UserContex)

  const { room: roomId } = useParams<{ room: string }>()
  const roomRef = db.collection('rooms').doc(roomId)
  const [roomData, loading] = useDocument<Room>(roomRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
  const room = roomData?.data()

  const isActive = room?.team.some(
    (item) => item.status === 'active' && item.uid === user.uid
  )

  if (room?.owner.uid !== user.uid && room?.team && !inTeam(user, room.team)) {
    roomRef.update({ team: [...room.team, { ...user, status: 'ready' }] })
  }

  const onCounterEdit = (newCounter: number) => {
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
          <CounterEdit counter={room.counter} onChange={onCounterEdit} />
        ) : (
          <Counter
            counter={room.counter}
            onChange={onCounterEdit}
            isActive={isActive}
          />
        )}
      </div>
      <Team team={room.team} isActive={isActive} />
      <Controls
        editMode={editMode}
        setEditMode={setEditMode}
        isActive={isActive}
      />
    </>
  )
}

const inTeam = (user: User, team: TeamMate[]) => {
  return team.some((item) => item.uid === user.uid)
}
