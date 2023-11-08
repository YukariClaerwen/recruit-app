'use server';
import { revalidatePath } from "next/cache";

export async function revalidate() {
      revalidatePath('/');
      revalidatePath('/jobs');
      revalidatePath('/admin/jobs');
}