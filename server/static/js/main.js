import { PageSetup } from "./pageSetup.js";
import { DataProcessor } from "./dataProcessor.js";
import { Clock } from "./clock.js";

const clock = Clock([]);

const dataProcessor = DataProcessor([clock]);

const pageSetup = PageSetup(dataProcessor);
pageSetup.getJson();
