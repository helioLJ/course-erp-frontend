'use client'
import { Trash, X, Pencil, XSquare } from 'lucide-react'

import { SetStateAction, useState } from 'react'
import { ConfirmDeleteModal } from '../Common/ConfirmDeleteModal'
import { api } from '@/app/lib/api'

interface StudentDetailsModalButtonsProps {
  editing: boolean
  setEditing: (value: SetStateAction<boolean>) => void
  handleClose: () => any
  updateTable: (queryName: string, queryClassId: string) => Promise<void>
  studendId: string
}

export function StudentDetailsModalButtons({
  editing,
  setEditing,
  handleClose,
  updateTable,
  studendId,
}: StudentDetailsModalButtonsProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  async function deleteStudent() {
    await api.delete(`/student/${studendId}`)
    setOpenDeleteModal(false)
    updateTable('', '')
    handleClose()
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
              setOpenDeleteModal(true)
            }}
          >
            <Trash className="text-red-500" />
            <ConfirmDeleteModal
              modal={openDeleteModal}
              setOpenModal={setOpenDeleteModal}
              deletePerson={deleteStudent}
            />
          </button>
        </>
      )}
    </>
  )
}
