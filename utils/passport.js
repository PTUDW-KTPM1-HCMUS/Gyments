
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

const LoginService = require('../components/auth/AuthService');

passport.use(new LocalStrategy({
    usernameField: 'username',
},
    async function(username,password,done){
        const user = await LoginService.findOneAccount(username);
        if(!user) {return done(null,false,{message: "Invalid user"});}
        if(!LoginService.validPassword(password,user)){
            return done(null,false,{message: "Incorrect password"});
        }
        return done(null,user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(async function (user, done) {
    done(null, user);
  });

module.exports = passport;