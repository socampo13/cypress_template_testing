const MyClass = require("../../javascript-code/objects");

describe("Testing object oriented code", () => {
  let instance;

  beforeEach(() => {
    instance = new MyClass("Alice", 25);
  });

  it("should create an instance of MyClass", () => {
    expect(instance).to.be.an("object");
    expect(instance.name).to.equal("Alice");
    expect(instance.age).to.equal(25);
  });

  it("Should greet properly", () => {
    const greeting = instance.greet();
    expect(greeting).to.equal("Hello, Alice!");
  });

  it("Should increment age on birthday", () => {
    const newAge = instance.haveBirthday();
    expect(newAge).to.equal(26);
    expect(instance.age).to.equal(26);
  });

  it("Should add a friend", () => {
    instance.addFriend("Bob");
    expect(instance.getFriends()).to.include("Bob");
  });

  it("Should return all friends", () => {
    instance.addFriend("Bob");
    instance.addFriend("Charlie");
    expect(instance.getFriends()).to.deep.equal(["Bob", "Charlie"]);
  });

  it("Should determine if the person is an adult", () => {
    expect(instance.isAdult()).to.be.true;
    instance = new MyClass("Dave", 17);
    expect(instance.isAdult()).to.be.false;
  });
});
