import React, { useContext, useState } from 'react';
import Logo from "../assets/FULL_LOGO_DARK.png";
import UploadCard from "../components/UploadCard";
import avatar from '../assets/boy.png';
import LoginCard from "../components/LoginCard";
import { UserContext } from '../context/UserContext';

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const { user_id, setUserId } = useContext(UserContext);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-6">
      <div className={`flex gap-4 items-center flex-shrink-0 ${showFullWidthSearch ? 'hidden' : 'flex'}`}>
        <a href="/">
          <img src={Logo} className="h-10" alt="Logo" />
        </a>
      </div>

      <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? 'hidden' : 'flex'}`}>
        <UploadCard />
        {user_id === '' ? (
          <LoginCard setUserId={setUserId} />
        ) : (
          <img src={avatar} className="w-8 h-8 pt-1" alt="User Avatar" />
        )}
      </div>
    </div>
  );
}
