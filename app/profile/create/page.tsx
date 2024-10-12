import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createProfileAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CreateProfilePage() {
  const user = await currentUser();
  if(user?.privateMetadata?.hasProfile) redirect("/")
  return (
    <section>
        <h1 className="capitalize font-semibold text-2xl mb-8">new user</h1>
        <div className="border max-w-lg rounded-md p-8">
            <FormContainer action={createProfileAction} >
                <div className="grid gap-4 mt-4">
                    <FormInput type="text" name="firstName" label="First Name"/>
                    <FormInput type="text" name="lastName" label="Last Name"/>
                    <FormInput type="text" name="username" label="Username"/>
                </div>
                <SubmitButton className="mt-4" text="create profile"></SubmitButton>
            </FormContainer>
        </div>
    </section>
  )
}

export default CreateProfilePage
