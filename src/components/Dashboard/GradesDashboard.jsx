import React from 'react';
import { Form } from 'react-router-dom';
import useGradesController from '../../controllers/grades-controller';
import './GradesDashboard.css';

function GradeCard({ grade, onDelete }) {
    function getGradeClass(score) {
        if (score >= 1 && score < 4) {
            return 'text-danger';
        } else if (score >= 4 && score < 5) {
            return 'text-warning';
        } else if (score >= 5 && score <= 7) {
            return 'text-success';
        } else {
            return '';
        }
    }
    return (
        <div className="border border-radius-md d-flex flex-col align-items-center justify-content-center gap-sm parent">
            <div className="d-flex px-lg bg-primary w-100" >
                <span className="w-100 text-center text-md bg-warning w-100">
                    {grade.title}
                </span>
                <span className="bg-success d-flex flex-col align-items-center justify-content-center">
                    <button className="close-button " onClick={onDelete}></button>
                </span>

            </div>
            <span className={`${getGradeClass(grade.score)} text-bold text-lg`}>{grade.score}</span>
        </div>
    );
}


function GradesList({ grades, onDelete }) {
    return (
        <div className="grades-list d-flex flex-row gap-sm ">
            {grades.map(grade => (
                <GradeCard
                    key={grade.id}
                    grade={grade}
                    onDelete={() => onDelete(grade.id)}
                />
            ))}
        </div>
    );
}

function GradesForm({ onSubmit }) {
    return (
        <form className="grades-form d-flex flex-col max-width-xs gap-sm mt-lg borderBox border-radius-md" onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target;
            const title = form.elements['title'].value;
            const score = form.elements['score'].value;

            const updatedData = { title, score };
            await onSubmit(updatedData);

            // Limpiar el formulario
            form.reset();
        }}>
            <input className="grades-form__input" type="text" name="title" placeholder="Título" required />
            <input className="grades-form__input" type="number" name="score" placeholder="Puntuación" required />
            <div className="d-flex flex-row justify-content-center align-items-center gap-sm">
                <button className="" type="submit"> Agregar
                </button>
            </div>
        </form>
    );
}

function GradesDashboard({ studentId }) {
    // Usar el controller para obtener datos y funciones
    const {
        grades,
        loading,
        error,
        addGrade,
        editGrade,
        removeGrade,
    } = useGradesController(studentId);

    // Manejar la lógica de renderizado dependiendo de los estados
    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Notas del usuario</h2>

            {/* Listado de notas */}
            <GradesList
                grades={grades}
                onDelete={removeGrade}
            />

            {/* Formulario para agregar nota */}
            <GradesForm
                onSubmit={addGrade}
            />

        </div>
    );
}

export default GradesDashboard;
