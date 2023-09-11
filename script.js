
console.log("I am from JS");
// Variables for the game
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monterHelath;
let inventory = ["stick"];

// Constant variables
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xptext = document.querySelector("#xptext");
const healthtext = document.querySelector("#healthtext");
const goldtext = document.querySelector("#goldtext");
const MonsterStats = document.querySelector("#MonsterSpan");
const monstername = document.querySelector("#monstername");
const monsterhealthtext = document.querySelector("#monsterhealth");

const monstars = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 2,
        health: 300
    }
]

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
]
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in a town square! You see a sign that says \" Stores \""
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon  (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goToTown],
        text: "You entered in the store!"
    },
    {
        name: "cave",
        "button text": ["Fight Slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightFangedBeast, goToTown],
        text: "You enter the cave. you see some monsters!"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goToTown],
        text: "You enter the cave. you see some monsters!"
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goToTown, goToTown, goToTown],
        text: 'The monster screams "Arg" as it dies. You gain experience points and fine gold'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'You Die :('
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'You defeat the dragon! You WIN the game.'
    }        
];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    console.log("Going to the town!")
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}


function goToTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldtext.innerText = gold;
        healthtext.innerText = health;
    }
    else {
        text.innerText = "You do not have enough gold to buy health!"
    }

}



function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldtext.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        }
        else {
            text.innerText = "You do not have enough gold to buy a weapon!";
        }
    }
    else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }

}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldtext.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText = "In your inventory you have: " + inventory;
    }
    else {
        text.innerText = "Don't sell your only weapon!";
    }
}



function fightSlime() {
    fighting = 0;
    goFight();
}

function fightFangedBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight()
}

function goFight() {
    update(locations[3]);
    monsterhealth = monstars[fighting].health;
    MonsterStats.style.display = "block";
    monstername.innerText = monstars[fighting].name;
    monsterhealthtext.innerText = monsterhealth;
}

function attack() {
    text.innerText = "The " + monstars[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monstars[fighting].level);
    monsterhealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp) + 1;
    healthtext.innerText = health;
    monsterhealthtext.innerText = monsterhealth;
    if (health <= 0) {
        lose();
    }
    else if (monsterhealth <=0){
        fighting === 2 ? winGame() : defeatMonster();
    }

}
function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}
function dodge() {
    text.innerText = "You doge the attack from the " + monstars[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monstars[fighting].level * 6.7)
    xp += monstars[fighting].level;
    goldtext.innerText = gold;
    xptext.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}


function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldtext.innerText = gold;
    healthtext.innerText = health;
    xptext.innertext = xp;
    goToTown();
}

function winGame() {
    update(locations[6]);
}