#!/usr/bin/env node
import { Command } from "commander";
import * as path from "path";
import { runner, recorder } from "./index";

const packageInfo = require("../package.json");
const program = new Command();

program
  .name("robot-action")
  .description("Node.js Desktop Automation Flows Recorder & Runner")
  .version(packageInfo.version)
  .action(async () => {
    console.log("input `robot-action help` get more");
    console.log(`version ${program.version()}`);
  });

program
  .command("run")
  .description("run actionFlowsFile command")
  .option(
    "-r, --actionFlowsFilePath <actionFlowsFilePath>",
    "run action flows file path",
    path.join(process.cwd(), "action-flows.json")
  )
  .action(async (options) => {
    if (path.isAbsolute(options.actionFlowsFilePath)) {
      await runner(options.actionFlowsFilePath);
    } else {
      await runner(path.join(process.cwd(), options.actionFlowsFilePath));
    }
  });

program
  .command("record")
  .description("record actionFlowsFile command")
  .option(
    "-o, --actionFlowsFilePath <actionFlowsFilePath>",
    "record action flows file path",
    path.join(process.cwd(), "action-flows.json")
  )
  .option(
    "-e, --exitKey <exitKey>",
    "set one key when need exit record,default:exit",
    "exit"
  )
  .action(async (options) => {
    let callback = () => {};
    if (path.isAbsolute(options.actionFlowsFilePath)) {
      callback = await recorder(options.actionFlowsFilePath);
    } else {
      callback = await recorder(
        path.join(process.cwd(), options.actionFlowsFilePath)
      );
    }
    process.once("SIGINT", () => {
      callback();
    });
    const timer = setInterval(() => {
      const keyBuf = process.stdin.read(options.exitKey.length);
      const key = keyBuf ? keyBuf.toString() : "";
      if (key === options.exitKey) {
        clearInterval(timer);
        callback();
      }
    }, 1000);
  });

program
  .command("help")
  .description("help")
  .action(() => {
    program.help();
  });

program.parse();
