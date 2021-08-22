import { TeamMate, TeamMateStatus } from 'app.types'
import { firebase } from '../../firebase'

export const setTeammateStatus = (
  team: TeamMate[],
  uid: string,
  status: TeamMateStatus,
  roomRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
) => {
  const newTeam = updateStatus(uid, status, team)
  roomRef.update({ team: newTeam })
}

const updateStatus = (
  uid: string,
  newStatus: TeamMateStatus,
  team: TeamMate[]
) => {
  const newTeam = [...team]
  const teammateIndex = team.findIndex((item) => item.uid === uid)

  newTeam[teammateIndex] = { ...team[teammateIndex], status: newStatus }

  return newTeam
}
