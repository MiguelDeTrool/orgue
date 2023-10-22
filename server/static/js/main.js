import { PageSetup } from "./pageSetup.js";
import { DataProcessor } from "./dataProcessor.js";

const dataProcessor = DataProcessor([]);

const pageSetup = PageSetup(dataProcessor);
pageSetup.getJson();
