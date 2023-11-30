const PageHeader = ({ type = "", title = "Title" }) => {
  return (
    <div className="w-full truncate ...">
      {type && (
        <h1 className="uppercase font-semibold text-primary-main text-sm">
          {type}
        </h1>
      )}
        <h1 className="capitalize text-xl xs:text-2xl lg:text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default PageHeader;
