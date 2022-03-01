// TODO: Add a route called `/dish/:num` below
router.get('/dish/:num', async (req, res) => {
    return res.render('dish', dishes[req.params.num -1]);
  // dish is handlebar name (dish.handlebars)
  // dishes is the array being passed in
  // req.params.num -1 gives us the specific element
  })
  
  module.exports = router;
  