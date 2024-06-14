import classes from './Input.module.css'

function Input({ label, id, error, ...props }) {
  return (
    <div className={classes.input_container}>
      <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} />
      </div>
      <div className={classes.input_error}>{error && <p>{error}</p>}</div>
    </div>
  )
}

export default Input
