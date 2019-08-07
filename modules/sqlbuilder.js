const moment = require('moment')

const generate_query = (report, body) => {
    const { daterange, reasons, call_type } = body
    let result = report.query
    result = result.replaceAll('@PDATE', generate_pdate(daterange))
    result = result.replaceAll('@REASON_CODES', generate_reasons(reasons))
    result = result.replaceAll('@B2B', generate_bb(call_type))
    return result
}

exports.generate_query = generate_query

function generate_bb(call_type) {
    let result
    switch (call_type) {
        case 'all':
            result = '1=1'
            break
        case 'b2b':
            result = `substr(a.called_number, 1, 5) in ('99891', '99890')`
            break
    }
    return result
}

function generate_pdate(daterange) {
    const from = daterange.split(' - ')[0]
    const to = daterange.split(' - ')[1]
    let result = ''
    let date1 = moment(from, 'DD-MM-YYYY')
    let date2 = moment(to, 'DD-MM-YYYY')
    let tmp
    for (tmp = date1; tmp < date2; tmp.add(1, 'days'))
        result += `'${tmp.format('YYYYMMDD')}',`
    result += `'${tmp.format('YYYYMMDD')}'`
    return `pdate in (${result})`
}

function generate_reasons(reasons) {
    let result = ''
    if (reasons) {
        let i
        for (i = 0; i < reasons.length - 1; i++)
            result += Number(reasons[i]) + ', '
        result += Number(reasons[i])
        result = `reason_code in (${result})`
    } else
        result = '1 = 1'
    return result
}

String.prototype.replaceAll = function (search, replacement) {
    let target = this
    return target.split(search).join(replacement)
}
