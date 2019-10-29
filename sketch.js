const COLORRANGE = 100

//Spotted worm
const SPOTBRIGHTNESS = 20
const SPOTRESIZE = 2/3

function setup(){
  createCanvas(innerWidth, innerHeight)
  background(256)
  noStroke()

  let palette1 = makePalette()
  new Worm(palette1)

  let palette2 = makePalette()
  new SpottedWorm(palette2)

  /* baby is a spotted worm that uses the
   * non spotted worms pallette to imply
   * that it is the child of the two worms
   */
  new BabyWorm(palette1)
}

function makePalette(){
  let palette = []
  //decide on a color range
  let limitR = random(255 - COLORRANGE)
  let limitG = random(255 - COLORRANGE)
  let limitB = random(255 - COLORRANGE)
  //fill the palette
  for(var i = random(3)+5; i > 0; i--){
    palette.push(color(random(limitR, limitR+COLORRANGE), random(limitG, limitG+COLORRANGE), random(limitB, limitB+COLORRANGE)))
  }
  return palette
}

class Worm{
  constructor(palette){
    this.x = random(width)
    this.y = random(height)
    this.size = this.randomSize()
    this.oldSize = 0, this.dir = random(TWO_PI)
    
    this.makeAntennae()

    noStroke()
    let ballNumber = 0
    for(var c of palette){
      this.makeBall(c, ballNumber++)
    }
  }

  randomSize(){
    return random(20)+50
  }

  makeAntennae(){
    fill("black")
    stroke("black")
    antennaeLeftX = this.x-this.size/3*(2*sin(this.dir)+2*cos(this.dir))
    antennaeLeftY = this.y+this.size/3*(2*sin(this.dir)-2*cos(this.dir))
    antennaeRightX = this.x-this.size/3*(2*sin(this.dir)-2*cos(this.dir))
    antennaeRightY = this.y-this.size/3*(2*sin(this.dir)+2*cos(this.dir))
    //bulbs
    circle(antennaeRightX, antennaeRightY, 10)
    circle(antennaeLeftX, antennaeLeftY, 10)
    //lines
    noFill()
    curveTightness(2)
    curve(this.x-7*this.size*sin(this.dir), this.y-7*this.size*cos(this.dir), this.x, this.y, antennaeLeftX, antennaeLeftY, this.x-this.size*sin(this.dir), this.y-this.size*cos(this.dir))
    curve(this.x-7*this.size*sin(this.dir), this.y-7*this.size*cos(this.dir), this.x, this.y, antennaeRightX, antennaeRightY, this.x-this.size*sin(this.dir), this.y-this.size*cos(this.dir))
  }

  makeBall(c){
    fill(c)
    circle(this.x, this.y, this.size)
    oldSize = this.size
    this.size = this.randomSize()
    this.dir = random(-HALF_PI, HALF_PI)+this.dir//keep it going in the same dir
    this.x = (oldSize+this.size)/2*sin(this.dir)+this.x
    this.y = (oldSize+this.size)/2*cos(this.dir)+this.y
  }
}

class SpottedWorm extends Worm{
  makeBall(c){
    let oldX = this.x
    let oldY = this.y
    let spotSize = this.size*SPOTRESIZE

    super.makeBall(c)

    let lighterColor = color(red(c)+SPOTBRIGHTNESS, green(c)+SPOTBRIGHTNESS, blue(c)+SPOTBRIGHTNESS)
    fill(lighterColor)
    circle(oldX, oldY, spotSize)
  }
}

class BabyWorm extends SpottedWorm{
  //half the size
  randomSize(){
    return super.randomSize()/2
  }

  makeBall(c, num){
    //only draw every other ball so we are half the normal length
    if(num%2){
      super.makeBall(c, num)
    }
  }
}
