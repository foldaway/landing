type ParagraphProps = {
  children: React.ReactNode;
};

export function Paragraph(props: ParagraphProps) {
  return (
    <p className="leading-relaxed text-neutral-900 dark:text-neutral-50">
      {props.children}
    </p>
  );
}
