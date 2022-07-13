// create form.get and data
import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import { addTeam } from '../services/team-service.js';
import createUser from '../components/User.js';
import createAddTeam from '../components/AddTeam.js';
import { uploadTeamEmblem } from '../services/image-service.js';

let user = null;
let teams = [];


async function handleAddTeam(teamName, imageURL) {
    const url = await uploadTeamEmblem(teamName, imageURL);
    const team = await addTeam(teamName, url);
    // team.players = [];
    if (team) {
        location.assign('../');
    }
}

async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    display();
}

async function handleSignOut() {
    signOut();
}


const User = createUser(document.querySelector('#user'),
    { handleSignOut }
);

const AddTeam = createAddTeam(document.querySelector('#add-team-form'), 
    { handleAddTeam }
);


function display() {
    User({ user });
    AddTeam();
}

handlePageLoad();