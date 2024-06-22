import * as React from 'react';
import { useContext } from 'react';
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

export default function UploadCard() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user_id } = useContext(UserContext);



  // user id should be passed down from somwhere else 

  const uploadVideo = () => {
    fetch('http://localhost:1234/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        description: description,
        video_url: url,
        title: title
      })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    uploadVideo();
    handleClose();
  };

  return (
    <div>
    <UniformButton variant="ghost" size="icon" onClick={handleOpen}>
  <ion-icon name="cloud-upload-outline" style={{ fontSize: '1.5rem' }}></ion-icon> {/* Adjust the size here */}
</UniformButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a Post
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
            <TextField
              label="Video URL"
              fullWidth
              margin="normal"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
