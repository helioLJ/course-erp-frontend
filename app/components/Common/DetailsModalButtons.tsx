'use client'
import { Trash, X, Pencil, XSquare } from 'lucide-react'

import { SetStateAction, useState } from 'react'
import { ConfirmDeleteModal } from '../Common/ConfirmDeleteModal'

interface DetailsModalButtonsProps {
  editing: boolean
  setEditing: (value: SetStateAction<boolean>) => void
  handleClose: () => any
  deleteUser: (() => Promise<void>) | (() => void)
}

export function DetailsModalButtons({
  editing,
  setEditing,
  handleClose,
  deleteUser,
}: DetailsModalButtonsProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  function deleteAndCloseModal() {
    deleteUser()
    setEditing(false)
    setOpenDeleteModal(false)
  }

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
              setOpenDeleteModal(!openDeleteModal)
            }}
          >
            <Trash className="text-red-500" />
            <ConfirmDeleteModal
              modal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              deletePerson={deleteAndCloseModal}
            />
          </button>
        </>
      )}
    </>
  )
}
