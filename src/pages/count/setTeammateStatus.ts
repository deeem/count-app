import { TeamMate } from 'app.types'
import { firebase } from '../../firebase'

export const setTeammateStatus = (
  team: TeamMate[],
  teammate: TeamMate,
  status: 'active' | 'ready' | 'away',
  roomRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
) => {
  const newTeam = updateStatus(teammate, status, team)
  roomRef.update({ team: newTeam })
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
