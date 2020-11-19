import {
  colorsBackgroundDark,
  colorsBackgroundLight,
  colorsBorder,
  colorsTextIcon,
  layout,
  type
} from '@pluralsight/ps-design-system-core'
import { names as themeNames } from '@pluralsight/ps-design-system-theme'

import { aligns } from '../vars'

const dark = `.psds-theme--${themeNames.dark}`
const light = `.psds-theme--${themeNames.light}`

export default {
  '.psds-table__container': {
    label: 'table__container',

    // overflowX: 'auto',
    width: '100%'
  },

  '.psds-table': {
    label: 'table',

    '--table-border-color': 'transparent',
    '--table-header-sticky-bg': 'transparent',
    '--table-row-hover-color': 'transparent',
    '--table-row-selected-color': 'transparent',
    '--table-text-color': 'initial',
    '--table-text-heading-color': 'initial',
    '--table-text-heading-color-hover': 'initial',
    '--table-padding': `${layout.spacingXSmall} ${layout.spacingSmall}`,

    borderCollapse: 'collapse',
    borderColor: 'var(--table-border-color)',
    color: 'var(--table-text-color)',
    fontSize: type.fontSizeSmall,
    fontWeight: type.fontWeightBook,
    lineHeight: type.lineHeightTight,
    verticalAlign: 'middle',
    width: '100%',

    '& > tbody': { verticalAlign: 'inherit' },
    '& > thead': { verticalAlign: 'bottom' }
  },
  [`.psds-table${dark}`]: {
    '--table-border-color': colorsBorder.lowOnDark,
    '--table-header-sticky-bg': colorsBackgroundDark[3],
    '--table-text-color': colorsTextIcon.highOnDark,
    '--table-text-heading-color': colorsTextIcon.lowOnDark,
    '--table-text-heading-color-hover': colorsTextIcon.highOnDark,
    '--table-row-hover-color': colorsBackgroundDark[1],
    '--table-row-selected-color': colorsBackgroundDark[3]
  },
  [`.psds-table${light}`]: {
    '--table-border-color': colorsBorder.lowOnLight,
    '--table-header-sticky-bg': colorsBackgroundLight[1],
    '--table-text-color': colorsTextIcon.highOnLight,
    '--table-text-heading-color': colorsTextIcon.lowOnLight,
    '--table-text-heading-color-hover': colorsTextIcon.highOnLight,
    '--table-row-hover-color': colorsBackgroundLight[3],
    '--table-row-selected-color': colorsBackgroundLight[1]
  },

  '.psds-table__body': { label: 'table__body' },

  '.psds-table__cell': {
    label: 'table__cell',

    padding: 'var(--table-padding)',
    textAlign: 'left'
  },
  [`.psds-table__cell--align-${aligns.center}`]: { textAlign: 'center' },
  [`.psds-table__cell--align-${aligns.left}`]: { textAlign: 'left' },
  [`.psds-table__cell--align-${aligns.right}`]: { textAlign: 'right' },

  '.psds-table__head': {
    label: 'table__head',

    color: 'var(--table-text-heading-color)',
    fontSize: type.fontSizeXSmall,
    fontWeight: type.fontWeightBook,
    textTransform: 'uppercase',

    '& >:first-of-type': { borderTop: 'none' }
  },

  '.psds-table__header': {
    label: 'table__header',

    fontWeight: type.fontWeightBold,
    padding: 'var(--table-padding)',
    textAlign: 'left'
  },
  [`.psds-table__header--align-${aligns.center}`]: { textAlign: 'center' },
  [`.psds-table__header--align-${aligns.left}`]: { textAlign: 'left' },
  [`.psds-table__header--align-${aligns.right}`]: { textAlign: 'right' },
  '.psds-table__header--sortable': {
    cursor: 'pointer',

    '&:hover': {
      color: 'var(--table-text-heading-color-hover)'
    }
  },
  '.psds-table__header__sort-icon': {
    label: 'table__header__sort-icon',

    '&&': {
      display: 'inline-block',
      verticalAlign: 'inherit'
    }
  },

  '.psds-table__row': {
    label: 'table__row',
    borderTop: '1px solid var(--table-border-color)',

    '&:hover > th, &:hover > td': {
      backgroundColor: 'var(--table-row-hover-color)'
    }
  },
  '.psds-table__row--collapsed': {
    display: 'none'
  },
  '.psds-table__row--selected': {
    '& > th, & > td': {
      backgroundColor: 'var(--table-row-selected-color)'
    }
  },
  '.psds-table__row--sticky': {
    '& > th, & > td': {
      backgroundColor: 'var(--table-header-sticky-bg)',
      boxShadow: '0 1px 0 var(--table-border-color)',
      position: 'sticky',
      top: 0
    }
  }
}
