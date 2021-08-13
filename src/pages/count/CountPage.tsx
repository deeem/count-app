import { useParams } from 'react-router-dom'
import { Team } from './Team'
import { Counter } from './Counter'
import { Room, TeamMate, User } from 'app.types'
import { db } from '../../firebase'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useContext } from 'react'
import { UserContex } from 'userContext'

export const CountPage = () => {
  const user = useContext(UserContex)
  const { room: roomId } = useParams<{ room: string }>()
  const roomRef = db.collection('rooms').doc(roomId)
  const [roomData, loading] = useDocument<Room>(roomRef)
  const room = roomData?.data()

  const isActive = isUserActive(user, room?.team)
  const isOwner = user.uid === room?.owner.uid

  if (room?.owner.uid !== user.uid && room?.team && !inTeam(user, room.team)) {
    roomRef.update({ team: [...room.team, { ...user, status: 'ready' }] })
  }

  if (loading || !room?.team) return null

  return (
    <>
      <div className="mt-12 mb-8">
        <h3 className="mb-4 text-lg font-semibold tracking-widest text-center uppercase">
          Score
        </h3>

        <Counter value={room.counter} isEditable={isActive || isOwner} />
      </div>

      <Team isActive={isActive} room={room} isOwner={isOwner} />
    </>
  )
}

const inTeam = (user: User, team: TeamMate[]) => {
  return team.some((item) => item.uid === user.uid)
}

const isUserActive = (user: User, team: TeamMate[] = []) => {
  return team.some((item) => item.status === 'active' && item.uid === user.uid)
}
