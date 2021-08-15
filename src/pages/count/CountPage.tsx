import { Team } from './Team'
import { Counter } from './Counter'
import { useRoom } from './useRoom'

export const CountPage = () => {
  const {
    loading,
    room,
    user,
    roomRef,
    isUserActive,
    isUserOwner,
    isUserTeammate,
  } = useRoom()

  if (loading || !room?.team) return null

  if (!isUserOwner && !isUserTeammate) {
    roomRef.update({ team: [...room.team, { ...user, status: 'ready' }] })
  }

  return (
    <>
      <div className="flex items-center p-3 text-white bg-blue-600">
        <span>
          <img
            src={String(user.photoURL)}
            alt="avatar"
            className="w-12 h-12 mr-4 border-2 rounded-full"
          />
        </span>
        <span>{user.displayName}</span>
      </div>
      <div className="mt-12 mb-8">
        <h3 className="mb-4 text-lg font-semibold tracking-widest text-center uppercase">
          Score
        </h3>

        <Counter
          value={room.counter}
          isEditable={isUserActive || isUserOwner}
        />
      </div>

      <Team />
    </>
  )
}
