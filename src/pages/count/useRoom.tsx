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

  const setTeammateStatus = (
    teammate: TeamMate,
    status: 'active' | 'ready' | 'away'
  ) => {
    if (!room) return

    const newTeam = updateStatus(teammate, status, room.team)
    db.collection('rooms').doc(roomId).update({ team: newTeam })
  }

  return {
    loading,
    room,
    user,
    roomRef,
    isUserActive,
    isUserOwner,
    isUserTeammate,
    canUserSetStatus,
    setTeammateStatus,
  }
}

const checkIsUserInTeam = (user: User, team: TeamMate[] = []) => {
  return team.some((item) => item.uid === user.uid)
}

const checkIsUserActive = (user: User, team: TeamMate[] = []) => {
  return team.some((item) => item.status === 'active' && item.uid === user.uid)
}

const updateStatus = (
  teammate: TeamMate,
  newStatus: 'active' | 'ready' | 'away',
  team: TeamMate[]
) => {
  const newTeam = [...team]

  // before set 'active' status to new user, we should remove this status from current 'active' user
  if (newStatus === 'active') {
    const prevActiveIndex = team.findIndex((item) => item.status === 'active')
    newTeam[prevActiveIndex] = { ...team[prevActiveIndex], status: 'ready' }
  }

  const teammateIndex = team.findIndex((item) => item.uid === teammate.uid)
  newTeam[teammateIndex] = { ...teammate, status: newStatus }

  return newTeam
}
