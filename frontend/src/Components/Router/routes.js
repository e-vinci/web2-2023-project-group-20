import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import LeaderboardPage from '../Pages/LeaderboardPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import LogoutPage from '../Pages/LogoutPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/leaderboard': LeaderboardPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout' : LogoutPage
};

export default routes;
