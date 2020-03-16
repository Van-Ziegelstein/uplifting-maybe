export const NOTHING = null

class Maybe {

    constructor(x) {
        this.content = x
    }


    // Adhering to best practices of the functional JS community
    // in order to distinguish monads from regular classes.
    static of(x) {
        return new Maybe(x)
    }


    // Simulates Haskell's pattern matching behavior.
    isNothing() {
        return (this.content === null || this.content === undefined)
    }


    // Functor implementation.
    fmap(f) {

        if (this.isNothing())
            return this
        else
            return Maybe.of(f(this.content))
    }


    // Applicative behavior.
    ap(m) {

        if (this.isNothing())
            return this
        else
            return m.fmap(this.content)
    }


    // Monadic bind.
    chain(mf) {
        if (this.isNothing())
            return this
        else
            return this.fmap(mf).content
    }


    // Convenience method to allow for more flexible handling of "Nothing" states, 
    // rather than simply skipping all functions along the pipeline. 
    // Takes a handler function as its argument which will only be invoked if the Maybe instance 
    // has decayed to "Nothing". The handler will receive the "NOTHING" constant as an argument, 
    // but has the chance of returning a different value to "turn" the monad back into "something". 
    // It thus sits as a "guard" between a broken section of the pipeline and subsequent stages.
    guard(ex) {

        if (this.isNothing())
            return Maybe.of(ex(NOTHING))
        else
            return this
    }


    // Print the current contents of the Maybe to the console.
    show() {

        if (this.isNothing())
            console.log("Nothing")
        else
            console.log("Just: ", this.content)

        return this

    }

}



// This helper is intended to "lift" primitive functions operating on
// regular data types into a Maybe context. 

export function liftM(f, ...monads) {

    if (monads.length !== 1) {

        if (!monads.length || monads.some(arg => arg.isNothing()))
            return Maybe.of(NOTHING)
        else
            return Maybe.of(f(...monads.map(arg => arg.content)))
    }
    else
        return monads[0].fmap(f)

}


export default Maybe

