import { Badge, Button } from 'components'
import { TeamMate } from 'app.types'
import React from 'react'

// const teammates: TeamMate[] = [
//   { displayName: 'aaaa', status: 'active' },
//   { displayName: 'bbbb', status: 'ready' },
//   { displayName: 'cccc', status: 'ready' },
//   { displayName: 'dddd', status: 'ready' },
//   { displayName: 'eeee', status: 'away' },
//   { displayName: 'ffff', status: 'away' },
// ]

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
  team: TeamMate[]
}

export const Team: React.FC<Props> = ({ team, isActive }) => {
  return (
    <>
      <h3 className="pb-4 text-lg font-semibold tracking-widest text-center uppercase">
        Team
      </h3>
      <ul className="max-w-screen-md mx-auto">
        {team.map(({ displayName, status, photoURL }) => (
          <li
            className="flex items-center p-4 border-b border-b-1 last:border-b-0"
            key={displayName}
          >
            <span className="flex items-center justify-start flex-1">
              <span>
                <img
                  src={String(photoURL)}
                  alt="avatar"
                  className="mr-4 rounded-full w-9 h-9"
                />
              </span>
              {displayName}
            </span>
            <span className="flex justify-center flex-1">
              {status === 'ready' && (
                <Button variant="outline" color="gray" disabled={!isActive}>
                  set active
                </Button>
              )}
            </span>
            <span className="flex justify-end flex-1">
              <Badge variant={statusToVariantMap[status]}>{status}</Badge>
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
