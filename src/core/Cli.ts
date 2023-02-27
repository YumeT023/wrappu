import { exec } from "node:child_process";
import { ClwInterface } from "../@types";

export class Cli implements ClwInterface {
  readonly path: string;

  private constructor(path: string) {
    this.path = path;
  }

  static wrap(path: string) {
    return new Cli(path);
  }

  check(): void {
    exec(this.path, (_: Error, stdout, stderr) => {
      console.log(stdout);
      if (stderr) console.log(stderr);
    });
  }
}
