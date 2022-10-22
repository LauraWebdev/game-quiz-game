import portal1 from "@/db/portal1";
import portal2 from "@/db/portal2";
import minecraft from "@/db/minecraft";
import masseffect from "@/db/masseffect";
import ttdot from "@/db/ttdot";
import returntomonkeyisland from "@/db/returntomonkeyisland";


let allGames = [
    portal1,
    portal2,
    minecraft,
    masseffect,
    ttdot,
    returntomonkeyisland
];

function getRandomGame() {
    return allGames[Math.floor(Math.random()*allGames.length)];
}

export default {
    allGames,
    getRandomGame
}