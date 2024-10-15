import { byTimeIsEnableSound } from "../redux/slices/counterSlice";

export const demomobile = `
@keyframes slidein {
    0% {
      left: 20px;
      top: calc(100% -  58px);
    }
    20% {
      left:80px;
      top: calc(100% -  58px);
    }
    50% {
      left: 40%;
      top: calc(80% - 40px);
    }
    100% {
      left: 70%;
      top: calc(30% - 42px);
    }
  }
  
 @keyframes slideafter {
  0% {
    left: 70%;
    top: calc(30% - 42px);
  }
  25% {
    left: 72%;
    top: calc(50% - 40px);
  }
  50% {
    left: 75%;
    top: calc(60% - 40px);
  }
  75% {
    left: 72%;
    top: calc(50% - 40px);
  }
  100% {
    left: 70%;
    top: calc(30% - 42px);
  }
}


  @keyframes thirdAnimation {
    0% {
        left: 70%;
        top: calc(30% - 42px);
      }
    50% {
      left: 80%;
      top: calc(25% - 42px);
    }
    100% {
      left: 100%;
      top:calc(20% - 42px);
    }
  }
  
`;
// [10px] left-[20px]
export const demomolap = `
@keyframes slidein {
    0% {
      left: 20px;
      top: calc(100% - 80px);
    }
  25% {
      left:20%;
      top: calc(97% - 80px);
    }
    50% {
      left: 40%;
      top: calc(80% - 80px);
    }
    100% {
      left: 78%;
      top: calc(20% - 80px);
    }
  }
  
 @keyframes slideafter {
  0% {
    left: 78%;
    top: calc(20% - 80px);
  }
  25% {
    left: 81%;
    top: calc(50% - 80px);
  }
  50% {
    left: 84%;
    top: calc(80% - 80px);
  }
  75% {
    left: 81%;
    top: calc(50% - 80px);
  }
  100% {
    left: 78%;
    top: calc(20% - 80px);
  }
}
  @keyframes thirdAnimation {
    0% {
        left: 80%;
        top: calc(20% - 80px);
      }
    100% {
      left: 100%;
      top: calc(15% - 80px);
    }
  }
  
`;
export const demomolaponesec = `
@keyframes slideinlapinitial {
  0% {
    left: 20px;
    top: calc(100% -  80px);
  }
  100% {
    left:20%;
    top: calc(95% -  80px);
  }
}
@keyframes slideinlap {
    0% {
      left:20%;
      top: calc(95% - 80px);
    }
  33% {
      left:40%;
      top: calc(75% - 80px);
    }
    66% {
      left: 60%;
      top: calc(55% - 80px);
    }
    100% {
      left: 80%;
      top: calc(35% - 80px);
    }
  }
  @keyframes thirdAnimation {
    0% {
        left: 80%;
        top: calc(35% - 80px);
      }
    100% {
      left: 100%;
      top: calc(15% - 80px);
    }
  }
`;

export const demomobilesec = `
@keyframes slideinlapinitial {
  0% {
    left: 20px;
    top: calc(100% -  58px);
  }
  100% {
    left:20%;
    top: calc(95% -  58px);
  }
}

@keyframes slideinlap {
    0% {
      left: 20%;
      top: calc(95% -  58px);
    }
    33% {
      left: 40%;
      top: calc(75% - 58px);
    }
    66% {
      left: 60%;
      top: calc(55% - 58px);
    }
    100% {
      left: 80%;
      top: calc(35% - 58px);
    }
  }

  @keyframes thirdAnimation {
    0% {
        left: 80%;
        top: calc(35% - 58px);
      }
    100% {
      left: 100%;
      top:calc(20% - 58px);
    }
  }
  
`;


// 50% {
//   left: 70%;
//   top: calc(30% - 100px);
// }
export function animationabove_10_sec(mainDiv, animationAdded,dispatch,fk) {
  mainDiv.style.animation = `slidein 5s linear forwards running`;

  mainDiv.addEventListener("animationend", () => {
    mainDiv.style.animation = `slideafter 5s linear forwards running ${
      (animationAdded - 5) / 5 - .3  
    }`;
    
    mainDiv.addEventListener("animationend", () => {
      mainDiv.style.animation = `thirdAnimation .5s linear forwards running`;
    });
  });
}

export function animationupto_10_sec(mainDiv, animationAdded,dispatch,fk) {
  mainDiv.style.animation = `slidein ${
    animationAdded - .3
  }s linear forwards running`;

  mainDiv.addEventListener("animationend", () => {
    mainDiv.style.animation = `thirdAnimation .5s linear forwards running`;
  });
}

export function animationUpTo_5_sec(mainDiv, animationAdded,dispatch,fk) {
  mainDiv.style.animation = `slidein ${
    animationAdded - .3
  }s linear forwards running`;

  mainDiv.addEventListener("animationend", () => {
    mainDiv.style.animation = `thirdAnimation .5s linear forwards running`;
   
  });
}
export function animationUpTo_1_sec(mainDiv, animationAdded,dispatch,fk) {
  mainDiv.style.animation = `slideinlapinitial .5s linear forwards running`;

  mainDiv.addEventListener("animationend", () => {
    mainDiv.style.animation = `slideinlap ${animationAdded-1-.3}s linear forwards running`;
    
    mainDiv.addEventListener("animationend", () => {
      mainDiv.style.animation = `thirdAnimation .3s linear forwards running`;
     
    });
  });

}
