(() => {
  const player = document.querySelector('[data-dw-audio-player]');
  if (!player) return;

  const audio = player.querySelector('audio');
  const progress = player.querySelector('[data-audio-progress]');
  const volume = player.querySelector('[data-audio-volume]');
  const currentTime = player.querySelector('[data-audio-current]');
  const duration = player.querySelector('[data-audio-duration]');
  const volumeOutput = player.querySelector('[data-audio-volume-output]');
  const status = player.querySelector('[data-audio-status]');
  const playButton = player.querySelector('[data-audio-action="play"]');

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
  const formatTime = value => {
    if (!Number.isFinite(value)) return '--:--';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const paintRange = range => {
    range.style.setProperty('--range-value', `${range.value}%`);
  };

  const updateProgress = () => {
    const percentage = Number.isFinite(audio.duration) && audio.duration > 0
      ? (audio.currentTime / audio.duration) * 100
      : 0;
    progress.value = clamp(percentage, 0, 100);
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
    paintRange(progress);
  };

  const updateVolume = value => {
    const nextVolume = clamp(Math.round(value), 0, 100);
    audio.volume = nextVolume / 100;
    volume.value = nextVolume;
    volumeOutput.value = `${nextVolume}%`;
    volumeOutput.textContent = `${nextVolume}%`;
    paintRange(volume);
  };

  const updatePlaybackState = playing => {
    player.classList.toggle('is-playing', playing);
    playButton.classList.toggle('is-active', playing);
    playButton.setAttribute('aria-pressed', String(playing));
    status.textContent = playing ? 'Musique en cours de lecture' : 'Musique en pause';
  };

  player.querySelectorAll('[data-audio-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.audioAction;

      if (action === 'play') {
        audio.play().catch(() => {
          status.textContent = 'La musique ne peut pas être lancée pour le moment';
        });
      }

      if (action === 'pause') audio.pause();

      if (action === 'stop') {
        audio.pause();
        audio.currentTime = 0;
        updateProgress();
        status.textContent = 'Musique arrêtée';
      }

      if (action === 'volume-down') updateVolume(Number(volume.value) - 10);
      if (action === 'volume-up') updateVolume(Number(volume.value) + 10);
    });
  });

  progress.addEventListener('input', () => {
    if (!Number.isFinite(audio.duration)) return;
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
    updateProgress();
  });

  volume.addEventListener('input', () => updateVolume(Number(volume.value)));
  audio.addEventListener('loadedmetadata', updateProgress);
  audio.addEventListener('durationchange', updateProgress);
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('play', () => updatePlaybackState(true));
  audio.addEventListener('pause', () => updatePlaybackState(false));
  audio.addEventListener('ended', () => updatePlaybackState(false));

  updateVolume(Number(volume.value));
  updateProgress();
})();
