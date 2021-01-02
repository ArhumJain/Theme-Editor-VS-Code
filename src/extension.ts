import * as vscode from 'vscode'
import { DefaultThemes } from './DefaultThemes'
import { ThemesProvider } from './ThemeListProvider'
// import path from 'path'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

export function activate(context: vscode.ExtensionContext) {
	
	const command = vscode.commands.registerCommand('theme-editor.helloWorld', () => {
		let counter = 0
		for(let ext of vscode.extensions.all){
			const contributesThemes = ext.packageJSON.contributes ? (ext.packageJSON.contributes.themes ? ext.packageJSON.contributes.themes : undefined) : undefined
			if (contributesThemes){
				for(let j of ext.packageJSON.contributes.themes){
					const uri = join(ext.extensionPath, j.path)
					const file = readFileSync(uri, 'utf8')
					writeFileSync(`D:\\Programming\\JS Projects\\Theme Editor for VS Code\\Themes\\${counter}.json`, file)
					// console.log(uri)
					counter += 1 
				}
			}
		}
// 		const panel = vscode.window.createWebviewPanel(
// 			'editor',
// 			'Editor',
// 			vscode.ViewColumn.One,
// 			{
// 				enableScripts: true,
// 				localResourceRoots: [
// 					vscode.Uri.joinPath(context.extensionUri, "out/compiled")
// 				]
// 			}
// 		)
// 		const scriptUri = panel.webview.asWebviewUri(vscode.Uri.file(
// 			context.extensionPath + '/out/compiled/main.js'
// 		));
// 		const styleUri = panel.webview.asWebviewUri(vscode.Uri.file(
// 			context.extensionPath + '/out/compiled/main.css'
// 		));
// 		const nonce = getNonce()

// 		panel.webview.html = `<!DOCTYPE html>
// 		<html lang="en">
// 		<head>
// 			<meta charset="UTF-8">
// 			<!--
// 				Use a content security policy to only allow loading images from https or from our extension directory,
// 				and only allow scripts that have a specific nonce.
// 	-->
// 	<meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${panel.webview.cspSource}; script-src 'nonce-${nonce}';">
// 			<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 	<link href="${styleUri}" rel="stylesheet">
// 	<script nonce="${nonce}">
// 	</script>
// 		</head>
//   <body>
// 		</body>
//   <script src="${scriptUri}" nonce="${nonce}">
// 		</html>`
		
	})
	const DataProvider = new ThemesProvider() 
	const TreeProvider = vscode.window.registerTreeDataProvider(
		'view',
		DataProvider
	)

	const treeView = vscode.window.createTreeView("view", {
		treeDataProvider: DataProvider
	})
	treeView.onDidChangeSelection(_ => {
		const label = DefaultThemes.get(treeView.selection[0].label) || treeView.selection[0].label
		console.log(label)
		vscode.workspace.getConfiguration('workbench')
			.update('colorTheme', label, vscode.ConfigurationTarget.Global)
	})

	context.subscriptions.push(TreeProvider, command)
}

// this method is called when your extension is deactivated
export function deactivate() {}
function getNonce() {
	let text = "";
	const possible =
	  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
	  text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
  }