const keys = [
    'C',
    'C♯/D♭',
    'D',
    'D♯/E♭',
    'E',
    'F',
    'F♯/G♭',
    'G',
    'G♯/A♭',
    'A',
    'A♯/B♭',
    'B'
]

export const getKeySignature = (key: number) => {
    if (key === -1) {
        return 'Unknown';
    } else {
        return keys[key];
    }
}

export const getModality = (mode: 1 | 0) => {
    if (mode) {
        return 'Major';
    } else {
        return 'Minor';
    }
}

export const getTempo = (tempo: number) => {
    return tempo.toFixed(0).toString();
}

export const getTimeSignature = (timeSig: number) => {
    return `${timeSig.toString()}/4`;
}

export const getDurationString = (durationMs: number) => {
    
    const secs = Math.floor((durationMs / 1000) % 60);
    const mins = Math.floor((durationMs / (1000 * 60)) % 60);
    const hrs = Math.floor((durationMs / (1000 * 60 * 60) % 60));

    return `${hrs ? `${hrs}:` : ''}${mins ? `${mins}:` : ''}${secs < 10 ? `0${secs}` : secs}`;
}

