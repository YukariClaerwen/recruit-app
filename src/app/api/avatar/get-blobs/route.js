import { list } from '@vercel/blob';
 
export const runtime = 'edge';
 
export async function GET(request) {
  const { blobs } = await list();
//   console.log(blobs)
  return Response.json(blobs);
}