const COLORRANGE = 100

function setup(){
  createCanvas(innerWidth, innerHeight)
  noStroke()

  let palette = makePalette()
  new Worm(palette)

  palette = makePalette()
  new Worm(palette)
}

function makePalette(){
  let palette = []
  //decide on a color range
  let limitR = random(255 - COLORRANGE)
  let limitG = random(255 - COLORRANGE)
  let limitB = random(255 - COLORRANGE)
  //fill the palette
  for(var i = random(5)+5; i > 0; i--){
    palette.push(color(random(limitR, limitR+COLORRANGE), random(limitG, limitG+COLORRANGE), random(limitB, limitB+COLORRANGE)))
  }
  return palette
}

class Worm{
  constructor(palette){
    let x = random(width)
    let y = random(height)
    let size = random(20)+50
    let oldSize = 0, dir = random(TWO_PI)
    
    fill("white")
    circle(x-40*sin(dir)-10*cos(dir), y+10*sin(dir)-40*cos(dir), 10)
    circle(x-40*sin(dir)+10*cos(dir), y-10*sin(dir)-40*cos(dir), 10)

    for(var c of palette){
      makeBall(c)
    }

    function makeBall(color){
      fill(color)
      circle(x, y, size)
      oldSize = size
      size = random(20)+50
      dir = random(-HALF_PI, HALF_PI)+dir//keep it going in the same dir
      x = (oldSize+size)/2*sin(dir)+x
      y = (oldSize+size)/2*cos(dir)+y
    }
  }
}
