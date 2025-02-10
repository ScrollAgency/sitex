import React, { ReactNode } from "react";

interface FormProps {
  children: ReactNode,
  className?: string 
}

const Form: React.FC<FormProps> = ({ children, className }) => {    

  return (
    <form className={ className }>
      { children }
    </form>
  );
};

export default Form; 
     