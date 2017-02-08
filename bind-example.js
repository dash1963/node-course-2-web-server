var colt = {
    firstName: "sergio",
    sayHi: () => {
                   setTimeout( () => {
                                      console.log("Hi " + this.firstname);
                   }, 1000)
                 }
 };

 colt.sayHi()


 var colt1 = {
     firstName: "sergio",
     sayHi: function() {
                    setTimeout( function () {
                      console.log("Hi " + this.firstName);
                    }.bind(this), 1000)
                  }
  };

  colt1.sayHi()
