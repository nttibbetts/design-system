import {
  SortAscIcon,
  SortDescIcon,
  SortIcon
} from '@pluralsight/ps-design-system-icon'
import {
  names as themeNames,
  useTheme
} from '@pluralsight/ps-design-system-theme'
import { HTMLPropsFor, ValueOf } from '@pluralsight/ps-design-system-util'
import { compose, css } from 'glamor'
import React from 'react'

import stylesheet from '../css'
import { aligns, sorts } from '../vars'

const styles = {
  container: () => css(stylesheet['.psds-table__container']),
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
  header: (opts: { align: ValueOf<typeof aligns>; sortable: boolean }) =>
    compose(
      css(stylesheet['.psds-table__header']),
      css(stylesheet[`.psds-table__header--align-${opts.align}`]),
      opts.sortable && css(stylesheet['.psds-table__header--sortable'])
    ),
  sortIcon: () => css(stylesheet['.psds-table__header__sort-icon']),
  row: (opts: { expanded: boolean; selected: boolean; sticky: boolean }) =>
    compose(
      css(stylesheet['.psds-table__row']),
      !opts.expanded && css(stylesheet['.psds-table__row--collapsed']),
      opts.selected && css(stylesheet['.psds-table__row--selected']),
      opts.sticky && css(stylesheet['.psds-table__row--sticky'])
    )
}

interface TableStatics {
  Body: typeof TableBody
  Cell: typeof TableCell
  Head: typeof TableHead
  Header: typeof TableHeader
  Row: typeof TableRow
}

interface TableProps extends HTMLPropsFor<'table'> {
  renderContainer?: React.FC
}
const Table: React.FC<TableProps> & TableStatics = props => {
  const { renderContainer: Container = defaultRenderContainer, ...rest } = props
  const themeName = useTheme()

  return (
    <Container {...styles.container()}>
      <table {...styles.table(themeName)} {...rest} />
    </Container>
  )
}

const defaultRenderContainer: React.FC = props => <div {...props} />

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

interface TableHeaderProps extends HTMLPropsFor<'th'> {
  align?: ValueOf<typeof aligns>
  sort?: boolean | ValueOf<typeof sorts>
}
const TableHeader: React.FC<TableHeaderProps> = props => {
  const { align = aligns.left, children, sort, ...rest } = props
  const sortable = isDefined(sort)
  const sorted = !isBoolean(sort)

  let Icon = SortIcon
  if (sorted) Icon = sort === sorts.desc ? SortDescIcon : SortAscIcon

  return (
    <th {...styles.header({ align, sortable })} {...rest}>
      {children}
      {sortable && <Icon {...styles.sortIcon()} />}
    </th>
  )
}
TableHeader.displayName = 'Table.Header'

interface TableRowProps extends HTMLPropsFor<'tr'> {
  expanded?: boolean
  selected?: boolean
  sticky?: boolean
}
const TableRow: React.FC<TableRowProps> = props => {
  const { expanded = true, selected = false, sticky = false, ...rest } = props
  return <tr {...styles.row({ expanded, selected, sticky })} {...rest} />
}
TableRow.displayName = 'Table.Row'

Table.Body = TableBody
Table.Cell = TableCell
Table.Head = TableHead
Table.Header = TableHeader
Table.Row = TableRow

const isBoolean = (val: unknown) => typeof val === 'boolean'
const isDefined = (val: unknown) => typeof val !== 'undefined'

export default Table
