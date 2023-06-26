export const Button = (
    {
        children,
        image,
        imageName,
        bgColor = "bg-blue-700",
        hoverColor = "hover:bg-blue-800",
        focusColor = "focus:ring-blue-300",
        darkBgColor = "dark:bg-blue-600",
        darkHoverColor = "dark:hover:bg-blue-700",
        darkFocusColor = "dark:focus:ring-blue-800",
    }
) => {

    const buttonStyle = `text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 ${bgColor} ${hoverColor} ${focusColor} ${darkBgColor} ${darkHoverColor} ${darkFocusColor}`
    
  return (
    <button type="button" className={buttonStyle}>
      <img src={image} alt={imageName} />
      {children}
    </button>
  );
};