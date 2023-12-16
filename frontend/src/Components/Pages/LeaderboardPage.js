import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaderboardPage = () => {
  clearPage();
  renderLeaderboard();
};

async function renderLeaderboard() {
    const response = await fetch('/api/scores');
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
    }

    const responseBody = await response.text();

    const scores = JSON.parse(responseBody);
    const leaderboardTable = createLeaderboardTable(scores);
    const main = document.querySelector('main');
    main.innerHTML += leaderboardTable;

}

function createLeaderboardTable(scores) {
  const tableLines = scores.map((score) => createTableRow(score)).join('');

  return `
    <div class="table-responsive pt-5">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Wave</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          ${tableLines}
        </tbody>
      </table>
    </div>
  `;
}

function createTableRow(score) {
  return `
    <tr>
      <td>${score.username}</td>
      <td>${score.wave}</td>
      <td>${score.score}</td>
    </tr>
  `;
}

export default LeaderboardPage;
