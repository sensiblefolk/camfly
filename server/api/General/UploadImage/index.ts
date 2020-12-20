import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';
import { AbortController } from '@azure/abort-controller';
import { Buffer } from 'buffer';
import * as intoStream from 'into-stream';

const STORAGE_CONNECTION_STRING = process.env.camfly_storage;
const blobServiceClient = BlobServiceClient.fromConnectionString(
  STORAGE_CONNECTION_STRING
);

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('Upload Image function http trigger');

  const body = req.body;
  const mimeType = body.fileType;
  const image = body.base64ImageString;

  //trim off the part of the payload that is not part of the base64 string
  const base64EncodedImageString = image.replace(
    /^data:image\/\w+;base64,/,
    ''
  );

  const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');

  const imageUrl = await uploadImage(imageBuffer, context, mimeType);

  if (imageUrl) {
    context.res = {
      status: 200,
      body: {
        imageUrl,
        status: 'done',
      },
    };
  } else {
    context.res = {
      status: 500,
      body: {
        status: 'failed',
      },
    };
  }
};

const uploadImage = async (buffer: any, context: Context, mimeType: string) => {
  const containerName = process.env.CONTAINER;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  context.log('containerName', containerClient.containerName);

  // Create a blockBlobClient
  const blobName =
    'camfly' +
    new Date().getTime() +
    Math.floor(Math.random() * (1000 - 1) * 1) +
    's.png';
  let blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const ONE_MEGABYTE = 1024 * 1024;

  const stream = intoStream(buffer);
  //   Create a new block blob
  try {
    const uploadBlobResponse = await blockBlobClient.uploadStream(
      stream,
      6 * ONE_MEGABYTE,
      20,
      {
        abortSignal: AbortController?.timeout(30 * 60 * 1000), // Abort uploading with timeout in 30mins
        onProgress: (ev) => context.log(ev),
        blobHTTPHeaders: {
          blobContentType: mimeType,
          blobContentEncoding: 'md5',
        },
      }
    );
    // context.log(`Uploaded block blob ${blobName} successfully,`);
    context.log(
      `requestId - ${uploadBlobResponse.requestId}, statusCode - ${uploadBlobResponse._response.status}\n`
    );
    context.log('blob properties', blockBlobClient.url);
    return blockBlobClient.url;
  } catch (error) {
    context.log.error('upload failed', error);
    return null;
  }
};

export default httpTrigger;
