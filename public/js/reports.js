$(document).ready(() => {
    fill_table()

})

function fill_table() {
    const api = '/api/get/reports'
    let table = $('#reports')
    $.get(api)
        .then((reports, status) => {
            if (status === 'success') {
                for (let i in reports) {
                    const tr = create('tr')
                    tr.append(create('th', i * 1 + 1))
                    fields.forEach(p => { tr.append(create('td', reports[i][p])) })
                    addsvg(reports[i], tr)
                    $('#table-body').append(tr)
                }
            }
        })
    // .then(() => set_listener())
}

const api = `/api/get/report`

function set_listener() {
    $(".clickable").click((e) => {
        const id = $(e.target).attr('id')
        console.log(id)
        // $.get(`${api}/${id}`)
        //     .then((data, status) => {
        //         console.log(data)
        //     })
        // window.document.location = $(this).data("/")
    })
}

function create(element, content) {
    let e = document.createElement(element)
    if (content)
        e.append(content)
    return e
}

const svgfolder = 'svg'

function addsvg(report, tr) {
    switch (report['status']) {
        case 0:
            tr.append(createsvg('rings.svg', report._id, false))
            break
        case 1:
            tr.append(createsvg('down.svg', report._id, true))
            break
        case -1:
            tr.append(createsvg('error.svg', report._id, false))
            break
    }
}

function createsvg(name, id, clickable) {
    let td = document.createElement('td')
    let img = document.createElement('img')
    img.setAttribute('src', `${svgfolder}/${name}`)
    if (clickable) {
        let a = document.createElement('a')
        a.setAttribute('href', `${api}/${id}`)
        a.setAttribute('download', '')

        $(img).addClass('clickable')
        $(img).addClass('td-icon')
        img.setAttribute('id', id)

        a.appendChild(img)
        td.append(a)
    }
    else {
        $(img).addClass('td-icon')
        td.append(img)
    }
    return td
}

const fields = ['filename', 'size', 'requestedAt', 'comment']