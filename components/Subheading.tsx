type SubheadingProps = {
  children: React.ReactNode;
};

export function Subheading(props: SubheadingProps) {
  return (
    <h2 className="pt-12 text-neutral-400 dark:text-neutral-500">
      {props.children}
    </h2>
  );
}
