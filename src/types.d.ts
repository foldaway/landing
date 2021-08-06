declare module '*.jpg';
declare module '*.png';

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };

  export default string;
}

declare module '!url-loader!*' {
  const contents: string;
  export = contents;
}

declare module '*.yml' {
  const content: { [key: string]: any };
  export default content;
}
