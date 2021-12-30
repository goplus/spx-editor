export function genClassName(name) {
    const newName = genIdentifier(name);
    return newName[0].toUpperCase() + newName.slice(1);
}

export function genIdentifier(name) {
    return name.replace(/[ -/\\;]/g, '');
}

export function genSoundName(name) {
    return genIdentifier(name);
}
