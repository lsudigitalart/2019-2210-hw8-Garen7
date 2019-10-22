const COLORRANGE = 100
let palette = []

function setup(){
  createCanvas(innerWidth, innerHeight)

  let limitR = random(255 - COLORRANGE)
  let limitG = random(255 - COLORRANGE)
  let limitB = random(255 - COLORRANGE)

  for(var i = random(5)+5; i > 0; i--){
    palette.push(color(random(limitR, limitR+COLORRANGE), random(limitG, limitG+COLORRANGE), random(limitB, limitB+COLORRANGE)))
  }

  let x = random(width)
  let y = random(height)
  let size = random(10)+50
  noStroke()
  for(var c of palette){
    fill(c)
    circle(x, y, size)
  }
}
