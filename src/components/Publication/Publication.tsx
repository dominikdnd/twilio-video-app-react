import React from 'react';
import useTrack from '../../hooks/useTrack/useTrack';
import AudioTrack from '../AudioTrack/AudioTrack';
import VideoTrack from '../VideoTrack/VideoTrack';

import { IVideoTrack } from '../../types/types';
import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
  Track,
} from 'twilio-video';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';
import { AppearAfter } from 'components/AppearAfter/AppearAfter';

interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
  isLocalParticipant?: boolean;
  videoPriority?: Track.Priority | null;
  isActivePlayer?: boolean;
}

export default function Publication({ publication, isLocalParticipant, videoPriority }: PublicationProps) {
  const track = useTrack(publication);

  //Shown during track loading
  if (!track) {
    return null;
  }

  switch (track.kind) {
    case 'video':
      return (
        <VideoTrack
          track={track as IVideoTrack}
          priority={videoPriority}
          isLocal={!track.name.includes('screen') && isLocalParticipant}
        />
      );
    case 'audio':
      return <AudioTrack track={track as IAudioTrack} />;
    default:
      return null;
  }
}
