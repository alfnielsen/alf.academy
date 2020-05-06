import * as vsc from 'vsc-base'

export async function run(path: string) {
   const files = await vsc.findFilePaths('**/*.story.tsx')

   vsc.showMessage('Found: ' + JSON.stringify(files))
}

export const testDirectExportVal = 22

export const testDirectExport = () => {}

const testDefault = () => {}

export default testDefault
