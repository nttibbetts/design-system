import Avatar from '@pluralsight/ps-design-system-avatar'
import Button from '@pluralsight/ps-design-system-button'
import Checkbox from '@pluralsight/ps-design-system-checkbox'
import { CloseIcon, PlusIcon } from '@pluralsight/ps-design-system-icon'
import { layout } from '@pluralsight/ps-design-system-core'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

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
          <Table.Header>First name</Table.Header>
          <Table.Header>Last name</Table.Header>
          <Table.Header>Email</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((user, i) => (
          <Table.Row key={i}>
            <Table.Header>{user.firstName}</Table.Header>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export const MixedContent: Story = () => {
  const data = new Array(5).fill(null).map(() => generateUser())

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>First name</Table.Header>
          <Table.Header>Last name</Table.Header>
          <Table.Header>Email</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((user, i) => (
          <Table.Row key={i}>
            <Table.Header>
              <FlexContainer>
                <Avatar alt="avatar" name={`${user.firstName}`} size="xSmall" />
                <HorzSpacer />
                <span>{user.firstName}</span>
              </FlexContainer>
            </Table.Header>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export const Sorting: Story = () => {
  const data = new Array(5).fill(null).map(() => generateUser())

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header sort="asc">First name</Table.Header>
          <Table.Header sort="desc">Last name</Table.Header>
          <Table.Header sort>Email</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((user, i) => (
          <Table.Row key={i}>
            <Table.Header>{user.firstName}</Table.Header>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export const Alignment: Story = () => {
  const data = new Array(5).fill(null).map(() => generateUser())

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header align="left">First name</Table.Header>
          <Table.Header align="center">Last name</Table.Header>
          <Table.Header align="right">Email</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((user, i) => (
          <Table.Row key={i}>
            <Table.Header align="left">{user.firstName}</Table.Header>
            <Table.Cell align="center">{user.lastName}</Table.Cell>
            <Table.Cell align="right">{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export const Expandable: Story = () => {
  const data = React.useMemo(
    () => new Array(5).fill(null).map(() => generateUser()),
    []
  )
  const [expandedRows, setExpandedRows] = React.useState<number[]>([1])

  const isExpanded = (i: number) => expandedRows.includes(i)
  const collapse = (i: number) => {
    const nextValue = expandedRows.filter(num => num !== i)
    setExpandedRows(nextValue)
  }
  const expand = (i: number) => {
    const nextValue = expandedRows.concat(i)
    setExpandedRows(nextValue)
  }

  const toggle = (_evt: React.MouseEvent<HTMLButtonElement>, i: number) => {
    const fn = isExpanded(i) ? collapse : expand
    fn(i)
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>First name</Table.Header>
          <Table.Header>Last name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Cell />
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((user, i) => {
          const expanded = isExpanded(i)

          return (
            <React.Fragment key={i}>
              <Table.Row>
                <Table.Header>{user.firstName}</Table.Header>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Button
                    appearance="flat"
                    onClick={evt => toggle(evt, i)}
                    icon={expanded ? <CloseIcon /> : <PlusIcon />}
                    size="xSmall"
                    title="Expand/Collapse additional content"
                  />
                </Table.Cell>
              </Table.Row>

              <Table.Row expanded={expanded}>
                <Table.Cell colSpan={4}>
                  <OutlineBox>Drawer Content</OutlineBox>
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export const RowSelection: Story = () => {
  const data = new Array(10).fill(null).map(() => generateUser())

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>
            <Checkbox indeterminate />
          </Table.Header>
          <Table.Header>First name</Table.Header>
          <Table.Header>Last name</Table.Header>
          <Table.Header>Email</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((user, i) => {
          const selected = i % 3 === 1

          return (
            <Table.Row key={i} selected={selected}>
              <Table.Cell>
                <Checkbox checked={selected} />
              </Table.Cell>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

const HorzSpacer: React.FC = props => (
  <div style={{ height: '100%', width: layout.spacingSmall }} {...props} />
)

const FlexContainer: React.FC = props => (
  <div style={{ display: 'flex', alignItems: 'center' }} {...props} />
)

const OutlineBox: React.FC = props => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      outline: '2px dashed pink',
      padding: 20
    }}
    {...props}
  />
)
