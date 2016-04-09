//nothing in here yet
function index(req, res) {
  res.json({
    message: "Welcome to Saintly!",
    documentation_url: "#",
    base_url: "#",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
