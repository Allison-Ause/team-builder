import { getUser, signOut } from './services/auth-service.js';
import { getTeamsWithPlayers } from './services/team-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createTeams from './components/Teams.js';

// State
let user = null;
let teams = [];
// let players = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    teams = await getTeamsWithPlayers();
    console.log(teams);
    display();
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Teams = createTeams(document.querySelector('#teams-list'));

function display() {
    User({ user });
    Teams({ teams });

}

handlePageLoad();
