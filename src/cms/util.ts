import fs from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import path from 'path';

import { CMSContextWrapperProps } from './CMSContextWrapper';

export function readMDXFile(filePath: string) {
  if (fs.existsSync(filePath) === false) {
    throw new Error(`File path does not exist: ${filePath}`);
  }

  const fileData = fs.readFileSync(filePath, { encoding: 'utf8' });
  const parsedData = matter(fileData, {
    engines: {
      //@ts-ignore
      yaml: s => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  const { data } = parsedData;

  return data;
}

export function readCMSContextWrapperProps(): CMSContextWrapperProps {
  return {
    siteConfiguration: readSiteConfig(),
  };
}

export function readSiteConfig() {
  const siteConfigDir = path.join(process.cwd(), 'content/site_configuration');
  const configData = readMDXFile(
    path.join(siteConfigDir, 'site-configuration.mdx')
  );

  return configData as CMS.SiteConfiguration;
}

export function readPosts() {
  const dir = path.join(process.cwd(), 'content/post');

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.mdx'));

  const categories = files.map(file => {
    const data = readMDXFile(path.join(dir, file));

    return data;
  });

  return categories as CMS.Post[];
}
