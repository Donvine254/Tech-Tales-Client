

export default function categories({params}) {
  console.log(params);
  return (
    <div>
      <h1>These are the {params.categories} blogs</h1>
    </div>
  );
}
