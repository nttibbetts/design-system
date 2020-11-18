import {
  names as themeNames,
  useTheme
} from '@pluralsight/ps-design-system-theme'
import { HTMLPropsFor, ValueOf } from '@pluralsight/ps-design-system-util'
import { compose, css } from 'glamor'
import React from 'react'

import stylesheet from '../css'
import { aligns } from '../vars'

const styles = {
  table: (themeName: ValueOf<typeof themeNames>) =>
    compose(
      css(stylesheet['.psds-table']),
      css(stylesheet[`.psds-table.psds-theme--${themeName}`])
    ),
  body: () => css(stylesheet['.psds-table__body']),
  cell: (opts: { align: ValueOf<typeof aligns> }) =>
    compose(
      css(stylesheet['.psds-table__cell']),
      css(stylesheet[`.psds-table__cell--align-${opts.align}`])
    ),
  head: () => css(stylesheet['.psds-table__head']),
  header: () => css(stylesheet['.psds-table__header']),
  row: () => css(stylesheet['.psds-table__row'])
}

interface TableStatics {
  Body: typeof TableBody
  Cell: typeof TableCell
  Head: typeof TableHead
  Header: typeof TableHeader
  Row: typeof TableRow
}

const Table: React.FC<HTMLPropsFor<'table'>> & TableStatics = props => {
  const themeName = useTheme()
  return <table {...styles.table(themeName)} {...props} />
}

const TableBody: React.FC<HTMLPropsFor<'tbody'>> = props => {
  return <tbody {...styles.body()} {...props} />
}
TableBody.displayName = 'Table.Body'

interface TableCellProps extends HTMLPropsFor<'td'> {
  align?: ValueOf<typeof aligns>
}
const TableCell: React.FC<TableCellProps> = props => {
  const { align = aligns.left, ...rest } = props
  return <td {...styles.cell({ align })} {...rest} />
}
TableCell.displayName = 'Table.Cell'

const TableHead: React.FC<HTMLPropsFor<'thead'>> = props => {
  return <thead {...styles.head()} {...props} />
}
TableHead.displayName = 'Table.Head'

const TableHeader: React.FC<HTMLPropsFor<'th'>> = props => {
  return <th {...styles.header()} {...props} />
}
TableHeader.displayName = 'Table.Header'

const TableRow: React.FC<HTMLPropsFor<'tr'>> = props => {
  return <tr {...styles.row()} {...props} />
}
TableRow.displayName = 'Table.Row'

Table.Body = TableBody
Table.Cell = TableCell
Table.Head = TableHead
Table.Header = TableHeader
Table.Row = TableRow

export default Table
