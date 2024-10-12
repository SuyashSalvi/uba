// import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import ImageContainer from '@/components/properties/ImageContainer';
// import ShareButton from '@/components/properties/ShareButton';
import UserInfo from '@/components/properties/UserInfo';
import { Separator } from '@/components/ui/separator';
import { fetchProjectDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';
import Description from '@/components/properties/Description';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';




// const DynamicMap = dynamic(
//   () => import('@/components/properties/projectMap'),
//   {
//     ssr: false,
//     loading: () => <Skeleton className='h-[400px] w-full' />,
//   }
// );

// const DynamicBookingWrapper = dynamic(
//   () => import('@/components/booking/BookingWrapper'),
//   {
//     ssr: false,
//     loading: () => <Skeleton className='h-[200px] w-full' />,
//   }
// );

async function projectDetailsPage({ params }: { params: { id: string } }) {
  const project = await fetchProjectDetails(params.id);
  if (!project) redirect('/');
  const firstName = project.user.firstName;
  const profileImage = project.user.profileImage || "";


  return (
    <section>
        <h1>Projects list</h1>
      <BreadCrumbs name={project.name} />
      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{project.name}</h1>
        <div className='flex items-center gap-x-4'>
          {/* share button */}
          {/* <ShareButton name={project.name} projectId={project.id} /> */}
          {/* <FavoriteToggleButton projectId={project.id} /> */}
        </div>
      </header>

      <ImageContainer mainImage={project.image} name={project.name} />

      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>

        <div className='lg:col-span-8'>
          <div className='flex gap-x-4 items-center'>
            <h1 className='text-xl font-bold'>{project.name} </h1>
          </div>

          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className='mt-4' />
          <Description description={project.description} />
          
        </div>
      </section>
    </section>
  );
}

export default projectDetailsPage;