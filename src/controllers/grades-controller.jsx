import { useState, useEffect } from 'react';
import { getStudentGrades, createGrade, updateGrade, deleteGrade } from '../services/grades-service';

export function useGradesController(studentId) {
    // Definir estados
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar las notas del estudiante
    useEffect(() => {
        const fetchGrades = async () => {
            setLoading(true);
            try {
                const grades = await getStudentGrades(studentId);
                setGrades(grades);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching grades:', error);
                setError('Error al obtener las notas');
                setLoading(false);
            }
        };

        fetchGrades();
    }, [studentId]);

    // Función para agregar una nueva nota
    const addGrade = async (gradeData) => {
        console.log("Intentando agregar", gradeData, studentId);
        try {
            setLoading(true);
            const success = await createGrade(studentId, gradeData);
            if (success) {
                const newGrades = await getStudentGrades(studentId);
                setGrades(newGrades);
            } else {
                throw new Error('Error al agregar la nota');
            }
        } catch (error) {
            console.error('Error adding grade:', error);
            setError('Error al agregar la nota');
        } finally {
            setLoading(false);
        }
    };

    // Función para actualizar una nota existente
    const editGrade = async (gradeId, updatedData) => {
        try {
            setLoading(true);
            const success = await updateGrade(studentId, gradeId, updatedData);
            if (success) {
                const newGrades = await getStudentGrades(studentId);
                setGrades(newGrades);
            } else {
                throw new Error('Error al actualizar la nota');
            }
        } catch (error) {
            console.error('Error editing grade:', error);
            setError('Error al actualizar la nota');
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar una nota existente
    const removeGrade = async (gradeId) => {
        try {
            setLoading(true);
            const success = await deleteGrade(studentId, gradeId);
            if (success) {
                const newGrades = await getStudentGrades(studentId);
                setGrades(newGrades);
            } else {
                throw new Error('Error al eliminar la nota');
            }
        } catch (error) {
            console.error('Error removing grade:', error);
            setError('Error al eliminar la nota');
        } finally {
            setLoading(false);
        }
    };

    // Retornar el estado y las funciones
    return {
        grades,
        loading,
        error,
        addGrade,
        editGrade,
        removeGrade,
    };
}

export default useGradesController;