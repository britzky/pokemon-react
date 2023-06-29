
export const IceIcon = ({height = '50', width = '50', move='false'}) => {
  return (
    <div className={`rounded-full dark:bg-gray-800 bg-gray-100 ${move === 'true' ? 'p-1' : 'p-3'}`}>
      <svg className="text-cyan-300 dark:text-cyan-500" width={width} height={height} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M384.304 39.0418L385.879 177.392L265.209 235.319L263.721 104.69L384.304 39.0418Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M505.269 257.047L385.814 325.374L266.288 256.939L385.752 194.187L505.269 257.047Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M245.04 257.047L125.585 325.374L6.05861 256.939L125.523 194.187L245.04 257.047Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M124.243 38.4753L248.229 99.881L245.059 233.697L127.993 175.719L124.243 38.4753Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M387.678 473.525L263.692 412.119L266.862 278.302L383.928 336.281L387.678 473.525Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M128.525 474.77L126.949 336.42L247.62 278.493L249.108 409.121L128.525 474.77Z" fill="currentColor"/>
      </svg>
    </div>
  )
}
