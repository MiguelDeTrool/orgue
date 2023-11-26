export const VolumeResetOnIdle = () => {
  let volumeInput = document.querySelector("#volume");
  let timer;

  const _resetVolume = () => {
    volumeInput.value = 0;
    var event = new Event("input", { bubbles: true });
    volumeInput.dispatchEvent(event);
  };

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(_resetVolume, 40000);
  }

  const setup = () => {
    resetTimer();
    document.addEventListener("mousemove", resetTimer);
  };

  return { setup };
};
