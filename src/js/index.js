
const tasks = []; //Variable que almacena las tareas asignadas en la pomodoro app//
let time = 0; //variable que controla la cunta regresiva de la pomodoro app//
let timer = null; //variable que asigna ejecutar un fracmento de codigo un determinado tiempo//
let timeBreak = null; //variable a la que se le asignara el tiempo de descanso entre actividaes (10min)//
let current = null; //variable que determina que actividad se esta ejecutando al momento//

///Definicion de variables para el DOM( id de etiquetas HTML)///
const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');




//función de formulario donde se asigna actividad//
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(itTask.value !== ""){
        createTask(itTask.value);
        itTask.value='';
        renderTasks();
        
    };
});

//Funcion que crea la actividad//
createTask=(value)=>{
   const newTask= {
       id: (Math.random()*100).toString(36).slice(3),
       title: value,
       completed: false
   };

   tasks.unshift(newTask);

};


//función que crea la actividad//
renderTasks=()=>{
    const html = tasks.map((task) =>{

        return `
            <div class='task'>
                <div class='completed'>
                    ${task.completed ? `<span class='done'>¡Perfecto<br>Actividad finalizada!</span>` : `<button class='start-button' data-id='${task.id}'>Comenzar</button>`}
                </div>

                <div class='title'>${task.title}</div>
            </div>`;
       
    });

    ///Definicion de variables para el DOM( id de etiquetas HTML)///
    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = html.join('');

    const startButton = document.querySelectorAll('.task .start-button');

    //Función que inicializa 
    //el contador de una actividad
    startButton.forEach(button =>{
        button.addEventListener('click', e =>{
            if(!timer){
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent = 'En progreso...'
            }
        });
    });
};

//función que determina el tiempo para cada actividad//
startButtonHandler=(id)=>{
        time = 25 * 60;
        //time=5;
        current = id;
        const taskIndex = tasks.findIndex(task => task.id == id);
        taskName.textContent = tasks[taskIndex].title;
        renderTime();
        timer = setInterval(()=>{
            timerHandler(id);

        }, 1000);
};

//Función que realiza el decremento del tiempo de una actividad//
timerHandler=(id)=>{
        time--;
        renderTime();

        if(time==0){
            clearInterval(timer);
            markCompleted(id);
            timer=null;
            renderTasks();
            startBreak();
        }
};


//Función que crea el contador.
renderTime=()=>{
    const timeDiv=document.querySelector('#time #value');
    const minutes= parseInt(time/60);
    const seconds= parseInt(time%60);


    timeDiv.textContent = `${minutes<10?'0':''}${minutes}:${seconds<10?'0':''}${seconds}`;
};


//función que avisa cuando
//se termino el tiempo de una actividad//
markCompleted=(id)=>{
     const taskIndex = tasks.findIndex((task)=> task.id == id);
     tasks[taskIndex].completed = true;   
};

//Función que crea un breve descanso de descanso
//al terminar el tiempo de una actividad//
startBreak=()=>{
    time = 5*60;
    //time=3;
    taskName.textContent = 'Break';
    renderTime();
    timerBreak=setInterval(()=>{
        timerBreakHandler();
    }, 1000);
};

//Función que permite reiniciar el tiempo 
//una vez llegado este a cero.//
timerBreakHandler=()=>{
    time--;
    renderTime();
    if(time==0){
        clearInterval(timerBreak);
        current=null;
        timerBreak=null;
        taskName.textContent='';
        //markCompleted(id);
        renderTasks();
        //startBreak()
    };
};

renderTime();
renderTasks();