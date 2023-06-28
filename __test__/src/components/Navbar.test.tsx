import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import Navbar from "@/components/Navbar";

describe('Navbar', () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }))
        });
      });
    it('should render properly', () => {
        render(<Navbar />)
        const Titulo = screen.getByRole('heading');
        expect(Titulo).toBeInTheDocument();
        const buttonP = screen.getByRole('button');
        expect(buttonP).toBeInTheDocument();
    });
});