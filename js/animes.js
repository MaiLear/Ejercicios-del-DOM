let menu = document.querySelector("#menu");
let d = document;
let us = navigator.userAgent;

const reloj = (container, btnPlay, btnStop) => {
  let time;
  let btnPlaySelected;
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnPlay)) {
      btnPlaySelected = e.target;
      btnPlaySelected.disabled = true;
      time = setInterval(() => {
        let hora = new Date().toLocaleTimeString();
        document.querySelector(container).innerHTML = `<h3>${hora}</h3>`;
      }, 1000);
    } else if (e.target.matches(btnStop)) {
      clearInterval(time);
      btnPlaySelected.disabled = false;
    }
  });
};

const alarm = (audioSrc, btnPlay, btnStop) => {
  let alarmTempo, btnPlaySelected;
  const $alarm = d.createElement("audio");
  $alarm.src = audioSrc;
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnPlay)) {
      btnPlaySelected = e.target;
      btnPlaySelected.disabled = true;
      alarmTempo = setTimeout(() => {
        $alarm.play();
      }, 2000);
    } else if (e.target.matches(btnStop)) {
      btnPlaySelected.disabled = false;
      clearTimeout(alarmTempo);
      $alarm.pause();
      $alarm.currentTime = 0;
    }
  });
};

const keyEvent = (e) => {
  console.info(e.key);
  console.info(e.keyCode);
  console.info(e.type);
  console.info(`shift:${e.shiftKey}`);
  console.info(`alt:${e.altKey}`);
  console.info(`ctrl: ${e.ctrlKey}`);
  console.info(e);

  if (e.ctrlKey && e.key === "a") {
    alert("Esto es una alerta");
  } else if (e.altKey && e.key === "e") {
    confirm("Esto es una confirmacion");
  } else if (e.altKey && e.key === "i") {
    prompt("Esto es una aviso");
  }
};

//Eventos del teclado movimientos y colisiones
const moveBall = (ball, stage) => {
  let x = 0,
    y = 0;
  const $ball = d.querySelector(ball),
    $stage = d.querySelector(stage);
  d.addEventListener("keydown", (e) => {
    const limitBall = $ball.getBoundingClientRect(),
      limitStage = $stage.getBoundingClientRect();

    switch (e.key) {
      case "ArrowUp":
        if (limitBall.top > limitStage.top) {
          e.preventDefault();
          --y;
        }
        break;
      case "ArrowDown":
        if (limitBall.bottom < limitStage.bottom) {
          e.preventDefault();
          ++y;
        }
        break;
      case "ArrowLeft":
        if (limitBall.left > limitStage.left) --x;
        break;
      case "ArrowRight":
        if (limitBall.right < limitStage.right) ++x;
        break;
    }
    $ball.style.transform = `translate(${x * 10}px,${y * 10}px)`;
  });
};

//Manera en la que yo lo hice
// const countDown = (container)=>{
//     let fecha = new Date();
//     let dia = 365,horas = 24,minutos = 59,segundos = 59;

//     console.info(fecha.toLocaleTimeString());
//     console.info(fecha.getTimezoneOffset());
//     console.info(fecha.toLocaleTimeString())

//     setInterval(()=>{
//         if(segundos < 0){
//             segundos = 59
//             minutos--
//         }
//         else if(minutos < 0){
//             minutos = 59;
//             horas--
//         }
//         else if(horas < 0){
//             horas = 12;
//             dia--;
//         }

//         d.querySelector(container).textContent = `${dia} dias ${horas} horas ${minutos} minutos ${segundos--} segundos`
//     },1000)

// }
//Manera como lo hizo el profe mircha
const countDown = (container, dateSelected, finalMessage) => {
  const $container = d.querySelector(container),
    countDownDate = new Date(dateSelected).getTime();

  let countDownTempo = setInterval(() => {
    let now = new Date().getTime(),
      limitTime = countDownDate - now,
      days = Math.floor(limitTime / (1000 * 60 * 60 * 24)),
      //El metodo slice() elimina un elemento de una cadena o array
      hours = (
        "0" + Math.floor((limitTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).slice(-2),
      minutes = (
        "0" + Math.floor((limitTime % (1000 * 60 * 60)) / (1000 * 60))
      ).slice(-2),
      seconds = ("0" + Math.floor((limitTime % (1000 * 60)) / 1000)).slice(-2);

    $container.textContent = `${days} dias ${hours} horas ${minutes} minutos ${seconds} segundos`;

    if (limitTime < 0) {
      clearInterval(countDownTempo);
      $container.textContent = finalMessage;
    }
  }, 1000);
};

const scrollTop = (btnScrollTop) => {
  let $btnScrollTop = d.querySelector(btnScrollTop),
    varScrollY;
  window.addEventListener("scroll", () => {
    varScrollY = scrollY;
    if (varScrollY > 300) {
      $btnScrollTop.classList.add("show-menu");
    } else {
      $btnScrollTop.classList.remove("show-menu");
    }
  });

  d.addEventListener("click", (e) => {
    if (
      e.target.matches(btnScrollTop) ||
      e.target.matches(`${btnScrollTop} *`)
    ) {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  });
};

const darkMode = (btn) => {
  let soon = "🌞",
    moon = "🌑";
  const btnTheme = d.querySelector(btn);

  const themeDark = () => {
    btnTheme.textContent = soon;
    selectorsDark.forEach((element) => element.classList.add("dark-mode"));
    titleWhite.forEach((e) => (e.style.color = "white"));
  };

  const themeLight = () => {
    btnTheme.textContent = moon;
    selectorsDark.forEach((element) => element.classList.remove("dark-mode"));
  };
  const selectorsDark = d.querySelectorAll("[data-dark]"),
    titleWhite = d.querySelectorAll("h2");

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      if (e.target.textContent == moon) {
        localStorage.setItem("theme", "dark");
        themeDark();
      } else {
        localStorage.setItem("theme", "light");
        themeLight();
      }
    }
  });
  d.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
    if (localStorage.getItem("theme") === "light") {
      themeLight();
    }
    if (localStorage.getItem("theme") === "dark") {
      themeDark();
    }
  });
};

const contentResponsive = (container, mq, contentMobile, contentDestok) => {
  let breakpoint = window.matchMedia(mq);
  const responsive = (e) => {
    if (e.matches) {
      d.querySelector(container).innerHTML = contentDestok;
    } else {
      d.querySelector(container).innerHTML = contentMobile;
    }
  };
  breakpoint.addEventListener("change", responsive);
  responsive(breakpoint);
};

// const testerResponsive =(btnOpen,btnClose)=>{
//     let ventana;
//     d.addEventListener('click',(e)=>{
//         if(e.target.matches(btnOpen)){
//             let $width = d.getElementById('width').value,
//             $height = d.getElementById('height').value,
//             $url = d.getElementById('url').value;
//             ventana = open($url,'_blank',`width=${$width},height=${$height}`);
//         }
//         else if(e.target.matches(btnClose)){
//             ventana.close();
//         }
//     })
// }
const testerResponsive = (btnClose) => {
  let ventana,
    $formulario = d.getElementById("responsive-tester__form");
  d.addEventListener("submit", (e) => {
    if (e.target === $formulario) {
      // console.log($formulario.url);
      // console.log($formulario.width);
      // console.log($formulario.height);
      e.preventDefault();
      ventana = open(
        $formulario.url.value,
        "_blank",
        `width=${$formulario.width.value},height=${$formulario.height.value}`
      );
    } else if (e.target.matches(btnClose)) {
      ventana.close();
    }
  });
};

const userDeviceInfo = (container) => {
  let $container = d.querySelector(container),
    isMobile = {
      android: () => navigator.userAgent.match(/android/i),
      ios: () => navigator.userAgent.match(/iphone|ipad|ipod/i),
      windows: () => navigator.userAgent.match(/windows phone/i),
      any: function () {
        return this.android() || this.ios() || this.windows();
      },
    },
    isDesktop = {
      linux: () => navigator.userAgent.match(/linux/i),
      mac: () => navigator.userAgent.match(/mac os/i),
      windows: () => navigator.userAgent.match(/windows nt/i),
      any: function () {
        return this.linux() || this.mac() || this.windows();
      },
    },
    isBrowser = {
      chrome: () => navigator.userAgent.match(/chrome/i),
      safari: () => navigator.userAgent.match(/safari/i),
      firefox: () => navigator.userAgent.match(/firefox/i),
      any: function () {
        return this.chrome() || this.safari() || this.firefox();
      },
    };

  $container.innerHTML = `
  <h2>User device info</h2>
    <ul>
    <li>User agent: ${navigator.userAgent}</li>
    <li>Plataforma: <b>${
      isMobile.any() ? isMobile.any() : isDesktop.any()
    }</b></li>
    </ul>
    `;

  if (isBrowser.chrome()) {
    $container.innerHTML += `<p><mark>Contenido exclusivo para chrome</mark></p>`;
  }

  if (isBrowser.safari()) {
    $container.innerHTML += `<p><mark>Contenido exclusivo para safari</mark></p>`;
  }

  if (isBrowser.firefox()) {
    $container.innerHTML += `<p><mark>Contenido exclusivo para firefox</mark></p>`;
  }
};

const onlineOffine = (container) => {
  const $div = d.createElement("div"),
    $container = d.querySelector(container);

  const onLinee = () => {
      $div.classList.add("online");
      $div.classList.remove("offine");
      $div.textContent = "Conexion restablecida";
    },
    onfinee = () => {
      $div.classList.add("offine");
      $div.classList.remove("online");
      $div.textContent = "No tienes conexion en este momento";
    };

  if (navigator.onLine) {
    onLinee();
  } else {
    onfinee();
  }
  // console.log($container);
  $container.appendChild($div);

  window.addEventListener("online", () => {
    console.info(navigator.onLine);
    onLinee();
  });
  window.addEventListener("offline", () => {
    console.info(navigator.onLine);
    onfinee();
  });
};

const getGeolocalizacion = (container) => {
  const $container = d.querySelector(container),
    options = {
      //Con esta opcion le decimos que el dispositivo trate de hacer la mejor lectura de la ubicacion posible
      enableHighAccuracy: true,
      //Cuanto tiempo va estar esperando para tomar la lectura de la ubicacion
      timeout: 5000,
      //Para que no se guarde en cache las lecturas de la ubicacion
      maximumAge: 0,
    },
    sucess = (position) => {
      let coords = position.coords;

      $container.innerHTML = `<p>Tu posicion es:</p>
        <ul><li>Latitud: <b>${coords.latitude}</b></li>
        <li>Longitud: <b>${coords.longitude}</b></li>
        // El valor de acuracy es que tan precisa fue la lectura,
        // es decir el valor que de es el margen del error que hay en la lectura de tu ubicacion
        <li>Precicion: ${coords.accuracy} Metros</li>
        
        </ul>
        //De esta manera puedo acceder a mi ubicacion con el valor de latitude y longitude en google maps
        <br>
        <a href='https://www.google.com/maps/@${coords.latitude},${coords.longitude},15z' target='_blank' rel='noopener'>Ver en google maps</a>
        `;
    };

  const error = (err) => {
    console.log(err);
  };

  const success2 = (posicion) => {
    // console.log(posicion);
  };

  navigator.geolocation.watchPosition(success2, error, options);
  navigator.geolocation.getCurrentPosition(sucess, error, options);
};

const videoCamara = (video) => {
  const $video = d.querySelector(video);

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // console.log(stream);
        $video.srcObject = stream;
        $video.play();
      })
      .catch((err) => {
        console.log(err);
        $video.insertAdjacentHTML("afterend", `<p><mark>${err}</mark></p>`);
      });
  }
};

const filter = (inputSearch, cards) => {
  const $inputSearch = d.querySelector(inputSearch);

  $inputSearch.addEventListener("keyup", (e) => {
    d.querySelectorAll(cards).forEach((el) =>
      el.textContent.toLowerCase().includes($inputSearch.value)
        ? el.classList.remove("filter")
        : el.classList.add("filter")
    );
    console.log(e.key);
    console.log($inputSearch.textContent);
  });
};

const sorteoDigital = (btnWin, selector) => {
  const $btnWin = d.querySelector(btnWin);

  $btnWin.addEventListener("click", () => {
    const $options = d.querySelectorAll(selector),
      result = Math.floor(Math.random() * $options.length),
      win = $options[result];

    console.log($options, result, win);
    alert(`El ganador de la rifa es: ${win.textContent}`);
  });
};

const slider = () => {
  let $btnPrevius = d.querySelector(".prev"),
    $btnNext = d.querySelector(".next"),
    $slides = d.querySelectorAll(".slider-slide");

  let i = 0;

  const next = () => {
    $slides[i].classList.remove("active");

    i++;
    if (i === $slides.length) {
      i = 0;
    }
    $slides[i].classList.add("active");
  };

  const prev = () => {
    $slides[i].classList.remove("active");

    i--;

    if (i < 0) {
      i = $slides.length - 1;
    }
    $slides[i].classList.add("active");
  };

  const automaticSlider = () => {
    return setInterval(() => {
      next();
    }, 8000);
  };

  let intervalAutomatic = automaticSlider();

  d.addEventListener("click", (e) => {
    if (e.target === $btnPrevius) {
      e.preventDefault();
      prev();

      clearInterval(intervalAutomatic);

      intervalAutomatic = setTimeout(() => {
        return automaticSlider();
      }, 10000);
    } else if (e.target === $btnNext) {
      e.preventDefault();
      next();
      clearInterval(intervalAutomatic);
      intervalAutomatic = setTimeout(() => {
        return automaticSlider();
      }, 10000);
    }
  });
};

const scrollSpy = () => {
  const $sections = d.querySelectorAll("section[data-scroll-spy]");
  const cb = (entries) => {
    // console.log(entries);
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      // console.log(id,entry);
      if (entry.isIntersecting) {
        d.querySelector(
          `a[data-scroll-spy][href="#${id}"]`
        ).parentElement.classList.add("active");
      } else {
        d.querySelector(
          `a[data-scroll-spy][href="#${id}"]`
        ).parentElement.classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(cb, {
    //Hace referencia
    // root
    // Esta propiedad permite aumentar o disminuir cada lado del cuadro delimintador del elemento raiz antes de calcular las intersecciones
    // rootMargin: '-250px',
    threshold: [0.5, 0.75],
  });
  $sections.forEach((el) => observer.observe(el));

  // console.log(observer);
};

const smartVideo = () => {
  const videos = d.querySelectorAll("video[data-video-smart]"),
    callback = (entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }

        window.addEventListener("visibilitychange", () =>
          document.visibilityState === "visible"
            ? entry.target.play()
            : entry.target.pause()
        );
      });
    };

  const observer = new IntersectionObserver(callback, { threshold: 0.5 });

  videos.forEach((video) => observer.observe(video));
};


const formValidation = (form)=>{
  const $form = d.querySelector(form),
  $inputs = d.querySelectorAll(`.form-validation [required]`);

  $inputs.forEach((input)=>{
    const $span = d.createElement('span');
    $span.id = input.name;
    console.log(input);
    $span.textContent = input.title;
    $span.classList.add('error');
    input.insertAdjacentElement('afterend',$span);
  })

  d.addEventListener('keyup',(e)=>{
    if(e.target.matches('.form-validation [required]')){
      const $input = e.target,
      pattern = $input.pattern || $input.dataset.pattern;
      let regex = new RegExp(pattern);

      if(pattern && $input.value !== ""){
        console.log(d.getElementById($input.name));
        return !regex.exec($input.value) 
        ? d.getElementById($input.name).classList.add('is-active')
        :  d.getElementById($input.name).classList.remove('is-active');
      }
      else if(!pattern){
        return $input.value === "" 
        ? d.getElementById($input.name).classList.add('is-active')
        :  d.getElementById($input.name).classList.remove('is-active');
      }
    }
  })

}


const speechReader = ()=>{
  const $selector = d.querySelector('#speech-select'),
  $textArea = d.querySelector('#speech-text-area'),
  speechMessage = new SpeechSynthesisUtterance();

  let voices = [];

  d.addEventListener('DOMContentLoaded',()=>{
    window.speechSynthesis.addEventListener('voiceschanged',()=>{
      voices = window.speechSynthesis.getVoices();

      voices.forEach((voice)=>{
        const $option = d.createElement('option');
        $option.value = voice.name;
        $option.textContent = `${voice.name}***${voice.lang}`;

        $selector.appendChild($option);
      });
    })
  })

  d.addEventListener('change',(e)=>{
    if(e.target === $selector){
      speechMessage.voice =voices.find(voice=>voice.name === e.target.value);
      console.log(speechMessage)
    }

    
  })
  d.addEventListener('click',(e)=>{
    if(e.target.matches('#speech-btn')){
      speechMessage.text = $textArea.value;
      window.speechSynthesis.speak(speechMessage);
    }
  })


}


d.addEventListener("DOMContentLoaded", () => {
  reloj("#section1-container__reloj", "#iniciar-reloj", "#detener-reloj");
  alarm("./assets/alarma.mp3", "#iniciar-alarma", "#detener-alarma");
  moveBall(".section2-content__div", ".section2-content");
  countDown(
    "#countdowndate",
    "February 17,2024 07:56:00",
    "YA LLEGO EL DIA DE SU CUMPLEAÑOS"
  );
  scrollTop(".btnScrollTop");
  contentResponsive(
    "#section__article1",
    "(min-width:1230px)",
    `<a href="https://youtu.be/6IwUl-4pAzc?si=tyP0DVjq3R3ALBSl" target="_blank">Ver video</a>`,
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/6IwUl-4pAzc?si=tyP0DVjq3R3ALBSl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  );
  contentResponsive(
    "#section__article2",
    "(min-width:1230px)",
    `<a href="https://maps.app.goo.gl/uhxDcHd9gBYTgu69A" target="_blank">Ver mapa</a>`,
    `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15925.102865071814!2d-74.42696644084573!3d3.750021251431835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e9ab09a743317%3A0x9042f410337f2b8d!2sParamo%20de%20Sumapaz!5e0!3m2!1ses!2sco!4v1708113362436!5m2!1ses!2sco" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
  );
  testerResponsive("#btnClose");

  userDeviceInfo("#section6");

  onlineOffine("#section7");

  videoCamara("#webcam");
  getGeolocalizacion("#map");

  filter("#input-search", ".card");

  sorteoDigital("#win-btn", ".value");

  slider();

  scrollSpy();

  smartVideo();

  formValidation('.form-validation');

});
darkMode(".btn-dark-mode");
speechReader();

document.addEventListener("click", (e) => {
  if (
    e.target.matches("#btn-menu-hamburguesa") ||
    e.target.matches("#btn-menu-hamburguesa *")
  ) {
    menu.classList.toggle("show-menu");
  }
  if (e.target.matches(".menu-ul a")) {
    menu.classList.remove("show-menu");
  }
});
//El evento se ejecuta cuando se presiona una tecla
// d.addEventListener('keydown',(e)=>{
//     keyEvent(e);
// })

//El evento se ejecuta cuando se suelta una tecla
// d.addEventListener('keyup',(e)=>{
// keyEvent(e);
// })

// //El evento se ejecuta cuando se mantiene presionada una tecla
// d.addEventListener('keypress',(e)=>{
//     keyEvent(e);
// })
