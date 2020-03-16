# Uplifting Maybe
Rudimentary implementation of Haskell's
beloved Maybe Monad for Javascript. Available
features include:

* Functor-like behavior 
* Applicative chaining
* Monadic chaining
* Logging monad contents to the console (while still returning the monad unchanged).
* Placing *guards* along a composition pipeline to react to **Nothing** values with custom handlers.

Additionaly, the module exports a utility function (derived from Haskell's *liftM*) which can be used
to lift regular functions into the maybe context.
