import { Team } from './Team'
import { Counter } from './Counter'
import { useRoom } from './useRoom'
import { TeamItem } from './TeamItem'
import { setTeammateStatus } from './setTeammateStatus'
import { TeamMate, User } from 'app.types'

export const CountPage = () => {
  const {
    loading,
    room,
    user,
    roomRef,
    isUserOwner,
    isUserTeammate,
    canUserSetStatus,
  } = useRoom()

  if (loading || !room?.team) return null

  const you = getUserFromTeam(room.team, user)

  if (!isUserOwner && !isUserTeammate) {
    roomRef.update({ team: [...room.team, { ...user, status: 'ready' }] })
  }

  return (
    <>
      <div className="bg-violet-900">
        <div className="max-w-screen-sm mx-auto ">
          <div className="p-3 text-white ">
            <TeamItem
              item={you}
              isYou={true}
              isOwner={isUserOwner}
              canSetStatus={Boolean(canUserSetStatus)}
              setStatus={(teammate, status) =>
                setTeammateStatus(room.team, teammate, status, roomRef)
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-12 mb-8">
        <h3 className="mb-4 text-lg font-semibold tracking-widest text-center uppercase">
          Score
        </h3>

        <Counter />
      </div>

      <Team />
    </>
  )
}

const getUserFromTeam = (team: TeamMate[], user: User) => {
  return team.find((item) => item.uid === user.uid) as TeamMate
}
