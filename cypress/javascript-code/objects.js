class MyClass{
    constructor(name, age){
        this.name = name;
        this.age = age;
        this.friends = [];
    }

    greet() {
        return `Hello, ${this.name}!`;
    }

    haveBirthday() {
        this.age += 1;
        return this.age;
    }

    addFriend(friend) {
        this.friends.push(friend);
    }

    getFriends() {
        return this.friends;
    }

    isAdult() {
        return this.age >= 18;
    }
}

module.exports = MyClass;