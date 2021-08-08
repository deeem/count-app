import { firebase } from 'firebase'
import { Badge, Button } from 'components'

type TeamMate = Partial<firebase.UserInfo> & {
  status: 'active' | 'ready' | 'away'
}

type TeamMates = TeamMate[]

const teammates: TeamMates = [
  { displayName: 'aaaa', status: 'active' },
  { displayName: 'bbbb', status: 'ready' },
  { displayName: 'cccc', status: 'ready' },
  { displayName: 'dddd', status: 'ready' },
  { displayName: 'eeee', status: 'away' },
  { displayName: 'ffff', status: 'away' },
]

const statusToVariantMap: Record<
  TeamMate['status'],
  React.ComponentProps<typeof Badge>['variant']
> = {
  active: 'teal',
  ready: 'orange',
  away: 'fuchsia',
}

export const Team = () => {
  return (
    <>
      <h3 className="pb-4 text-lg font-semibold tracking-widest text-center uppercase">
        Team
      </h3>
      <ul className="max-w-screen-md mx-auto">
        {teammates.map(({ displayName, status }) => (
          <li
            className="flex items-center p-4 border-b border-b-1 last:border-b-0"
            key={displayName}
          >
            <span className="flex justify-start flex-1">{displayName}</span>
            <span className="flex justify-center flex-1">
              <Badge variant={statusToVariantMap[status]}>{status}</Badge>
            </span>
            <span className="flex justify-end flex-1">
              {status === 'ready' && (
                <Button variant="outline" color="gray">
                  set active
                </Button>
              )}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
