import JSZip from "jszip";
import { genDeclCode } from "./decl";
import { genClassName, genSoundName } from "./gen";
import { convertDataUrlToBinaryString } from "../image";

const DUMMY_GO_FILE = `package dummy

import (
	_ "github.com/goplus/gop"
	_ "github.com/goplus/spx"
)

`;

const GOP_MOD_FILE = `module mygame

go 1.16

require (
	github.com/goplus/spx v1.0.0-rc3.3
)
`;

function generateGmxFile(project, stage) {
  const gmxDecl = genDeclCode(project, stage, false);
  const escapedTitle = project.name.replace(/"/, '\\"');
  const footer = `

run "assets", {
    Title: "${escapedTitle} (by Go+ spx engine)",
    Width: ${project.stageWidth},
    Height: ${project.stageHeight},
}
`;
  return gmxDecl + stage.code + footer;
}

function generateSpxFile(project, sprite) {
  return genDeclCode(project, sprite, false) + sprite.code;
}

function genBlankImageBytes(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  return canvas.getImageData(0, 0, width, height).data;
}

function saveSoundsToZip(project, zip) {
  const soundDir = "assets/sounds";
  project.sounds.forEach((sound) => {
    const soundName = genSoundName(sound.name);

    const soundFileName = `${soundName}.wav`;
    const soundFilePath = `${soundDir}/${soundName}/${soundFileName}`;
    zip.file(
      soundFilePath,
      Array.from(sound.soundData, (x) => x.charCodeAt(0))
    );

    const manifestFileName = `${soundDir}/${soundName}/index.json`;
    const manifest = {
      path: soundFileName,
      sampleCount: sound.sampleCount,
      rate: sound.rate,
    };
    zip.file(manifestFileName, JSON.stringify(manifest, null, 4));
  });
}

function saveCostumesToZip(sprite, zip) {
  const baseDir = "assets/sprites";
  const spriteClassName = genClassName(sprite.name);
  const spriteName = sprite.isStage ? "index" : `s${spriteClassName}`;
  const costumeDir = `${baseDir}/${spriteName}`;
  for (const costume of sprite.costumes) {
    const costumeFileName = `${costumeDir}/${costume.name}.${costume.dataFormat}`;
    let imageData = costume.image;
    if (costume.dataFormat !== 'svg') {
      imageData = convertDataUrlToBinaryString(imageData);
    }
    zip.file(costumeFileName, Array.from(imageData, (x) => x.charCodeAt(0)));
  }
}

function saveSpriteJsonToZip(project, sprite, zip) {
  const costumes = sprite.costumes.map((c) => {
    let path = `${c.name}.${c.dataFormat}`;
    if (sprite.isStage) {
      path = `sprites/index/${path}`;
    }

    return {
      name: c.name,
      path,
      x: c.rotationCenterX,
      y: c.rotationCenterY,
      bitmapResolution: c.bitmapResolution,
    };
  });

  const spriteJson = {
    currentCostumeIndex: sprite.currentCostume,
    costumeIndex: sprite.currentCostume,
    heading: sprite.heading,
    isDraggable: sprite.isDraggable,
    rotationStyle: "normal",
    size: sprite.size,
    visible: sprite.visible,
    x: sprite.x,
    y: sprite.y,
    costumes,
  };

  if (sprite.isStage) {
    spriteJson["map"] = {
      width: project.stageWidth,
      height: project.stageHeight,
    };

    const sprites = project.pureSprites;
    spriteJson["zorder"] = sprites.map((s) => `s${genClassName(s.name)}`);
    // TODO: stage monitors
    const stageMonitors = [];
    // const stageMonitors = project.monitors.filter(m => m.visible).map(m => ({
    //     type: "stageMonitor",
    //     target: "",
    //     val: `getVar:${m.params.VARIABLE}`,
    //     color: 15629590, // default color
    //     label: m.params.VARIABLE,
    //     mode: m.mode == "large" ? 2 : 1,
    //     x: m.x,
    //     y: m.y,
    //     visible: m.visible,
    // }))
    spriteJson["zorder"] = [...spriteJson["zorder"], ...stageMonitors];
  }

  const spriteClassName = genClassName(sprite.name);
  const spriteName = sprite.isStage ? "index" : `s${spriteClassName}`;
  let fileName = `assets/sprites/${spriteName}/index.json`;
  if (sprite.isStage) {
    fileName = "assets/index.json";
  }
  zip.file(fileName, JSON.stringify(spriteJson, null, 4));
}

export default function saveProjectToSpxPackZip(project) {
  const projectJson = project.toJSON();

  // TODO: use mem-fs
  const zip = new JSZip();

  // Put everything in a zip file
  zip.file("go.mod", GOP_MOD_FILE);
  zip.file("dummy/dummy.go", DUMMY_GO_FILE);
  zip.file("project.json", JSON.stringify(projectJson, null, 4));

  saveSoundsToZip(project, zip);

  project.sprites.forEach((sprite) => {
    if (sprite.isStage) {
      const gmxFileContent = generateGmxFile(project, sprite);
      zip.file("index.gmx", gmxFileContent);
    } else {
      const spriteClassName = genClassName(sprite.name);
      zip.file(`${spriteClassName}.spx`, generateSpxFile(project, sprite));
    }

    saveCostumesToZip(sprite, zip);
    saveSpriteJsonToZip(project, sprite, zip);
  });

  return zip.generateAsync({
    type: "blob",
    mimeType: "application/x.scratch.spxpack",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6, // Tradeoff between best speed (1) and best compression (9)
    },
  });
}
