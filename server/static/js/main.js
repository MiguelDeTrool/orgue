import { PageSetup } from "./pageSetup.js";
import { DataProcessor } from "./dataProcessor.js";
import { Clock } from "./clock.js";
import { CanvasAnimator } from "./canvasAnimator.js";
import { MidiOutput } from "./midiOutput.js";
import { IncAndDecNum, LoadingModal } from "./innerUI.js";
import { ParameterLinks } from "./parameterLinks.js";
import { VolumeResetOnIdle } from "./volumeResetOnIdle.js";

IncAndDecNum("#length", ".plus", ".minus");
const loadingModal = LoadingModal(".loading-modal");

const midiOutput = MidiOutput();
const canvasAnimator = CanvasAnimator();
const clock = Clock([canvasAnimator, midiOutput]);
clock.addSubscriber(canvasAnimator);
clock.addSubscriber(midiOutput);

const dataProcessor = DataProcessor();
dataProcessor.addSubscriber(clock);
dataProcessor.addSubscriber(canvasAnimator);
dataProcessor.addSubscriber(midiOutput);

const parameterLinks = ParameterLinks(".parameter-container");
parameterLinks.addSubscriber(clock);
parameterLinks.addSubscriber(midiOutput);
parameterLinks.addSubscriber(dataProcessor);

const volumeResetOnIdle = VolumeResetOnIdle();
volumeResetOnIdle.setup();

const pageSetup = PageSetup();
pageSetup.addSubscriber(dataProcessor);
pageSetup.addSubscriber(parameterLinks); // parameterLinks must be after dataProcessor so it receives data beforehand
pageSetup.addSubscriber(clock);
pageSetup.addSubscriber(loadingModal);
pageSetup.getJson();
