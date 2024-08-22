import CardBack from "./CardBack";
import CardFront from "./CardFront";

function CardContainer() {
  return (
    <section className="mb-6 mt-8 h-[15.625rem] w-full max-w-[23.4375rem] px-4 drop-shadow-2xl lg:m-0 lg:h-[32.9375rem] lg:min-w-[27.9375rem] lg:max-w-[33.75rem] lg:p-0">
      <div className="relative h-full w-full">
        <CardBack />
        <CardFront />
      </div>
    </section>
  );
}

export default CardContainer;
