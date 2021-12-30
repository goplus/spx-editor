import {
    genIdentifier
} from './gen';

function genType(project, id, type) {
    const typesMap = {
        int: 'int',
        string: 'string',
        float: 'float64'
    }
    return typesMap[type] || 'int';
}

export function genVariable(project, name, value, type) {
    const varType = genType(project, type);
    return `\t${genIdentifier(name)} ${varType}`;
}

export function genList(project, name, value) {
    // const list = JSON.stringify(value);
    // return `\t${genIdentifier(name)} = ${list}`;
    return `\t${genIdentifier(name)} List`;
}

export function genVarInit(project, name, value) {
    return `\t${genIdentifier(name)} = ${value}`;
}

export function genListInit(project, name, value) {
    const values = value.map(v => JSON.stringify(v)).join(', ');
    return `\t${genIdentifier(name)}.init(${values})`;
}
