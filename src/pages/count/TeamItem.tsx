import { TeamMate, TeamMateStatus } from 'app.types'
import { Button } from 'components'
import { useRoom } from './useRoom'

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
  const { roomRef, room, loading } = useRoom()

  if (loading) return null

  const setActive = (teammate: TeamMate) => {
    roomRef.update({ active: { ...teammate } })
  }

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
            {[
              item.status,
              item.uid === room?.owner.uid && 'owner',
              item.uid === room?.active.uid && 'active',
            ]
              .filter(Boolean)
              .join(' • ')}
          </p>
        </div>
      </span>
      <span className="flex items-center justify-center">
        {isYou && item.status === 'online' && (
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
              setStatus(item, 'online')
            }}
          >
            set status 'online'
          </Button>
        )}

        {canSetStatus &&
          item.status === 'online' &&
          item.uid !== room?.active.uid && (
            <Button
              variant="outline"
              color="gray"
              onClick={() => {
                setActive(item)
              }}
            >
              set active
            </Button>
          )}
      </span>
    </div>
  )
}
