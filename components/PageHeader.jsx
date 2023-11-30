const PageHeader = ({ type = "", title = "Title" }) => {
  return (
    <div className="w-full overflow-hidden grid">
      {type && (
        <h1 className="uppercase font-semibold text-primary-main text-sm">
          {type}
        </h1>
      )}
      <span className="capitalize text-xl xs:text-2xl lg:text-3xl font-bold truncate ...">
        {title}
      </span>
    </div>
  );
};

export default PageHeader;
