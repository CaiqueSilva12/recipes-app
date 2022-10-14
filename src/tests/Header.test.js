import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testing the Header component', () => {
  const SEARCH_INPUT = 'search-input';
  beforeEach(cleanup);
  it('test if clicking on the profile icon redirects to "/meals"', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/meals'],
    });
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  });

  it('test if clicking on the search icon once show the searchBar', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    await waitFor(async () => {
      const searchInput = await screen.findByTestId(SEARCH_INPUT);
      expect(searchInput).toBeInTheDocument();
    });
  });

  it('test if clicking on the search icon again hide the searchBar', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    await waitFor(() => {
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      expect(searchInput).toBeInTheDocument();
    });

    userEvent.click(searchBtn);

    await waitFor(() => {
      const searchInput = screen.queryByTestId(SEARCH_INPUT);
      expect(searchInput).toBe(null);
    });
  });
});
