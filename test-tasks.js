import dotenv from "dotenv";
import { signIn } from "./auth.js";
import {
  getProjectTasks,
  createTask,
  updateTaskStatus,
  assignTask,
  addComment,
} from "./tasks.js";

// Charger les variables d'environnement du fichier .env
dotenv.config();

async function testGetProjectTasks() {
  // Authentification avec Alice
  console.log("🔐 Connexion avec Alice...");
  try {
    await signIn("jojo@gmail.com", process.env.ALICE_PASSWORD);
    console.log("✅ Connecté avec Alice\n");
  } catch (error) {
    console.error("❌ Erreur d'authentification:", error.message);
    return;
  }

  const projectId = process.env.PROJECT_ID;

  // Test 1: Récupérer toutes les tâches d'un projet
  console.log("Test 1: Récupération de toutes les tâches...");
  try {
    const allTasks = await getProjectTasks(projectId);
    console.log("✅ Toutes les tâches:", allTasks.length, "tâches");
    console.log(allTasks);
  } catch (error) {
    console.error("❌ Erreur Test 1:", error.message);
  }

  // Test 2: Récupérer les tâches avec filtre de statut
  console.log("\nTest 2: Récupération avec filtre de statut...");
  try {
    const todoTasks = await getProjectTasks(projectId, {
      status: "todo",
    });
    console.log("✅ Tâches en todo:", todoTasks.length, "tâches");
    console.log(todoTasks);
  } catch (error) {
    console.error("❌ Erreur Test 2:", error.message);
  }

  // Test 3: Récupérer les tâches avec filtre de priorité
  console.log("\nTest 3: Récupération avec filtre de priorité...");
  try {
    const highPriorityTasks = await getProjectTasks(projectId, {
      priority: "high",
    });
    console.log(
      "✅ Tâches haute priorité:",
      highPriorityTasks.length,
      "tâches",
    );
    console.log(highPriorityTasks);
  } catch (error) {
    console.error("❌ Erreur Test 3:", error.message);
  }

  // Test 4: Récupérer les tâches avec plusieurs filtres
  console.log("\nTest 4: Récupération avec plusieurs filtres...");
  try {
    const filteredTasks = await getProjectTasks(projectId, {
      status: "in_progress",
      priority: "high",
    });
    console.log("✅ Tâches filtrées:", filteredTasks.length, "tâches");
    console.log(filteredTasks);
  } catch (error) {
    console.error("❌ Erreur Test 4:", error.message);
  }

  // Test 5: Créer une nouvelle tâche
  console.log("\nTest 5: Création d'une nouvelle tâche...");
  let newTaskId = null;
  try {
    const newTask = await createTask(projectId, {
      title: "Tâche de test",
      description: "Description de la tâche de test",
      priority: "high",
      dueDate: new Date().toISOString(),
    });
    newTaskId = newTask.id;
    console.log("✅ Tâche créée:", newTask);
  } catch (error) {
    console.error("❌ Erreur Test 5:", error.message);
  }

  // Test 6: Mettre à jour le statut d'une tâche
  if (newTaskId) {
    console.log("\nTest 6: Mise à jour du statut d'une tâche...");
    try {
      const updatedTask = await updateTaskStatus(newTaskId, "in_progress");
      console.log("✅ Statut mis à jour:", updatedTask);
    } catch (error) {
      console.error("❌ Erreur Test 6:", error.message);
    }
  }

  // Test 7: Assigner une tâche
  if (newTaskId) {
    console.log("\nTest 7: Assignation d'une tâche...");
    try {
      const assignedTask = await assignTask(newTaskId, null); // Null pour retirer l'assignation
      console.log("✅ Tâche assignée:", assignedTask);
    } catch (error) {
      console.error("❌ Erreur Test 7:", error.message);
    }
  }

  // Test 8: Ajouter un commentaire
  if (newTaskId) {
    console.log("\nTest 8: Ajout d'un commentaire...");
    try {
      const comment = await addComment(
        newTaskId,
        "Ceci est un commentaire de test",
      );
      console.log("✅ Commentaire ajouté:", comment);
    } catch (error) {
      console.error("❌ Erreur Test 8:", error.message);
    }
  }

  console.log("\n✅ Tous les tests sont terminés!");
}

// Lancer le test
testGetProjectTasks();
