import { Heading } from '@pluralsight/ps-design-system-text'
import {
  names as themeNames,
  useTheme
} from '@pluralsight/ps-design-system-theme'
import {
  HTMLPropsFor,
  RefForwardingComponent,
  ValueOf
} from '@pluralsight/ps-design-system-util'
import { css } from 'glamor'
import React from 'react'

import stylesheet from '../css'

const styles = {
  dataWell: (themeName: ValueOf<typeof themeNames>) =>
    css(
      stylesheet['.psds-datawell'],
      stylesheet[`.psds-datawell.psds-theme--${themeName}`]
    ),
  label: (themeName: ValueOf<typeof themeNames>) =>
    css(
      stylesheet['.psds-datawell__label'],
      stylesheet[`.psds-datawell__label.psds-theme--${themeName}`]
    ),
  data: (themeName: ValueOf<typeof themeNames>) =>
    css(
      stylesheet['.psds-datawell__data'],
      stylesheet[`.psds-datawell__data.psds-theme--${themeName}`]
    ),
  subLabel: (themeName: ValueOf<typeof themeNames>) =>
    css(
      stylesheet['.psds-datawell__sublabel'],
      stylesheet[`.psds-datawell__sublabel.psds-theme--${themeName}`]
    )
}

interface DataWellProps extends HTMLPropsFor<'div'> {
  label: string
  subLabel?: React.ReactNode
}

interface DataWellStatics {}

interface DataWellComponent
  extends RefForwardingComponent<
    DataWellProps,
    HTMLDivElement,
    DataWellStatics
  > {}

const DataWell = React.forwardRef((props, ref) => {
  const { children, label, subLabel, ...rest } = props
  const themeName = useTheme()

  return (
    <div ref={ref} {...styles.dataWell(themeName)} {...rest}>
      <Heading {...styles.label(themeName)} size={Heading.sizes.smallCaps}>
        <div>{label}</div>
      </Heading>

      <div {...styles.data(themeName)}>{children}</div>
      <div {...styles.subLabel(themeName)}>{subLabel}</div>
    </div>
  )
}) as DataWellComponent

export default DataWell
