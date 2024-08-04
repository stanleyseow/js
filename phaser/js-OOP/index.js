
console.log("Hello OOP")

// main class
class Char {
    constructor(scene, x, y, name, type) {
        this.scene = scene
        this.x = x
        this.y = y
        this.name = name
        this.type = type
    }

    create() {
        console.log("*** create player")
    }
    destroy() {
        console.log("*** destroy player")
    }
    stats() {
        console.log("*** stats player", this)
        return [this.x, this.y, this.type]
    }
}

class Human extends Char {
    constructor(scene, x, y, name, type) {
        super(scene, x, y, name, type)
    }

    walk(a, b, c) {
        this.a = a
        this.b = b
        console.log(">>> walk ", c)
        return this.name + " is walking"
    }
    run() {
        console.log(">>> run ", this.a)
        return this.name + " is running"
    }
}

class Fish extends Char {
    constructor(scene, x, y, name, type) {
        super(scene, x, y, name, type)
    }

    swim() {
        console.log(">>> swim")
        return this.name + " is swiming"
    }
}

class Bird extends Char {
    constructor(scene, x, y, name, type) {
        super(scene, x, y, name, type)
    }

    fly() {
        console.log(">>> fly")
        return this.name + " is flying"
    }

}

this.player = new Human(this, 100, 100, "Alice", "human class")
this.player2 = new Fish(this, 50, 50, "Bob", "fish class")
this.player3 = new Bird(this, 200, 200, "Carol", "bird class")


console.log("this.player: ", this.player)
//console.log("Getting this.player stats: ", this.player.stats)
console.log("this.player stats: ", this.player.stats())
console.log("this.player walk: ", this.player.walk(77, 88, 99))
console.log("this.player run: ", this.player.run())


console.log("this.player2 stats: ", this.player2.stats())
console.log("this.player2 swim: ", this.player2.swim())

console.log("this.player3 stats: ", this.player3.stats())
console.log("this.player3 fly: ", this.player3.fly())
