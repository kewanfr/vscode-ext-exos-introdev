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

  if (!fs.existsSync(logFilePath)) {
    console.log("Le fichier de log n'existe pas");
    return;
    // return vscode.window.showInformationMessage("Le fichier de log n'existe pas");
  }

  globalLogFileContent = await fs.readFileSync(typeof logFilePath === "string" ? logFilePath : "./log.md", "utf8");

  const configProjectsNames: string[] = vscode.workspace.getConfiguration().get("projectsNames") || [];

  const projetName = vscode.workspace.name || "";

  if (!configProjectsNames.includes(projetName)) {
    console.log("Le projet n'est pas configuré dans les paramètres");
    // return vscode.window.showInformationMessage("Le projet n'est pas configuré dans les paramètres");
    return;
  }
  var fileDecorationProviderDisposable = vscode.window.registerFileDecorationProvider(fileDecorationProvider)

  context.subscriptions.push(
    fileDecorationProviderDisposable
  );

  // on file logFile change
  vscode.workspace.createFileSystemWatcher(logFilePath).onDidChange(async () => {
    console.log("Le fichier de log a changé");
    globalLogFileContent = await fs.readFileSync(logFilePath, "utf8");

    fileDecorationProviderDisposable.dispose();
    fileDecorationProviderDisposable = vscode.window.registerFileDecorationProvider(fileDecorationProvider);
    // vscode.window.showInformationMessage("Le fichier de log a changé");
  });

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-exos-introdev.decorateFiles",
      async (uri: vscode.Uri) => {
        console.log("Décorer les fichiers");
      }
    )
  );
}

class CustomFileDecorationProvider implements vscode.FileDecorationProvider {
  onDidChangeFileDecorations?:
    | vscode.Event<vscode.Uri | vscode.Uri[]>
    | undefined;

  provideFileDecoration(uri: vscode.Uri): vscode.FileDecoration | undefined  {


    // const configLogFile: string = vscode.workspace.getConfiguration().get("logFile");
    const configFileExtensions: string[] = vscode.workspace.getConfiguration().get("fileExtensions") || [];

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
