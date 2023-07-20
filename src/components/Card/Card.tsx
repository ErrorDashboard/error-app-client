import React, { type ReactNode } from 'react';

interface CardProps {
  body?: ReactNode;
  bodyClassName?: string;
  containerClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
  header?: ReactNode;
  headerClassName?: string;
}

const Card = ({
  body,
  footer,
  header,
  bodyClassName,
  containerClassName,
  headerClassName,
  footerClassName,
}: CardProps) => {
  const containerClasses = `rounded ${containerClassName}`;
  const bodyClasses = `card-body ${bodyClassName}`;
  const headerClasses = `card-header ${headerClassName}`;
  const footerClasses = `card-footer ${footerClassName}`;

  return (
    <div className={containerClasses}>
      {header && <div className={headerClasses}>{header}</div>}
      {body && <div className={bodyClasses}>{body}</div>}
      {footer && <div className={footerClasses}>{footer}</div>}
    </div>
  );
};

export default Card;
