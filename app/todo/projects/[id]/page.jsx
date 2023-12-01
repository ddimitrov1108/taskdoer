import { PageHeader } from "@/components";
import { ProjectInteractiveButtons } from "@/components/interactive-buttons";
import { TasksList } from "@/components/tasks";
import { getProjectById } from "@/db/getProjectById";
import { redirect } from "next/navigation";

export const revalidate = 30

const page = async ({ params }) => {
  const project = await getProjectById(params.id);

  if(!project)
  return redirect("/todo");

  return (
    <>
      <div className="mb-10 grid gap-4 md:flex md:items-end md:justify-between">
        <PageHeader
          type="project"
          title={
            <>
              <div className="flex gap-3 items-center">
                <div
                  className="min-w-[14px] min-h-[14px] rounded-full"
                  style={{ backgroundColor: project.color }}
                ></div>
                {project.name}
              </div>
            </>
          }
        />

        <ProjectInteractiveButtons
          project={{ name: project.name, color: project.color }}
        />
      </div>

      <TasksList tasks={project.tasks} />
    </>
  );
};
export default page;
