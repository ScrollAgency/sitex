import React, { useState, useEffect, ReactNode, cloneElement, isValidElement } from "react";

interface FormProps {
  children: ReactNode,
  className?: string 
}

const Form: React.FC<FormProps> = ({ children, className }) => {    
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <form className={ className }>
      { children }
    </form>
  );
};

export default Form; 
     