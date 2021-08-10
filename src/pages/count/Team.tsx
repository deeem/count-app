import { Badge, Button } from 'components'
import { Room, TeamMate } from 'app.types'
import React from 'react'
import { useContext } from 'react'
import { UserContex } from 'userContext'
import { db } from '../../firebase'
import { useParams } from 'react-router-dom'

const statusToVariantMap: Record<
  TeamMate['status'],
  React.ComponentProps<typeof Badge>['variant']
> = {
  active: 'teal',
  ready: 'orange',
  away: 'fuchsia',
}

type Props = {
  isActive: boolean | undefined
  room: Room
}

export const Team: React.FC<Props> = ({ room, isActive }) => {
  const { room: roomId } = useParams<{ room: string }>()
  const user = useContext(UserContex)

  const setStatus = (
    teammate: TeamMate,
    status: 'active' | 'ready' | 'away'
  ) => {
    const newTeam = updateStatus(teammate, status, room.team)
    db.collection('rooms').doc(roomId).update({ team: newTeam })
  }

  return (
    <>
      <h3 className="pb-4 text-lg font-semibold tracking-widest text-center uppercase">
        Team
      </h3>
      <ul className="max-w-screen-md mx-auto">
        {room.team.map((item) => (
          <li
            className="flex items-center p-4 border-b border-b-1 last:border-b-0"
            key={item.displayName}
          >
            <span className="flex items-center justify-start flex-1">
              <span>
                <img
                  src={String(item.photoURL)}
                  alt="avatar"
                  className="mr-4 rounded-full w-9 h-9"
                />
              </span>
              {item.displayName} {user.uid === item.uid ? ' (You)' : ''}
            </span>
            <span className="flex justify-center flex-1">
              {item.status === 'ready' && (
                <Button
                  variant="outline"
                  color="gray"
                  disabled={!isActive}
                  onClick={() => {
                    setStatus(item, 'active')
                  }}
                >
                  set active
                </Button>
              )}
            </span>
            <span className="flex justify-end flex-1">
              <Badge variant={statusToVariantMap[item.status]}>
                {item.status}
              </Badge>
            </span>
          </li>
        ))}
      </ul>
    </>
  )
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
