import * as vscode from 'vscode'
import { DefaultThemes } from './DefaultThemes'
import { ThemesProvider } from './ThemeListProvider'

export function activate(context: vscode.ExtensionContext) {
	

	const command = vscode.commands.registerCommand('theme-editor.helloWorld', () => {
		const panel = vscode.window.createWebviewPanel(
			'editor',
			'Editor',
			vscode.ViewColumn.One,
			{}
		)

		panel.webview.html = `<!doctype html>
		<html lang="en">
		<head>
		  <meta charset="utf-8">
		
		  <title>The HTML5 Herald</title>
		  <meta name="description" content="The HTML5 Herald">
		  <meta name="author" content="SitePoint">
		
		
		</head>
		
		<body>
			<h1> Simp Father </h1>
			<button> Click Me </button>
		</body>
		</html>`
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
