import * as vscode from "vscode"

export class ThemesProvider implements vscode.TreeDataProvider<Theme> {
    getTreeItem(element: Theme): vscode.TreeItem {
        return element
    }

    getChildren(element?: Theme): Thenable<Theme[]> {
        if (element) return Promise.resolve([])
        return Promise.resolve(this.getAllThemes())
    }

    /**
     * Given the path to package.json, read all its dependencies and devDependencies.
    */
    // private getChildrenOfElement(element: Theme): Theme[] {
    //     let themes: Theme[] = []
    //     const elLabel = element.label
    //     vscode.extensions.getExtension()
    //     return themes
    // }

    private getExtension(label: string) {

    }

    private getAllThemes(): Theme[] {
        let themes: Theme[] = []
        vscode.extensions.all.forEach(ext => {
            const contributesThemes = ext.packageJSON.contributes ? (ext.packageJSON.contributes.themes ? ext.packageJSON.contributes.themes : undefined) : undefined
            if (contributesThemes) {
                for (var i = 0; i < contributesThemes.length; i++) {
                    const label = contributesThemes[i].label;
                    // console.log(contributesThemes[i])
                    // const uiTheme = (contributesThemes[i].uiTheme === 'vs-dark') ? 'dark' : 'light';
                    // const extensionType = ext.packageJSON.isBuiltin ? 'Built-in' : 'External';
                    // console.log(`${extensionType} extension '${ext.id}' contributes ${uiTheme} theme '${label}'`);
                    const theme = new Theme(label)
                    themes.push(theme)
                 }
            }
        })
        return themes
    }
}

class Theme extends vscode.TreeItem {
    constructor(
        public readonly label: string,
    ) {
        super(label);
        this.tooltip = this.label;
        this.description = this.label;
    }
}
