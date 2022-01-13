import './style/main.scss'

// *********************************************************************************
const arrStyle = [ "#bbe6ff", "#ffbbbb", "#bbffbb", "#ffe4bb", "#d8bbff" ];
let numberStyle = Math.round( Math.random() * ( arrStyle.length - 1 ) )
const idBody = document.querySelector( "#id456" )
idBody.style.backgroundColor = `${ arrStyle[ numberStyle ] }`
// *********************************************************************************
