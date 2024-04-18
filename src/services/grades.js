import { db } from "../firebaseConfig";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

const gradesCollection = collection(db, "grades");

// Función para obtener todas las notas
export async function getAllGrades() {
    try {
        const snapshot = await getDocs(gradesCollection);
        const grades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return grades;
    } catch (error) {
        console.error("Error al obtener todas las notas:", error);
        return [];
    }
}

// Función para obtener las notas de un estudiante específico
export async function getStudentGrades(studentId) {
    try {
        const snapshot = await getDocs(collection(gradesCollection, studentId));
        const grades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return grades;
    } catch (error) {
        console.error("Error al obtener las notas del estudiante:", error);
        return [];
    }
}

// Función para crear una nueva nota
export async function createGrade(studentId, gradeData) {
    try {
        await setDoc(doc(gradesCollection, studentId), gradeData);
        return true;
    } catch (error) {
        console.error("Error al crear la nota:", error);
        return false;
    }
}

// Función para actualizar una nota existente
export async function updateGrade(studentId, gradeId, updatedData) {
    try {
        await updateDoc(doc(collection(gradesCollection, studentId), gradeId), updatedData);
        return true;
    } catch (error) {
        console.error("Error al actualizar la nota:", error);
        return false;
    }
}

// Función para eliminar una nota
export async function deleteGrade(studentId, gradeId) {
    try {
        await deleteDoc(doc(collection(gradesCollection, studentId), gradeId));
        return true;
    } catch (error) {
        console.error("Error al eliminar la nota:", error);
        return false;
    }
}
