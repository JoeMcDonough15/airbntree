import ErrorText from "../ErrorText";

const FormField = ({
  labelText,
  inputType,
  inputVal,
  setInputVal,
  inputId,
  errorText,
  errorIsInline = false,
}) => {
  return (
    <div className="form-field flex-container col">
      {errorIsInline ? (
        <>
          <div className="flex-container">
            <label htmlFor={inputId}>{labelText}</label>
            <ErrorText text={errorText} />
          </div>
          <input
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            placeholder={labelText}
            id={inputId}
            type={inputType}
          />
        </>
      ) : (
        <>
          <label htmlFor={inputId}>
            {inputType === "textarea" ? (
              <textarea
                id={inputId}
                onChange={(e) => {
                  setInputVal(e.target.innerText);
                }}
              >
                {inputVal}
              </textarea>
            ) : (
              <>
                {inputId === "price-input" && (
                  <span className="dollar-sign">$</span>
                )}
                <input
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                  }}
                  placeholder={labelText}
                  type={inputType}
                  id={inputId}
                />
              </>
            )}
          </label>
          <ErrorText text={errorText} />
        </>
      )}
    </div>
  );
};

export default FormField;
