import { exec as run } from "node:child_process";

export const exec = (cmd: string) => {
  run(cmd, (_: Error, stdout, stderr) => {
    console.log(stdout);
    if (stderr) console.log(stderr);
  });
};
