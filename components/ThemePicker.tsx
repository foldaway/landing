import classNames from "classnames";
import { useTheme } from "next-themes";

import { useHasMounted } from "@/lib/useHasMounted";

import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";
import { SystemIcon } from "./icons/SystemIcon";

type ThemeToggleProps = {
  icon: () => JSX.Element;
  onClick: () => void;
  active: boolean;
};

function ThemePickerToggle(props: ThemeToggleProps) {
  const { icon: Icon } = props;

  return (
    <button
      onClick={props.onClick}
      className={classNames(
        "flex h-7 w-7 items-center justify-center rounded transition-all",
        props.active
          ? classNames(
              "text-neutral-900 dark:text-neutral-100",
              // Background
              "bg-gradient-to-b from-white via-white to-neutral-100 dark:from-neutral-700 dark:via-neutral-700 dark:to-neutral-800",
              // Shadows
              " shadow-skeuo-toggle dark:shadow-skeuo-toggle-dark"
            )
          : "text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 hover:dark:text-neutral-100"
      )}
    >
      <Icon />
    </button>
  );
}

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <div
      className={classNames(
        "relative isolate flex gap-x-1 overflow-hidden rounded-lg p-1",
        "transition-all",
        // Background
        "bg-neutral-100 dark:bg-neutral-800",
        // Shadows
        "shadow-skeuo-toggle-group dark:shadow-skeuo-toggle-group-dark"
      )}
    >
      <ThemePickerToggle
        icon={SunIcon}
        onClick={() => setTheme("light")}
        active={theme === "light"}
      />
      <ThemePickerToggle
        icon={MoonIcon}
        onClick={() => setTheme("dark")}
        active={theme === "dark"}
      />
      <ThemePickerToggle
        icon={SystemIcon}
        onClick={() => setTheme("system")}
        active={theme === "system"}
      />
    </div>
  );
}
