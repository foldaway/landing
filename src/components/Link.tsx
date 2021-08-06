import NextLink from 'next/link';
import React from 'react';

interface Props {
  className?: string;
  href: string;
}

const Link: React.FC<Props> = function(props) {
  const { href, children, className } = props;

  return (
    <NextLink href={href} passHref>
      <a className={className}>{children}</a>
    </NextLink>
  );
};

export default Link;
