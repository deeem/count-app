import { Room, TeamMate, User } from 'app.types'
import { useContext } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { UserContex } from 'userContext'
import { db } from '../../firebase'

export const useRoom = () => {
  const { room: roomId } = useParams<{ room: string }>()
  const user = useContext(UserContex)
  const roomRef = db.collection('rooms').doc(roomId)
  const [roomData, loading] = useDocument<Room>(roomRef)
  const room = roomData?.data()

  const isUserActive = checkIsUserActive(user, room?.team)
  const isUserOwner = user.uid === room?.owner.uid
  const isUserTeammate = checkIsUserInTeam(user, room?.team)
  const canUserSetStatus = isUserOwner || isUserActive

  return {
    loading,
    room,
    user,
    roomRef,
    roomId,
    isUserActive,
    isUserOwner,
    isUserTeammate,
    canUserSetStatus,
  }
}

const checkIsUserInTeam = (user: User, team: TeamMate[] = []) => {
  return team.some((item) => item.uid === user.uid)
}

const checkIsUserActive = (user: User, team: TeamMate[] = []) => {
  return team.some((item) => item.status === 'active' && item.uid === user.uid)
}
