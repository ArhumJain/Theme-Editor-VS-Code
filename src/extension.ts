// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activatedm
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "theme-editor" is now active!');

    vscode.extensions.all.forEach(ext => {
        const contributesThemes = ext.packageJSON.contributes ? (ext.packageJSON.contributes.themes ? ext.packageJSON.contributes.themes : undefined) : undefined;
        if (contributesThemes) {
            for (var i = 0; i < contributesThemes.length; i++) {
                const label = contributesThemes[i].label;
                const uiTheme = (contributesThemes[i].uiTheme === 'vs-dark') ? 'dark' : 'light';
                const extensionType = ext.packageJSON.isBuiltin ? 'Built-in' : 'External';
                vscode.window.showInformationMessage(`${extensionType} extension '${ext.id}' contributes ${uiTheme} theme '${label}'`);
             }
        }
    });
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('theme-editor.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
	vscode.window.showInformationMessage(vscode.extensions.all[0].packageJSON.contributes.themes.id)
		vscode.window.showInformationMessage('Hello World from Theme Editor!');
	});

	context.subscriptions.push(disposable);
}
function commentLint(){
	vscode.commands.executeCommand('theme-editor.helloWorld')
}

// this method is called when your extension is deactivated
export function deactivate() {}
