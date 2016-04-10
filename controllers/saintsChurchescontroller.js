// POST '/api/saints/:saintId/churches', to create a new dedicated church   via popup modal
function create(req, res) {
  db.Saint.findById(req.params.saintId, function(err, foundSaint) {
    console.log(req.body);
    var newDedicatedChurch = new db.DedicatedChurch(req.body); //teacher's notes
    foundSaint.dedicatedChurches.push(newDedicatedChurch);
    foundSaint.save(function(err, savedSaint) {
      console.log('newDedicatedChurch created: ', newDedicatedChurch);
      res.json(newDedicatedChurch); //responding with church(but if you have an api per tg, some may respond with parent object Saint);
    });
  });
}

module.exports = {
  create: create
};
