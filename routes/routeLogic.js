
/**
* @api {post} /test Test Endpoint
* @apiGroup Harmony exFrame Generator
*
* @apiDescription  Executes a microservice test endpoint
*
* @apiParam {json} JSON object that defines the return value
*
* @apiExample Example usage:
* curl -X POST \
  http://localhost:8787/test \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "hello": "exFrameGenerator"
  }'
*
* @apiSuccess {json} Service Response
*
* @apiError 400   Bad Request
* @apiError 401   Unauthorized
*/
module.exports.test = (req, res) => res.status(200).send(req.body);
