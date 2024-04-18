// eventHandlers.js
import { getStudentGrades, createGrade, updateGrade, deleteGrade } from '../../services/grades-service';

export async function handleAddGrade(event, studentId, addGradeCallback) {
    event.preventDefault();
    const form = event.target;
    const title = form.elements['title'].value;
    const score = parseFloat(form.elements['score'].value);

    await addGradeCallback({ title, score });

    // Limpiar el formulario
    form.reset();
}

// Función para editar una nota existente
export async function handleEditGrade(gradeId, updatedData, studentId, editGradeCallback) {
    try {
        const success = await editGradeCallback(studentId, gradeId, updatedData);
        return success;
    } catch (error) {
        console.error('Error editing grade:', error);
        throw error;
    }
}

// Función para eliminar una nota existente
export async function handleRemoveGrade(gradeId, studentId, removeGradeCallback) {
    try {
        const success = await removeGradeCallback(studentId, gradeId);
        return success;
    } catch (error) {
        console.error('Error removing grade:', error);
        throw error;
    }
}
