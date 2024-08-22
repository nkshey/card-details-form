import { FormProvider, useForm } from "react-hook-form";
import CardContainer from "./card/CardContainer";
import CardForm from "./form/CardForm";
import Completed from "./form/Completed";

function App() {
  const methods = useForm();
  const {
    formState: { isSubmitSuccessful },
  } = methods;

  return (
    <FormProvider {...methods}>
      <main
        className={`flex flex-col items-center lg:grid lg:grid-cols-[minmax(27.9375rem,33.75rem)_1fr] lg:justify-items-center lg:gap-32 lg:px-[2.125rem] ${isSubmitSuccessful && "gap[13vw]"}`}
      >
        <CardContainer />
        {!isSubmitSuccessful ? <CardForm /> : <Completed />}
      </main>
    </FormProvider>
  );
}

export default App;
