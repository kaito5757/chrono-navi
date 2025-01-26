"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase-auth/server";
import { cookies } from "next/headers";

export async function logout() {
  const supabase = await createClient(await cookies());

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
