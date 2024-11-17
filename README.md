# vscode-exos-introdev README

"vscode-exos-introdev" is a simple Visual Studio Code extension that show badges on files and folders to indicate the progress of the exercices in the "Introduction au développement" course at my school. It is a personal project that I made to learn how to create a Visual Studio Code extension and to make my course easier.

## Features


## Requirements

No requirements. Just install the extension and use it on projects where it is useful.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `vscode-exos-introdev.logFile`: The path to the log file that contains the progress of the exercices (relative to the workspace folder) (default: "log.md").
* `vscode-exos-introdev.projectsNames`: The names of the projects where the extension works (array).
* `vscode-exos-introdev.fileExtensions`: The extensions of the files where the extension works (default: go and folders).
* `vscode-exos-introdev.folderLevels`: The levels of the folders where the extension works (default: 2).
* `vscode-exos-introdev.resolvedPattern`: The pattern of the resolved exos in the log file (default: [X] [{{folderPath}}]).

## Known Issues

No actual known issues.

## Release Notes

### 1.0.0

Initial release of vscode-exos-introdev.

Just a simple extension that show badges on files and folders to indicate the progress of the exercices in the "Introduction au développement" course at my school.

Put the folers paths (ex: "recursive/exo1" and the folder "recursive/exo1" contains files of the exo) of exos which are resolved in the logFile (default: log.md) in the workspace folder.

Change the logFile path in the settings if you want to use another file.

Change the projectsNames, fileExtensions and folderLevels in the settings if you want to use the extension on other projects.

### 1.0.2

Seconde release of vscode-exos-introdev.

ADD the ResolvedPattern setting to change the pattern of the resolved exos in the log file (default: [X] [{{folderPath}}]).


## Author

(Me):
* **Kéwan BERNIER** - *All of work* - [kewanfr](https://github.com/kewanfr)


**Enjoy!**
