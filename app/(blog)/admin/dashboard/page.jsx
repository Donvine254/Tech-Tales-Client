import Dashboard from "./Dashboard";
import { baseUrl } from "@/lib";
export default async function Page() {
  const blogs = await fetch(`${baseUrl}/blogs`).then((response) =>
    response.json()
  );

  return (
    <section className="w-full mx-auto m-2 min-h-[320px] px-8 md:w-4/5 md:mt-10 font-poppins">
      <Dashboard blogs={blogs} />
    </section>
  );
}
