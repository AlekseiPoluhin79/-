const cols = document.querySelectorAll('.col')

// функция которая обновляет страницу при нажатии пробела
document.addEventListener('keydown', (event) =>{
    event.preventDefault()
    if (event.code.toLowerCase() ==="space"){
        setRendomColors()
    }
})

//функция открытия или закрытия замка
document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if (type === 'lock'){
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]     
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }else if(type === 'copy'){
        copyToClick(event.target.textContent)
    }
})


// функция генерации случайного цвета
function generateRandomColor(){
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for( let i = 0; i < 6; i++ ) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
   return '#' + color
}

// функция копирования HEX-значения формата цвета 
function copyToClick(text){
  return navigator.clipboard.writeText(text)
}


// функция отображения случайного цвета 
function setRendomColors(){
    cols.forEach(col =>{
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
       const text =  col.querySelector('h2')
       const button =  col.querySelector('button')
       const color = generateRandomColor()  //вместо функции generateRandomColor() можно использовать библиотеку chroma.js

       if(isLocked){
        return
       }
       
       text.textContent = color
       col.style.background = color

     setTextColor(text, color)
     setTextColor(button, color)
    }) 
}

// определяет цвет оттенка и изменяем его
function setTextColor(text, color){
    const luminance = chroma(color).luminance()   // применяем библиотеку chroma.js для отображения оттенков
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRendomColors();
