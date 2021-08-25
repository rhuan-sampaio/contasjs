const inputButton = document.querySelector('.btn-task');
const inputTask = document.querySelector('.task-input');
const task = document.querySelector('.task')
const value = document.querySelector('.value-input')
const total = document.querySelector('.total')
const valuesArray = [];

//################# Enter button ##############
document.addEventListener('keypress',(e) =>{
  const key = e.keyCode;
  if (key === 13){
    const valor = value.value.replace(',','.')
    if (!inputTask.value || !Number(valor)){
      inputClear()
      alert('Preencha todos os campos corretamente.')
    return
  }
  if (inputTask.value.length > 25 || value.value.length > 20){
    inputClear()
    alert('Task text must be under 25 characters.')
    return
  }
  const formatedValue = formatValue(value.value)
  function valueGetter(){
  valuesArray.push(formatedValue)
}
  valueGetter()
  setTotal()
  setTask(inputTask.value,formatedValue)
  eraseParent()
  saveTasks();
  }
})

// ################# Send Button#################
inputButton.addEventListener('click',(e) => {
  const valor = value.value.replace(',','.')
  if (!inputTask.value || !Number(valor)){
      inputClear()
    alert('Preencha todos os campos corretamente.')
    return
  }
  if (inputTask.value.length > 25 || value.value.length > 20){
    inputClear()
    alert('Task text must be under 25 characters.')
    return
  }
  const formatedValue = formatValue(value.value)
  function valueGetter(){
  valuesArray.push(formatedValue)
}
  valueGetter()
  setTotal()
  setTask(inputTask.value,formatedValue)
  
  eraseParent()
  saveTasks();
 
  
})
// ############################################



function createLi(){
  const li = document.createElement('li');
  return li
}
function inputClear(){
  inputTask.value = ''
  value.value = ''
  inputTask.focus()
}

function setTask(taskValue,value){
  const li = createLi()
  const btn = erase()
  li.innerText = taskValue + ' - R$ ' + value + ' '
  li.appendChild(btn)
  task.appendChild(li)
  inputClear()
  eraseParent()
  
}

function erase(){
  const eraseBtn = document.createElement('button')
  eraseBtn.innerText = 'X'
  eraseBtn.classList.add('erase')
  return eraseBtn
}

function eraseParent(){
  document.addEventListener ('click', (e) =>{
  const el = e.target;
  if (el.classList.contains('erase')){
    const remove = el.parentElement.innerText.replace('X','').trim().split('- R$ ')
    const valueRemove = remove[remove.length - 1]
    const valueIndex = valuesArray.indexOf(valueRemove)
    if (valueIndex > -1){
      valuesArray.splice(valueIndex,1)
    }
    
    el.parentElement.remove()
    setTotal()
  }
    saveTasks()
})

}

function saveTasks(){
  const taskNodeList = task.querySelectorAll('li');
  const taskArray = []
  for (t of taskNodeList){
    const value = t.innerText.replace('X','').replace('- R$ ','-*-').trim();
    const valuesArr = value.split('-*-')
    taskArray.push(valuesArr)
  }
  const taskJSON = JSON.stringify(taskArray)
  localStorage.setItem('task',taskJSON)
}

function getTask(){
  const JSONtask = localStorage.getItem('task')
  const taskArray = JSON.parse(JSONtask)
  for (let t of taskArray){
    setTask(t[0],t[1])
    valuesArray.push(t[1])
  }
  setTotal()
}
getTask();

function formatValue(val){
  let numValue = val.replace(',','.')
  numValue = Number(numValue).toFixed(2)
  if (!numValue){
    return false
  }
  return numValue
}



function setTotal(){
  const total = document.querySelector('.total')
  let totalValue = 0;
  for (let v of valuesArray){
    totalValue += Number(v);
  };
  total.innerText = ''
  total.innerText = ' Total: R$ ' + totalValue.toFixed(2);
}