import { TranslateIcon } from '@heroicons/react/solid';
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

  const shouldBeTranslated = userGroup === UserGroup.StreamServerTranslated;
  const isTranslated = shouldBeTranslated && translatorParticipant !== undefined;

  if (isTranslated) {
    hearableParticipants = [translatorParticipant as RemoteParticipant];
  } else {
    hearableParticipants = speakerParticipants.filter(
      part => part.sid !== localParticipant!.sid
    ) as RemoteParticipant[];
  }

  return (
    <>
      {shouldBeTranslated ? (
        <span className="fixed top-2 right-2 rounded-md font-bold p-2 bg-red text-white z-50 flex">
          <TranslateIcon className="w-4" />
          {!isTranslated ? 'Waiting for the translator...' : 'Translated'}
        </span>
      ) : null}

      <div className="fixed top-0 h-0 invisible w-full" style={{ zIndex: -1 }}>
        {hearableParticipants.map(part => (
          <ParticipantTracks participant={part} key={part.sid} audioOnly />
        ))}
      </div>
    </>
  );
};
