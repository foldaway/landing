// Modified from https://github.com/mdx-js/mdx/blob/main/packages/runtime/src/index.js
//
// The MIT License (MIT)
//
// Copyright (c) 2017-2018 Compositor and Vercel, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// @ts-ignore
import mdx from '@mdx-js/mdx';
import { mdx as createElement, MDXProvider } from '@mdx-js/react';
// @ts-ignore
import { transform } from 'buble-jsx-only';
import React from 'react';
import styled from 'styled-components';

const suffix = `return React.createElement(
  MDXProvider,
  {components},
  React.createElement(MDXContent, props)
)`;

const Error = styled.pre`
  color: #e22424;
  display: block;
`;

interface Props {
  scope?: any;
  components?: { [name: string]: any };
  remarkPlugins?: any[];
  rehypePlugins?: any[];
}

const MDX: React.FC<Props> = function({
  scope = {},
  components = {},
  remarkPlugins = [],
  rehypePlugins = [],
  children,
  ...props
}) {
  const fullScope = {
    mdx: createElement,
    MDXProvider,
    components,
    props,
    ...scope,
  };

  let jsx;

  try {
    jsx = mdx
      .sync(children, {
        remarkPlugins,
        rehypePlugins,
        skipExport: true,
        commonmark: true,
      })
      .trim();
  } catch (e) {
    return <Error>An error occurred: {e.message}</Error>;
  }

  const code = transform(jsx, { objectAssign: 'Object.assign' }).code;

  const keys = Object.keys(fullScope);
  const values = Object.values(fullScope);

  // eslint-disable-next-line no-new-func
  const fn = new Function('React', ...keys, `${code}\n\n${suffix}`);

  return fn(React, ...values);
};

export default MDX;
