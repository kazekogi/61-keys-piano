const pianoKeys = document.querySelectorAll('.piano-keys .key');
const activeKeys = {};
const heldKeys = {};

const playTune = (key) => {
    if (!activeKeys[key]) {
        const audio = new Audio(`grand/${key}.mp3`);
        // audio sampled from virtualpiano.net
        audio.play();
        activeKeys[key] = audio;

        audio.addEventListener('ended', () => {
            delete activeKeys[key];
        });
    }
};

const keyClick = (key) => {
    playTune(key);
    const pressedElement = document.querySelector(`[data-key="${key}"]`);
    if (pressedElement) {
        pressedElement.classList.add('active');
    }
};

const keyRelease = (key) => {
    const pressedElement = document.querySelector(`[data-key="${key}"]`);
    if (pressedElement) {
        pressedElement.classList.remove('active');
    }
    delete activeKeys[key];
    delete heldKeys[key];
};

const pressedKey = (e) => {
    let key = e.key;

    if (e.shiftKey) {
        key = key.toUpperCase();
    } // Check for shift modifier

    // Check if the key is already held down
    if (!heldKeys[key]) {
        playTune(key);
        heldKeys[key] = true;
        const pressedElement = document.querySelector(`[data-key="${key}"]`);
        if (pressedElement) {
            pressedElement.classList.add('active');
        }
    }
};

const releaseKey = (e) => {
    let key = e.key;

    if (e.shiftKey) {
        key = key.toUpperCase();
    }

    keyRelease(key);
};

pianoKeys.forEach((key) => {
    const dataKey = key.getAttribute('data-key');
    key.addEventListener('mousedown', () => keyClick(dataKey));
});

document.addEventListener('mouseup', (e) => {
    pianoKeys.forEach((key) => {
        const dataKey = key.getAttribute('data-key');
        keyRelease(dataKey);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return; // Ignore repeated keydown events
    pressedKey(e);
});

document.addEventListener('keyup', releaseKey);
