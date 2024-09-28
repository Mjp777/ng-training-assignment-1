import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskList from '../TaskList';

describe('TaskList Component', () => {
    const tasks = [
        { id: 1, name: 'Task 1' },
        { id: 2, name: 'Task 2' },
    ];

    it('should render a list of tasks', () => {
        const { getByText } = render(<TaskList tasks={tasks} onEdit={jest.fn()} onDelete={jest.fn()} />);

        tasks.forEach(task => {
            expect(getByText(task.name)).toBeInTheDocument();
        });
    });

    it('should call onEdit when Edit button is clicked', () => {
        const onEdit = jest.fn();
        const { getByText } = render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={jest.fn()} />);

        fireEvent.click(getByText(/edit/i));
        expect(onEdit).toHaveBeenCalledWith(tasks[0]);
    });

    it('should call onDelete when Delete button is clicked', () => {
        const onDelete = jest.fn();
        const { getByText } = render(<TaskList tasks={tasks} onEdit={jest.fn()} onDelete={onDelete} />);

        fireEvent.click(getByText(/delete/i));
        expect(onDelete).toHaveBeenCalledWith(tasks[0].id);
    });
});
