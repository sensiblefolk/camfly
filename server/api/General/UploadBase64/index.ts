import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const STORAGE_CONNECTION_STRING = process.env.camfly_storage;
const blobServiceClient = BlobServiceClient.fromConnectionString(
  STORAGE_CONNECTION_STRING
);

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("upload base64 function http trigger.");
  const body = req.body;
  const base64String = body.base64ImageString;

  const imageUrl = await uploadData(base64String, context);

  if (imageUrl) {
    context.res = {
      status: 200,
      body: {
        imageUrl,
        status: "done",
      },
    };
  } else {
    context.res = {
      status: 500,
      body: {
        status: "failed",
      },
    };
  }
};

const uploadData = async (imageData: string, context: Context) => {
  const containerName = process.env.CONTAINER;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  context.log("containerName", containerClient.containerName);

  // Create a blockBlobClient
  const blobName =
    "camfly" +
    new Date().getTime() +
    Math.floor(Math.random() * (1000 - 1) * 1) +
    "s.txt";
  let blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const uploadResponse = await blockBlobClient.upload(
      imageData,
      imageData.length
    );
    // context.log(`Uploaded block blob ${blobName} successfully,`);
    context.log(
      `requestId - ${uploadResponse.requestId}, statusCode - ${uploadResponse._response.status}\n`
    );
    context.log("blob properties", blockBlobClient.url);
    return blockBlobClient.url;
  } catch (error) {
    context.log.error("upload failed", error);
    return null;
  }
};

export default httpTrigger;
