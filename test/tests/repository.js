var assert = require("assert");
var path = require("path");

describe("Repository", function() {
  var reposPath = path.resolve("test/repos/workdir/.git");

  var Repository = require("../../lib/repository");

  before(function() {
    var test = this;

    return Repository.open(reposPath).then(function(repository) {
      test.repository = repository;
    });
  });

  it("can open a valid repository", function() {
    assert.ok(this.repository instanceof Repository);
  });

  it("cannot open an invalid repository", function() {
    return Repository.open("repos/nonrepo").then(null, function(err) {
      assert.ok(err instanceof Error);
    });
  });

  it("does not try to open paths that don't exist", function() {
    var missingPath = "/surely/this/directory/does/not/exist/on/this/machine";

    return Repository.open(missingPath).then(null, function(err) {
      assert.ok(err instanceof Error);
    });
  });

  it("can initialize a repository into a folder", function() {
    return Repository.init("repos/newrepo", 1).then(function(path, isBare) {
      return Repository.open("repos/newrepo");
    });
  });
});
