import { supabase } from "./client.js";
import { signIn, signOut } from "./auth.js";

const { data: noAuth } = await supabase.from("tasks").select("*");
console.log("Sans auth:", noAuth?.length, "(attendu: 0)");

const { data: withAuth } = await signIn("sarah@gmail.com", "T@st2025");
console.log("Avec auth:", withAuth?.length);

const { data: bobTask } = await supabase.from("tasks").select("*");
console.log("Tâches de Bob:", bobTask?.length);

const { error } = await supabase
  .from("tasks")
  .update({ title: "Hacked" })
  .eq("id", bobTask?.id);

await signOut();
