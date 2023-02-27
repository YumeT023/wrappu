import { exec } from "node:child_process";
import { ClwInterface, CMDInterface, Commands } from "../@types";

export class Cli implements ClwInterface {
  readonly path: string;
  commands: Commands;

  private constructor(path: string) {
    this.path = path;
    this.commands = new Map();
  }

  static wrap(path: string) {
    return new Cli(path);
  }

  cmd(cmd: CMDInterface) {
    let name = cmd.name;

    if (this.commands.has(name)) {
      throw new Error(`cannot put the same cmd twice: '${name}'`);
    }
    this.commands.set(name, cmd);

    return this;
  }

  check(): void {
    exec(this.path, (_: Error, stdout, stderr) => {
      console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }
}
