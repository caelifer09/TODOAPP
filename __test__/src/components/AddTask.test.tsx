import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'
import AddTask from "@/components/AddTask";

describe('Addtask', () => {
    it('should render properly', () => {
        const handlerTask = jest.fn();
        render(<AddTask handlerTask={handlerTask} />)

        const inputP = screen.getByPlaceholderText('Create a new todo...')
        expect(inputP).toBeInTheDocument()

        const buttonP = screen.getByRole('button');
        expect(buttonP).toBeInTheDocument()
    });

    it('calls handlerTask with the entered username when the form is submitted', async () => {
        user.setup()
        const handlerTask = jest.fn();

        render(<AddTask handlerTask={handlerTask} />)

        const input = screen.getByPlaceholderText('Create a new todo...') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'test task' } });
        expect(input.value).toBe('test task');
        const buttonP = screen.getByRole('button');
        await user.click(buttonP)
        expect(handlerTask).toHaveBeenCalledTimes(1);
      });
});