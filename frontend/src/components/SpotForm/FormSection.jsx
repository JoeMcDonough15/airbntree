const FormSection = ({ headerText, sectionDescription, children }) => {
  return (
    <div className="form-section">
      <h2>{headerText}</h2>
      <p>{sectionDescription}</p>
      {children}
    </div>
  );
};

export default FormSection;
