import { Option, program } from "commander";
import { setLogLevel } from "./log";

import { notionPull, DocuNotionOptions } from "./pull";

export function run() {
  const pkg = require("../package.json");
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`docu-notion version ${pkg.version}`);

  program.name("docu-notion").description("");
  program.usage("-n <token> -r <root> [options]");
  program
    .requiredOption(
      "-n, --notion-token <string>",
      "notion api token, which looks like secret_3bc1b50XFYb15123RHF243x43450XFY33250XFYa343"
    )
    .requiredOption(
      "-r, --root-page <string>",
      "The 31 character ID of the page which is the root of your docs page in notion. The code will look like 9120ec9960244ead80fa2ef4bc1bba25. This page must have a child page named 'Outline'"
    )
    .option(
      "-m, --markdown-output-path  <string>",
      "Root of the hierarchy for md files. WARNING: node-pull-mdx will delete files from this directory. Note also that if it finds localized images, it will create an i18n/ directory as a sibling.",
      "./docs"
    )
    .option(
      "-t, --status-tag  <string>",
      "Database pages without a Notion page property 'status' matching this will be ignored. Use '*' to ignore status altogether.",
      "Publish"
    )
    .option(
      "--locales  <codes>",
      "Comma-separated list of iso 639-2 codes, the same list as in docusaurus.config.js, minus the primary (i.e. 'en'). This is needed for image localization.",
      parseLocales,
      []
    )
    .addOption(
      new Option("-l, --log-level <level>", "Log level").choices([
        "info",
        "verbose",
        "debug",
      ])
    )
    .option(
      "-i, --img-output-path  <string>",
      "Path to directory where images will be stored. If this is not included, images will be placed in the same directory as the document that uses them, which then allows for localization of screenshots."
    )
    .option(
      "-p, --img-prefix-in-markdown <string>",
      "When referencing an image from markdown, prefix with this path instead of the full img-output-path. Should be used only in conjunction with --img-output-path."
    )
    .option(
      "-b, --blog-cover-img-path <string>",
      "While converting the image received from image property in notion pages. They will be stored in path given here. Default - All the images will be stored in ./static/img regaredless of whatever the path is given here.You can make folders in ./static by giving appropriate path. Syntax should be in the form of /path."
    );

  program.showHelpAfterError();
  program.parse();
  setLogLevel(program.opts().logLevel);
  console.log(program.opts());
  console.log(JSON.stringify(program.opts));
  notionPull(program.opts() as DocuNotionOptions).then(() =>
    console.log("docu-notion Finished.")
  );
}
function parseLocales(value: string): string[] {
  return value.split(",").map(l => l.trim().toLowerCase());
}
