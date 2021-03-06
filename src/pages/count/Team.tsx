import { TeamMate, User } from 'app.types'
import { setTeammateStatus } from './setTeammateStatus'
import { TeamItem } from './TeamItem'
import { useRoom } from './useRoom'

export const Team = () => {
  const { user, room, roomRef, isUserAbleToSetActive } = useRoom()

  if (!room || !user || room.team.length === 1) return null

  const teamWithoutYou = getTeamWithoutUser(room.team, user)

  return (
    <>
      <h3 className="pb-4 text-lg font-semibold tracking-widest text-center uppercase">
        Team
      </h3>
      <ul className="max-w-screen-sm mx-auto">
        {teamWithoutYou.map((item) => (
          <li
            className="p-4 border-b border-b-1 last:border-b-0"
            key={item.displayName}
          >
            <TeamItem
              item={item}
              isYou={user.uid === item.uid}
              isOwner={room.owner.uid === item.uid}
              canSetStatus={Boolean(isUserAbleToSetActive)}
              setStatus={(teammate, status) =>
                setTeammateStatus(
                  room.team,
                  teammate.uid as string,
                  status,
                  roomRef
                )
              }
            />
          </li>
        ))}
      </ul>
    </>
  )
}

const getTeamWithoutUser = (team: TeamMate[], user: User) => {
  return team.filter((item) => item.uid !== user.uid)
}
