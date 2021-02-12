import bcrypt from "bcryptjs";
import User from "../models/User";
import passport from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import { NativeError } from "mongoose";
import { IUser } from "../interfaces/IUser";

type DoneFunc = (err: any, id?: unknown) => void;

passport.serializeUser((user: IUser, done: DoneFunc) => {
  done(null, user.id);
});

passport.deserializeUser((id: IUser["id"], done: DoneFunc) => {
  User.findById(id, (err: NativeError, user: IUser) => {
    done(err, user);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    (
      email: string,
      password: string,
      done: (error: any, user?: any, options?: IVerifyOptions) => void
    ) => {
      // Match User
      User.findOne({ email: email })
        .then((user) => {
          // Create new User
          if (!user) {
            const newUser = new User({ email, password });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err: Error, salt: string) => {
              bcrypt.hash(
                newUser.password,
                salt,
                (err: Error, hash: string) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then((user) => {
                      return done(null, user);
                    })
                    .catch((err) => {
                      return done(null, false, { message: err });
                    });
                }
              );
            });
            // Return other user
          } else {
            // Match password
            bcrypt.compare(
              password,
              user.password,
              (err: Error, isMatch: boolean) => {
                if (err) throw err;

                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: "Wrong password" });
                }
              }
            );
          }
        })
        .catch((err) => {
          return done(null, false, { message: err });
        });
    }
  )
);

export default passport;
