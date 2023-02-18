type ParagraphProps = {
  children: React.ReactNode;
};

export function Paragraph(props: ParagraphProps) {
  return (
    <p className="pt-4 leading-relaxed text-neutral-900 dark:text-neutral-50">
      {props.children}
    </p>
  );
}
