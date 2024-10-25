export default function ComponentValue({ StringValue }: { StringValue: string }) {
  return (
    <div>
      <p className="font-bold">{StringValue}</p>
    </div>
  );
}
