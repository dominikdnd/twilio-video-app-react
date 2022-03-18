import ParticipantTracks from 'components/ParticipantTracks/ParticipantTracks';
import useParticipants from 'hooks/useParticipants/useParticipants';
import useSessionContext from 'hooks/useSessionContext';
import React from 'react';
import { RemoteParticipant } from 'twilio-video';
import { UserGroup } from 'types/UserGroup';

export const AudioTracks = () => {
  const { userGroup } = useSessionContext();
  const { translatorParticipant, speakerParticipants, localParticipant } = useParticipants();

  let hearableParticipants: RemoteParticipant[];

  if (userGroup === UserGroup.StreamServerTranslated && translatorParticipant !== undefined) {
    hearableParticipants = [translatorParticipant as RemoteParticipant];
  } else {
    hearableParticipants = speakerParticipants.filter(
      part => part.sid !== localParticipant!.sid
    ) as RemoteParticipant[];
  }

  return (
    <div className="fixed top-0 h-0 invisible w-full" style={{ zIndex: -1 }}>
      {hearableParticipants.map(part => (
        <ParticipantTracks participant={part} key={part.sid} audioOnly />
      ))}
    </div>
  );
};
