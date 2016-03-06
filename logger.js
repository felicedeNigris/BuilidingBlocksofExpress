'use strict'

module.exports = (request, response, next)=>{
  let  start =  +new Date()
  let stream = process.stdout
  let url = request.url
  let method = request.method

  response.on('finish', ()=>{
    let duration = +new Date() - start
    let message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n'

    stream.write(message)
  })

  next()
}
