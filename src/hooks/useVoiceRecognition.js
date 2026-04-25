import { useCallback } from 'react';

export function useVoiceRecognition(onResult) {
  const startVoiceRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener("result", (event) => {
      const spokenText = event.results[0][0].transcript;
      onResult(spokenText);
    });

    recognition.start();
  }, [onResult]);

  return { startVoiceRecognition };
}
