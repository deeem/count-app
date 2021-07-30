import { Badge, Button } from 'components'

type TeamMate = {
  name: string
  status: 'active' | 'ready' | 'away'
}

type TeamMates = TeamMate[]

const teammates: TeamMates = [
  { name: 'aaaa', status: 'active' },
  { name: 'bbbb', status: 'ready' },
  { name: 'cccc', status: 'ready' },
  { name: 'dddd', status: 'ready' },
  { name: 'eeee', status: 'away' },
  { name: 'ffff', status: 'away' },
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
      <h3>Team</h3>
      <ul>
        {teammates.map(({ name, status }) => (
          <li
            className="flex items-center p-4 border-b border-b-1 last:border-b-0"
            key={status}
          >
            <span className="w-1/3">{name}</span>
            <span className="w-1/3">
              <Badge variant={statusToVariantMap[status]}>{status}</Badge>
            </span>
            <span className="w-1/3">
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
