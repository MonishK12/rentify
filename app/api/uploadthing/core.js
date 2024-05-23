import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req) => ({ id: "user1" });

export const ourFileRouter = {
  multiFileUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 10 } })
    .middleware(({ req }) => {
      const user = auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(({ metadata, file }) => {
      // console.log("Upload complete for userId:", metadata.userId);
      // console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
};


