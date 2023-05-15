describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/test/reset");
    cy.visit("http://localhost:3000");
  });

  it("LoginForm is Shown", function () {
    cy.get("#login-form").contains("Username");
  });

  describe("Login Functionality", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/user", {
        username: "Lain",
        password: "12345",
        name: "Alain Caldz",
      });
    });
    it("Logins Incorrectly if the creds are wrong", function () {
      cy.get("#username-input").type("Lain");
      cy.get("#pass-input").type("123");
      cy.get("#login-btn").click();
      cy.get(".blog-header").should("not.exist");
    });
    it("Logins Correctly", function () {
      cy.get("#username-input").type("Lain");
      cy.get("#pass-input").type("12345");
      cy.get("#login-btn").click();
      cy.get(".blog-header").should("exist");
    });
  });

  describe("Functionality when logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/user", {
        username: "Lain",
        password: "12345",
        name: "Alain Caldz",
      });
      cy.get("#username-input").type("Lain");
      cy.get("#pass-input").type("12345");
      cy.get("#login-btn").click();
    });

    it("Login user should be able to add blogs and like said blog", function () {
      cy.get(".user-area").contains("Add Blog").click();
      cy.get(".blog-title-input").type("SAMPLE TITLE");
      cy.get(".author-input").type("SAMPLE AUTHOR");
      cy.get(".url-input").type("SAMPLEURL.com");
      cy.get(".blog-sub-btn").click();
      cy.get(".blog-container").contains("SAMPLE TITLE");
      cy.get(".blog-container").contains("Blog Details").click();
      cy.get(".like-btn").click();
      cy.get(".like-count").should("contain", "1");
    });
  });

  describe("Delete functionality restrictions", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/user", {
        username: "Lain",
        password: "12345",
        name: "Alain Caldz",
      });
      cy.request("POST", "http://localhost:3001/api/user", {
        username: "NotLain",
        password: "12345",
        name: "Not Alain Caldz",
      });
    });
    it("Delete should be seen by NotLain", function () {
      cy.get("#username-input").type("NotLain");
      cy.get("#pass-input").type("12345");
      cy.get("#login-btn").click();
      cy.get(".user-area").contains("Add Blog").click();
      cy.get(".blog-title-input").type("SAMPLE TITLE");
      cy.get(".author-input").type("SAMPLE AUTHOR");
      cy.get(".url-input").type("SAMPLEURL.com");
      cy.get(".blog-sub-btn").click();
      cy.get(".blog-container").contains("Blog Details").click();
      cy.get("[data-button-name=delete-blog-btn]").should("exist");
    });
    it("Delete should not be seen by Lain", function () {
      cy.get("#username-input").type("NotLain");
      cy.get("#pass-input").type("12345");
      cy.get("#login-btn").click();
      cy.get(".user-area").contains("Add Blog").click();
      cy.get(".blog-title-input").type("SAMPLE TITLE");
      cy.get(".author-input").type("SAMPLE AUTHOR");
      cy.get(".url-input").type("SAMPLEURL.com");
      cy.get(".blog-sub-btn").click();
      cy.get("[data-button=logout-btn]").click();
      cy.get("#username-input").type("Lain");
      cy.get("#pass-input").type("12345");
      cy.get("#login-btn").click();
      cy.get(".blog-container").contains("Blog Details").click();
      cy.get("[data-button-name=delete-blog-btn]").should("not.exist");
    });
  });
  describe("Blog sorting",function(){
    beforeEach(function(){
      cy.request("POST", "http://localhost:3001/api/user", {
        username: "Lain",
        password: "12345",
        name: "Alain Caldz",
      });
      cy.get("#username-input").type("Lain");
      cy.get("#pass-input").type("12345");
      cy.get("#login-btn").click();
      cy.get(".user-area").contains("Add Blog").click();
      cy.get(".blog-title-input").type("SAMPLE TITLE");
      cy.get(".author-input").type("SAMPLE AUTHOR");
      cy.get(".url-input").type("SAMPLEURL.com");
      cy.get(".blog-sub-btn").click();
      cy.get("[data-btn-name=cancel-btn]").click();
      cy.get(".user-area").contains("Add Blog").click();
      cy.get(".blog-title-input").type("MOST LIKES");
      cy.get(".author-input").type("SAMPLE AUTHOR");
      cy.get(".url-input").type("SAMPLEURL.com");
      cy.get(".blog-sub-btn").click();   
    })
    it.only("Should show blogs with most likes first",function(){
 
     cy.get(".blog-container").children().eq(2).contains("Blog Details").click();
     cy.get(".blog-container").children().eq(2).contains("Like").click();
     cy.get(".blog-container").children().eq(1).should("contain","MOST LIKES")
    

    })


  })


});
