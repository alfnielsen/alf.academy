export interface IFunction {
   "id": number
   "pure": boolean
   "name": string
   "description": string
   "bodies": {
      "body": string
      "lang": string
   }[]
   "tags": string[]
   "arguments": {
      "name": string
      "type": string
      "is_input": boolean
   }[]
   "tests": string[]
}
