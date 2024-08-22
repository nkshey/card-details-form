import { useFormContext } from "react-hook-form";

function CardBack() {
  const { watch } = useFormContext();
  const cvc = watch("cvc", "");

  const formatCVC = (cvc) => {
    const cleaned = cvc.replace(/\D/g, "");
    return cleaned.padEnd(3, "0");
  };

  const formattedCVC = formatCVC(cvc);

  return (
    <div className="absolute right-0 top-0 w-[17.875rem] lg:bottom-0 lg:top-auto lg:w-[27.9375rem]">
      <div className="relative">
        <img
          src="./images/bg-card-back.png"
          alt="back of the credit card"
          className="w-full"
        />

        <div>
          <span className="absolute right-[2.375rem] top-[49%] -translate-y-1/2 text-[0.625rem] leading-none tracking-[0.12em] text-white lg:right-[3.625rem] lg:top-[49.5%] lg:text-[0.9063rem]">
            {formattedCVC}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardBack;
