import { PageHeader, ProjectInteractiveButtons } from "@/components";
import TasksList from "@/components/tasks/TasksList";
import { getProjectById } from "@/db/getProjectById";

const page = async ({ params }) => {
  const project = await getProjectById(params.id);

  return (
    <>
      <div className="mb-10 grid gap-4 md:flex md:items-end md:justify-between">
        <PageHeader
          type="project"
          title={
            <>
              <div className="flex gap-4 items-center">
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
      {/* <div className="overflow-hidden">
        <pre>{JSON.stringify(project, null, 4)}</pre>
      </div> */}
    </>
  );
};
export default page;
