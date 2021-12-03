import useAdminWindow from 'hooks/useAdminWindow';
import React from 'react';
import { RoundButton } from './RoundButton';

export const ToggleAdminWindowButton = () => {
  const { toggleAdminWindow, adminWindowOpen } = useAdminWindow();

  return (
    <RoundButton title="Moderator Verwaltungsleiste öffnen" onClick={toggleAdminWindow} active={adminWindowOpen}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </RoundButton>
  );
};
