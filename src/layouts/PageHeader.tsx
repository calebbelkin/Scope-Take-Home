import React, { useContext, useState } from 'react';
import Logo from "../assets/FULL_LOGO_DARK.png";
import UploadCard from "../components/UploadCard";
import avatar from '../assets/boy.png';
import LoginCard from "../components/LoginCard";
import { UserContext } from '../context/UserContext';
import Divider from '@mui/material/Divider';

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const { user_id, setUserId } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between py-4 px-6 mb-6">
      <div className={`flex items-center ${showFullWidthSearch ? 'hidden' : 'flex'} flex-shrink-0`}>
        <a href="/">
          <img src={Logo} className="h-12" alt="Learnwell Logo" />
        </a>
      </div>
      <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? 'hidden' : 'flex'} items-center`}>
        {user_id ? <UploadCard /> : null}
        {user_id ? (
          <img src={avatar} className="w-8 h-8 pt-1" alt="User Avatar" />
        ) : (
          <LoginCard setUserId={setUserId} />
        )}
      </div>
    </div>
  );
}
