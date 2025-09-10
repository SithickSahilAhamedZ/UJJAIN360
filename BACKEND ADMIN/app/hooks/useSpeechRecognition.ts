import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionHook {
  transcript: string;
  isListening: boolean;
  startListening: (lang: 'en-IN' | 'hi-IN') => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
}

const getSpeechRecognition = () => {
  if (typeof window !== 'undefined') {
    // FIX: Cast window to any to access vendor-prefixed SpeechRecognition APIs which may not be in standard TS types.
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  }
  return undefined;
};

const SpeechRecognition = getSpeechRecognition();

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  // FIX: Use 'any' for the recognition state as the SpeechRecognition type is not standard and conflicts with the variable name.
  const [recognition, setRecognition] = useState<any | null>(null);

  useEffect(() => {
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    
    // FIX: Use 'any' for the event type as SpeechRecognitionEvent is not a standard TS type.
    rec.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        }
      }
      setTranscript(finalTranscript);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    setRecognition(rec);

    return () => {
      rec.stop();
    };
  }, []);

  const startListening = useCallback((lang: 'en-IN' | 'hi-IN' = 'en-IN') => {
    if (recognition && !isListening) {
      recognition.lang = lang;
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);
  
  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!SpeechRecognition,
  };
};
