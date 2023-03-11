type SectionProps = {
  heading: string;
  children: React.ReactNode;
};
4;
export function Section(props: SectionProps) {
  return (
    <div className="flex flex-col gap-4 pt-12">
      <h2 className="text-neutral-400 dark:text-neutral-500">
        {props.heading}
      </h2>
      {props.children}
    </div>
  );
}
