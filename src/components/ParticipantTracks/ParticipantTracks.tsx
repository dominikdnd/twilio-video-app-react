import React from 'react';
import { Participant, Track } from 'twilio-video';
import Publication from '../Publication/Publication';
import usePublications from '../../hooks/usePublications/usePublications';

interface ParticipantTracksProps {
  participant: Participant;
  videoOnly?: boolean;
  // enableScreenShare?: boolean;
  videoPriority?: Track.Priority | null;
  isLocalParticipant?: boolean;
  isActivePlayer?: boolean;
  audioOnly?: boolean;
}

/*
 *  The object model for the Room object (found here: https://www.twilio.com/docs/video/migrating-1x-2x#object-model) shows
 *  that Participant objects have TrackPublications, and TrackPublication objects have Tracks.
 *
 *  The React components in this application follow the same pattern. This ParticipantTracks component renders Publications,
 *  and the Publication component renders Tracks.
 */

const ParticipantTracks = React.memo(
  ({
    participant,
    videoPriority,
    isLocalParticipant,
    isActivePlayer,
    videoOnly,
    audioOnly,
  }: ParticipantTracksProps) => {
    const publications = usePublications(participant);

    let filteredPublications = publications;

    if (audioOnly) {
      filteredPublications = filteredPublications.filter(p => p.kind === 'audio');
    } else if (videoOnly) {
      filteredPublications = filteredPublications.filter(p => p.kind === 'video');
    }

    // if (enableScreenShare && filteredPublications.some(p => p.trackName.includes('screen'))) {
    //   // When displaying a screenshare track is allowed, and a screen share track exists,
    //   // remove all video tracks without the name 'screen'.
    //   filteredPublications = filteredPublications.filter(p => p.trackName.includes('screen') || p.kind !== 'video');
    // } else {
    //   // Else, remove all screenshare tracks
    //   filteredPublications = filteredPublications.filter(p => !p.trackName.includes('screen'));
    // }

    return (
      <div className="w-full h-full rounded-xl">
        {filteredPublications.map(publication => (
          <Publication
            key={publication.kind}
            publication={publication}
            participant={participant}
            isLocalParticipant={isLocalParticipant}
            videoPriority={videoPriority}
            isActivePlayer={isActivePlayer}
          />
        ))}
      </div>
    );
  },
  (prev, next) => {
    return prev.participant.sid !== next.participant.sid;
  }
);

export default ParticipantTracks;
