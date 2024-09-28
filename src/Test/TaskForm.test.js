import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm';

describe('TaskForm Component', () => {
    it('should render the form', () => {
        const { getByLabelText, getByText } = render(<TaskForm onSubmit={jest.fn()} />);

        expect(getByLabelText(/task name/i)).toBeInTheDocument();
        expect(getByText(/submit/i)).toBeInTheDocument();
    });

    it('should call onSubmit with the task name when submitted', () => {
        const onSubmit = jest.fn();
        const { getByLabelText, getByText } = render(<TaskForm onSubmit={onSubmit} />);

        fireEvent.change(getByLabelText(/task name/i), { target: { value: 'New Task' } });
        fireEvent.click(getByText(/submit/i));

        expect(onSubmit).toHaveBeenCalledWith({ id: expect.any(Number), name: 'New Task' });
    });

    it('should clear the input after submitting', () => {
        const { getByLabelText, getByText } = render(<TaskForm onSubmit={jest.fn()} />);

        fireEvent.change(getByLabelText(/task name/i), { target: { value: 'New Task' } });
        fireEvent.click(getByText(/submit/i));

        expect(getByLabelText(/task name/i).value).toBe('');
    });

    it('should render with current task for editing', () => {
        const currentTask = { id: 1, name: 'Edit Task' };
        const { getByLabelText } = render(<TaskForm onSubmit={jest.fn()} currentTask={currentTask} />);

        expect(getByLabelText(/task name/i).value).toBe('Edit Task');
    });
});
