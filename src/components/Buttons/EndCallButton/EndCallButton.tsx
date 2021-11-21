import { Alert } from 'components/Alert';
import useSessionContext from 'hooks/useSessionContext';
import React, { useState } from 'react';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { RoundButton } from '../RoundButton';

export default function EndCallButton() {
  const { room } = useVideoContext();
  const { groupToken, userGroup } = useSessionContext();
  const [showAlert, setShowAlert] = useState(false);

  const onEndCall = () => {
    room!.disconnect();
  };

  return (
    <>
      <Alert
        title={'DemokraTisch verlassen'}
        text="Möchtest du diesen DekokraTisch Raum wirklich verlassen?"
        onApprove={onEndCall}
        open={showAlert}
        setOpen={setShowAlert}
      />
      <RoundButton onClick={() => setShowAlert(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
          />
        </svg>
      </RoundButton>
    </>
  );
}
