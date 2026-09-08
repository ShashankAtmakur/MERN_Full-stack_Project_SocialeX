import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import AuthenticationContextProvider from './context/AuthenticationContextProvider';
import { GeneralContextProvider } from './context/GeneralContextProvider';

test('renders the landing page', () => {
  render(
    <MemoryRouter initialEntries={['/landing']}>
      <AuthenticationContextProvider>
        <GeneralContextProvider>
          <App />
        </GeneralContextProvider>
      </AuthenticationContextProvider>
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'SocialeX' })).toBeInTheDocument();
});
