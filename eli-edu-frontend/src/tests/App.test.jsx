import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    });

    it('renders navigation links', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        // Check for main navigation links
        expect(screen.getByText(/Trang chủ/i)).toBeInTheDocument();
        expect(screen.getByText(/Khóa học/i)).toBeInTheDocument();
        expect(screen.getByText(/Liên hệ/i)).toBeInTheDocument();
    });
}); 