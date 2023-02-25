import classNames from "classnames";
import Image from "next/image";

type UserProps = {
  user: GitHub.GraphQL.API.User;
};

export function User(props: UserProps) {
  return (
    <a
      className="group"
      href={
        props.user.websiteUrl !== null && props.user.websiteUrl !== ""
          ? props.user.websiteUrl
          : props.user.url
      }
      target="_blank"
      rel="noreferrer"
    >
      <div
        className={classNames(
          "flex items-center gap-x-2",
          "text-neutral-900 dark:text-neutral-50"
        )}
      >
        <Image
          src={props.user.avatarUrl}
          alt={props.user.login}
          height={24}
          width={24}
          className="rounded-full"
        />
        <span className="flex items-start">
          <span className="group-hover:underline group-focus:underline">
            {props.user.name}
          </span>
          <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
            &nbsp;↗
          </span>
        </span>
      </div>
    </a>
  );
}
