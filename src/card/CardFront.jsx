import { useFormContext } from "react-hook-form";

function CardFront() {
  const { watch } = useFormContext();
  const cardNumber = watch("cardNumber", "");
  const cardHolderName = watch("name");
  const expiryMonth = watch("expiryMonth");
  const expiryYear = watch("expiryYear");

  const formatCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    const padded = cleaned.padEnd(16, "0");
    return padded.match(/.{1,4}/g).join(" ");
  };

  const formattedCardNumber = formatCardNumber(cardNumber);

  return (
    <div className="absolute bottom-0 left-0 w-[17.875rem] lg:bottom-auto lg:top-0 lg:w-[27.9375rem]">
      <div className="relative">
        <img
          src="./images/bg-card-front.png"
          alt="front of the credit card"
          className="w-full"
        />

        <div>
          <img
            src="./images/card-logo.svg"
            alt="card logo"
            className="absolute left-5 top-[1.125rem] w-14 lg:left-8 lg:top-7 lg:w-[5.25rem]"
          />

          <div className="absolute bottom-0 flex w-full flex-col gap-3 px-5 pb-[1.125rem] text-white lg:gap-7 lg:px-8 lg:pb-[1.375rem]">
            <p className="flex justify-between pr-1 text-lg tracking-[0.12em] lg:pr-2 lg:text-[1.75rem]">
              {formattedCardNumber.split(" ").map((segment, i) => (
                <span key={i}>{segment}</span>
              ))}
            </p>

            <div className="flex justify-between text-[0.625rem] tracking-[0.12em] lg:text-[0.9063rem]">
              <p className="uppercase">{cardHolderName || "Jane Appleseed"}</p>
              <span>
                {expiryMonth < 10 && expiryMonth.length === 1
                  ? `0${expiryMonth}`
                  : expiryMonth || "00"}
                /
                {expiryYear < 10 && expiryYear.length === 1
                  ? `0${expiryYear}`
                  : expiryYear || "00"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardFront;
