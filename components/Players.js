
export default function createPlayers(tbody, 
    { handleRemovePlayer }) {

    return ({ players }) => {
        tbody.innerHTML = '';

        for (const player of players) {
            const item = Player({ player, handleRemovePlayer });
            tbody.append(item);
        }
    };
}

function Player({ player, handleRemovePlayer }) {
    const tr = document.createElement('tr');
    tr.classList.add('player');

    const name = document.createElement('td');
    const h2 = document.createElement('h2');
    h2.textContent = player.name;
    name.append(h2);

    const team = document.createElement('td');
    team.textContent = player.team.name;

    const button = document.createElement('button');
    button.classList.add('delete');
    button.textContent = 'x';

    button.addEventListener('click', () => {
        handleRemovePlayer(player);
    });

    tr.append(name, team, button);

    return tr;

}

// create for/of loop to display them

// add delete button to Players li creation

// address form as part of append for new player data.