/* eslint-disable react/jsx-key */

import * as Text from '@pluralsight/ps-design-system-text'
import SearchInput from '@pluralsight/ps-design-system-searchinput'
import { Meta, Story } from '@storybook/react/types-6-0'
import { matchSorter } from 'match-sorter'
import React, { useEffect, useMemo, useState } from 'react'
import {
  FilterValue,
  IdType,
  Row,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable
} from 'react-table'

import { generateUserCourseViews } from './seed'
import Table from '..'

export default {
  title: 'Components/Table/react-table',
  component: Table,
  parameters: {
    center: { disabled: true }
  }
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
  const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), [])

  const data = useMemo(() => generateUserCourseViews(), []) as any
  const filterTypes = useMemo(() => ({ text: fuzzyTextFilter }), [])

  const plugins = [useFilters, useGlobalFilter]
  const table = useTable(
    { columns, data, defaultColumn, filterTypes },
    ...plugins
  )

  return (
    <>
      <GlobalFilter
        globalFilter={table.state.globalFilter}
        setGlobalFilter={table.setGlobalFilter}
      />

      <Table {...table.getTableProps()}>
        <Table.Head>
          {table.headerGroups.map(group => (
            <Table.Row {...group.getHeaderGroupProps()}>
              {group.headers.map(column => {
                return (
                  <Table.Header {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {column.canFilter && column.render('Filter')}
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

const ColumnFilter: React.FC<{
  column: {
    filterValue?: string
    setFilter: (value?: string) => void
  }
}> = props => {
  const { filterValue = '', setFilter } = props.column
  const [value, setValue] = useState(filterValue)

  useEffect(() => {
    setValue(filterValue || '')
  }, [filterValue])

  useEffect(() => {
    setFilter(value)
  }, [value, setFilter])

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = evt => {
    setValue(evt.target.value)
  }
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    setValue(evt.target.value)
  }

  return (
    <SearchInput onBlur={handleBlur} onChange={handleChange} value={value} />
  )
}

const GlobalFilter: React.FC<{
  globalFilter?: string
  setGlobalFilter: (value?: string) => void
}> = props => {
  const { globalFilter = '', setGlobalFilter } = props
  const [value, setValue] = useState(globalFilter)

  useEffect(() => {
    setValue(globalFilter || '')
  }, [globalFilter])

  useEffect(() => {
    setGlobalFilter(value)
  }, [value, setGlobalFilter])

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = evt => {
    setValue(evt.target.value)
  }
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    setValue(evt.target.value)
  }

  return (
    <div style={{ display: 'flex', padding: 40 }}>
      <Text.P style={{ marginRight: 10 }}>Search:</Text.P>

      <SearchInput
        onBlur={handleBlur}
        onChange={handleChange}
        style={{ flex: 1 }}
        value={value}
      />
    </div>
  )
}

function fuzzyTextFilter<T extends Record<string, unknown>>(
  rows: Array<Row<T>>,
  id: IdType<T>,
  filterValue: FilterValue
) {
  return matchSorter(rows, filterValue, {
    keys: [(row: Row<T>) => row.values[id]]
  })
}
fuzzyTextFilter.autoRemove = (val: unknown) => !val

function startsWithFilter<T extends Record<string, unknown>>(
  rows: Array<Row<T>>,
  id: IdType<T>,
  filterValue: FilterValue
) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue !== undefined
      ? String(rowValue)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase())
      : true
  })
}
startsWithFilter.autoRemove = (val: unknown) => !val
