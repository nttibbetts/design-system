import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'

import { generateUser } from './seed'
import Table from '..'

export default {
  title: 'Components/Table',
  component: Table
} as Meta

export const Basic: Story = () => {
  const data = new Array(5).fill(null).map(() => generateUser())

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>first name</Table.Header>
          <Table.Header>last name</Table.Header>
          <Table.Header>email</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((user, i) => (
          <Table.Row key={i}>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
