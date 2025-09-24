'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskSection from '@/components/ui/TaskSection';

const TasksPage = () => {
  return (
    <DashboardLayout>
      <TaskSection />
    </DashboardLayout>
  );
};

export default TasksPage;