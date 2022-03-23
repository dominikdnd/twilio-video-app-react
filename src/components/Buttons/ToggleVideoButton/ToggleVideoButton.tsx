import React, { useCallback, useRef } from 'react';
import VideoOffIcon from '../../../icons/VideoOffIcon';
import VideoOnIcon from '../../../icons/VideoOnIcon';

import useDevices from '../../../hooks/useDevices/useDevices';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';
import { RoundButton } from '../RoundButton';
import useSessionContext from 'hooks/useSessionContext';
import { UserGroup } from 'types/UserGroup';

export default function ToggleVideoButton(props: { disabled: boolean }) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);
  const { hasVideoInputDevices } = useDevices();
  const { userGroup } = useSessionContext();

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  return (
    <RoundButton
      title={isVideoEnabled ? 'Kamera deaktivieren' : 'Kamera einschalten'}
      onClick={toggleVideo}
      disabled={!hasVideoInputDevices || props.disabled || userGroup == UserGroup.Translator}
    >
      {isVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
    </RoundButton>
  );
}
