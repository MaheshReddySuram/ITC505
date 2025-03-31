const story = {
    start: {
        text: "Vinay, Geetika, Saketh, and Mahesh found an ancient treasure map! They enter the Mystic Forest and reach a fork in the road.",
        choices: [
            { text: "Take the left path to an abandoned cabin", next: "cabin" },
            { text: "Take the right path to a river", next: "river" }
        ],
        image: "https://img.freepik.com/premium-photo/group-teenagers-night-forest_763713-1961.jpg?"
    },
    cabin: {
        text: "Inside the cabin, they find an old diary. It says: 'Where the water sings, the next clue rings.'",
        choices: [
            { text: "Follow the sound of water", next: "waterfall" },
            { text: "Search the cabin more", next: "trap" }
        ],
        image: "https://tse3.mm.bing.net/th?id=OIP.ciHs_jd-CTAEOx0J7evgOwHaEb"
    },
    river: {
        text: "They reach a river, but the bridge is broken. They find an old wooden raft.",
        choices: [
            { text: "Try to fix the raft", next: "waterfall" },
            { text: "Look for another way", next: "lost" }
        ],
        image: "https://media.istockphoto.com/photos/old-broken-bridge-across-the-river-in-the-forest-picture-id495813405?k=6&m=495813405&s=612x612&w=0&h=8DWoZPjcz6NPipqYVPwxri2XfBg8AkjdzkGHlADgdIw="
    },
    waterfall: {
        text: "Behind the waterfall, they find a cave with a locked treasure chest! A riddle is written: 'Four are we, yet one must stay. Choose wisely, or go astray.'",
        choices: [
            { text: "One friend stays behind while the rest enter", next: "chest" },
            { text: "All enter together", next: "trap" }
        ],
        image: "https://thumbs.dreamstime.com/b/cave-entrance-hidden-behind-waterfall-cave-entrance-hidden-behind-waterfall-created-generative-ai-297180235.jpg"
    },
    trap: {
        text: "Oh no! A hidden trap was triggered, and they barely escaped. The treasure remains hidden forever.",
        choices: [{ text: "Restart the adventure", next: "start" }],
        image: "https://i.pinimg.com/originals/b2/6f/57/b26f57d00fa389176a4ae9bfa99da7f4.png"
    },
    lost: {
        text: "They wander in the forest for hours and get lost. The treasure is never found.",
        choices: [{ text: "Restart the adventure", next: "start" }],
        image: "https://thumbs.dreamstime.com/b/man-walking-dark-path-strange-dark-forest-fog-31705858.jpg"
    },
    chest: {
        text: "They find a hidden key and unlock the chest, revealing a golden idol and ancient coins!",
        choices: [
            { text: "Run back before the cave collapses", next: "escape" },
            { text: "Look for another exit", next: "trap" }
        ],
        image: "https://as1.ftcdn.net/v2/jpg/05/55/44/06/1000_F_555440654_U2FXZZb6bcm2C5L0zN3jXHHUaKRqyVMs.jpg"
    },
    escape: {
        text: "They successfully escape the cave and become legendary explorers! The treasure is theirs!",
        choices: [{ text: "Play again", next: "start" }],
        image: "https://img.freepik.com/premium-photo/four-friends-exploring-cave_1275912-10963.jpg"
    }
};

function startGame() {
    updatePage("start");
}

function updatePage(scene) {
    document.getElementById("storyText").textContent = story[scene].text;
    document.getElementById("storyImage").src = story[scene].image;

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    story[scene].choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.classList.add("choice-button");
        button.onclick = () => updatePage(choice.next);
        choicesDiv.appendChild(button);
    });
}

function showAddendum() {
    document.getElementById("addendum").style.display = "flex";
}

function hideAddendum() {
    document.getElementById("addendum").style.display = "none";
}

// Initialize last modified date
document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleString();

window.onload = startGame;