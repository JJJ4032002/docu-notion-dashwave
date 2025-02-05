import { makeImagePersistencePlan } from "./MakeImagePersistencePlan";
import { ImageSet } from "./images";

test("primary file with explicit file output path and prefix", () => {
  const imageSet: ImageSet = {
    primaryUrl: "https://s3.us-west-2.amazonaws.com/primaryImage?Blah=foo",
    localizedUrls: [],
    pathToParentDocument: "/pathToParentSomewhere/",
    fileType: { ext: "png", mime: "image/png" },
  };
  makeImagePersistencePlan(
    imageSet,
    "./static/notion_imgs",
    "/notion_imgs",
    "",
    false
  );
  expect(imageSet.outputFileName).toBe("463556435.png");
  expect(imageSet.primaryFileOutputPath).toBe(
    "static/notion_imgs/463556435.png"
  );
  expect(imageSet.filePathToUseInMarkdown).toBe("/notion_imgs/463556435.png");
});
test("primary file with defaults for image output path and prefix", () => {
  const imageSet: ImageSet = {
    primaryUrl: "https://s3.us-west-2.amazonaws.com/primaryImage?Blah=foo",
    localizedUrls: [],
    pathToParentDocument: "/pathToParentSomewhere/",
    fileType: { ext: "png", mime: "image/png" },
  };
  makeImagePersistencePlan(imageSet, "", "", "", false);
  expect(imageSet.outputFileName).toBe("463556435.png");

  // the default behavior is to put the image next to the markdown file
  expect(imageSet.primaryFileOutputPath).toBe(
    "/pathToParentSomewhere/463556435.png"
  );
  expect(imageSet.filePathToUseInMarkdown).toBe("./463556435.png");
});
test("blogCoverImgPath and isBlogImg both provided", () => {
  const imageSet: ImageSet = {
    primaryUrl: "https://s3.us-west-2.amazonaws.com/primaryImage?Blah=foo",
    localizedUrls: [],
    pathToParentDocument: "/pathToParentSomewhere/",
    fileType: { ext: "png", mime: "image/png" },
  };
  makeImagePersistencePlan(imageSet, "", "", "/img/blog", true);
  expect(imageSet.outputFileName).toBe("463556435.png");

  // the default behavior is to put the image next to the markdown file
  expect(imageSet.primaryFileOutputPath).toBe("static/img/blog/463556435.png");
  expect(imageSet.filePathToUseInMarkdown).toBe("/img/blog/463556435.png");
});
test("Default value for blogCoverImgPath provided", () => {
  const imageSet: ImageSet = {
    primaryUrl: "https://s3.us-west-2.amazonaws.com/primaryImage?Blah=foo",
    localizedUrls: [],
    pathToParentDocument: "/pathToParentSomewhere/",
    fileType: { ext: "png", mime: "image/png" },
  };
  makeImagePersistencePlan(imageSet, "", "", "", true);
  expect(imageSet.outputFileName).toBe("463556435.png");

  // the default behavior is to put the image next to the markdown file
  expect(imageSet.primaryFileOutputPath).toBe("static/img/463556435.png");
  expect(imageSet.filePathToUseInMarkdown).toBe("/img/463556435.png");
});

// In order to make image fallback work with other languages, we have to have
// a file for each image, in each Docusaurus language directory. This is true
// whether we have a localized version of the image or not.
// The imageSet is initially populated with placeholders for each language.
// This test ensures that these placeholders are replaced with actual urls
// when localized versions of the image are listed.
// TODO write this test
