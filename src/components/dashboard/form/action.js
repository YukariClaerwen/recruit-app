"use server";
import { getLocation } from "@/app/api/dashboard/form";

export const getData = async () => {
    const data = await getLocation()
    return data;
}