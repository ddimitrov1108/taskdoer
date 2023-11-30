import { PageHeader, ProjectInteractiveButtons } from "@/components";
import TasksList from "@/components/tasks/TasksList";
import { getProjectById } from "@/db/getProjectById";

const page = async ({ params }) => {
  const project = await getProjectById(params.id);

  return (
    <>
      <div className="mb-10 grid gap-4 sm:flex sm:items-end sm:justify-between">
        <PageHeader
          type="project"
          title={
            <>
              <div className="flex gap-4 items-center">
                <div
                  className="w-3.5 h-3.5 rounded-full"
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
