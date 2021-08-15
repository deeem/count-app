import { TeamMate, TeamMateStatus } from 'app.types'
import { Badge, Button } from 'components'

const statusToVariantMap: Record<
  TeamMate['status'],
  React.ComponentProps<typeof Badge>['variant']
> = {
  active: 'teal',
  ready: 'orange',
  away: 'fuchsia',
}

type Props = {
  item: TeamMate
  isYou: boolean
  canSetStatus: boolean
  setStatus: (teammate: TeamMate, status: TeamMateStatus) => void
}

export const TeamItem: React.FC<Props> = ({
  item,
  isYou,
  canSetStatus,
  setStatus,
}) => {
  return (
    <>
      <span className="flex items-center justify-start flex-1">
        <span>
          <img
            src={String(item.photoURL)}
            alt="avatar"
            className="mr-4 rounded-full w-9 h-9"
          />
        </span>
        {item.displayName} {isYou ? ' (You)' : ''}
      </span>
      <span className="flex justify-center flex-1">
        {isYou && item.status === 'ready' && (
          <Button
            variant="outline"
            color="gray"
            onClick={() => {
              setStatus(item, 'away')
            }}
          >
            set status 'away'
          </Button>
        )}

        {isYou && item.status === 'away' && (
          <Button
            variant="outline"
            color="gray"
            onClick={() => {
              setStatus(item, 'ready')
            }}
          >
            set status 'ready'
          </Button>
        )}

        {canSetStatus && item.status === 'ready' && (
          <Button
            variant="outline"
            color="gray"
            onClick={() => {
              setStatus(item, 'active')
            }}
          >
            set active
          </Button>
        )}
      </span>
      <span className="flex justify-end flex-1">
        <Badge variant={statusToVariantMap[item.status]}>{item.status}</Badge>
      </span>
    </>
  )
}
