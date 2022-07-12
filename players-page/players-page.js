import { getUser, signOut } from '../services/auth-service.js';
import { protectPage, findById } from '../utils.js';
import { addPlayer, getPlayers, getTeams, removePlayer } from '../services/team-service.js';
import createUser from '../components/User.js';
import createPlayers from '../components/Players.js';
import createAddPlayer from '../components/AddPlayer.js';


let user = null;
let teams = [];
let players = [];


async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    players = await getPlayers();
    teams = await getTeams();

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAddPlayer(playerName, teamId) {
    const player = await addPlayer(playerName, teamId);
    
    const team = findById(teams, player, teamId);

    player.teamId = team;
    players.unshift(player);

    display();
}

async function handleRemovePlayer(player) {
    const message = `Whoa! You really want to fire hardworking ${player.name}?`;
    if (!confirm(message)) return;

    await removePlayer(player.id);

    const index = players.indexOf(player);

    if (index !== -1) {
        players.splice(index, 1);
    }

    display();
}

const User = createUser(document.querySelector('#user'),
    { handleSignOut }
);

const Players = createPlayers(document.querySelector('#players'), 
    { handleRemovePlayer }
);

const AddPlayer = createAddPlayer(document.querySelector('#add-player'), 
    { handleAddPlayer }
);


function display() {
    User({ user });
    Players({ players });
    AddPlayer({ teams });
}


handlePageLoad();