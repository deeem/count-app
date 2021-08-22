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

  const isUserActive = user.uid === room?.active.uid
  const isUserOwner = user.uid === room?.owner.uid
  const isUserTeammate = checkIsUserInTeam(user, room?.team)
  const isUserAbleToSetActive = isUserOwner || isUserActive

  return {
    loading,
    room,
    user,
    roomRef,
    roomId,
    isUserActive,
    isUserOwner,
    isUserTeammate,
    isUserAbleToSetActive,
  }
}

const checkIsUserInTeam = (user: User, team: TeamMate[] = []) => {
  return team.some((item) => item.uid === user.uid)
}
