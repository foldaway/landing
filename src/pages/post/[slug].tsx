import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { get, set } from '../../buildCache';
import CMSContextWrapper, {
  CMSContextWrapperProps,
} from '../../cms/CMSContextWrapper';
import MDX from '../../cms/MDX';
import { readCMSContextWrapperProps, readMDXFile } from '../../cms/util';
import Layout from '../../layouts/Layout';
import mdxComponents from '../../mdxComponents';
import generateSlug from '../../util/generateSlug';

interface Props extends CMSContextWrapperProps {
  post: CMS.Post;
}

const EventTemplate: React.FC<Props> = function(props) {
  const { post } = props;
  const { title, content, pub_date, author } = post;

  return (
    <CMSContextWrapper {...props}>
      <Layout>
        <h1>{title}</h1>
        <span>By {author}</span>
        <time dateTime={pub_date}>{pub_date}</time>
        <MDX components={mdxComponents}>{content}</MDX>
      </Layout>
    </CMSContextWrapper>
  );
};

export default EventTemplate;

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slug = params?.slug ?? null;

  if (slug === null) {
    throw new Error(`invalid file for slug '${slug}'`);
  }

  const filePath = await get(['post', slug]);
  if (filePath === null) {
    throw new Error(`missing buildCache entry for '${slug}'`);
  }

  const post = readMDXFile(filePath) as CMS.Post;

  const cmsContextWrapperProps = readCMSContextWrapperProps();

  return {
    props: {
      post,
      ...cmsContextWrapperProps,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const dir = path.join(process.cwd(), 'content/post');

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.mdx'));

  const paths = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const post = readMDXFile(filePath);

    const slug = generateSlug(post.title);
    await set(['post', slug], filePath);

    paths.push({
      params: {
        slug,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};
