import { getLabelById } from "@/db/getLabelById";

const page = async ({ params }) => {
  const data = await getLabelById(params.id);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};
export default page;
