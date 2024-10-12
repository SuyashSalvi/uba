import EmptyList from '@/components/home/EmptyList';
import { fetchProjects, deleteProjectAction } from '@/utils/actions';
import Link from 'next/link';

import { formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';

async function ProjectsPage() {
  const projects = await fetchProjects();

  if (projects.length === 0) {
    return (
      <EmptyList
        heading='No projects to display.'
        message="Don't hesitate to create a project."
      />
    );
  }


  return (
    <div>
      Projects
    </div>
  )

  // return (
  //   <div className='mt-16'>
  //     <h4 className='mb-4 capitalize'>Active Properties : {projects.length}</h4>
  //     <Table>
  //       <TableCaption>A list of all your projects.</TableCaption>
  //       <TableHeader>
  //         <TableRow>
  //           <TableHead>Project Name</TableHead>
  //           <TableHead>Actions</TableHead>
  //         </TableRow>
  //       </TableHeader>
  //       <TableBody>
  //         {projects.map((project) => {
  //           const { id: projectId, name } = project;
  //           // const { totalNightsSum, orderTotalSum } = project;
  //           return (
  //             <TableRow key={projectId}>
  //               <TableCell>
  //                 <Link
  //                   href={`/projects1/${projectId}`}
  //                   className='underline text-muted-foreground tracking-wide'
  //                 >
  //                   {name}
  //                 </Link>
  //               </TableCell>
        

  //               <TableCell className='flex items-center gap-x-2'>
  //                 <Link href={`/projects/${projectId}/edit`}>
  //                   <IconButton actionType='edit'></IconButton>
  //                 </Link>
  //                 <DeleteRental projectId={projectId} />
  //               </TableCell>
  //             </TableRow>
  //           );
  //         })}
  //       </TableBody>
  //     </Table>
  //   </div>
  // );
}

function DeleteRental({ projectId }: { projectId: string }) {
  const deleteProject = deleteProjectAction.bind(null, { projectId });
  return (
    <FormContainer action={deleteProject}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}

export default ProjectsPage;
