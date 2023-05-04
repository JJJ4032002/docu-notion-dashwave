import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionPage } from "./NotionPage";

describe("NotionPage", () => {
  const mockMetadata: GetPageResponse = {
    object: "page",
    id: "6e6921b9-b1f5-4614-ab3c-bf1a73358a1f",
    created_time: "2023-04-11T10:17:00.000Z",
    last_edited_time: "2023-04-13T20:24:00.000Z",
    created_by: {
      object: "user",
      id: "USERID",
    },
    last_edited_by: {
      object: "user",
      id: "USERID",
    },
    cover: null,
    icon: {
      type: "file",
      file: {
        url: "https:/dummy_URL",
        expiry_time: "2023-04-15T11:50:20.461Z",
      },
    },
    parent: {
      type: "workspace",
      workspace: true,
    },
    archived: false,
    properties: {
      title: {
        id: "title",
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: "Foo",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "Foo",
            href: null,
          },
          {
            type: "text",
            text: {
              content: "Bar",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "Bar",
            href: null,
          },
        ],
      },
      date_property: {
        id: "a%3Cql",
        type: "date",
        date: {
          start: "2021-10-24",
          end: "2021-10-28",
          time_zone: null,
        },
      },
      image: {
        files: [
          {
            file: { url: "", expiry_time: "" },
            name: "image",
            type: "file",
          },
        ],
        type: "files",
        id: "a%3Cql",
      },
    },
    url: "https://www.notion.so/Site-docu-notion-PAGEID",
  };

  describe("getPlainTextProperty", () => {
    it("should return the plain text value of a property", () => {
      const page = new NotionPage({
        layoutContext: "Test Context",
        pageId: "123",
        order: 1,
        metadata: mockMetadata,
        foundDirectlyInOutline: true,
      });

      const result = page.getPlainTextProperty("title", "");

      expect(result).toBe("FooBar");
    });

    it("should return the default value if the property is not found", () => {
      const page = new NotionPage({
        layoutContext: "Test Context",
        pageId: "123",
        order: 1,
        metadata: mockMetadata,
        foundDirectlyInOutline: true,
      });

      const result = page.getPlainTextProperty("nonexistent", "Default Value");

      expect(result).toBe("Default Value");
    });
  });

  describe("getImageProperty", () => {
    it("should return the files array with an object containing type as file", () => {
      const page = new NotionPage({
        layoutContext: "Test Context",
        pageId: "123",
        order: 1,
        metadata: mockMetadata,
        foundDirectlyInOutline: true,
      });
      const result = page.getImageProperty();
      expect(result).toEqual(
        expect.arrayContaining([expect.objectContaining({ type: "file" })])
      );
    });
    it("should return null as files array is empty", () => {
      const mockMetadata: GetPageResponse = {
        object: "page",
        id: "6e6921b9-b1f5-4614-ab3c-bf1a73358a1f",
        created_time: "2023-04-11T10:17:00.000Z",
        last_edited_time: "2023-04-13T20:24:00.000Z",
        created_by: {
          object: "user",
          id: "USERID",
        },
        last_edited_by: {
          object: "user",
          id: "USERID",
        },
        cover: null,
        icon: {
          type: "file",
          file: {
            url: "https:/dummy_URL",
            expiry_time: "2023-04-15T11:50:20.461Z",
          },
        },
        parent: {
          type: "workspace",
          workspace: true,
        },
        archived: false,
        properties: {
          title: {
            id: "title",
            type: "title",
            title: [
              {
                type: "text",
                text: {
                  content: "Foo",
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: "Foo",
                href: null,
              },
              {
                type: "text",
                text: {
                  content: "Bar",
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: "Bar",
                href: null,
              },
            ],
          },
          date_property: {
            id: "a%3Cql",
            type: "date",
            date: {
              start: "2021-10-24",
              end: "2021-10-28",
              time_zone: null,
            },
          },
          image: {
            files: [],
            type: "files",
            id: "a%3Cql",
          },
        },
        url: "https://www.notion.so/Site-docu-notion-PAGEID",
      };

      const page = new NotionPage({
        layoutContext: "Test Context",
        pageId: "123",
        order: 1,
        metadata: mockMetadata,
        foundDirectlyInOutline: true,
      });
      const result = page.getImageProperty();
      expect(result).toBe(null);
    });

    it("should return the files array with an object containing type as external", () => {
      const mockMetadata: GetPageResponse = {
        object: "page",
        id: "6e6921b9-b1f5-4614-ab3c-bf1a73358a1f",
        created_time: "2023-04-11T10:17:00.000Z",
        last_edited_time: "2023-04-13T20:24:00.000Z",
        created_by: {
          object: "user",
          id: "USERID",
        },
        last_edited_by: {
          object: "user",
          id: "USERID",
        },
        cover: null,
        icon: {
          type: "file",
          file: {
            url: "https:/dummy_URL",
            expiry_time: "2023-04-15T11:50:20.461Z",
          },
        },
        parent: {
          type: "workspace",
          workspace: true,
        },
        archived: false,
        properties: {
          title: {
            id: "title",
            type: "title",
            title: [
              {
                type: "text",
                text: {
                  content: "Foo",
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: "Foo",
                href: null,
              },
              {
                type: "text",
                text: {
                  content: "Bar",
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: "Bar",
                href: null,
              },
            ],
          },
          date_property: {
            id: "a%3Cql",
            type: "date",
            date: {
              start: "2021-10-24",
              end: "2021-10-28",
              time_zone: null,
            },
          },
          image: {
            files: [{ external: { url: "" }, type: "external", name: "image" }],
            type: "files",
            id: "a%3Cql",
          },
        },
        url: "https://www.notion.so/Site-docu-notion-PAGEID",
      };
      const page = new NotionPage({
        layoutContext: "Test Context",
        pageId: "123",
        order: 1,
        metadata: mockMetadata,
        foundDirectlyInOutline: true,
      });
      const result = page.getImageProperty();
      expect(result).toEqual(
        expect.arrayContaining([expect.objectContaining({ type: "external" })])
      );
    });
  });

  describe("getDateProperty", () => {
    it("should return the start date property by default", () => {
      const page = new NotionPage({
        layoutContext: "Test Context",
        pageId: "123",
        order: 1,
        metadata: mockMetadata,
        foundDirectlyInOutline: true,
      });

      const result = page.getDateProperty("date_property", "");

      expect(result).toBe("2021-10-24");
    });

    it("should return the end date if start is false", () => {
      const page = new NotionPage({
        layoutContext: "Test Context",
        pageId: "123",
        order: 1,
        metadata: mockMetadata,
        foundDirectlyInOutline: true,
      });

      const result = page.getDateProperty("date_property", "", false);

      expect(result).toBe("2021-10-28");
    });

    it("should return the default value if the property is not found", () => {
      const page = new NotionPage({
        layoutContext: "Test Context",
        pageId: "123",
        order: 1,
        metadata: mockMetadata,
        foundDirectlyInOutline: true,
      });

      const result = page.getPlainTextProperty("nonexistent", "Default Value");

      expect(result).toBe("Default Value");
    });
  });
});
