'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Phone, PhoneOff, Video, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface CallProps {
  callerId: string;
  callerName: string;
  receiverId: string;
  receiverName: string;
  type: 'voice' | 'video';
  onEnd: () => void;
}

export const CallInterface: React.FC<CallProps> = ({
  callerId,
  callerName,
  receiverId,
  receiverName,
  type,
  onEnd,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [duration, setDuration] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center border-gray-800">
          <h2 className="text-2xl font-bold text-white">{receiverName}</h2>
          <p className="text-gray-400 mt-1">{type === 'video' ? 'Video Call' : 'Voice Call'}</p>
          <p className="text-primary-500 font-mono text-lg mt-2">{formatDuration(duration)}</p>
        </CardHeader>

        <CardBody>
          {type === 'video' && (
            <div className="bg-gray-800 rounded-lg aspect-video mb-6 flex items-center justify-center border border-gray-700">
              <div className="text-center">
                <div className="text-6xl mb-2">📹</div>
                <p className="text-gray-400">Video feed would appear here</p>
                <p className="text-xs text-gray-500 mt-2">WebRTC connection in progress</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Status */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 bg-opacity-10 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-500 text-sm font-medium">Connected</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <Button
                variant={isMuted ? 'danger' : 'secondary'}
                size="md"
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </Button>

              {type === 'video' && (
                <Button
                  variant="secondary"
                  size="md"
                  className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
                >
                  <Video size={20} />
                </Button>
              )}

              <Button
                variant={isSpeakerOn ? 'secondary' : 'danger'}
                size="md"
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
              >
                {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </Button>

              <Button
                variant="danger"
                size="md"
                onClick={onEnd}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
              >
                <PhoneOff size={20} />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

// Incoming call component
interface IncomingCallProps {
  callerId: string;
  callerName: string;
  onAccept: () => void;
  onReject: () => void;
  type: 'voice' | 'video';
}

export const IncomingCall: React.FC<IncomingCallProps> = ({
  callerId,
  callerName,
  onAccept,
  onReject,
  type,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <Card className="w-full max-w-md bg-gray-900 border-gray-800">
      <CardBody className="text-center space-y-6 py-8">
        <div>
          <div className="text-6xl mb-4">☎️</div>
          <h2 className="text-2xl font-bold text-white">{callerName}</h2>
          <p className="text-gray-400 mt-2">
            {type === 'video' ? 'incoming video call' : 'incoming voice call'}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant="danger"
            size="lg"
            onClick={onReject}
            className="rounded-full w-16 h-16 p-0 flex items-center justify-center"
          >
            <PhoneOff size={24} />
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={onAccept}
            className="rounded-full w-16 h-16 p-0 flex items-center justify-center"
          >
            <Phone size={24} />
          </Button>
        </div>
      </CardBody>
    </Card>
  </div>
);
