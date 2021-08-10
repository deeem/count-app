import { Button } from 'components'
import React from 'react'

interface Props {
  editMode: boolean
  isActive: boolean | undefined
  isOwner: boolean
  setEditMode: (editMode: boolean) => void
}

export const Controls: React.FC<Props> = ({
  editMode,
  isActive,
  isOwner,
  setEditMode,
}) => {
  const switchToEdit = () => {
    setEditMode(true)
  }

  return (
    <div className="flex items-center justify-center pt-8 space-x-4">
      {isOwner && (
        <Button
          variant="outline"
          color="blue"
          onClick={switchToEdit}
          disabled={editMode || !isActive}
        >
          edit counter
        </Button>
      )}
      <Button variant="outline" color="gray">
        set status away
      </Button>
    </div>
  )
}
