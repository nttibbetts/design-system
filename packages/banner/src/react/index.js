import { css } from 'glamor'
import Icon from '@pluralsight/ps-design-system-icon/react.js'
import PropTypes from 'prop-types'
import React from 'react'

import stylesheet from '../css/index.js'
import * as vars from '../vars/index.js'

const styles = {
  banner: ({ color }) =>
    css(stylesheet['.psds-banner'], stylesheet[`.psds-banner--color-${color}`]),
  dismiss: () =>
    css(stylesheet['.psds-banner__dismiss'], {
      ':hover': stylesheet['.psds-banner__dismiss:hover']
    }),
  text: () =>
    css(stylesheet['.psds-banner__text'], {
      '& a': stylesheet['.psds-banner__text a'],
      '& a:hover': stylesheet['.psds-banner__text a:hover'],
      '& a:active': stylesheet['.psds-banner__text a:active'],
      '& a:focus': stylesheet['.psds-banner__text a:focus']
    })
}

const Banner = props => (
  <div
    {...styles.banner(props)}
    {...(props.style ? { style: props.style } : null)}
    {...(props.className ? { className: props.className } : null)}
  >
    <div {...styles.text(props)}>{props.children}</div>
    {props.onClick && (
      <button {...styles.dismiss(props)} onClick={props.onClick}>
        <Icon id={Icon.ids.close} />
      </button>
    )}
  </div>
)
Banner.displayName = 'Banner'
Banner.propTypes = {
  color: PropTypes.oneOf(Object.keys(vars.colors)),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}
Banner.defaultProps = {
  color: vars.colors.blue
}
Banner.colors = vars.colors

export const colors = vars.colors

export default Banner
