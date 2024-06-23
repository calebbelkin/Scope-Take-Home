import * as React from 'react';
import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UniformButton } from './Button';
import { UserContext } from '../context/UserContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface EditVideoProps {
  id: string;
  video_url: string;
  currTitle: string;
  currDescription: string;
}

export default function EditVideoCard({ id, video_url, currDescription, currTitle }: EditVideoProps) {
  const [newTitle, setNewTitle] = React.useState(currTitle);
  const [newDescription, setNewDescription] = React.useState(currDescription);
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user_id } = useContext(UserContext);

  const editVideo = () => {
    fetch('http://localhost:1234/videos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        video_url: video_url,
        video_id: id,
        title: newTitle,
        description: newDescription
      })
    })
    .then(response => response.text())
    .then(data => console.log(data, 'in edit video console log with data'))
    .catch(error => console.error('Error:', error));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editVideo();
    setNewDescription(currDescription);
    setNewTitle(currTitle);
    handleClose();
  };

  // Update the state if props change
  useEffect(() => {
    setNewTitle(currTitle);
    setNewDescription(currDescription);
  }, [currTitle, currDescription]);

  return (
    <div>
      <UniformButton size="default" className='rounded-full py-1 text-sm' onClick={handleOpen}>
        Edit Post
      </UniformButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Your Post 
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full"
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white"
            >
              Publish Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
