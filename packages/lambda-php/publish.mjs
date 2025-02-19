import { VERSION } from "remotion/version";
import { execSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  cpSync,
  existsSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const tmpDir = tmpdir();

const workingDir = path.join(tmpDir, "lambda-php-sdk");
if (existsSync(workingDir)) {
  rmSync(workingDir, { recursive: true });
}
mkdirSync(workingDir);
console.log(tmpDir);

execSync(
  `git clone git@github.com:remotion-dev/lambda-php-sdk.git ${workingDir}`,
  {
    cwd: tmpDir,
  }
);

copyFileSync("composer.json", path.join(workingDir, "composer.json"));
copyFileSync("composer.lock", path.join(workingDir, "composer.lock"));
cpSync("src", path.join(workingDir, "src"), { recursive: true });
writeFileSync(
  path.join(workingDir, "README.md"),
  [
    "# Remotion Lambda PHP SDK",
    "This repository exists because Composer packages need to have a composer.json file placed in the root of the repository.",
    "The actual source code is located in the [Remotion repository](https://remotion.dev/github).",
    "This repository is automatically updated when a new version of Remotion is released.",
    "Do not open issues or pull requests here.",
    "",
    "## Installation",
    "Visit https://www.remotion.dev/docs/lambda/php to learn how to install the Remotion Lambda PHP SDK.",
  ].join("\n")
);
execSync("git add .", { cwd: workingDir });
execSync(`git commit -m 'Release ${VERSION}'`, { cwd: workingDir });
execSync(`git tag ${VERSION}`, { cwd: workingDir });
execSync("git push", { cwd: workingDir });
execSync(`git push origin ${VERSION}`, { cwd: workingDir });
execSync("git push --tags", { cwd: workingDir });
