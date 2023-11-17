'use server';
import { revalidatePath } from "next/cache";

export async function revalidate() {
      revalidatePath('/');
      revalidatePath('/jobs');
      revalidatePath('/jobs/[id]');
      revalidatePath('/admin/jobs');
}