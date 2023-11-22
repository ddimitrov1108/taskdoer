import { getProjectById } from "@/server/db/getProjectById";

const page = async ({ params }) => {
  const data = await getProjectById(params.id);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};
export default page;
