// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fs from "fs";
import path from "path";

// This method is called when your extension is activated
// Your extension is activated on activationEvents
let globalLogFileContent: string = "";

export async function activate(context: vscode.ExtensionContext) {
  // Enregistre un FileDecorationProvider pour personnaliser les noms des fichiers et ajouter une icône
  const fileDecorationProvider = new CustomFileDecorationProvider();

  // read logFile content in project
  const rootPath = vscode.workspace.rootPath || "";
  console.log("path", rootPath);
  const logFile = vscode.workspace
    .getConfiguration()
    .get("logFile");

  const logFilePath = path.join(rootPath, typeof logFile === "string" ? logFile : "");

  globalLogFileContent = await fs.readFileSync(typeof logFilePath === "string" ? logFilePath : "./log.md", "utf8");


  context.subscriptions.push(
    vscode.window.registerFileDecorationProvider(fileDecorationProvider)
  );

  let disposable = vscode.commands.registerCommand(
    "vscode-exos-introdev.showCustomFileNames",
    async () => {
      // The code you place here will be executed
      // every time your command is executed
      // Display a message box to the user

    }
  );

  context.subscriptions.push(disposable);
}

// class 

class CustomFileDecorationProvider implements vscode.FileDecorationProvider {
  // Fonction pour définir les décorations des fichiers
  onDidChangeFileDecorations?:
    | vscode.Event<vscode.Uri | vscode.Uri[]>
    | undefined;

  provideFileDecoration(uri: vscode.Uri): vscode.FileDecoration | undefined  {
    // Définissez une logique pour masquer le nom original du fichier et ajouter une icône

    /**
     * Configuration object containing various settings.
     * 
     * @property {string} logFile - The path to the log file.
     * @property {string[]} projectsNames - An array of project names.
     * @property {string[]} fileExtensions - An array of file extensions.
     */
    // const config = {
    //   logFile:  vscode.workspace
    //     .getConfiguration()
    //     .get("logFile"),
    //   projectsNames:  vscode.workspace
    //     .getConfiguration()
    //     .get("projectsNames"),
    //   fileExtensions:  vscode.workspace
    //     .getConfiguration()
    //     .get("fileExtensions"),
    // };

    // const configLogFile: string = vscode.workspace.getConfiguration().get("logFile");
    // const configProjectsNames: string[] = vscode.workspace.getConfiguration().get("projectsNames");
    const configFileExtensions: string[] = vscode.workspace.getConfiguration().get("fileExtensions") || [];

    // return {
    //   tooltip: "Exercice Résolu",
    //   badge: "✅",
    //   color: new vscode.ThemeColor("charts.blue"),
    // };
    // is folder 
    // if (uri.fsPath.endsWith("/")) {
    //   return {
    //     tooltip: "Dossier",
    //     badge: "📁",
    //     color: new vscode.ThemeColor("charts.green"),
    //   };
    // }


    // if (uri.fsPath === vscode.workspace.rootPath) {
    //   return {
    //     tooltip: "Projet",
    //     badge: "📁",
    //     color: new vscode.ThemeColor("charts.green"),
    //   };
    // }

    // is file
    let rootPath = vscode.workspace.rootPath || "";

    const ext = path.extname(uri.path);

    const relativePath = path.relative(rootPath, uri.path);
    const fileName = relativePath.split("/").pop();
    let folderPath;
    if (ext === "") {
      folderPath = relativePath;
    } else {
      folderPath = relativePath.split("/").slice(0, -1).join("/");
    }
    // const folderPath = relativePath.split("/").slice(0, -1).join("/");

    // console.log("fspath", path.extname(uri.path), "path", uri.path, "relativePath", relativePath, "fileName", fileName);

    // if is a folder (if not ".*") 
    // console.log(uri.path, ext === "", configFileExtensions.includes("folder"), folderPath.includes("/"), globalLogFileContent.includes(folderPath))
    // console.log(folderPath.split("/").length, folderPath, ext === "", ext);
    const resolved = globalLogFileContent.includes(folderPath);
    if (ext === "" && configFileExtensions.includes("folder") && folderPath.split("/").length > 1) {

      console.log(folderPath, "est non résolu");
      console.log(folderPath.split("/").length, folderPath);

      return {
        tooltip: resolved ? "Exercice Résolu" : "Exercice non résolu",
        badge: resolved ? "✔︎" : "·",
        color: new vscode.ThemeColor(resolved ? "badge.background" : "testing.iconQueued"),
        // color: new vscode.ThemeColor(resolved ? "badge.background" : "badge.foreground"),
      };

    }

    if (configFileExtensions.includes(ext)) {


      return {
        tooltip: resolved ? "Exercice Résolu" : "Exercice non résolu",
        badge: resolved ? "✔︎" : "·",
        
        // color: new vscode.ThemeColor("charts.blue"),
        color: new vscode.ThemeColor(resolved ? "badge.background" : "testing.iconQueued"),
      };

    }

    return undefined; // Aucun changement pour les autres fichiers
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
