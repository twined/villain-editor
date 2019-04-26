import { alertError } from './alerts'

export default async function fetchTemplates (namespace) {
  // return [
  //   {
  //     type: 'template',
  //     data: {
  //       id: 2,
  //       name: 'Produktteaser - 2 bilder',
  //       help_text: 'Produktteaser, med to sidestilte bilder (høydeformat)',
  //       class: 'v-unique-id',
  //       code: '<div>%{MARKDOWN}</div>',
  //       refs: [
  //         {
  //           'name': 'MARKDOWN',
  //           'data': {
  //             'type': 'markdown',
  //             'data': {
  //               'text': 'MD text!'
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   }
  // ]

  let request
  let headers = new Headers()
  headers.append('accept', 'application/json, text/javascript, */*; q=0.01')

  if (this.extraHeaders) {
    for (let key of Object.keys(this.extraHeaders)) {
      headers.append(key, this.extraHeaders[key])
    }
  }

  request = new Request(`${this.templatesURL}${namespace || 'all'}`, { headers })

  try {
    let response = await fetch(request)
    let data = await response.json()

    return data
  } catch (e) {
    alertError('Feil', 'Klarte ikke hente maler fra databasen!')
    console.error(e)
  }
}
