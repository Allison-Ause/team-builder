import { getUser, signOut } from '../services/auth-service.js';
import { protectPage, findById } from '../utils.js';
import { getPlayers, removePlayer } from '../services/team-service.js';
import createUser from '../components/User.js';
import createPlayers from '../components/Players.js';


let user = null;
let teams = [];
let players = [];


async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    players = await getPlayers();

    display();
}

async function handleSignOut() {
    signOut();
}

// async function handleAddPlayer() {

// }

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

const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Players = createPlayers(document.querySelector('#players'), 
    { handleRemovePlayer }
);

function display() {
    User({ user });
    Players({ players });
}


handlePageLoad();