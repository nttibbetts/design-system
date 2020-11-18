/* eslint-disable react/jsx-key */

import * as Text from '@pluralsight/ps-design-system-text'
import SearchInput from '@pluralsight/ps-design-system-searchinput'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useMemo } from 'react'
import { useGlobalFilter, useSortBy, useTable } from 'react-table'

import { generateUserCourseViews } from './seed'
import Table from '..'

export default {
  title: 'Components/Table/react-table',
  component: Table,
  decorators: [
    Story => (
      <div style={{ padding: 30 }}>
        <Story />
      </div>
    )
  ],
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

  const data = useMemo(() => generateUserCourseViews(100), []) as any

  const plugins = [useGlobalFilter]
  const table = useTable({ columns, data }, ...plugins)

  const onSearchBlur: React.FocusEventHandler<HTMLInputElement> = evt => {
    table.setGlobalFilter(evt.target.value)
  }
  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    table.setGlobalFilter(evt.target.value)
  }
  return (
    <>
      <div style={{ display: 'flex', padding: 40 }}>
        <Text.P style={{ marginRight: 10 }}>Search:</Text.P>

        <SearchInput
          onBlur={onSearchBlur}
          onChange={onSearchChange}
          style={{ flex: 1 }}
          value={table.state.globalFilter}
        />
      </div>

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
    </>
  )
}
