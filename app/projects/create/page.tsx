import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createProjectAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';
// import CountriesInput from '@/components/form/CountriesInput';
import ImageInput from '@/components/form/ImageInput';
import CounterInput from '@/components/form/CounterInput';
// import AmenitiesInput from '@/components/form/AmenitiesInput';
function CreatePropertyPage() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        create project
      </h1>
      <div className='border p-8 rounded'>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>
        <FormContainer action={createProjectAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='name'
              type='text'
              label='Name (20 limit)'
              defaultValue='test project'
            />
            {/* <FormInput
              name='tagline'
              type='text'
              label='Tagline (30 limit)'
              defaultValue=''
            /> */}
            {/* price */}
            {/* <PriceInput /> */}
            {/* categories */}
            {/* <CategoriesInput /> */}
          </div>
          {/* text area / description */}
          <TextAreaInput
            name='description'
            labelText='Description (10 - 1000 words)'
          />
        
          {/* <h3 className='text-lg mt-8 mb-4 font-medium'>
            Accommodation Details
          </h3>
          <CounterInput detail='guests' />
          <CounterInput detail='bedrooms' />
          <CounterInput detail='beds' />
          <CounterInput detail='baths' /> */}
          {/* <h3 className='text-lg mt-10 mb-6 font-medium'>Amenities</h3>
          <AmenitiesInput /> */}
           <ImageInput />
          <SubmitButton text='create project' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreatePropertyPage;
