'use strict'

$(function () {
  var $form = $('form.ajaxed')
  var $reset = $('.reset-form')
  var $modal = $('#responseModal')

  var toObj = function () {
    var ret = {createdAt: new Date().toISOString()  }
    $form.serializeArray().forEach(function (x) {
      if (x.value) { ret[x.name] = x.value }
    })
    return ret
  }

  var respond = function (textStatus, lead) {
    $('h1', $modal).text(textStatus)
    $('p.lead', $modal).text(lead)
    $modal.foundation('open')
  }

  var okFn = function (data, textStatus) {
    $reset.click()
    respond(textStatus, 'Inserted document ID: ' + data.id)
  }

  var badFn = function (jqXHR, textStatus, error) { respond(textStatus, error) }

  var onSubmit = function (ev) {
    ev.preventDefault()
    var z = toObj()
    var settings = {
      url: $form.attr('action'),
      dataType: 'json',
      contentType: 'application/json',
      method: 'POST'
    }
    if (z.adminUsername && z.adminPassword) {
      settings.headers = {
        authorization: 'Basic ' + window.btoa([z.adminUsername, z.adminPassword].join(':'))
      }
    }
    delete z.adminPassword
    delete z.adminUsername
    settings.data = JSON.stringify(z)
    $.ajax(settings)
      .done(okFn)
      .fail(badFn)
  }

  $(document).foundation()
  $reset.hide()
  $('form.ajaxed').submit(onSubmit)
})
