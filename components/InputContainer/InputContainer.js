/**
 * A simple wrapper for input components. It adds a label and some styles.
 */
const InputContainer = ({ label, children }) => 
  <div>
    <label>{label}</label>
    {children}

    <style jsx>{`
      div {
        width: 100%;
        text-align: left;
        margin-bottom: 12px;
      }
      label {
        display: block;
        font-size: 14px;
        margin-bottom: 2px;
      }
      
    `}</style>

  </div>

export default InputContainer;