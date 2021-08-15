import { setTeammateStatus } from './setTeammateStatus'
import { TeamItem } from './TeamItem'
import { useRoom } from './useRoom'

export const Team = () => {
  const { user, room, roomRef, canUserSetStatus } = useRoom()

  return (
    <>
      <h3 className="pb-4 text-lg font-semibold tracking-widest text-center uppercase">
        Team
      </h3>
      <ul className="max-w-screen-md mx-auto">
        {room &&
          room.team.map((item) => (
            <li
              className="flex items-center p-4 border-b border-b-1 last:border-b-0"
              key={item.displayName}
            >
              <TeamItem
                item={item}
                isYou={user.uid === item.uid}
                canSetStatus={Boolean(canUserSetStatus)}
                setStatus={(teammate, status) =>
                  setTeammateStatus(room.team, teammate, status, roomRef)
                }
              />
            </li>
          ))}
      </ul>
    </>
  )
}
