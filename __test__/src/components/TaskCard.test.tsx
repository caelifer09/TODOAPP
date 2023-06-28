import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'
import { Task } from "@/types/Task";
import TaskCard from "@/components/TaskCard";

describe('TaskCard', () => {
    const task: Task = {
        id: 'testid',
        name: 'test task',
        complete: false,
        remove: false
    }
    it('Everything is in the document', () => {
        const handlerEdit = jest.fn()
        const handlerRemove = jest.fn()

        render(<TaskCard task={task} handlerEdit={handlerEdit} handlerRemove={handlerRemove} />)

        const inputCheck = screen.getByRole('checkbox');
        expect(inputCheck).toBeInTheDocument();
        const inputText = screen.getByRole('textbox');
        expect(inputText).toBeInTheDocument();
        const buttonP = screen.getByRole('button');
        expect(buttonP).toBeInTheDocument();
    });

    it('Button event handler', async () => {
        const handlerEdit = jest.fn()
        const handlerRemove = jest.fn()

        render(<TaskCard task={task} handlerEdit={handlerEdit} handlerRemove={handlerRemove} />)

        const buttonP = screen.getByRole('button');

        await user.click(buttonP)
        expect(handlerRemove).toHaveBeenCalledTimes(1);
    });

    it('input checkbox event handler', async () => {
        const handlerEdit = jest.fn()
        const handlerRemove = jest.fn()

        render(<TaskCard task={task} handlerEdit={handlerEdit} handlerRemove={handlerRemove} />)

        const inputCheck = screen.getByRole('checkbox');

        await user.click(inputCheck)
        expect(handlerEdit).toHaveBeenCalledTimes(1);
    });


});