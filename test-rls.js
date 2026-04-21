import { supabase } from "./client.js";
import { signIn, signOut } from "./auth.js";

const { data: noAuth } = await supabase.from("tasks").select("*");
console.log("Sans auth:", noAuth?.length, "(attendu: 0)");

await signIn("jojo@gmail.com", "2az!M-T4");
const { data: tasks } = await supabase.from("tasks").select("*");
console.log("Tasks Alice:", tasks?.length);

const { data: bobTask } = await supabase
  .from("tasks")
  .select("id")
  .eq("assigned_to", "740bc06a-5984-4325-acd8-ea0c340a294c")
  .single();

const { error } = await supabase
  .from("tasks")
  .update({ title: "Hacked" })
  .eq("id", bobTask?.id);

console.log("Modif refusée:", error?.message ?? "⚠ ERREUR : accès accordé !");

await signOut();
