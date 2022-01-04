import {
    genVariable,
    genList,
    genVarInit,
    genListInit,
} from './vars';
import {
    genIdentifier,
    genClassName,
    genSoundName,
} from './gen';

export function genDeclCode(project, sprite, readOnly=true) {
    let decl = "";

    let spritesDef = [];

    if (sprite.isStage) {
        const sprites = project.pureSprites;

        spritesDef = sprites.map(sprite => {
            const spriteName = genIdentifier(sprite.name);
            const spriteClassName = genClassName(sprite.name);
            return `\ts${spriteName} ${spriteClassName}`;
        });
        const soundsDef = project.sounds.map(sound => {
          const soundName = genSoundName(sound.name, sprite.name);
          return `\t${soundName} Sound`
        }).flat();

        if (spritesDef.length > 0) {
            decl += `${spritesDef.join("\n")}\n`;
        }
        if (soundsDef.length > 0) {
            decl += `\n${soundsDef.join("\n")}\n`;
        }
    }

    const vars = sprite.variables.map(v => {
        return genVariable(project, v.name, v.value, v.type);
    });
    if (vars.length > 0) {
        decl += `\n${vars.join("\n")}\n`;
    }

    const lists = sprite.lists.map(list => {
        return genList(project, list.name, list.value);
    });
    if (lists.length > 0) {
        decl += `\n${lists.join("\n")}\n`;
    }

    const varInits = sprite.variables.filter(variable => !variable.isDefault).map(variable => {
        return genVarInit(project, variable.name, variable.value);
    });
    const listInits = sprite.lists.filter(list => list.value !== "").map(list => {
        return genListInit(project, list.name, list.value);
    });
    let initializers = [...varInits, ...listInits];
    if (initializers.length > 0) {
        initializers = `\nfunc OnLoaded() {\n${initializers.join("\n")}\n}\n`;
    }

    if (decl.length > 0) {
        decl = `var(\n${decl}\n)\n\n`;
    }
    if (initializers.length > 0) {
        decl += initializers
    }

    if (decl.length > 0) {
        if (readOnly) {
            decl =
`// Don't edit this block, it's generated automatically.
${decl}
// End block.
`;
        }
    }

    return decl;
}
