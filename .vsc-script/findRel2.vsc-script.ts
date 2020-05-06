import * as vsc from 'vsc-base'

export async function run(path: string) {
   const files = await vsc.findRelativeFilePaths(path, '..', '*.tsx')

   vsc.showMessage('Found: ' + JSON.stringify(files))
}
