import { useFormContext } from "react-hook-form";

function Completed() {
  const { reset } = useFormContext();

  function handleContinue() {
    reset();
  }

  return (
    <section className="flex w-[100dvw] justify-center bg-white lg:w-max">
      <div className="flex w-full max-w-[36rem] flex-col items-center px-[1.4375rem] pb-[2.875rem] pt-6 text-center lg:w-[23.875rem] lg:p-0">
        <img
          src="./images/icon-complete.svg"
          alt="icon completed"
          className="mb-8"
        />

        <div className="flex flex-col gap-3 font-semibold">
          <h1 className="text-[1.75rem] uppercase tracking-widest text-very-dark-violet">
            Thank you!
          </h1>
          <p className="text-lg text-dark-violet">
            We've added your card details
          </p>
        </div>

        <button
          type="submit"
          className="mt-11 w-full rounded-lg bg-very-dark-violet py-3 text-lg text-white transition-all duration-100 hover:bg-[#1a0726] focus:outline-offset-[0.1875rem] focus:outline-light-purple lg:mt-14"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </section>
  );
}

export default Completed;
