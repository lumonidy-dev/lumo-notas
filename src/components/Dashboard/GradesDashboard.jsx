import React from 'react';
import { Form } from 'react-router-dom';

function GradesDashboard({ grades }) {
    return (
        <div>
            <h2>Notas del usuario</h2>
            <ul>
                {grades.map((grade) => (
                    <li key={grade.id}>
                        {/* Mostrar detalles de la nota */}
                        <p>{grade.title}</p>
                        <p>{grade.score}</p>
                    </li>
                ))}
            </ul>
            <Form action="add">
                <input type="text" name="title" placeholder="Título" />
                <input type="number" name="score" placeholder="Puntuación" />
                <button type="submit">Agregar nota</button>
            </Form>
        </div>
    );
}

export default GradesDashboard;
