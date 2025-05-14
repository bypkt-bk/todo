import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import th from 'date-fns/locale/th'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import { formatISO } from 'date-fns'

registerLocale('th', th)

function formatBE(date) {
  if (!date) return ''
  const dayMonth = format(date, 'dd MMMM', { locale: th })
  const time    = format(date, 'HH:mm', { locale: th })
  const beYear  = date.getFullYear() + 543
  return `${dayMonth} ${beYear} เวลา ${time} น.`
}

export default function ThaiBuddhistDatePicker({ value, onChange }) {
  const buddhistYears = []
  const thisBE = new Date().getFullYear() + 543
  for (let y = thisBE - 50; y <= thisBE + 10; y++) buddhistYears.push(y)

  return (
    <DatePicker
      selected={value ? new Date(value) : null}
      onChange={date => onChange(formatISO(date))}
      locale="th"
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="เวลา"
      customInput={
        <input 
          style={{ width: 200, padding: 4, fontSize: 14 }} 
          readOnly 
        />
      }
      value={value ? formatBE(new Date(value)) : ''}

      renderCustomHeader={({
        date, decreaseMonth, increaseMonth, changeYear
      }) => {
        const monthIndex = date.getMonth()
        const ceYear = date.getFullYear()
        const beYear = ceYear + 543
        const thaiMonths = [
          'ม.ค.','ก.พ.','มี.ค.','เม.ย.',
          'พ.ค.','มิ.ย.','ก.ค.','ส.ค.',
          'ก.ย.','ต.ค.','พ.ย.','ธ.ค.'
        ]
        return (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8
          }}>
            <button onClick={decreaseMonth}>&lt;</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <span>{thaiMonths[monthIndex]}</span>
              <select
                value={beYear}
                onChange={e => changeYear(parseInt(e.target.value,10) - 543)}
              >
                {buddhistYears.map(be => (
                  <option key={be} value={be}>{be}</option>
                ))}
              </select>
            </div>
            <button onClick={increaseMonth}>&gt;</button>
          </div>
        )
      }}
    />
  )
}
