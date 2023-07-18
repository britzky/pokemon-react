export const Button = (
    {
        children,
        image,
        imageName,
        onClick,
        bgColor = "bg-blue-700",
        hoverColor = "hover:bg-blue-800",
        focusColor = "focus:ring-blue-300",
        darkBgColor = "dark:bg-blue-600",
        darkHoverColor = "dark:hover:bg-blue-700",
        darkFocusColor = "dark:focus:ring-blue-800",
    }
) => {

    const buttonStyle = ` w-1/2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mx-2 ${bgColor} ${hoverColor} ${focusColor} ${darkBgColor} ${darkHoverColor} ${darkFocusColor}`

  return (
    <button type="button" className={buttonStyle} onClick={onClick}>
      {children}
      <img src={image} alt={imageName} className="h-10 ml-4" />
    </button>
  );
};
