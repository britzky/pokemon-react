interface ButtonProps {
  children?: React.ReactNode;
  image?: string;
  imageName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isAbilityButton?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    image,
    imageName,
    onClick,
    isAbilityButton,
  }) => {
    const buttonStyle = 'w-1/2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
    const abilityStyle = "p-1.5 mt-1 inline-flex rounded-full text-sm text-center inline-flex items-center justify-center mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    
  return (
    <button type="button" className={isAbilityButton ? abilityStyle : buttonStyle} onClick={onClick}>
      {children}
      {image && <img src={image} alt={imageName} className={isAbilityButton ? "" : "h-10 ml-4"} />}
    </button>
  );
};
