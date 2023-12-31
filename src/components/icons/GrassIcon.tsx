interface GrassIcon {
  height?: string;
  width?: string;
  small?: string;
}

export const GrassIcon: React.FC<GrassIcon> = ({
  height = '50', 
  width = '50', 
  small='false'
}) => {
  return (
    <div className={`rounded-full dark:bg-gray-800 bg-gray-100 ${small === 'true' ? 'p-1.5' : 'p-3'}`}>
      <svg className="text-green-500 dark:text-green-700" fill="none" height={height} viewBox="0 0 512 512" width={width} xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="m97.4121 440.649c-1.7574-1.653-3.4954-3.338-5.2132-5.056-90.68455-90.684-90.68453-237.713 0-328.397 90.6841-90.6849 379.6401-96.7516 379.6401-96.7516s39.442 334.4646-51.242 425.1486c-80.54 80.54-205.522 89.55-296.005 27.031l72.908-89.471 116.55-25.163-95.139-9.511 60.462-61.562 68.824-15.077-54.422-16.117 54.422-98.176-77.41 86.828-29.893-42.183 10.523 69.648-53.917 60.782-24.993-76.9v102.268z" fill="currentColor" fillRule="evenodd"/>
      </svg>
    </div>
  )
}
