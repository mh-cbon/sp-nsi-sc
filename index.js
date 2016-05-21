var miss = require('mississippi')
var split = require('split')

var spNsiSc = function () {

  var properties = [];
  var started = false;
  var isInEnv = false;
  var stream = miss.through.obj(function transform(chunk, enc, cb) {
    chunk = chunk.toString();
    if (!started && chunk.match(/^(rem|#)\s+begin\s+nsi/i)) {
      started = true;
    }
    if (started && chunk.match(/^(rem|#)\s+end\s+nsi/i)) {
      started = false;
    }
    if (started) {
      if (chunk.match(/rem\s+begin\s+env/i)) {
        isInEnv = true;
      } else if (chunk.match(/rem\s+end\s+env/i)) {
        isInEnv = false;
      } else if (chunk.match(/^(rem|#)\s+[^=]+=/)) {
        properties.push({
          name: chunk.match(/^(rem|#)\s+([^=]+)=/)[2],
          value: chunk.match(/^(rem|#)\s+[^=]+=(.*)/)[2]
        })
      } else if (chunk.match(/^set\s+[^=]+=/i)) {
        properties.push({
          env: isInEnv,
          name: chunk.match(/^set\s+([^=]+)=/i)[1],
          value: chunk.match(/^set\s+[^=]+=(.*)/i)[1]
        })
      }
    }
    cb()
  }, function (cb) {
    this.push(properties);
    cb();
  })

  return miss.pipeline.obj(split(), stream);
}

module.exports = spNsiSc;
