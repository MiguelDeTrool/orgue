export const VolumeResetOnIdle = () => {
  let volumeInput = document.querySelector("#volume");
  let timer;

  const _resetVolume = () => {
    volumeInput.value = 0;
  };

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(_resetVolume, 4000);
  }

  const setup = () => {
    resetTimer();
    document.addEventListener("mousemove", resetTimer);
  };

  return { setup };
};
