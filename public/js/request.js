$(document).ready(() => {
    $('input[name="daterange"]').daterangepicker({
        autoApply: true,
        maxSpan: { days: 30 },
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        maxDate: moment(),
        locale: { format: 'DD-MM-YYYY' }
    }, (start, end, label) => {
        const filename = start.format('YYYYMMDD') + '-' + end.format('YYYYMMDD')
        setfilename(filename)
    })

    elements.forEach((element) => {
        $.get(api_url = `../api/get/${element.id}`, (response, status) => {
            const success = status === 'success' ? true : false
            success ? add_options(element, response) :
                alert('Something went wrong, please reload the page')
        })
    })
})

const elements = [
    // { id: 'bases', value: 'bs_id', name: 'bs_id', subtext: 'region' },
    // { id: 'markets', value: 'market_key', name: 'market_key', subtext: 'region' },
    { id: 'reasons', value: 'disconnect_reason_code', name: 'disconnect_reason_code', subtext: 'description_eng' }
]

function setfilename(filename) {
    $('#name').val(`${filename}.xlsx`)
}

function add_options(element, response) {
    const options = []
    response.forEach(p => {
        const option = new Option(p[element.value], p[element.name])
        $(option).attr('data-subtext', p[element.subtext])
        options.push(option)
    })
    $(`select[id="${element.id}"]`)
        .append(options)
        .selectpicker('refresh')
}

