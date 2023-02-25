import classNames from "classnames";
import Image from "next/image";

import { Tooltip } from "./Tooltip";

type ProjectProps = {
  project: GitHub.GraphQL.API.PinnableItemEdge;
  contributors: GitHub.GraphQL.API.User[];
};

export default function Project(props: ProjectProps) {
  return (
    <div
      key={props.project.cursor}
      className="group transition-transform hover:-translate-y-0.5"
    >
      <a
        className={classNames(
          "flex justify-between rounded-md py-4 px-6",
          "transition-shadow dark:transition-colors",
          // Background
          "bg-white dark:bg-gradient-to-b dark:from-neutral-700 dark:to-neutral-800",
          // Light mode: shadows
          "shadow-skeuo group-hover:shadow-skeuo-lg dark:shadow-none",
          // Dark mode: borders
          "border border-transparent dark:border-neutral-600 dark:group-hover:border-neutral-500"
        )}
        href={props.project.node.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-col gap-1">
          <h3>
            <span className="group-hover:underline">
              {props.project.node.name}
            </span>
            <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
              &nbsp;↗
            </span>
          </h3>
          <p className="text-sm text-neutral-400 line-clamp-1">
            {props.project.node.description}
          </p>
        </div>
        <div className="flex items-center">
          {props.contributors.map((contributor) => (
            <Tooltip key={contributor.login} content={contributor.login}>
              <Image
                src={contributor.avatarUrl}
                alt={contributor.login}
                height={24}
                width={24}
                className="-ml-1 rounded-full first:ml-0"
              />
            </Tooltip>
          ))}
        </div>
      </a>
    </div>
  );
}
