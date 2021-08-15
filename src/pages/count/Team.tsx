import React from 'react'
import { Room, TeamMate } from 'app.types'
import { useContext } from 'react'
import { UserContex } from 'userContext'
import { db } from '../../firebase'
import { useParams } from 'react-router-dom'
import { updateStatus } from './updateStatus'
import { TeamItem } from './TeamItem'

type Props = {
  isActive: boolean | undefined
  isOwner: boolean
  room: Room
}

export const Team: React.FC<Props> = ({ room, isActive, isOwner }) => {
  const { room: roomId } = useParams<{ room: string }>()
  const user = useContext(UserContex)

  const canSetStatus = isOwner || isActive

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
            <TeamItem
              item={item}
              isYou={user.uid === item.uid}
              canSetStatus={Boolean(canSetStatus)}
              setStatus={setStatus}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
