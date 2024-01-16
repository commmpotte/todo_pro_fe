import styles from './Button.module.css'

function Button(props) {
  const { children, disabled = false, tooltip } = props

  return (
    <div className={styles.tooltipContainer} data-tooltip={tooltip}>
      <button {...props} className={styles.button} disabled={disabled}>
        {children}
      </button>
    </div>
  )
}

export default Button
