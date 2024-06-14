import classes from './Input.module.css'

function Input({ label, id, error, ...props }) {
  return (
    <div className={classes.inputContainer}>
      <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} />
      </div>
      <div className={classes.inputError}>{error && <p>{error}</p>}</div>
    </div>
  )
}

export default Input
