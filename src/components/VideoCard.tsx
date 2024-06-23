import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UniformButton } from './Button';
import ReactPlayer from 'react-player';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import EditVideoCard from '../components/EditVideoCard';
import { Divider } from '@mui/material';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import avatar from '../assets/boy.png';
import womenAvatar from '../assets/woman.png';
import UserAvatar from '../assets/boy.png';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: '#D3D9D4',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '90vh',
  overflowY: 'auto',
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
  const [volume, setVolume] = useState(0.7);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [isPlaying, setIsPlaying] = useState(false);

  const handleChangeVolume = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleChangeSpeed = (event: SelectChangeEvent) => {
    setPlaybackSpeed(Number(event.target.value));
    console.log(playbackSpeed)
  };

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
          <div className="flex flex-col gap-2 p-4 justify-center w-full">
            <div className="relative w-full flex justify-center">
              <div className="overflow-hidden rounded-lg w-full" style={{ paddingTop: '56.25%' }}>
                {/* 16:9 Aspect Ratio */}
                <ReactPlayer
                  url={video_url}
                  volume={volume}
                //   playing={isPlaying}
                  playbackRate={playbackSpeed}
                  controls
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </div>
            </div>
            <div>
              <div className='flex justify-between items-center'>
                <Typography className='pt-1' variant="h5">{title}</Typography>
                <div className='flex items-center'></div>
                <div className='flex items-center space-x-2'>
                  <VolumeDown />
                  <Box sx={{ minWidth: 120, display: 'flex', alignItems: 'center' }}>
                    <Slider
                      aria-label="Volume"
                      value={volume}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={handleChangeVolume}
                      className='mr-2'
                    />
                  </Box>
                  <VolumeUp />
                  <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <InputLabel id="demo-select-small-label">Speed</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={playbackSpeed}
                      label="Speed"
                      onChange={handleChangeSpeed}
                    >
                      <MenuItem value={0.75}>0.75x</MenuItem>
                      <MenuItem value={1}>Normal</MenuItem>
                      <MenuItem value={1.25}>1.25x</MenuItem>
                      <MenuItem value={1.5}>1.5x</MenuItem>
                    </Select>
                  </FormControl>
                  <FullscreenIcon fontSize="large" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <img src={UserAvatar} alt="User avatar" className="h-8 w-8" />
                <div className="flex flex-col justify-between pl-3">
                  <Typography variant="caption"> Uploaded by @{user_id}</Typography>
                </div>
              </div>
              <EditVideoCard id={id} video_url={video_url} currTitle={title} currDescription={description}/>
            </div>
            <Typography variant="body2">{description}</Typography>
            <Divider />
            <Typography variant="h7" style={{ fontWeight: 'bold' }}>
              {comments.length} Comments
            </Typography>
            <div className="flex items-center">
              <img src={avatar} alt="User avatar" className="h-10 w-10" />
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
