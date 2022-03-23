import React, { useEffect, useState } from 'react';
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import { Participant as IParticipant, Track } from 'twilio-video';
import { AppearAfter } from 'components/AppearAfter/AppearAfter';
import AvatarIcon from 'icons/AvatarIcon';

const BaseLayer = () => {
  return (
    <div className="absolute top-0 w-full h-full bg-black flex items-center justify-center rounded-xl z-0">
      <div className="w-1/5 h-auto">
        <AppearAfter>
          <AvatarIcon />
        </AppearAfter>
      </div>
    </div>
  );
};

export interface ParticipantProps {
  participant: IParticipant;
  videoOnly?: boolean;
  enableScreenShare?: boolean;
  onClick?: () => void;
  // isSelected?: boolean;
  isLocalParticipant?: boolean;
  hideParticipant?: boolean;
  isModerator?: boolean;
  noName?: boolean;
  isActivePlayer?: boolean;
  roundsPlayed?: number;
  videoPriority?: Track.Priority;
}

const Participant = ({
  participant,
  videoOnly,
  // enableScreenShare,
  onClick,
  // isSelected,
  isLocalParticipant,
  hideParticipant,
  isModerator,
  noName,
  isActivePlayer,
  roundsPlayed,
  videoPriority,
}: ParticipantProps) => {
  return (
    <div className="relative w-full h-full">
      <ParticipantInfo
        participant={participant}
        onClick={onClick}
        // isSelected={isSelected}
        isLocalParticipant={isLocalParticipant}
        hideParticipant={hideParticipant}
        isModerator={isModerator}
        noName={noName ?? false}
        isActivePlayer={isActivePlayer}
        roundsPlayed={roundsPlayed}
      >
        <ParticipantTracks
          participant={participant}
          videoOnly={videoOnly}
          // enableScreenShare={enableScreenShare}
          videoPriority={videoPriority}
          isLocalParticipant={isLocalParticipant}
          isActivePlayer={isActivePlayer}
        />
      </ParticipantInfo>
      <BaseLayer />
    </div>
  );
};

export default Participant;
