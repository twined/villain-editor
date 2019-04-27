import { alertError } from './alerts'
import pathJoin from './pathJoin'

export default async function fetchTemplates (namespace, extraHeaders, url) {
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

  if (extraHeaders) {
    for (let key of Object.keys(extraHeaders)) {
      headers.append(key, extraHeaders[key])
    }
  }

  let fullPath = pathJoin(url, namespace)
  request = new Request(fullPath, { headers })

  try {
    let response = await fetch(request)
    let data = await response.json()

    return data
  } catch (e) {
    alertError('Feil', 'Klarte ikke hente maler fra databasen!')
    console.error(e)
  }
}
