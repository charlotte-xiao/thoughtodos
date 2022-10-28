import {render, screen} from '@testing-library/react';
import React from 'react';
import App from './App';

test('render Thoughtodos Title', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Thoughtodos!/i);
    expect(linkElement).toBeInTheDocument();
});
