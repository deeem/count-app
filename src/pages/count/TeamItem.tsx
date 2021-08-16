import { TeamMate, TeamMateStatus } from 'app.types'
import { Button } from 'components'

type Props = {
  item: TeamMate
  isYou: boolean
  isOwner: boolean
  canSetStatus: boolean
  setStatus: (teammate: TeamMate, status: TeamMateStatus) => void
}

export const TeamItem: React.FC<Props> = ({
  item,
  isYou,
  isOwner,
  canSetStatus,
  setStatus,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center justify-start">
        <div>
          <img
            src={String(item.photoURL)}
            alt="avatar"
            className="w-12 h-12 mr-4 rounded-full"
          />
        </div>
        <div>
          <p className="font-semibold">{item.displayName}</p>
          <p>
            {item.status} {isOwner && ' - owner'}
          </p>
        </div>
      </span>
      <span className="flex items-center justify-center">
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
    </div>
  )
}
