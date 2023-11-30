"use client";

import { useState } from "react";

const TaskProvider = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div>TaskProvider</div>
  )
}
export default TaskProvider