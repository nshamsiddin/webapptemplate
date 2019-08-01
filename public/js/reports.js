$(document).ready(() => {
    fill_table()
    $("tr").click(() => {
        alert($(this).data("/"))
        window.document.location = $(this).data("/")
    })
})

function fill_table() {
    const api = '/api/get/reports'
    let table = $('#reports')
    $.get(api, (reports, status) => {
        if (status === 'success') {
            for (let i in reports) {
                const tr = create('tr')
                // tr.id = reports[i]._id
                $(tr).attr('onclick', `window.location='/api/get/report/${reports[i]._id}'`)

                tr.append(create('th', i * 1 + 1))
                fields.forEach(p => {
                    tr.append(create('td', reports[i][p]))
                })
                $('#table-body').append(tr)
            }
        }

    })
}

function create(element, content) {
    let e = document.createElement(element)
    if (content)
        e.append(content)
    return e
}

const fields = ['filename', 'size', 'requestedAt', 'comment']