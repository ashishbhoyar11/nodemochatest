const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

const { connectDB } = require('../src/config/db');

chai.use(chaiHttp);
chai.should();

// const sinon = require('sinon');
// const authService = require('../src/modules/auth/auth.service');
// const userService = require('../src/modules/user/user.service');
// let loginStub, getAllStub, createStub;

// describe("API Testing with Sinon (No Real DB)", () => {

//   before(() => {
//     // Stub login()
//     loginStub = sinon.stub(authService, "login").resolves("fake-jwt-token");

//     // Stub getAll()
//     getAllStub = sinon.stub(userService, "getAll").resolves([
//       { name: "Ashish", email: "ashish@gmail.com",password: "Admin@123"  },
//       { name: "Mike", email: "mike@test.com",password: "Admin@123"  }
//     ]);

//     // Stub create()
//     createStub = sinon.stub(userService, "create").resolves({
//       name: "Mike",
//       email: "mike@test.com",
//       password: "Admin@123" 
//     });
//   });

//   after(() => {
//     sinon.restore();
//   });

//   // LOGIN -----------------------
//   it("should login and return token", (done) => {
//     chai.request(app)
//       .post("/auth/login")
//       .send({ email: "ashish@gmail.com", password: "Admin@123" })
//       .end((err, res) => {
//         console.log("err>>>>",err)
//         console.log("res>>>>",res.body)
//         res.should.have.status(200);
//         res.body.token.should.equal("fake-jwt-token");
//         done();
//       });
//   });

//   // GET USERS -------------------
//   it("should return user list", (done) => {
//     chai.request(app)
//       .get("/users/getUsers")
//       .set("Authorization", "Bearer fake-jwt-token")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.users.should.be.a("array");
//         res.body.users.length.should.equal(2);
//         done();
//       });
//   });

//   // CREATE USER -----------------
//   it("should create a user", (done) => {
//     chai.request(app)
//       .post("/users/createUser")
//       .send({ name: "Mike", email: "mike@test.com", password:"Admin@123" })
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.name.should.equal("Mike");
//         done();
//       });
//   });

// });



before(async () => {
  await connectDB();
});

let token = "";

describe("API Testing (Module Wise)", () => {
  // LOGIN --------------------------------------------------
  it("should login and return token", (done) => {
    chai.request(app)
      .post("/auth/login")
      .send({ email: "ashish@gmai.com", password: "Admin@123" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("token");
        token = res.body.token;
        done();
      });
  });

  // USER LIST ---------------------------------------------
  it("should return user list", (done) => {
    chai.request(app)
      .get("/users/getUsers")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("users");
        res.body.users.should.be.a("array");
        done();
      });
  });

  // CREATE USER -------------------------------------------
  it("should create a user", (done) => {
    chai.request(app)
      .post("/users/createUser")
      .send({ name: "Mike", email: "mike@test.com", password:"Admin@123" })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("name").eql("Mike");
        done();
      });
  });

});