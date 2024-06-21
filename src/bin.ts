#!/usr/bin/env node
import { Command } from "commander";
import * as path from "path";
import { runner } from "./index";

const packageInfo = require("../package.json");
const program = new Command();

program
  .name("robot-action")
  .description("Node.js Desktop Automation Flows Runner")
  .version(packageInfo.version)
  .argument(
    "[actionFlowsFilePath]",
    "action flows file path",
    path.join(process.cwd(), "action-flows.json")
  )
  .action(async (actionFlowsFilePath) => {
    if (path.isAbsolute(actionFlowsFilePath)) {
      await runner(actionFlowsFilePath);
    } else {
      await runner(path.join(process.cwd(), actionFlowsFilePath));
    }
  });

program
  .command("help")
  .description("help")
  .action(() => {
    program.help();
  });

program.parse();
