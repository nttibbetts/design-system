/* eslint-disable react/jsx-key */

import Avatar from '@pluralsight/ps-design-system-avatar'
import Button from '@pluralsight/ps-design-system-button'
import * as core from '@pluralsight/ps-design-system-core'
import Checkbox from '@pluralsight/ps-design-system-checkbox'
import Dropdown from '@pluralsight/ps-design-system-dropdown'
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChatIcon,
  MoveIcon
} from '@pluralsight/ps-design-system-icon'
import * as Text from '@pluralsight/ps-design-system-text'
import { HTMLPropsFor } from '@pluralsight/ps-design-system-util'

import SearchInput from '@pluralsight/ps-design-system-searchinput'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useMemo } from 'react'
import {
  CellProps,
  HeaderProps,
  Hooks,
  TableInstance,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table'

import { generateUserCourseViews } from './seed'
import Table from '..'

export default {
  title: 'Components/Table/react-table',
  component: Table,
  decorators: [
    Story => (
      <div style={{ padding: '30px 10px 200px' }}>
        <Story />
      </div>
    )
  ],
  parameters: { center: { disabled: true }, storyshots: { disable: true } }
} as Meta

export const Sorting: Story = () => {
  const columns = useMemo(
    () => [
      { Header: 'First Name', accessor: 'user.firstName' },
      { Header: 'Last Name', accessor: 'user.lastName' },
      { Header: 'Courses', accessor: 'courses.active' },
      { Header: 'View Time', accessor: 'viewTime.ms' }
    ],
    []
  )
  const data = useMemo(() => generateUserCourseViews(), []) as any

  const plugins = [useSortBy]
  const table = useTable({ columns, data }, ...plugins)

  return (
    <>
      <Table {...table.getTableProps()}>
        <Table.Head>
          {table.headerGroups.map(group => (
            <Table.Row {...group.getHeaderGroupProps()}>
              {group.headers.map(column => {
                const sort = column.isSorted
                  ? column.isSortedDesc
                    ? 'desc'
                    : 'asc'
                  : column.canSort

                return (
                  <Table.Header
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sort={sort}
                  >
                    {column.render('Header')}
                  </Table.Header>
                )
              })}
            </Table.Row>
          ))}
        </Table.Head>

        <Table.Body {...table.getTableBodyProps()}>
          {table.rows.map(row => {
            table.prepareRow(row)

            return (
              <Table.Row {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Table.Cell>
                ))}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export const Filtering: Story = () => {
  const columns = useMemo(
    () => [
      { Header: 'First Name', accessor: 'user.firstName' },
      { Header: 'Last Name', accessor: 'user.lastName' },
      { Header: 'Courses', accessor: 'courses.active' },
      { Header: 'View Time', accessor: 'viewTime.ms' }
    ],
    []
  )

  const data = useMemo(() => generateUserCourseViews(100), []) as any

  const plugins = [useGlobalFilter]
  const table = useTable({ columns, data }, ...plugins)

  const handleSearchChange = (_e: any, next: any) => table.setGlobalFilter(next)

  return (
    <TableLayout
      filters={
        <SearchFilter
          onChange={handleSearchChange}
          value={table.state.globalFilter}
        />
      }
    >
      <Table {...table.getTableProps()}>
        <Table.Head>
          {table.headerGroups.map(group => (
            <Table.Row {...group.getHeaderGroupProps()}>
              {group.headers.map(column => {
                return (
                  <Table.Header {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Table.Header>
                )
              })}
            </Table.Row>
          ))}
        </Table.Head>

        <Table.Body {...table.getTableBodyProps()}>
          {table.rows.map(row => {
            table.prepareRow(row)

            return (
              <Table.Row {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Table.Cell>
                ))}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </TableLayout>
  )
}

export const KitchenSink: Story = () => {
  const columns = useMemo(
    () => [
      {
        Cell: ({ cell }: any) => {
          const { user } = cell.row.original

          return (
            <FlexContainer>
              <Avatar alt="avatar" name={`${user.firstName}`} size="xSmall" />
              <HorzSpacer />
              <span>{String(cell.value)}</span>
            </FlexContainer>
          )
        },
        Header: 'User',
        accessor: ({ user }: any) => `${user.firstName} ${user.lastName}`
      },
      { Header: 'Courses', accessor: 'courses.active' },
      { Header: 'View Time', accessor: 'viewTime.ms' }
    ],
    []
  ) as any

  const data = useMemo(() => generateUserCourseViews(2500), []) as any

  const selectionHook = (hooks: Hooks<any>) => {
    hooks.visibleColumns.push(columns => [
      {
        id: '_selection',
        disableGroupBy: true,
        Cell: ({ row }: CellProps<any>) => (
          <TableCheckbox {...row.getToggleRowSelectedProps()} />
        ),
        Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
          <TableCheckbox {...getToggleAllRowsSelectedProps()} />
        )
      },
      ...columns
    ])
  }

  const plugins = [useGlobalFilter, useSortBy, usePagination, useRowSelect]
  const hooks = [selectionHook]
  const table = useTable({ columns, data }, ...plugins, ...hooks)

  const showBulkActions = useMemo(
    () => Object.keys(table.state.selectedRowIds).length > 0,
    [table.state.selectedRowIds]
  )

  const handleSearchChange = (_e: any, next: any) => table.setGlobalFilter(next)

  return (
    <TableLayout
      actions={showBulkActions && <BulkActions />}
      filters={
        <SearchFilter
          onChange={handleSearchChange}
          value={table.state.globalFilter}
        />
      }
      pager={<TablePager table={table} />}
    >
      <Table {...table.getTableProps()}>
        <Table.Head>
          {table.headerGroups.map(group => (
            <Table.Row {...group.getHeaderGroupProps()}>
              {group.headers.map(column => {
                const sortable = column.canSort
                const sort = column.isSorted
                  ? column.isSortedDesc
                    ? 'desc'
                    : 'asc'
                  : column.canSort

                return (
                  <Table.Header
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sort={sortable ? sort : undefined}
                  >
                    {column.render('Header')}
                  </Table.Header>
                )
              })}
            </Table.Row>
          ))}
        </Table.Head>

        <Table.Body {...table.getTableBodyProps()}>
          {table.page.map(row => {
            table.prepareRow(row)

            return (
              <Table.Row {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Table.Cell>
                ))}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </TableLayout>
  )
}

interface TableLayoutProps {
  actions?: React.ReactNode
  children: React.ReactElement<typeof Table>
  filters?: React.ReactNode
  pager?: React.ReactNode
}
const TableLayout: React.FC<TableLayoutProps> = props => {
  const { actions, children, filters, pager } = props

  return (
    <div>
      <header
        style={{ display: 'flex', marginBottom: core.layout.spacingMedium }}
      >
        {actions && <div style={{ marginRight: 'auto' }}>{actions}</div>}
        {filters && <div style={{ marginLeft: 'auto' }}>{filters}</div>}
      </header>

      <div>{children}</div>

      {pager && <div>{pager}</div>}
    </div>
  )
}
const BulkActions: React.FC = () => {
  return (
    <>
      <Button appearance="secondary" icon={<MoveIcon />}>
        Move to team
      </Button>

      <HorzSpacer />

      <Button appearance="secondary" icon={<ChatIcon />}>
        Send message
      </Button>
    </>
  )
}

const HorzSpacer: React.FC = props => (
  <div
    style={{
      display: 'inline-block',
      width: core.layout.spacingSmall
    }}
    {...props}
  />
)

interface SearchFilterProps {
  value: any
  onChange: (evt: unknown, value: any) => void
}
const SearchFilter: React.FC<SearchFilterProps> = props => {
  const { value, onChange } = props

  const onSearchBlur: React.FocusEventHandler<HTMLInputElement> = evt => {
    onChange(evt, evt.target.value)
  }
  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    onChange(evt, evt.target.value)
  }

  return (
    <SearchInput
      onBlur={onSearchBlur}
      onChange={onSearchChange}
      placeholder="Filter"
      style={{ flex: 1 }}
      value={value}
    />
  )
}

const FlexContainer: React.FC = props => (
  <div style={{ display: 'flex', alignItems: 'center' }} {...props} />
)

interface TableCheckboxProps extends Omit<HTMLPropsFor<'input'>, 'ref'> {
  indeterminate?: boolean
}
const TableCheckbox: React.FC<TableCheckboxProps> = props => {
  const { onChange, ...rest } = props
  return <Checkbox onCheck={onChange} {...rest} />
}

interface TablePagerProps {
  perPageOptions?: number[]
  table: TableInstance
}
const TablePager: React.FC<TablePagerProps> = props => {
  const { perPageOptions = [10, 50, 100], table } = props
  const { pageIndex, pageSize } = table.state

  const handlePrevPage = () => table.previousPage()
  const handleNextPage = () => table.nextPage()

  const cursorStart = pageIndex * pageSize + 1
  const cursorEnd = cursorStart + pageSize
  const total = table.pageCount * pageSize

  return (
    <div style={{ display: 'flex', marginBottom: core.layout.spacingMedium }}>
      <Button
        appearance="secondary"
        disabled={!table.canPreviousPage}
        icon={<CaretLeftIcon />}
        onClick={handlePrevPage}
        title="Previous page"
      />
      <HorzSpacer />
      <Button
        appearance="secondary"
        disabled={!table.canNextPage}
        icon={<CaretRightIcon />}
        onClick={handleNextPage}
        title="Next page"
      />

      <HorzSpacer />

      <Text.P>
        {cursorStart.toLocaleString()}-{cursorEnd.toLocaleString()} of{' '}
        {total.toLocaleString()}
      </Text.P>

      <HorzSpacer />

      <Dropdown
        appearance="subtle"
        onChange={(_evt, value) => {
          table.setPageSize(Number(value))
        }}
        menu={
          <>
            {perPageOptions.map(option => (
              <Dropdown.Item key={option} value={option}>
                {String(option) + ' rows'}
              </Dropdown.Item>
            ))}
          </>
        }
        value={pageSize}
      />
    </div>
  )
}
