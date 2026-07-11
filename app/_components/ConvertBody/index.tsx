// app\_components\ConvertBody\index.tsx
type ConvertBodyProps = {
  contentHTML: string;
};

export default function ConvertBody({ contentHTML }: ConvertBodyProps) {
  return <div dangerouslySetInnerHTML={{ __html: contentHTML }} />;
}
