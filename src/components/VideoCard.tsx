import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UniformButton } from './Button';
import ReactPlayer from 'react-player';
import avatar from '../assets/boy.png';
import womenAvatar from '../assets/woman.png';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import UserAvatar from '../assets/boy.png';
import EditVideoCard from '../components/EditVideoCard'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: '#DEF2F1',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

interface VideoCardProps {
  title: string;
  video_url: string;
  description: string;
  id: string;
}

export default function VideoCard({ title, video_url, description, id }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [localComment, setLocalComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user_id } = useContext(UserContext);

  const handleSubmit = () => {
    uploadComment();
    setLocalComment('');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:1234/videos/comments/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      setError("Error in fetching comments");
    }
  };

  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [open, id]);

  const uploadComment = async () => {
    try {
      const response = await fetch('http://localhost:1234/videos/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_id: id,
          content: localComment,
          user_id: user_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchComments();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mockUserComment = {
    video_id: 'kDIZktbOa5x89QBr6p41',
    profile_pic: womenAvatar,
    user_id: 'alyssa_thompson',
    content: 'Super helpful video, I always find myself coming back to this one!',
  };

  return (
    <div>
      <div onClick={handleOpen} className="cursor-pointer">
        {title}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-2 p-4 justify-center">
            <ReactPlayer url={video_url} controls />
            <Typography variant="h6">{title}</Typography>
            <div className="flex items-center">
                <img src={UserAvatar} alt="User avatar" className="h-8 w-8" />
                <div className="flex flex-col justify-between pl-3">
                  <Typography variant="caption"> Uploaded by @{user_id}</Typography>
                  
                </div>
                <EditVideoCard id={id} video_url={video_url}/>
            </div>
            <Typography variant="body2">{description} </Typography>
            <Typography variant="body2">{comments.length} Comments</Typography>
            <div className="flex items-center">
              <img src={avatar} alt="User avatar" className="h-10 w-10" onClick={() => console.log(id)} />
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Add a Comment..."
                  variant="standard"
                  value={localComment}
                  onChange={(e) => setLocalComment(e.target.value)}
                />
              </Box>
              <UniformButton size="default" className="rounded-full py-1 text-sm" onClick={handleSubmit}>
                Comment
              </UniformButton>
            </div>
            {mockUserComment.video_id === id && (
              <div className="flex pt-4">
                <img src={mockUserComment.profile_pic} alt="User avatar" className="h-10 w-10" />
                <div className="flex flex-col justify-between pl-3">
                  <Typography variant="caption">@{mockUserComment.user_id}</Typography>
                  <Typography variant="body2">{mockUserComment.content}</Typography>
                </div>
              </div>
            )}
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="flex pt-4">
                  <img src={UserAvatar} alt="User avatar" className="h-10 w-10" />
                  <div className="flex flex-col justify-between pl-3">
                    <Typography variant="caption">@{comment.user_id}</Typography>
                    <Typography variant="body2">{comment.content}</Typography>
                  </div>
                </div>
              ))}
            </div>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
