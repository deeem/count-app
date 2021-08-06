import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Team } from './Team'
import { Controls } from './Controls'
import { Counter } from './Counter'
import { CounterEdit } from './CounterEdit'
import { User } from 'app.types'

type Props = {
  user: User
}

export const CountPage: React.FC<Props> = ({ user }) => {
  const [counter, setCounter] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const { room } = useParams<{ room: string }>()

  const onCounterEdit = (newCounter: number) => {
    setCounter(newCounter)
    setEditMode(false)
  }

  return (
    <>
      <div className="mt-12 mb-8">
        <h3 className="mb-4 text-lg font-semibold tracking-widest text-center uppercase">
          Score
        </h3>

        {editMode ? (
          <CounterEdit counter={counter} onChange={onCounterEdit} />
        ) : (
          <Counter counter={counter} setCounter={setCounter} />
        )}
      </div>
      <Team user={user} />
      <Controls editMode={editMode} setEditMode={setEditMode} />
    </>
  )
}
