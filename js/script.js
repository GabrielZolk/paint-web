const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const inputColor = document.querySelector('.input__color')
const tools = document.querySelectorAll('.button__tool')
const sizeButtons = document.querySelectorAll('.button__size')
const buttonClear  = document.querySelector('.button__clear')

let brushSize = 20
let isPainting = false
let activeTool = 'brush'

inputColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value
})

canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
    isPainting = true;

    if(activeTool == 'brush') {
        draw(clientX, clientY)
    }

    if(activeTool == 'rubber') {
        erase(clientX, clientY)
    }
})

canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
    if (isPainting) {
        if(activeTool == 'brush') {
            draw(clientX, clientY)
        }

        if(activeTool == 'rubber') {
            erase(clientX, clientY)
        }
    }
})

canvas.addEventListener('mouseup', () => {
    isPainting = false
})

const draw = (x, y) => {
    ctx.globalCompositeOperation = 'source-over'
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI)
    ctx.fill()
}

const erase = (x, y) => {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI)
    ctx.fill()
}

const selectTool = (event) => {
    const selectedTool = event.target.closest('button')
    const action = selectedTool.getAttribute('data-action')
  
    if(action) {
        tools.forEach((tool)=> {tool.classList.remove('active-tool')})

        selectedTool.classList.add('active-tool')
        activeTool = action
    }
}

const selectSize = (event) => {
    const selectedTool = event.target.closest('button')
    const size = selectedTool.getAttribute('data-size')
  
    sizeButtons.forEach((tool)=> {tool.classList.remove('active-tool')})
    selectedTool.classList.add('active-tool')
    brushSize = size
  
}

tools.forEach((tool) => {
    tool.addEventListener('click', selectTool)
})

sizeButtons.forEach((button) => {
    button.addEventListener('click', selectSize)
})

buttonClear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})