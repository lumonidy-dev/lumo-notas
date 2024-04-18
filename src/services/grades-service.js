import { db } from "../firebaseConfig.js";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Función para obtener todas las notas de un estudiante específico
export async function getStudentGrades(studentId) {
    try {
        // Definir la referencia a la subcolección 'grades' dentro del estudiante
        const gradesRef = collection(doc(db, "users", studentId), "grades");

        // Obtener los documentos de la subcolección 'grades'
        const snapshot = await getDocs(gradesRef);

        // Mapear los documentos para obtener las notas (excluyendo 'placeholder')
        const grades = snapshot.docs
            .filter(doc => doc.id !== "placeholder") // Filtrar 'placeholder' si existe
            .map(doc => ({ id: doc.id, ...doc.data() }));

        return grades;
    } catch (error) {
        console.error(`Error al obtener las notas del estudiante con ID: ${studentId}:`, error);
        return [];
    }
}

// Función para crear una nueva nota para un estudiante específico
export async function createGrade(studentId, gradeData) {
    try {
        // Definir la referencia a la subcolección 'grades' dentro del estudiante
        const gradesRef = collection(doc(db, "users", studentId), "grades");

        // Crear un nuevo documento con los datos de la nota
        const newGradeDoc = doc(gradesRef);
        await setDoc(newGradeDoc, gradeData);

        return true;
    } catch (error) {
        console.error(`Error al crear la nota para el estudiante con ID: ${studentId}:`, error);
        return false;
    }
}

// Función para actualizar una nota existente para un estudiante específico
export async function updateGrade(studentId, gradeId, updatedData) {
    try {
        // Definir la referencia a la subcolección 'grades' dentro del estudiante
        const gradeDocRef = doc(collection(doc(db, "users", studentId), "grades"), gradeId);

        // Actualizar el documento de la nota con los nuevos datos
        await updateDoc(gradeDocRef, updatedData);

        return true;
    } catch (error) {
        console.error(`Error al actualizar la nota con ID: ${gradeId} para el estudiante con ID: ${studentId}:`, error);
        return false;
    }
}

// Función para eliminar una nota existente para un estudiante específico
export async function deleteGrade(studentId, gradeId) {
    try {
        // Definir la referencia a la subcolección 'grades' dentro del estudiante
        const gradeDocRef = doc(collection(doc(db, "users", studentId), "grades"), gradeId);

        // Eliminar el documento de la nota
        await deleteDoc(gradeDocRef);

        return true;
    } catch (error) {
        console.error(`Error al eliminar la nota con ID: ${gradeId} para el estudiante con ID: ${studentId}:`, error);
        return false;
    }
}
