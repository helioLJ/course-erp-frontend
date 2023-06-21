'use client'
import { Trash, X, Pencil, XSquare } from 'lucide-react'

import { SetStateAction } from 'react'

interface StudentDetailsModalButtonsProps {
  editing: boolean
  setEditing: (value: SetStateAction<boolean>) => void
  handleClose: () => any
}

export function StudentDetailsModalButtons({
  editing,
  setEditing,
  handleClose,
}: StudentDetailsModalButtonsProps) {
  return (
    <>
      {!editing ? (
        <>
          <button
            onClick={() => {
              setEditing(true)
            }}
          >
            <Pencil />
          </button>
          <button onClick={handleClose}>
            <X />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setEditing(false)
            }}
          >
            <XSquare className="text-zinc-400" />
          </button>
          <button
            onClick={() => {
              setEditing(false)
            }}
          >
            <Trash className="text-red-500" />
          </button>
        </>
      )}
    </>
  )
}
