const Slick = require('slick-io');
const path = require('path');
const Menubar = require('menubar')
const manager = new Slick(path.join(process.env.HOME, '.slick'));
const menubar = Menubar();

global.manager = manager;
global.exitManager = function() {
  manager.stop();
  process.exit(0);
}

manager.requestPassword((done) => {
  var prompt = require('prompt');
  prompt.start();
  console.log("A password is required to unlock slick")
  prompt.get([
    {
      name: 'password',
      hidden: true
    }
  ], function(err, opts) {
    if (err) return cb(err);
    done(null, opts.password);
  });
}).configure((setup, done) => {

  setup.meta.useMemory();
  setup.meta.useDisk({size: 52428800});    // 50mb limit
  setup.meta.useAcd();

  setup.bulk.useMemory();
  setup.bulk.useDisk({size: 10737418240}); // 10gb limit
  setup.bulk.useAcd();

  done();

}).on('fatal', function(error) {
  console.error('got a fatal error', error);
  process.exit(1);
}).on('warning', function(warning) {
  console.error('got a warning', warning);
}).whenReady(() => {
  console.log("READY!");
});

menubar.on('ready', function ready () {
  console.log('app is ready')
  manager.start();
})
