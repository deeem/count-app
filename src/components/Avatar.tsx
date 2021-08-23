import { TeamMateStatus } from 'app.types'
import { classNames } from 'classNames'

type Props = {
  photoURL: string
  status: TeamMateStatus
  isActive: boolean
}

const statuses: Record<TeamMateStatus, string> = {
  online: 'bg-green-400 ',
  offline: 'bg-red-400',
  away: 'bg-yellow-400',
}

export const Avatar: React.FC<Props> = ({ photoURL, status, isActive }) => {
  const borderClass = classNames(
    'inline-block border-4 rounded-full',
    isActive ? 'border-rose-300' : 'border-white'
  )
  return (
    <div className={classNames('relative  mr-4', borderClass)}>
      <img src={photoURL} alt="avatar" className="w-12 h-12 rounded-full" />
      <div
        className={classNames('absolute', borderClass)}
        style={{ bottom: '-4px', right: '-3px' }}
      >
        <div
          className={classNames('w-4 h-4 rounded-full', statuses[status])}
        ></div>
      </div>
    </div>
  )
}
