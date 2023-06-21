'use client'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { FormEvent } from 'react'
import Button from '../Common/Button'

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
  setOpenModal: any
  modal: boolean
  deletePerson: any
}

export function ConfirmDeleteModal({
  setOpenModal,
  modal,
  deletePerson,
}: ConfirmDeleteModalProps) {
  const handleClose = () => setOpenModal(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <p>
                Tem certeza que deseja deletar esse registro? Essa ação deletará
                o dado permanentemente.
              </p>
              <div className="flex gap-4">
                <button className="w-full rounded-xl bg-zinc-400 p-3 font-bold text-white">
                  Cancelar
                </button>
                <Button value="Deletar" type="submit" />
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
