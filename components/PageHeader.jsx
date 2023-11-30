const PageHeader = ({ type = "", title = "Title" }) => {
  return (
    <div className="w-full overflow-hidden grid">
      {type && (
        <h1 className="uppercase font-semibold text-primary-main text-sm">
          {type}
        </h1>
      )}
      <h1 className="capitalize text-2xl sm:text-3xl lg:text-4xl font-bold truncate ...">
        {title}
      </h1>
    </div>
  );
};

export default PageHeader;
