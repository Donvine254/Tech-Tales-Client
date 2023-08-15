'use client'
export default function Avatar({name, handleClick=null}){
 
    const firstLetter = name ? name.charAt(0) : '';

    const generateColor = () => {
      if (name){
        const charCodeRed = name.charCodeAt(0);
      const charCodeGreen = Math.pow(charCodeRed, 4) % 100;
      const charCodeBlue = Math.pow(charCodeRed, 9) % 200;
      return `rgb(${charCodeGreen}, ${charCodeBlue}, ${charCodeGreen})`;
      }
      return  'rgb(20, 30, 100)'
    };
    
    const color = generateColor(name);

    return (
        <div className={`flex justify-center items-center w-12 h-12 rounded-full  md:mr-8 cursor-pointer shadow`} onClick={handleClick} style={{ backgroundColor: color }} >
         <p className="text-white text-xl font-bold">{firstLetter}</p> 
        </div>
      )
}






