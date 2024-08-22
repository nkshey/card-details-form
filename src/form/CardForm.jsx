import { useFormContext } from "react-hook-form";

const currentYear = new Date().getFullYear() % 100;
const currentMonth = new Date().getMonth() + 1;

export default function CardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    clearErrors,
  } = useFormContext();

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  function validateExpiryDate() {
    const expiryMonth = parseInt(getValues("expiryMonth"), 10);
    const expiryYear = parseInt(getValues("expiryYear"), 10);

    // Check if the month or year is invalid (e.g., 0 or 00)
    if (expiryMonth === 0 || expiryYear === 0) {
      setError("expiryMonth", { message: "Invalid date" });
      setError("expiryYear", { message: "Invalid date" });
      return false;
    }

    // Check if either field is empty
    if (!expiryMonth || !expiryYear) {
      setError("expiryYear", { message: "Can't be blank" });
      return false;
    }

    // Check if the card is expired
    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      setError("expiryMonth", { message: "Your card is expired" });
      setError("expiryYear", { message: "Your card is expired" });
      return false;
    }

    // Clear errors if everything is valid
    clearErrors("expiryMonth");
    clearErrors("expiryYear");
    return true;
  }

  return (
    <form
      className="flex w-[100dvw] items-center justify-center bg-white lg:h-dvh lg:w-max"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="flex max-w-[36rem] flex-col gap-5 px-[1.4375rem] pb-[2.875rem] pt-6 font-semibold text-very-dark-violet lg:w-[23.875rem] lg:gap-[1.625rem] lg:p-0">
        {/* CARDHOLDER NAME */}
        <label htmlFor="name" className="flex flex-col gap-1.5 uppercase">
          <span className="text-[0.7813rem] tracking-widest">
            cardholder name
          </span>
          <input
            autoComplete="off"
            spellCheck="false"
            id="name"
            type="text"
            maxLength={28}
            placeholder="e.g. Jane Appleseed"
            className={`custom-input ${errors.name && "!border-red"}`}
            disabled={isSubmitting}
            {...register("name", {
              required: "Can't be blank",
              validate: (value) => {
                const fullNameRegex = /\s+[A-Za-z]+/;
                if (!fullNameRegex.test(value)) {
                  return "Please enter your full name";
                }
                return true;
              },
            })}
            onInput={(e) => {
              // Remove any non-alphabetic characters and leading spaces
              e.target.value = e.target.value
                .replace(/[^A-Za-z\s]/g, "")
                .replace(/^\s+/, "")
                .replace(/\s{2,}/g, " ");
            }}
          />
          {errors.name && (
            <span className="mt-0.5 text-xs normal-case text-red">
              {errors.name.message}
            </span>
          )}
        </label>

        {/* CARD NUMBER */}
        <label
          htmlFor="card-number"
          className="flex flex-col gap-1.5 uppercase"
        >
          <span className="text-[0.7813rem] tracking-widest">card number</span>
          <input
            id="card-number"
            type="text"
            pattern="\d{4} \d{4} \d{4} \d{4}"
            inputMode="numeric"
            maxLength={19}
            placeholder="e.g. 1234 5678 9123 0000"
            className={`custom-input ${errors.cardNumber && "!border-red"}`}
            disabled={isSubmitting}
            {...register("cardNumber", {
              required: "Can't be blank",
              minLength: {
                value: 19,
                message: "Number is too short",
              },
              validate: {
                notAllZeros: (value) =>
                  value.replace(/\s/g, "") !== "0000000000000000" ||
                  "Invalid number",
              },
            })}
            onInput={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              value = value.match(/.{1,4}/g)?.join(" ") || value;
              e.target.value = value;
            }}
          />
          {errors.cardNumber && (
            <span className="mt-0.5 text-xs normal-case text-red">
              {errors.cardNumber.message}
            </span>
          )}
        </label>

        <div className="grid grid-cols-2 justify-between gap-x-2 322px:gap-1 lg:gap-x-5">
          {/* EXPIRY DATE */}
          <label
            htmlFor="expiry-date"
            className="flex flex-col gap-1.5 uppercase"
          >
            <span className="text-[0.7813rem] tracking-widest">
              exp. date (mm/yy)
            </span>

            <div className="flex gap-2 322px:gap-1 lg:gap-2.5">
              {/* month input */}
              <input
                id="expiry-date"
                type="text"
                pattern="\d*"
                maxLength={2}
                placeholder="MM"
                className={`custom-input w-full ${errors.expiryMonth && "!border-red"}`}
                disabled={isSubmitting}
                {...register("expiryMonth", {
                  required: "Can't be blank",
                  validate: validateExpiryDate,
                })}
                onInput={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value > 12) {
                    value = "12";
                  }
                  e.target.value = value;
                }}
                onBlur={(e) => {
                  if (e.target.value < 10 && e.target.value.length === 1)
                    e.target.value = "0" + e.target.value;
                }}
              />

              {/* year input */}
              <input
                id="expiry-date"
                type="text"
                pattern="\d*"
                maxLength={2}
                placeholder="YY"
                className={`custom-input w-full ${errors.expiryYear && "!border-red"}`}
                disabled={isSubmitting}
                {...register("expiryYear", {
                  required: "Can't be blank",
                  validate: validateExpiryDate,
                })}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
                onBlur={(e) => {
                  if (e.target.value < 10 && e.target.value.length === 1)
                    e.target.value = "0" + e.target.value;
                }}
              />
            </div>

            {(errors.expiryMonth || errors.expiryYear) && (
              <span className="mt-0.5 text-xs normal-case text-red">
                {errors.expiryMonth?.message || errors.expiryYear?.message}
              </span>
            )}
          </label>

          {/* CVC */}
          <label htmlFor="cvc" className="flex flex-col gap-1.5 uppercase">
            <span className="text-[0.7813rem] tracking-widest">cvc</span>
            <input
              id="cvc"
              type="text"
              pattern="\d*"
              maxLength={4}
              placeholder="e.g. 123"
              className={`custom-input w-full ${errors.cvc && "!border-red"}`}
              disabled={isSubmitting}
              {...register("cvc", {
                required: "Can't be blank",
                minLength: {
                  value: 3,
                  message: "Too short",
                },
                validate: {
                  notAllZeros: (value) =>
                    (value !== "000" && value !== "0000") || "Invalid CVC",
                },
              })}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/g, ""))
              }
            />
            {errors.cvc && (
              <span className="mt-0.5 text-xs normal-case text-red">
                {errors.cvc.message}
              </span>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className={`mt-2 w-full rounded-lg bg-very-dark-violet py-3 text-lg font-normal text-white transition-all duration-100 hover:bg-[#1a0726] focus:outline-offset-[0.1875rem] focus:outline-light-purple lg:mt-3.5 ${isSubmitting && "cursor-not-allowed opacity-60"}`}
        >
          {isSubmitting ? "Submitting..." : "Confirm"}
        </button>
      </div>
    </form>
  );
}
