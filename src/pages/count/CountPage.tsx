import { useState } from 'react'
import { Team } from './Team'
import { Controls } from './Controls'
import { Counter } from './Counter'
import { CounterEdit } from './CounterEdit'

export const CountPage = () => {
  const [counter, setCounter] = useState(0)
  const [editMode, setEditMode] = useState(false)

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
      <Team />
      <Controls editMode={editMode} setEditMode={setEditMode} />
    </>
  )
}
