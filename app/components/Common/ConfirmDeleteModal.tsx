'use client'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Dispatch, SetStateAction } from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #27272A',
  borderRadius: '10px',
  outline: 'none',
  boxShadow: 24,
  p: 4,
}

interface ConfirmDeleteModalProps {
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>
  modal: boolean
  deletePerson: () => void
}

export function ConfirmDeleteModal({
  setOpenDeleteModal,
  modal,
  deletePerson,
}: ConfirmDeleteModalProps) {
  function handleClose() {
    setOpenDeleteModal(false)
  }

  async function handleDelete() {
    deletePerson()
    handleClose()
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
            <div className="space-y-4">
              <p>
                Tem certeza que deseja deletar esse registro? Essa ação deletará
                o dado permanentemente.
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="w-full rounded-xl bg-zinc-400 p-3 font-bold text-white"
                  onClick={() => handleClose()}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="w-full rounded-xl bg-red-500 p-3 font-bold text-white"
                  onClick={() => handleDelete()}
                >
                  Deletar
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
